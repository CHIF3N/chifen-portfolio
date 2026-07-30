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

## Problem

Nurse interns need clinical reference information on the ward, on a phone, on a shift where nobody has time to answer their question. I was that intern. The gap is not knowledge in the abstract, it is knowledge at 3am, holding a drug you have not given before, when the person who could confirm the dose is in theatre.

## Why it matters

A wrong or delayed dose decision at that moment is a patient safety issue, not an inconvenience. Interns need an answer they can trust immediately, not a search that depends on hospital wifi holding up.

## My role

Developer. I am building it alone, drawing on what was hardest during my own internship.

## Stack

Flutter, Android first.

## Challenges

Hospital wifi in this region is not something you build a clinical tool on top of. A drug reference that needs a connection is a drug reference that fails exactly when the ward is busiest and the network is worst.

## Screenshots

{{VERIFY: Nurse Intern Assistant screenshots — drug reference, report generation, shift screen}}

## Architecture

No Firebase, no backend, no account. Everything lives on the device. The app covers a drug reference for fifteen medications, the ones interns actually reach for, SOAP and narrative report generation with voice to text and PDF export, and shift management with medication reminders.

## Outcome

Working and in active development. If it cannot answer a dosage question in airplane mode in a basement, it is not finished, and that is the bar it is held to.

## Lessons learned

AI-assisted report writing is the obvious next feature, and it is not built yet, so I am not claiming it. Offline-first is not a checkbox, it is the constraint that should shape every other decision in a clinical tool built for this setting.
