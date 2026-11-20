# Building your part (no coding needed)

Your job is **two purchase cards** of research — the part of the app that cannot be
generated, because it is judgement about what to buy and why.

You'll do it in free Claude (claude.ai), then send it to Camila, who adds it to the site.
You don't need GitHub, and you don't need to write any code.

> **Changed at the kickoff:** teammates used to build a UI component each as well. We dropped
> that — Avery plans the page and Camila builds it in Claude Code. If you were told you own the
> card tile or the price table, you no longer do. See `docs/decisions/0007`.

---

## Your two purchase cards

Each card is research on one product someone might buy. The team splits the nine products
between the four of you — two each, with one done together as a worked example.

In a **new** Claude chat, paste the whole of **`prompts/product-research.md`** — the shared
research template, which Rene will send you. Everyone uses the same one, so eight cards come
back comparable instead of eight different shapes.

Do the steps in this order — it matters, and here's why.

### Step 1 — find the sources first, before any shopping

- **At least 3 sources**, each labelled by how much to trust it, **and when it was published**:
  - *Most credible:* CPSC, Consumer Reports, RTINGS, Wirecutter
  - *Fair:* manufacturer pages, established retailers
  - *Low:* forums, Reddit, Trustpilot — usable, but say so
- If a source doesn't show a date, write "not stated". Don't guess one.

A great review from 2019 may be out of date. Tier and date get read together.

### Step 2 — pick your 2–3 finalists **from those sources**

Not from browsing shops. This order is deliberate: we can only pull live prices from certain
stores, so if you choose finalists by what you found while shopping, you'd quietly favour whatever
happens to be easy for us to price. Letting the reviews pick the finalists keeps that out.

One line on why each made the cut.

### Step 3 — say where to buy each one

Just the stores. **Don't record prices** — the site fetches those automatically and keeps them
current. Your research doesn't go stale; prices would.

### Step 4 — write the "choose X if…" lines

This is the part that takes thought. Each one must be answerable by someone who **doesn't already
know the subject** — because not knowing is why they're reading.

| Works | Fails review |
|---|---|
| "if you shave more than twice a week" | "if you want milder blade exposure" |
| "if a 30-inch space fits" | "if you value build quality" |
| "if you're buying for a teenager" | "if you prefer premium materials" |

The left column asks about *the reader*. The right column asks them to already know the answer.

If the products genuinely don't differ in a way a normal person can answer, say so and give a
default: **"if you don't know which, get X."** That's more useful than a made-up distinction.

**Don't pick a single winner.** "Leaf Two is best" goes out of date the moment prices move. Your
`choose X if…` lines don't.

**Never guess.** If a spec isn't published, write "Not published". If something isn't listed, write
"Not shown". A made-up number is worse than a gap.

---

## Send it in

Message Camila in [group chat] with:

- your two filled-in card templates — the whole of what Claude gave you, not a summary
- any images — the actual files, and where they came from

## Please don't

- record prices — the site fetches those itself, and yours would be stale within a day
- pick a single winner — write `choose X if…` lines instead
- fill a gap with a guess — "Not published" is a real answer, an invented number is not
- skip the template and freestyle a chat — then nobody's cards match

---

**You'll be asked to explain your own work at grading.** So when Claude gives you something you
don't understand, ask it "explain this like I'll have to defend it" until you do. That matters
more than it looking perfect.
