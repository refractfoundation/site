---
title: News
layout: page
---

# News

<div class="container text-center">
  <div class="row row-cols-1 row-cols-md-2 g-3">
    {% assign posts = site.pages | where: "layout", "post" | sort: "date" | reverse %}
    {% for post in posts %}
    <div class="col">
      <div
        class="event-card d-flex flex-column justify-content-between align-items-center text-center"
        style="
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0.5)
            ),
            url({{ post.cover }});
          background-size: cover;
          background-position: center;
        "
      >
        <br>
        <h3>{{ post.title }}</h3>
        <h4>{{ post.date }}</h4>
        <a class="btn" href="{{ post.url }}">Read More ></a>
      </div>
    </div>
    {% endfor %}
  </div>
</div>
