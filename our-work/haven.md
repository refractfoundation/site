---
title: Haven West Midlands
layout: programme
hero_position_y: 0vh
hero_date: Saturday 14th November 2026
hero_loc: University of Wolverhampton Science Park
hero_logo_large: true
hero_logo: /assets/images/logo/haven-white.png
hero_back: /assets/images/heroes/haven-hero.png
hero_alt: Haven West Midlands
---

_Dear Hackers, Musicians, and Artists,_

_This November, YOU can join the world's largest teen game jam. Yes, you! It
doesn't matter if you have years of experience, or just learned what they are
today._

_You'll join thousands of teens making games from all around the world. Don't
consider yourself a game dev? No problem - we have tons of workshops for you to
make your game!_

_This is your chance to learn something new, meet new friends, and go on an
incredible adventure together!_

_With love,<br />The Haven Team_

---

Haven is a teen game jam run by [Hack Club](https://hackclub.com), the global
nonprofit network of teen coders, with local events in over 200 cities. On
Saturday 14th November 2026 we hosted Haven West Midlands at the University of
Wolverhampton Science Park, our second Hack Club event after Campfire
Birmingham.

With 10 attendees and a team of 5 volunteers, teenagers aged 13-18 spent the
day building a video game from scratch around the theme 'Bounce Back', supported by
workshops, lightning talks and mentors. The day finished with presentations and
a peer vote, with free food and prizes courtesy of our incredible sponsors.

{% if site.data.haven_projects.size > 0 %}
# Projects Submitted

<div class="container mb-4">
  <div class="row row-cols-1 row-cols-md-3 g-3">
    {% for project in site.data.haven_projects %}
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
{% endif %}

# Our Partners

<div class="container">
<div class="row row-cols-2 row-cols-md-4 g-4 align-items-center justify-content-center">
{% for partner in site.data.haven_partners %}
<a class="col sponsor-card{% if partner.dark %} sponsor-card--dark{% endif %}" href="{{ partner.href }}" target="_blank" rel="noopener noreferrer" style="--partner-colour: {{ partner.colour }}">
<span class="sponsor-card__inner"><img src="{{ partner.logo }}" alt="{{ partner.partner }}"{% if partner.invert %} class="sponsor-card__logo--invert"{% endif %} /></span>
</a>
{% endfor %}
</div>
</div>

<br>

{% if site.data.haven_photos.size > 0 %}
# Event Gallery

<div id="havenCarousel" class="carousel slide gallery-carousel" data-bs-ride="carousel" aria-label="Event gallery">
  <div class="carousel-indicators">
    {% for photo in site.data.haven_photos %}
      <button type="button" data-bs-target="#havenCarousel" data-bs-slide-to="{{ forloop.index0 }}" {% if forloop.first %}class="active" aria-current="true"{% endif %} aria-label="Slide {{ forloop.index }}"></button>
    {% endfor %}
  </div>
  <div class="carousel-inner">
    {% for photo in site.data.haven_photos %}
      <div class="carousel-item {% if forloop.first %}active{% endif %}">
        <div class="gallery-carousel__frame">
          <img src="{{ photo.url }}" class="d-block w-100 gallery-carousel__image" alt="Haven West Midlands Photo">
        </div>
      </div>
    {% endfor %}
  </div>
  <button class="carousel-control-prev gallery-carousel__control" type="button" data-bs-target="#havenCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next gallery-carousel__control" type="button" data-bs-target="#havenCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
{% endif %}

---

## Support Our Work

{% include donate.html %}
