---
title: Moirai
summary: A full e-commerce and content site for a fashion house, handed over so the owner can run every part of it without touching code.
role: Developer, through Inkwave
tags: ['web', 'client work', 'e-commerce']
status: shipped
year: 2026
liveUrl: https://moirai-official.vercel.app
featured: false
order: 6
metrics: ['9 page types', 'Client-editable CMS', 'Runs at zero hosting cost']
---

## Problem

The House of Moirai sells bespoke fashion and runs a fashion school. They needed a shop, a place to explain bespoke commissions, a school enrolment page, and a journal. They also needed to run all of it themselves afterwards.

## Why it matters

A site that only works while the developer is available is not finished. A small studio does not have a retainer budget for someone to swap a photo or fix a typo, so the site has to survive without me in the loop for the day to day.

## My role

Developer, through Inkwave. I designed and built the site, wrote the content model, and wrote the handover documentation the owner uses to run it alone.

## Stack

Next.js with Sanity as the CMS.

## Challenges

Nine page types had to share one coherent system: homepage, shop with category filters and grid or list views, collections, bespoke, fashion school, about, journal, individual posts, and contact. Every product, post, photo, and even the WhatsApp number needed to be editable from an admin panel, with no code and no redeploy required for routine changes.

## Screenshots

{{VERIFY: Moirai screenshots — the storefront and the /studio admin panel}}

## Architecture

Enquiries route into WhatsApp, because that is where their customers already talk to them. The whole thing runs on free hosting tiers, so it costs the client nothing to keep alive until they want a custom domain.

## Outcome

Nine page types shipped, the CMS is client-editable, and the site runs at zero hosting cost.

## Lessons learned

I wrote the handover as a document a non-technical owner can follow alone: how to add a product, how to publish a post, how to swap placeholder photos after a shoot, what to do when something breaks. The part I care about most is not the build, it is that the client does not need me for any of that.
