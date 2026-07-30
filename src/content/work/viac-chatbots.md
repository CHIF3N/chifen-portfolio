---
title: MORIA and Aunty Queen
summary: Two WhatsApp health bots for a Cameroonian NGO, reaching 240 people in four months with no promotion budget.
role: Health tech volunteer, Vision in Action Cameroon
tags: ['WhatsApp', 'health-tech', 'AI']
status: shipped
year: 2026
featured: true
order: 3
metrics: ['240 contacts in 127 days', '~700 messages exchanged', '8.3% feedback rate', '~57 new users per month, all organic']
---

## Problem

Menstrual health and abortion information are two subjects people are least likely to walk into a clinic and ask about out loud.

## Why it matters

If the questions people are least likely to ask in person go unanswered, they either go to an unreliable source or go unanswered entirely. A channel people already use privately, WhatsApp, removes the barrier of asking a person face to face.

## My role

Health tech volunteer, Vision in Action Cameroon. I built both bots.

## Stack

ManyChat over WhatsApp Business.

## Challenges

A pattern kept repeating: people tried to get clinical advice out of it, diagnoses, interpretations of blood work, personal medical guidance. The bot had to correctly flag these as beyond its scope and redirect, rather than attempt an answer it had no business giving.

## Screenshots

Not shown. These bots belong to Vision in Action Cameroon, so there is no public link to try them and no screenshots to publish without their approval.

## Architecture

Built on ManyChat over WhatsApp Business for Vision in Action Cameroon, both bilingual in English and French. **MORIA** is a menstrual health companion. **Aunty Queen** covers abortion information and reproductive health. Each conversation runs on keyword triggers into quick-reply flows, saving answers to custom fields as it goes. When someone asks something outside the scripted flows, the conversation hands off to an AI reply rather than dead-ending. Sessions close with a rating.

## Outcome

Over 127 days, from 17 February to 24 June 2026, MORIA reached 240 unique users and exchanged roughly 700 messages, averaging 2.9 messages per user. Around 20 people sent unprompted feedback, a rate of 8.3%. Every one of those 240 contacts arrived organically, with no paid promotion and no formal outreach campaign in that window. Menstrual health drew the heaviest traffic by a clear margin.

## Lessons learned

The redirect-to-scope behaviour is also a signal worth taking seriously: it says something about how thin real clinical access is when a menstrual health bot becomes the most available medical opinion someone has. I wrote about what those 240 people taught me in more detail on the blog.

A note on ownership: the figures here come from the usage report I prepared for VIAC. All user data was handled under VIAC confidentiality standards, and the message counts are approximate pending a granular ManyChat analytics export.
