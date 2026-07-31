---
title: CoastClear
summary: A trilingual platform for coordinating beach waste cleanups, with AI photo analysis and separate dashboards for reporters, cleanup crews, and NGOs.
role: Developer
tags: ['web', 'climate', 'health-tech']
status: live
year: 2025
liveUrl: https://coastclear-web.web.app
cover: ../../assets/covers/coastclear.png
featured: true
order: 5
metrics: ['3 languages: English, French, Pidgin', '3 role-based dashboards']
---

## Problem

Waste on a beach is not only an environmental story, it is a public health one: standing water, cuts from buried glass, contaminated fishing grounds feeding people who have no alternative. A polluted site had nowhere organised to go, and cleanup crews and NGOs had no shared view of what was happening across an area rather than one beach at a time.

## Why it matters

I grew up on this coast, so the gap was not abstract. A report that reaches the right crew and gets logged for the NGOs tracking the coastline is the difference between a one-off cleanup and a response an area can actually plan around.

## My role

Developer, built for Ocean Hack 2025 alongside NatGeo and The Nature Conservancy. I built the platform end to end: the three role-based dashboards, the photo analysis pipeline, and the trilingual flow.

## Stack

React, with Firebase underneath for authentication, Firestore, and storage. Photo reports run through AI vision analysis rather than making a volunteer classify waste manually from a dropdown.

## Challenges

Building genuinely trilingual software is harder than adding a language toggle. Pidgin especially gets left out of most systems, even though it is what people on this coast actually speak. A tool that makes a fisherman navigate a French government-register interface to report a dirty beach is a tool that will not get used.

## Screenshots

No gallery here. It is live and free to click through: [coastclear-web.web.app](https://coastclear-web.web.app).

## Architecture

Three role-based dashboards, one each for reporters, cleanup crews, and NGOs, because those three groups need completely different things from the same data. Language is chosen at the auth screen, English, French, or Pidgin, before anything else happens. The Pidgin option says "make we go for Pidgin", because that is how you would actually say it.

## Outcome

Live at [coastclear-web.web.app](https://coastclear-web.web.app). Built for Ocean Hack 2025.

## Lessons learned

Language choice is a product decision, not a translation task tacked onto the end. Offering Pidgin at the same level as English and French, right at the auth screen, is what actually makes the tool usable for the people who need it most.
