---
title: News
layout: page
author: Oliver Potter
date: 1st March 2026
cover: /img/campfire/25.jpg
---

{% for post in site.posts %}
<h1>{{ post.title }}</h1>
{% endfor %}

{% assign posts = site.pages | where: "layout", "post" | sort: "date" | reverse %}
{% for post in posts %}
<div class="container text-center">
  <div class="row row-cols-1 row-cols-md-2 g-3">
    <div class="col">
      <div
        class="event-card d-flex flex-column justify-content-between align-items-center text-center"
        style="
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0.5)
            ),
            url(/img/campfire/1.JPG);
          background-size: cover;
          background-position: center;
        "
      >
        <img
          src="/img/logo/dlc_white.svg"
          alt="The Digital Literacy Census"
          style="width: 50%; margin-bottom: auto"
        />
        <a class="btn" href="/events/dlc" aria-label="Read more about the Digital Literacy Census">Read More ></a>
      </div>
    </div>
    <div class="col">
      <div
        class="event-card d-flex flex-column justify-content-between align-items-center text-center"
        style="
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0.5)
            ),
            url(/img/campfire/25.JPG);
          background-size: cover;
          background-position: center;
        "
      >
        <img
          src="/img/logo/campfire.svg"
          alt="Campfire Birmingham"
          style="width: 50%; margin-bottom: auto"
        />
        <a class="btn" href="/events/campfire" aria-label="Read more about Campfire Birmingham">Read More ></a>
      </div>
    </div>
  </div>
{% endfor %}
</div>
