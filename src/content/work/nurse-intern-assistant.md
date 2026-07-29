---
title: Nurse Intern Assistant
summary: An offline-first clinical companion for nurse interns, built from the parts of the job I remember being hardest.
role: Developer
tags: ['health-tech', 'mobile']
status: in-progress
year: 2026
featured: false
order: 7
metrics: ['Works fully offline', 'No backend, no account required']
---

## Who it is for

Nurse interns, on the ward, on an Android phone, on a shift where nobody has time to answer their question.

I was that intern. The gap is not knowledge in the abstract, it is knowledge at 3am when you are holding a drug you have not given before and the person who could confirm the dose is in theatre.

## What it does

- A drug reference covering fifteen medications, the ones interns actually reach for
- SOAP and narrative report generation, with voice to text and PDF export
- Shift management and medication reminders

Written in Flutter, Android first.

## Offline is the whole point

No Firebase. No backend. No account. Everything lives on the device.

Hospital wifi in this region is not something you build a clinical tool on top of. A drug reference that needs a connection is a drug reference that fails exactly when the ward is busiest and the network is worst. If it cannot answer a dosage question in airplane mode in a basement, it is not finished.

## Status

Working and in active development. AI-assisted report writing is the next piece, and it is not built yet, so I am not claiming it.
