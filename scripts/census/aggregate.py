#!/usr/bin/env python3
"""Aggregate raw Census survey CSVs into the public results file for one report.

Usage:
  python3 scripts/census/aggregate.py <institution-slug> <year-slug> <students.csv> [staff.csv]
  e.g. python3 scripts/census/aggregate.py osca 2025-26 students.csv staff.csv

Writes _data/census_reports/<slug>/<year>/results.json (counts only, never individual rows).
Free-text answers are deliberately not exported; summarise their themes by hand in report.yml.
Raw CSVs hold individual responses: keep them out of the repo and delete them when done.
Standard library only.
"""
import csv
import json
import sys
from collections import Counter
from pathlib import Path

ACCESS_ORDER = ["My own", "A family member's", "At a library/community centre", "No access"]
YNU = ["Yes", "No", "Unsure"]

# (csv column, output key, label) for each Likert 1-5 confidence column.
STUDENT_CONFIDENCE = [
    ("Computer Confidence", "computer", "Computer use"),
    ("Smartphone Confidence", "smartphone", "Smartphone use"),
    ("Email Confidence", "email", "Sending emails and attachments"),
    ("Search Confidence", "search", "Searching for information"),
    ("Forms/Sites Confidence", "forms", "Using websites and forms"),
    ("Awareness Confidence", "safety", "Online safety"),
    ("Password Confidence", "passwords", "Maintaining passwords"),
    ("Privacy Confidence", "privacy", "Privacy settings"),
    ("Communication Confidence", "communication", "Communication"),
    ("AI Confidence", "ai", "AI use"),
]
STAFF_CONFIDENCE = [
    ("Computer Confidence", "computer", "Computer use"),
    ("Work Digital Confidence", "work", "Digital tools for work"),
    ("Troubleshooting Confidence", "troubleshooting", "Troubleshooting"),
    ("Email Confidence", "email", "Sending emails and attachments"),
    ("Search Confidence", "search", "Searching for information"),
    ("Awareness Confidence", "safety", "Online safety"),
    ("Password Confidence", "passwords", "Maintaining passwords"),
    ("AI Confidence", "ai", "AI use"),
]
DEVICES = [
    ("Smartphone Access", "smartphone", "Smartphone"),
    ("Tablet Access", "tablet", "Tablet"),
    ("Laptop Access", "laptop", "Laptop"),
    ("Computer Access", "computer", "Desktop computer"),
    ("Smart TV Access", "tv", "Smart TV"),
    ("Smart Speaker Access", "speaker", "Smart speaker"),
]


def read(path):
    with open(path, encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f))


def options(rows, col, order=None, multi=False):
    """Count respondents choosing each option. Multi-select cells are comma separated."""
    c = Counter()
    for r in rows:
        v = r[col].strip()
        if not v:
            continue
        for part in (v.split(",") if multi else [v]):
            c[part.strip()] += 1
    keys = [k for k in (order or []) if k in c] + sorted(
        (k for k in c if k not in (order or [])), key=lambda k: -c[k]
    )
    return [{"label": k, "count": c[k]} for k in keys]


def question(rows, col, label, **kw):
    return {"label": label, "n": len(rows), "options": options(rows, col, **kw)}


def confidence(rows, spec):
    out = []
    for col, key, label in spec:
        vals = [int(r[col]) for r in rows if r[col].strip()]
        dist = [vals.count(i) for i in range(1, 6)]
        out.append({"key": key, "label": label, "average": round(sum(vals) / len(vals), 2), "distribution": dist})
    return out


def agreement(rows, columns):
    return [question(rows, col, label, order=YNU) for col, label in columns]


