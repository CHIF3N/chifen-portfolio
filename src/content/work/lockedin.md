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

## Problem

Habit and goal-tracking apps let you tick a box and claim the reward, whether or not you actually did the work. That makes the reward meaningless and the app easy to abandon.

## Why it matters

Everything else on this site comes out of a ward or a clinic. This one does not, and it is on the site for that reason: it is what I build when I am solving a problem for myself rather than for a patient.

## My role

Developer. I am building it solo.

## Stack

LockedIn has shipped twice. v1 ran on Expo and React Native in JavaScript, with Firebase for auth and Firestore for data. v2, the version described in the rest of this page, is a full rewrite on Expo and React Native in TypeScript, with Supabase underneath for Postgres, auth, and row-level security.

## Challenges

Verifying that a focus session actually happened, rather than trusting a self-reported checkbox, is the only genuinely hard problem in it. Any habit app can let you tick a box and claim the reward. Making the reward mean something requires the app to know you actually did the session, which is a design problem before it is a technical one.

## Screenshots

These are from v1, a simpler Forest-style focus timer with Firebase behind it. It shipped, then got retired in favour of the quest-and-stats rebuild described on the rest of this page.

![LockedIn v1 home screen, with the Start Focus button](/chifen-portfolio/work/lockedin/v1-home.jpg)
![LockedIn v1 timer screen, mid focus session](/chifen-portfolio/work/lockedin/v1-timer.jpg)

v2 has no screenshots yet. It is not released, so there is nothing built to show.

## Architecture

v2's design: you set real goals, LockedIn breaks them into daily quests, focus sessions earn experience that is verified rather than self-reported, four stats level up, and a companion evolves as you go. v1 was simpler, a single timer with no quest or stat system.

## Outcome

v1 shipped as a working focus timer and has since been retired. v2, the quest and stats rebuild, is in active development, currently at phase one. Not released.

## Lessons learned

Making a reward system trustworthy is a design problem before it is a technical one. The verification has to be designed first, or the rest of the progression system is just decoration.
