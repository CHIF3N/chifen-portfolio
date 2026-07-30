---
title: LifeDrop
summary: A blood donor network that lives inside WhatsApp, because that is where families already ask for help.
role: Founder and CEO
tags: ['WhatsApp', 'AI', 'health-tech', 'product']
status: live
year: 2026
liveUrl: https://lifedropcam.netlify.app/
featured: true
order: 1
metrics: ['{{VERIFY: LifeDrop WhatsApp pilot — registered donors}}', '{{VERIFY: LifeDrop WhatsApp pilot — completed matches}}', '3rd place, MTN YaMo Season 4', 'Inherits the Ayodah network: 3 partner hospitals']
---

## Problem

When a hospital in Cameroon runs out of blood, the search falls on the family. Door to door, call by call, while the clock runs. The blood usually exists. It is somewhere in the same city, walking around in a stranger's veins. Nobody can find it in time.

## Why it matters

That reframe is the whole company. Blood is not scarce here. It is unfindable. Scarcity is a tragedy you accept. Findability is a coordination problem, and coordination is something you can build. Every hour spent searching door to door is an hour a ward is waiting on a transfusion it cannot schedule around.

## My role

Founder and CEO. I built the product and run the WhatsApp side of the operation day to day. The hospital relationships are the ones that carried over from Ayodah, not new ones I had to build from nothing.

## Stack

{{VERIFY: LifeDrop technical stack — frontend, WhatsApp integration, and how the MoMo payment flow is implemented}}

## Challenges

Ayodah was a real platform with real traction, and it died at the install screen. People downloaded it once and never opened it again. Meanwhile the requests never stopped arriving in my personal WhatsApp at every hour of the night.

We spent a year arguing with our own users about where they should ask for help. Then we stopped arguing and moved to where they already were.

## Screenshots

{{VERIFY: LifeDrop product screenshots — donor flow, ward confirmation, WhatsApp match message}}

The donor flow on the website is live and walkable today, not a mockup: [lifedropcam.netlify.app](https://lifedropcam.netlify.app/).

## Architecture

LifeDrop is Ayodah's donor network, its hospitals, and every lesson that project taught me, rebuilt inside WhatsApp.

- The ward confirms the need first. No donor is ever alerted for a request nobody verified.
- Matching donors get one message: right blood type, nearby, already screened. Yes or no. Nothing else.
- The donor goes to the ward and clinicians do the medicine. We coordinate, we never touch the blood.
- No app, no login, works on low data, English and French.

Payment runs on MTN MoMo, on the requester's own PIN, receipted and traceable. Donors are paid nothing for blood, which is both the law and the thing that keeps supply safe. The coordination fee covers transport, a meal, screening, and the messaging costs, and it is only charged when a donor says yes. Families who cannot pay are not turned away.

## Outcome

The website is live and the donor flow is walkable today. The production WhatsApp bot is a working prototype, not a deployed service. It ships with the Buea pilot. I would rather show you the real stage than claim something that is not running yet.

## Lessons learned

The single most useful thing I have learned about this work: rebuild where people already are instead of asking them to come to you. Ayodah worked and still died at the install screen because I asked frightened people, at two in the morning, to go install an app. LifeDrop is the same network, the same hospitals, the same lesson, applied.
