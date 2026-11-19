---
title: The First Census Pilot
author: Oliver Potter
cover: census-pilot-osca
permalink: /news/osca-census-pilot
---

{%- assign data = site.data.census_reports.osca["2025-26"] -%}
{%- assign r = data.results.students -%}
{%- assign staff = data.results.staff -%}

Today we're publishing the results of the first Refract Digital Literacy Census pilot, delivered with Ormiston Sandwell Community Academy (OSCA).

**261 students** in Years 7 to 9 and **16 members of staff** took part. Almost all of them have a smartphone, but a third of students have no desktop computer, only a third are confident sending an email with an attachment, and **90% already use AI tools**. Schools rarely have evidence like this about their own students, and Census exists to provide it.

<ul class="pilot-stats post-visual">
  {%- for h in data.report.highlights limit: 6 %}
  <li class="pilot-stats__item"><span class="pilot-stats__value">{{ h.value }}</span><span class="pilot-stats__text">{{ h.text }}</span></li>
  {%- endfor %}
</ul>

## Why we created Census

Digital literacy is more than knowing how to use a computer. It covers having access to technology, communicating professionally, staying safe online, understanding AI and feeling confident enough to use digital tools in education and work.

Schools often decide how to teach digital skills based on observation and experience. Census adds another perspective: anonymous feedback from students and staff, so a school can see its strengths, understand its challenges and make decisions based on evidence.

## The pilot

The pilot ran at OSCA during the 2025/26 academic year. Students answered questions on access to devices, confidence with everyday tasks, online safety, how they learn digital skills and how they use AI. Staff answered a shorter survey. The students' answers show a good spread of genders, ethnicities, SEN and pupil premium students.

This is a single school, so these results describe OSCA, not schools in general. They do show what consistent evidence can tell a school, and they are the starting point for benchmarking between schools.

## Five key findings

### 1. Access to technology is strong, but inequalities remain

**96% of students have a smartphone**, so most young people can reach digital services. Devices that suit schoolwork are far less evenly spread:

- **16%** (about one in six) have no access to a laptop, and almost half of those who do share one with their family
- **37%** have no desktop computer
- **23%** have no tablet

<div class="post-visual post-chart-grid">
  {% include census-bars.html q=r.access.laptop %}
  {% include census-bars.html q=r.access.computer %}
</div>

Internet access alone does not guarantee digital opportunity. A phone is not a substitute for a laptop when you are writing coursework or learning to code.

### 2. Students are confident with everyday technology, less so with professional skills

Students rated their confidence out of 5. Smartphones scored highest (**4.66**), with passwords (4.07) and searching for information (4.15) close behind. Sending emails with attachments scored lowest (**3.28**), followed by online safety (3.50) and using AI (3.77).

<div class="post-visual">
  <figure class="chart">
    <figcaption class="chart__title">Average confidence, out of 5 <span class="chart__n">({{ r.n }} students)</span></figcaption>
    {% include census-confidence.html items=r.confidence %}
  </figure>
</div>

Email and file handling are the skills students will need most in further education and work. Schools are well placed to teach them.

### 3. Cybersecurity awareness is encouraging, but practical resilience needs work

**69%** of students said they can identify a scam message, and **75%** feel safe online. But:

- **40%** said they don't know, or are unsure, what to do if an account is hacked
- **34%** don't know, or are unsure, how to check whether a website is trustworthy
- **70%** have already received a scam or suspicious message, and **36%** have clicked on something that later felt unsafe

<div class="post-visual">
  {% include census-agree.html questions=r.safety %}
</div>

Awareness is a good start. Students now need to practise real decisions in realistic scenarios.

### 4. AI is already part of everyday learning

**90% of students have used AI tools**, and 31% use them regularly. The most common use is homework help (61% of students), followed by explaining topics, creative tasks and summarising information. Opinion is split on whether it helps: **46%** think AI helps learning more than it harms it, **40%** think it's a mix of both, and 5% think it harms more than it helps.

<div class="post-visual post-chart-grid">
  {% include census-bars.html q=r.ai.used %}
  {% include census-bars.html q=r.ai.uses %}
  {% include census-bars.html q=r.ai.help_harm %}
</div>

**63%** of students have been taught how to use AI safely and responsibly. That leaves more than a third who haven't. Schools have a chance to teach responsible, ethical use rather than discourage it.

### 5. Students want practical digital skills teaching

School is the main place students learn digital skills (**76%**), followed by self-teaching online (50%) and family and friends (49%). Asked what would help, they asked for videos, short lessons in school, step-by-step guides and one-to-one help. In their own words, they wanted more help with everyday tasks, cybersecurity, email and workplace technology, rather than more theory.

<div class="post-visual post-chart-grid">
  {% include census-bars.html q=r.learning.improve %}
</div>

## What staff told us

Sixteen members of staff from a range of departments responded. It's a small sample, so we only look at the group as a whole, but one result stands out. **Only 1 of 16** has been taught how to use AI safely and responsibly, and just **5 of 16** feel able to guide students in using it.

<div class="post-visual post-chart-grid">
  {% include census-bars.html q=staff.ai.taught %}
  {% include census-bars.html q=staff.ai.can_guide %}
</div>

Students are already using AI, and staff are looking for the training and guidance to help them.

## Looking ahead

This report is the beginning of Census, not the end. As more schools take part, we'll be able to benchmark anonymised results, spot regional and national trends, measure the impact of interventions and build a clearer picture of digital literacy across education.

Our goal is simple: every young person should have the knowledge, confidence and opportunities to thrive in a digital society.

## Read the full report

The full report includes every chart, the staff survey, students' free-text themes and our recommendations. You can [read it online](/our-work/census/institutions/osca/2025-26) or [download the PDF](/assets/reports/census/osca/osca-2025-26.pdf). Every institution's report history is on the [Census institutions page](/our-work/census/institutions).

We're grateful to OSCA's leadership team and computing department for supporting this pilot and helping shape the future of Census.

If you're a headteacher, trust leader or computing lead and want to run Census at your school, we'd love to hear from you. [Get in touch](/contact).
