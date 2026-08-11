---
title: Campfire
layout: programme
hero_position_y: -40vh
hero_date: Saturday 28th February 2026
hero_loc: Ormiston Sandwell Community Academy
hero_logo: /assets/images/logo/campfire.svg
hero_back: /assets/images/campfire/25.JPG
hero_alt: Campfire Birmingham
---

_Dear Hackers, Musicians, and Artists,_

_Welcome to Hack Club's newest adventure. This winter we invite you
to join us for Campfire, the world's biggest Game Jam happening
simultaneously in 200 cities._

_Hack Club wants you to make a game this winter._

_Don't consider yourself a game dev? No problem - we have tons of online and
in-person workshops for you to make your first game!_

_This winter, we invite you to learn something new, make something you're
really proud of, meet new friends, and go on an incredible adventure
together._

_With love,<br />The Campfire Team_

---

In Winter 2026, we hosted our first ever hackathon, which was a Hack
Club satellite event. With approximately 20 attendees and a team of 6
volunteers, teenagers aged 13-18 from across the region worked together
for 12 hours to build a game from scratch, following the theme 'beneath
the surface'.

By the end of the day, 6 amazing projects were shipped and lots of
food and swag was distributed courtesy of our incredible sponsors.

# Projects Submitted

<div class="container mb-4">
  <div class="row row-cols-1 row-cols-md-3 g-3">
    {% for project in site.data.campfire_projects %}
    <div class="col">
      <a class="project-card d-flex flex-column h-100" href="{{ project.href }}" target="_blank" rel="noopener noreferrer">
        {% if forloop.index == 1 %}
          <span class="project-badge project-badge--gold">1st place</span>
        {% elsif forloop.index == 2 %}
          <span class="project-badge project-badge--silver">2nd place</span>
        {% elsif forloop.index == 3 %}
          <span class="project-badge project-badge--bronze">3rd place</span>
        {% endif %}
        <div class="project-card__media ratio ratio-4x3">
          <img src="{{ project.screenshot }}" alt="{{ project.project }} screenshot" loading="lazy" />
        </div>
        <div class="project-card__body">
          <p class="project-card__title">{{ project.project }}</p>
          <p class="project-card__authors">By {{ project.people }}</p>
        </div>
      </a>
    </div>
    {% endfor %}
  </div>
</div>

# Our Partners

<div class="container">
<div class="row row-cols-2 row-cols-md-4 g-4 align-items-center justify-content-center">
{% for partner in site.data.campfire_partners %}
<a class="col sponsor-card" href="{{ partner.href }}" target="_blank" rel="noopener noreferrer" style="--partner-colour: {{ partner.colour }}">
<span class="sponsor-card__inner"><img src="{{ partner.logo }}" alt="{{ partner.partner }}"{% if partner.invert %} class="sponsor-card__logo--invert"{% endif %} /></span>
</a>
{% endfor %}
</div>
</div>

<br>

# Event Gallery

<div id="campfireCarousel" class="carousel slide gallery-carousel" data-bs-ride="carousel" aria-label="Event gallery">
  <div class="carousel-indicators">
    {% for photo in site.data.campfire_photos %}
      <button type="button" data-bs-target="#campfireCarousel" data-bs-slide-to="{{ forloop.index0 }}" {% if forloop.first %}class="active" aria-current="true"{% endif %} aria-label="Slide {{ forloop.index }}"></button>
    {% endfor %}
  </div>
  <div class="carousel-inner">
    {% for photo in site.data.campfire_photos %}
      <div class="carousel-item {% if forloop.first %}active{% endif %}">
        <div class="gallery-carousel__frame">
          <img src="{{ photo.url }}" class="d-block w-100 gallery-carousel__image" alt="Campfire Birmingham Photo">
        </div>
      </div>
    {% endfor %}
  </div>
  <button class="carousel-control-prev gallery-carousel__control" type="button" data-bs-target="#campfireCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next gallery-carousel__control" type="button" data-bs-target="#campfireCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

---

## Support Our Work

{% include donate.html %}
