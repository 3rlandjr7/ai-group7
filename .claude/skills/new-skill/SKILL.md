---
name: new-skill
description: Write or revise a skill the way this user wants them written. Use when asked to create a new skill, turn a stated preference into a rule, or clean up an existing skill that has grown messy.
disable-model-invocation: true
---

# /new-skill [what it should do]

Conventions for authoring skills. Portable — no project-specific paths.

For the mechanics of scaffolding, evaluating and measuring a skill, use the
`skill-creator` skill if the session offers one. This file covers **how this user wants skills
written**, which that tool does not know.

## Discuss before writing

**Do not write the skill on the first request.** Propose what it would contain, what would trigger
it, and what it would deliberately leave out. Wait for the user to refine it. They have changed the
shape of every skill they have asked for, and a written skill is harder to argue with than a
proposal.

## Every rule carries its reason

Write *"Ask one question per reply, because the user usually has follow-ups and a second question
buries them"* — not *"Ask one question per reply."*

A rule without its reason gets misread the moment a situation does not match it exactly. This has
already happened once: "one question at a time" was read as "one *new* question per reply," which
was not the intent, and the reason would have settled it.

## Rules must be testable

For each rule, ask: **how would someone know it was broken?** If there is no observable answer, it
is a preference, not a rule. Either sharpen it until it can be checked, or move it to a "preferences"
section and stop calling it a rule.

Good: *"End every reply with a step status line in `step N/TOTAL` form."* — visibly present or not.
Bad: *"Be thorough."* — unfalsifiable.

## Keep it short

A skill loads **in full**, every time it is used, so every line costs context on every invocation.
Cut anything that restates a default behaviour. If the skill is getting long, that is a sign it
should be split rather than padded.

## Structure beats a bullet list

Past a handful of rules, a flat list of bullets becomes unreadable and starts contradicting itself.
Group rules under short named headings so a rule can be referred to by name. Keep **workflow
conventions** (how to work) separate from **project facts** (what the project is) — they change at
different rates, and mixing them means re-reading the facts to find the conventions.

## Describe the trigger precisely

The description decides whether the skill loads at the right moment. State the situations it is for,
in the words the user would actually use, and state what it is **not** for when a neighbouring skill
exists. A skill that never triggers is worse than no skill, because it looks like coverage.

## Capture preferences as they are stated

When the user says they want something done a particular way, offer to add it to the relevant skill
then and there. Preferences stated in conversation are lost when the conversation ends.

## Before finishing

- Read the file back and check for references to one specific project. A skill meant for reuse must
  carry none.
- Say plainly where the skill lives, and whether that location survives — a skill written into a
  synced folder can be overwritten by the next sync, so a skill meant to last belongs wherever the
  user manages their own skills.
