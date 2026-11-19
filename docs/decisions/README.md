# Decision records

One file per decision. Short. Never rewritten.

## Why this exists

`DEVBOOK.md` records *what* we built and *why*, one entry per feature. `BUGLOG.md` records what
broke and how we proved the fix. Neither holds the **deliberation** — the options we considered and
rejected, and the reason we rejected them.

That reasoning is the part that gets lost. Six months later the code says what we did; only these
files say what we chose *against*, and why. They also answer the question an instructor or a new
teammate actually asks: "why is it built this way?"

## The rules

1. **One decision per file.** `NNNN-short-slug.md`, numbered in the order decided. One file per
   decision means two people writing records at once never conflict — the same reason each website
   section and each purchase card lives in its own file.
2. **Never edit a record after it is merged.** If the decision changes, write a **new** record and
   add `Supersedes: 0003` to it. Then add one line to the old one: `Superseded by: 0007`. That is
   the only edit ever allowed. Rewriting history is how the reasoning disappears.
3. **Keep it to half a page.** A record nobody reads is worthless, and a record too long to write
   never gets written.
4. **Record the rejected options with their real reason.** "We chose X" is not a decision record.
   "We chose X because Y failed on Z" is.

## The sections

```markdown
# NNNN — Title

- **Date:** YYYY-MM-DD
- **Status:** Accepted | Superseded by NNNN
- **Decided by:** who

## Context
What forced a choice. The constraint, not the wish.

## Options considered
| Option | Verdict | Why |

## Decision
What we are doing, in one or two sentences.

## Consequences
What this makes easy, what it makes hard, and what we gave up.
```

## When to write one — and when not to

Write a record when **an option was considered and rejected**. That is the whole test.

| What happened | Where it goes |
|---|---|
| An option was considered and rejected | a new record here |
| Features, Definition of Done or scope changed | edit `docs/PLAN.md` |
| An assumption was confirmed or disproved | update its row in `docs/PLAN.md` §6 |
| A feature shipped | `DEVBOOK.md` entry |
| Something broke | `BUGLOG.md` entry |

**Do not write a record for:** renames, formatting, copy tweaks, dependency bumps with no change in
behaviour, or any change where you cannot name what the record would say. A folder full of
"renamed a variable" buries the records that matter.

Run `/decide` and it will write one from the conversation — and refuse if nothing was rejected.
