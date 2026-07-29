---
title: Maternal health risk analysis
summary: A statistical breakdown of which routine clinical signs actually separate high-risk pregnancies from low-risk ones.
role: Analyst and author
tags: ['data', 'research', 'health-tech']
status: shipped
year: 2026
featured: false
order: 8
metrics: ['808 records analysed', '40.8% classified high risk']
---

## The question

Which of the vital signs a nurse already takes at every antenatal visit carry the most weight in separating a high-risk pregnancy from a low-risk one?

This matters in a setting where the measurement you can act on is the one you can already take. Blood pressure, blood sugar, pulse, temperature, age. No new equipment.

## Method

808 records from the public Maternal Health Risk dataset, analysed with descriptive and inferential statistics. 330 cases, or 40.8%, were high risk against 478 low risk at 59.2%.

## What separated the groups

Three variables came out strongly significant:

- **Blood sugar** was the sharpest discriminator, F(1, 806) = 637.55, p < .001
- **Blood pressure** followed, χ²(1) = 253.82, p < .001
- **Age** was significant but weaker, F(1, 806) = 91.43, p < .001

Blood sugar doing that much of the work is the practically useful finding, because a glucose reading is cheap, fast, and already part of the routine.

## What this is not

This is a statistical analysis, not a predictive model. Training and externally validating a classifier is the obvious next step and I have not done it, so there is no model here and no accuracy claim.

The data is a public research dataset. No patient records were involved.
