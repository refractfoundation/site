---
title: Contact
layout: page
---

# Get in Touch

We'd love to hear from you. Reach out via email or connect with us on LinkedIn.

<div class="container text-center">
  <div class="row row-cols-1 row-cols-md-2 g-3">
    {% for method in site.data.contact %}
    <div class="col">
      <div class="event-card event-card--bg d-flex flex-column justify-content-between align-items-center text-center" style="--event-card-image: url({{ method.background }});">
        <br />
        <h3>{{ method.name }}</h3>
        <p>{{ method.description }}</p>
        <p class="small">{{ method.detail }}</p>
        <a class="btn" href="{{ method.href }}">{{ method.button }}</a>
      </div>
    </div>
    {% endfor %}
  </div>
</div>

## Support Our Work

{% include donate.html %}
