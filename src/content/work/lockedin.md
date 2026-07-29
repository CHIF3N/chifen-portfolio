---
title: LockedIn
summary: A focus app that turns real-life goals into daily quests, built mostly because I wanted it to exist.
role: Developer
tags: ['mobile', 'product']
status: in-progress
year: 2026
featured: false
order: 11
---

## Not health tech

Everything else here comes out of a ward or a clinic. This one does not, and I am keeping it on the site for that reason.

LockedIn is a personal progression system. You set real goals, it breaks them into daily quests, focus sessions earn experience that is verified rather than self-reported, four stats level up, and a companion evolves as you go.

## Build

Expo and React Native in TypeScript, with Supabase underneath for Postgres, auth, and row-level security.

The verified experience part is the only genuinely hard problem in it. Any habit app can let you tick a box and claim the reward. Making the reward mean something requires the app to know you actually did the session, which is a design problem before it is a technical one.

## Status

In active development, currently at phase one. Not released.
