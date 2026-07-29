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

## Why build a dashboard with fake data

Because you cannot ask health facilities to start reporting sensitive data into a system nobody has seen.

Post-abortion care complications are exactly the kind of health signal that goes uncounted: stigmatised, scattered across facilities, and often recorded nowhere useful. Building the observatory first, with synthetic records, turns an abstract proposal into something people can click through and argue with.

## What it is

A local-first demo dashboard visualising post-abortion care complication data for Buea. Next.js 14, a Leaflet map for the geographic view, Recharts for the distributions.

It runs entirely on the machine it is opened on. Nothing is transmitted anywhere.

## Say this clearly

**All data in this demo is randomly generated.** No real patient information is used, and none of the figures shown represent actual complication rates in Buea or anywhere else. It is a working interface for a system that does not have real data behind it yet, and it should never be read as findings.

That constraint is not a limitation of the demo. It is the honest version of what this stage of the work is.
