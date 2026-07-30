---
title: Abortion safety georegistry
summary: A working dashboard for mapping post-abortion care complications across Buea, built to show what an observatory could look like before anyone collects a single real record.
role: Developer
tags: ['health-tech', 'data', 'web', 'research']
status: concept
year: 2026
featured: false
order: 9
note: Demonstration data only. Every figure in this dashboard is randomly generated and no real patient information was used.
metrics: ['Interactive map and charts', 'Local-first, no data leaves the machine']
---

## Problem

Post-abortion care complications are exactly the kind of health signal that goes uncounted: stigmatised, scattered across facilities, and often recorded nowhere useful.

## Why it matters

You cannot ask health facilities to start reporting sensitive data into a system nobody has seen. Without something concrete to look at, an observatory stays a proposal instead of becoming a system anyone can evaluate or push back on.

## My role

Developer. I built the demo alone.

## Stack

Next.js 14, a Leaflet map for the geographic view, Recharts for the distributions.

## Challenges

Demonstrating the value of an observatory without collecting a single real, sensitive record first. Building it local-first, with synthetic data, was the way through: nothing transmitted anywhere, so there is nothing sensitive to protect yet, and no institution has to trust the system before it exists.

## Screenshots

No hosted demo to link to. It is local-first by design, the whole point is that it never leaves the machine it runs on, so there is nothing to deploy and screenshot.

## Architecture

A local-first demo dashboard visualising post-abortion care complication data for Buea. It runs entirely on the machine it is opened on. Nothing is transmitted anywhere.

## Outcome

Concept-stage demo, not deployed anywhere, and not adopted by any facility. **All data in this demo is randomly generated.** No real patient information is used, and none of the figures shown represent actual complication rates in Buea or anywhere else.

## Lessons learned

Building the observatory first, with synthetic records, turns an abstract proposal into something people can click through and argue with. That constraint is not a limitation of the demo, it is the honest version of what this stage of the work is.
