---
title: Home
layout: index
hero_title: Real skills. Real opportunity.
hero_sub: Helping schools identify and address barriers to digital inclusion.
---

# The Digital Divide

Digital literacy shouldn't be a luxury - it is essential for everyday life. Whether applying for jobs, staying connected or accessing vital services, everyone deserves the skills to navigate our digital world safely, effectively and responsibly.

Without digital skills, millions are locked out of opportunities, independence and inclusion. The gap isn't just about technology - it's about the people.

We're not just looking at statistics here - these are our neighbours, friends and family and members of the community.

# Bridging the Gap

Refract is a youth-led initiative dedicated to making essential digital skills accessible to everyone in the West Midlands. We want to provide hands-on training and support that meets people where they are, regardless of background.

From basic smartphone skills to online safety and artificial intelligence, we want to help our community and build the confidence needed to navigate today's technology.

# Explore Our Programmes

{% include programmes.html %}

# Our Partners

<div class="container">
<div class="row row-cols-2 row-cols-md-6 g-3 align-items-center justify-content-center">
{% for partner in site.data.partners %}
<a class="col sponsor-card d-flex align-items-center justify-content-center p-3 rounded mx-1" href="{{ partner.href }}" target="_blank" rel="noopener noreferrer" style="background-color: {{ partner.colour }}">
<img class="img-fluid" src="{{ partner.logo }}" alt="{{ partner.partner }}" />
</a>
{% endfor %}
</div>
</div>
<br>

# Support Our Work

{% include donate.html %}

# Latest News

{% include news.html limit=2 %}
