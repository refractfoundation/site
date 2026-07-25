---
title: About
layout: page
---

# Who We Are

The Refract Foundation is a small, student-led initiative currently run by a single founder alongside other commitments.

At this stage, it is an early-stage project rather than an established organisation. The focus is on exploring ways to improve digital literacy and access to opportunity in schools through small, practical interventions. Just as light is refracted through a lens to become clearer, we aim to break down complex digital concepts into practical, understandable skills.

Work currently sits across:

- Informal digital literacy research
- Early-stage school engagement
- Experimental programme ideas
- Pilot activities where possible

# Our Approach

Given the current scale of the project, our approach is intentionally lightweight and realistic.

### Small-scale first

Work begins with small pilots or exploratory activity before anything is considered for wider rollout.

### Evidence through observation

Rather than large-scale data collection, insights currently come from limited surveys, conversations, and direct engagement.

### School-aware design

Any materials or activities are designed to fit around real school constraints, but without assuming large institutional capacity.

### No overcommitment

Ideas are treated as prototypes until they are tested in real environments.

# Our Values

The Refract Foundation is guided by four core values, known collectively as **AREA**. Rather than acting as strict rules, these principles shape how we design programmes, make decisions, and support learners.

<div class="container text-center">
  <div class="row row-cols-1 row-cols-md-2 g-3">
    {% for value in site.data.values %}
    <div class="col">
      <div class="event-card event-card--bg d-flex flex-column justify-content-center align-items-center text-center p-4" style="--event-card-image: url({{ value.background }});">
        <h3>{{ value.letter }} · {{ value.name }}</h3>
        <p>{{ value.description }}</p>
      </div>
    </div>
    {% endfor %}
  </div>
</div>

## Our Team

<div class="container">
<div class="row row-cols-1 row-cols-md-4">
{% for person in site.data.team %}
<div class="col d-flex flex-column align-items-center text-center mb-3">
<img src="{{ person.image }}" alt="{{ person.name }}" class="team-photo img-fluid rounded-4 mb-2" loading="lazy">
<h3>{{ person.name }}</h3>
<h4 class="fs-6 text-muted">{{ person.title }}</h4>
{% if person.linkedin or person.email %}
<div class="team-links">
  {% if person.linkedin %}
  <a href="{{ person.linkedin }}" target="_blank" rel="noopener noreferrer" class="team-link" aria-label="{{ person.name }} on LinkedIn">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  </a>
  {% endif %}
  {% if person.email %}
  <a href="mailto:{{ person.email }}" class="team-link" aria-label="Email {{ person.name }}">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  </a>
  {% endif %}
</div>
{% endif %}
</div>
{% endfor %}
</div>
</div>

## Support Our Work

{% include donate.html %}
