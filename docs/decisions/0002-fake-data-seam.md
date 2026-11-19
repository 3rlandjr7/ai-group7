# 0002 — Put a seam at the data and AI boundaries

- **Date:** 2026-11-19
- **Status:** Accepted
- **Decided by:** Rene (lead)

## Context

Decision 0001 committed us to building the real app front end on committed data. That raises an
obvious risk: if the UI reads committed JSON files directly, then swapping in Supabase and the
Claude API later means rewriting the UI. The group demo would become throwaway work, which is the
opposite of what 0001 set out to achieve.

Two boundaries are where the cost and the secrets live: **where data comes from**, and **where AI
results come from**. Everything else is the same either way.

## Options considered

| Option | Verdict | Why |
|---|---|---|
| UI reads the JSON files directly | Rejected | Simplest now, but every component would need rewriting when the real backend arrives |
| Build against Supabase from the start | Rejected | Needs keys, a project, and spend — and 0001 ruled out a backend for the group demo |
| **Interface at both boundaries, fake implementations behind it** | **Accepted** | The UI is written once and never learns which implementation is behind it |

## Decision

Define two interfaces and two implementations of each:

| Boundary | Group demo (now, $0) | MS project (later) |
|---|---|---|
| Data | `FakeStore` — committed files + `localStorage` for edits | `SupabaseStore` — Postgres + RLS |
| AI | `CannedResearch` — reads committed JSON | `ClaudeResearch` — server endpoint with web fetch |

Same method signatures on both sides. The UI calls the interface, never the implementation.

## Consequences

**Makes easy.** Swapping backends later is a one-line change at boot, not a rewrite. And there is a
second payoff that was not the original motive: the committed JSON **is** the schema. The brief §7
requires AI output to be *"structured data (JSON with a defined schema) … validate it before
saving"*, and §13 requires tests for *"AI JSON validation"*. The files the teammates produce become
exactly those schema fixtures and those test inputs.

**Makes hard.** Slightly more structure than a beginner would write unprompted, and `app/schema.js`
must validate every file on load or a malformed file produces a blank screen instead of an error.

**Gave up.** Nothing material. The indirection costs a few dozen lines.
