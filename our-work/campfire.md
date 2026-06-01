---
title: Campfire
layout: campfire
hero_date: Saturday 28th February 2026
hero_loc: Ormiston Sandwell Community Academy
hero_logo: /img/logo/campfire.svg
hero_back: /img/campfire/25.JPG
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

<div class="projects-showcase container">
  <div class="row row-cols-1 row-cols-md-3 g-2 projects-showcase__row projects-showcase__row--podium">
    {% assign podium = site.data.campfire_projects | slice: 0,3 %}
    {% for project in podium %}
    <div class="col">
      <a
        class="event-project {% if forloop.first %}event-project--winner{% elsif forloop.index == 2 %}event-project--runnerup{% elsif forloop.index == 3 %}event-project--third{% endif %} h-100 d-flex flex-column"
        href="{{ project.href }}"
        target="_blank"
        rel="noopener noreferrer"
      >
        {% if forloop.first %}
          <p class="event-project__label">1st place</p>
        {% elsif forloop.index == 2 %}
          <p class="event-project__label event-project__label--silver">2nd place</p>
        {% elsif forloop.index == 3 %}
          <p class="event-project__label event-project__label--bronze">3rd place</p>
        {% endif %}
        <div class="event-project__media ratio ratio-4x3">
          <img src="{{ project.screenshot }}" alt="{{ project.project }} screenshot" />
        </div>
        <p class="event-project__title">{{ project.project }}</p>
        <p class="event-project__authors">By {{ project.people }}</p>
      </a>
    </div>
    {% endfor %}
  </div>

  <div class="row row-cols-1 row-cols-md-3 g-2 projects-showcase__row projects-showcase__row--rest mt-3">
    {% assign rest = site.data.campfire_projects | slice: 3, 999 %}
    {% for project in rest %}
    <div class="col">
      <a class="event-project h-100" href="{{ project.href }}" target="_blank" rel="noopener noreferrer">
        <img src="{{ project.screenshot }}" alt="{{ project.project }} screenshot" />
        <p class="event-project__title">{{ project.project }}</p>
        <p class="event-project__authors">By {{ project.people }}</p>
      </a>
    </div>
    {% endfor %}
  </div>
</div>

# Our Partners

<div class="container">
<div class="row row-cols-2 row-cols-md-6 g-3 align-items-center justify-content-center">
{% for partner in site.data.campfire_partners %}
<a class="col sponsor-card d-flex align-items-center justify-content-center p-3 rounded mx-1" href="{{ partner.href }}" target="_blank" rel="noopener noreferrer" style="background-color: {{ partner.colour }}">
<img class="img-fluid" src="{{ partner.logo }}" alt="{{ partner.partner }}" />
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
