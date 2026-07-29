---
title: CoastClear
summary: A trilingual platform for coordinating beach waste cleanups, with AI photo analysis and separate dashboards for reporters, cleanup crews, and NGOs.
role: Developer
tags: ['web', 'climate', 'health-tech']
status: live
year: 2025
liveUrl: https://coastclear-web.web.app
featured: true
order: 5
metrics: ['3 languages: English, French, Pidgin', '3 role-based dashboards']
---

## Coastal problem, coastal kid

I grew up on this coast. Waste on a beach is not only an environmental story, it is a public health one: standing water, cuts from buried glass, contaminated fishing grounds feeding people who have no alternative.

CoastClear coordinates the response. Somebody reports a polluted site with a photo, cleanup crews pick up the work, and NGOs see what is happening across an area rather than one beach at a time.

## Build

React with Firebase underneath for authentication, Firestore, and storage. Three role-based dashboards, one each for reporters, cleanup crews, and NGOs, because those three groups need completely different things from the same data.

Photo reports run through AI vision analysis rather than making a volunteer classify waste manually from a dropdown.

## Trilingual by default, not as a feature

English, French, and Pidgin, chosen at the auth screen before anything else happens.

Pidgin matters here and it usually gets left out. It is what people on this coast actually speak. A tool that makes a fisherman navigate a French government-register interface to report a dirty beach is a tool that will not get used. The Pidgin option says "make we go for Pidgin", because that is how you would actually say it.

## Context to confirm

Built for {{VERIFY: CoastClear hackathon name and year}} with {{VERIFY: CoastClear collaborator name and organisation}}.
