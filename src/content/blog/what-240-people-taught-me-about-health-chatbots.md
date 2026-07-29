---
title: What 240 people taught me about health chatbots
description: Four months of running two WhatsApp health bots in Cameroon, and the one user behaviour that changed how I think about building them.
pubDate: 2026-07-29
tags: ['WhatsApp', 'health-tech', 'AI']
draft: false
---

Between February and June this year I ran two WhatsApp health bots for Vision in Action Cameroon. MORIA handles menstrual health. Aunty Queen covers abortion information and reproductive health. Both live on ManyChat, both work in English and French.

In 127 days they reached 240 people and exchanged around 700 messages. Nobody was paid to promote them. There was no campaign, no launch push, no budget. People found them and told other people.

Here is what those 240 conversations actually taught me.

## People kept asking the bot to be a doctor

This is the finding I keep coming back to.

A recurring pattern showed up in the logs: users trying to get clinical advice out of a menstrual health bot. Diagnoses. Interpretations of blood work results. Personal medical guidance about their own symptoms.

The bot handled it correctly. It flagged those requests as outside its scope and redirected. That is the system working exactly as designed, and I would build it the same way again.

But "the system worked" is the boring reading. The interesting question is why someone brings a blood test result to a chatbot about periods.

They are not confused about what the bot is. They are telling you something about what else is available. When a scripted WhatsApp flow is the most accessible medical opinion a person has at that moment, the gap is not in the product. It is in everything around the product.

I do not think the answer is to let the bot start diagnosing. That would be dangerous and I will not build it. But I stopped treating those out-of-scope messages as noise in the funnel. They are the clearest demand signal in the whole dataset, and they belong in the referral design rather than the error handling.

## Engagement depth was low, and that was fine

Average messages per user came to 2.9.

Read through a growth lens, 2.9 looks like a failure. Nobody is bingeing this content. There is no daily active user story here.

Read through a health lens it looks completely different. Most users got one full exchange of information and left. They arrived with a question, got an answer, and went back to their day. That is a successful clinical interaction, not an abandoned session.

I had to actively unlearn the instinct to optimise for time in app. A health service that keeps you talking longer is not obviously better than one that answers you in three messages and lets you go. If anything the opposite is true.

## The topic split was not evenly matched

Menstrual health took the heaviest traffic by a clear margin. Sexual and reproductive health education and referrals saw moderate use, mostly as a general entry point rather than a destination.

I had assumed roughly comparable demand across the flows. That was wrong, and it was wrong in a direction worth understanding. Menstrual health is the topic people will ask a machine about most readily, probably because it is both extremely common and still awkward to raise in person.

The privacy of a chat window is doing real work there. Not the AI, not the flow design. The simple fact that nobody is watching your face while you ask.

## Roughly one in twelve people wrote back unprompted

Around 20 people sent feedback nobody asked them for, a rate of 8.3%.

For an unprompted response rate on a free service with no incentive, that is high. It tells you people felt some ownership over it.

The content split cleanly. The positive feedback was almost entirely about tone: users appreciated that the bot was accessible and did not judge them on sensitive topics. The critical feedback was almost entirely about depth: more detail, clearer navigation prompts, better referral information.

Nobody complained about the bot being a bot. They complained about it not knowing enough. That is a much better problem to have, and it points at content work rather than a rebuild.

## What I would tell someone building one of these

Test what people ask when your flows fail them, because that is where the real demand is hiding. Design the fallback as carefully as the happy path.

Do not measure a health service the way you would measure a social app. A short conversation that resolves someone's question is the goal, not a leak.

And build for the topic people are too embarrassed to raise face to face, because that is where a chat window genuinely beats a clinic waiting room. Everywhere else, a human is still better and you should route to one.

---

*The bots belong to Vision in Action Cameroon and are not publicly linkable. Figures come from the usage report I prepared for VIAC covering 17 February to 24 June 2026. Message counts are approximate pending a granular analytics export. All user data was handled under VIAC confidentiality standards.*
