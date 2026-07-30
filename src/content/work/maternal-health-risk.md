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

## Problem

Which of the vital signs a nurse already takes at every antenatal visit carry the most weight in separating a high-risk pregnancy from a low-risk one? In a setting where the measurement you can act on is the one you can already take, that is not a rhetorical question.

## Why it matters

Blood pressure, blood sugar, pulse, temperature, age: no new equipment, no new budget line, no training gap. If a small number of routine signs carry most of the predictive weight, that is a finding a clinic can act on immediately rather than waiting on infrastructure it does not have.

## My role

Analyst and author. I ran the statistical analysis and wrote up the findings.

## Stack

IBM SPSS Statistics for the descriptive and inferential analysis (ANOVA, chi-square, correlation), with Python and matplotlib for the supplementary visualisations.

## Challenges

This is a statistical analysis, not a predictive model. Training and externally validating a classifier is the obvious next step and I have not done it, so there is no model here and no accuracy claim to defend.

## Screenshots

Not applicable. This is a statistical write-up, not a software product.

## Architecture

808 records from the public Maternal Health Risk dataset, analysed with descriptive and inferential statistics. 330 cases, or 40.8%, were high risk against 478 low risk at 59.2%. The data is a public research dataset. No patient records were involved.

## Outcome

Three variables came out strongly significant. Blood sugar was the sharpest discriminator, F(1, 806) = 637.55, p < .001. Blood pressure followed, χ²(1) = 253.82, p < .001. Age was significant but weaker, F(1, 806) = 91.43, p < .001.

![Distribution of high-risk versus low-risk pregnancies in the dataset](/chifen-portfolio/work/maternal-health-risk/fig1_risk_distribution.png)
![Blood sugar distribution by risk group, showing the sharp separation between groups](/chifen-portfolio/work/maternal-health-risk/fig4_bs_histogram.png)
![Correlation matrix of the six clinical indicators](/chifen-portfolio/work/maternal-health-risk/fig5_correlation_heatmap.png)

## Lessons learned

Blood sugar doing that much of the work is the practically useful finding, because a glucose reading is cheap, fast, and already part of the routine. The most useful result is not always the most sophisticated one.
