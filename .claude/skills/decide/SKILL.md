---
name: decide
description: Write a numbered decision record for a choice just made, capturing the options that were rejected and why. Use after any decision where an alternative was considered and dropped.
disable-model-invocation: true
---

# /decide [short title]

Writes one decision record. Portable — the only project-specific line is the folder below.

**Records folder:** `docs/decisions/` *(change this line if a project keeps them elsewhere)*

## The test, applied first

**A decision record requires a rejected option.** Before writing anything, name the alternatives
that were considered and dropped.

If you cannot name at least one, **stop and say so**: *"No record written — nothing was rejected
here, so there is no reasoning to preserve. This belongs in DEVBOOK (what shipped) or as a plain
commit message."* Then suggest where it does belong.

This matters because the folder is only useful while every file in it earns its place. A record
saying "we renamed a variable" buries the ones that explain the architecture.

## Steps

1. Read the records folder. If it does not exist, create it, and copy in the `README.md` describing
   the format before writing the first record.
2. Take the **next unused number**, zero-padded to four digits. Never reuse or overwrite a number —
   check the highest that exists rather than counting files, since numbers may have gaps.
3. Confirm the rejected options with the user if they are not already explicit in the conversation.
   Do not invent a rejected option to satisfy the test.
4. Write `NNNN-short-slug.md` using the template below.
5. Report the path, and one line on what the record says.

## Template

```markdown
# NNNN — Title stating the decision, not the topic

- **Date:** YYYY-MM-DD
- **Status:** Accepted
- **Decided by:** who actually decided

## Context
What forced a choice. The constraint, not the wish. If an assumption turned out to be false, say
which one and how it was found.

## Options considered
| Option | Verdict | Why |
|---|---|---|

## Decision
What we are doing, in one or two sentences.

## Consequences
What this makes easy. What it makes hard. What was given up.
```

## Rules

- **Never edit a merged record.** If a decision changes, write a new record with
  `Supersedes: NNNN`, then add one line to the old one: `Superseded by: NNNN`. That is the only
  edit ever permitted on an existing record. Rewriting is how the reasoning gets lost.
- **Half a page.** Longer records do not get written; unwritten records teach nothing.
- **Quote the evidence.** If a decision rests on someone's terms of service, a benchmark or a
  measurement, quote it rather than summarising from memory. A record whose reasoning cannot be
  checked is just an opinion with a number on it.
- **Record reversals honestly**, including ones where the AI's own earlier recommendation was wrong.
  Those are the most valuable entries in the folder.