def students(rows):
    return {
        "n": len(rows),
        "demographics": {
            "year": question(rows, "Year Group", "Year group", order=["Year 7", "Year 8", "Year 9", "Year 10", "Year 11"]),
            "gender": question(rows, "Gender", "Gender", order=["Male", "Female", "Non-binary", "Other", "Prefer not to say"]),
            "ethnicity": question(rows, "Ethnicity", "Ethnicity"),
            "sen": question(rows, "SEN", "Special educational needs", order=["Yes", "No", "Prefer not to say"]),
            "financial_support": question(rows, "Financial Support", "Receives financial support", order=["Yes", "No", "Prefer not to say"]),
        },
        "access": {
            key: question(rows, col, label, order=ACCESS_ORDER, multi=True) for col, key, label in DEVICES
        },
        "internet": question(rows, "Internet Access", "Where students access the internet", multi=True),
        "confidence": confidence(rows, STUDENT_CONFIDENCE),
        "safety": agreement(rows, [
            ("I can identify a scam email or message.", "I can identify a scam email or message."),
            ("I know what to do if my account gets hacked.", "I know what to do if my account gets hacked."),
            ("I understand how to check if a website is trustworthy.", "I understand how to check if a website is trustworthy."),
            ("I have received a suspicious message or scam attempt before.", "I have received a suspicious message or scam attempt before."),
            ("I have ever clicked on something online that later felt unsafe or suspicious.", "I have clicked on something online that later felt unsafe or suspicious."),
            ("I feel safe when using the internet.", "I feel safe when using the internet."),
        ]),
        "learning": {
            "learns": question(rows, "Learns Digital Skills", "How students learn digital skills", multi=True),
            "improve": question(rows, "Improve Digital Skills", "How students think they could improve their digital skills", multi=True),
            "safety_lessons": question(rows, "Internet Safety Lessons", "Have you had internet safety lessons?", order=YNU),
        },
        "ai": {
            "used": question(rows, "Used AI", "Have you used AI tools before?", order=["Yes, regularly", "Yes, sometimes", "No", "Unsure"]),
            "uses": question(rows, "Uses AI For", "Ways students use AI", multi=True),
            "taught": question(rows, "AI Education", "Have you been taught how to use AI safely, effectively and responsibly?", order=YNU),
            "help_harm": question(rows, "AI Help/Harm", "Do you think AI tools help or make learning harder?",
                                  order=["Help more than they harm", "A mix of both", "Harm more than they help", "Unsure"]),
        },
    }


def staff(rows):
    # No demographic or role breakdowns: with a small staff sample they could identify individuals.
    return {
        "n": len(rows),
        "access": {key: question(rows, col, label, order=ACCESS_ORDER, multi=True) for col, key, label in DEVICES},
        "confidence": confidence(rows, STAFF_CONFIDENCE),
        "safety": agreement(rows, [
            ("I understand how to check if a website is trustworthy.", "I understand how to check if a website is trustworthy."),
            ("I have received a suspicious message or scam attempt before.", "I have received a suspicious message or scam attempt before."),
            ("I have ever clicked on something online that later felt unsafe or suspicious.", "I have clicked on something online that later felt unsafe or suspicious."),
            ("I feel safe when using the internet.", "I feel safe when using the internet."),
            ("I feel confident supporting students with online safety issues.", "I feel confident supporting students with online safety issues."),
        ]),
        "learning": {
            "develops": question(rows, "Develops Skills", "How staff develop their digital skills", multi=True),
            "improve": question(rows, "Improves Skills", "How staff think they could improve their digital skills", multi=True),
            "sufficient_training": question(rows, "Sufficient Digital Training", "Have you had sufficient digital training?", order=YNU),
        },
        "ai": {
            "used": question(rows, "Used AI", "Have you used AI tools before?", order=["Yes, regularly", "Yes, sometimes", "No", "Unsure"]),
            "uses": question(rows, "Uses AI For", "Ways staff use AI", multi=True),
            "taught": question(rows, "AI Education", "Have you been taught how to use AI safely, effectively and responsibly?", order=YNU),
            "can_guide": question(rows, "Can Guide Students With AI", "Can you guide students on using AI?", order=YNU),
            "help_harm": question(rows, "AI Help/Harm", "Do you think AI tools help or make learning harder?",
                                  order=["Help more than they harm", "A mix of both", "Harm more than they help", "Unsure"]),
        },
        "students_confident": question(rows, "Students Digitally Confident", "Do you think students are digitally confident?", order=YNU),
    }


def main(argv):
    if len(argv) not in (4, 5):
        sys.exit(__doc__)
    slug, year, student_csv = argv[1], argv[2], argv[3]
    results = {"students": students(read(student_csv))}
    if len(argv) == 5:
        results["staff"] = staff(read(argv[4]))
    root = Path(__file__).resolve().parents[2]
    out = root / "_data" / "census_reports" / slug / year / "results.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(results, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"wrote {out.relative_to(root)}")


if __name__ == "__main__":
    main(sys.argv)
