# Building your part (no coding needed)

You have two jobs: **one component** of the app, and **two purchase cards** of research.
You'll build both in free Claude (claude.ai), then send them to Rene or Camila, who
adds them to the site. You don't need GitHub.

---

## Job 1 — your component

A component is one self-contained block of the page. Yours is:

> **[the team picks who takes which: purchase card tile · comparison table · price table · share box]**

### Start a new chat in Claude and paste this

> Build one component of a web app as a single HTML snippet with its CSS in a `<style>` tag.
> Make it an artifact.
>
> Component: **[your component]**
> What it shows: **[lead fills in — see docs/PLAN.md for your feature's Definition of Done]**
>
> Colors: background #fbfaf8, text #1b1d1f, main #1f6f5c, accent #a85a2b
> Font: the browser default system font — don't load a web font
>
> Rules: no page header, footer or navigation menu — just this one block. No JavaScript.
> No external libraries. Must look good on a phone (375px wide). Use made-up sample values so
> I can see it filled in.
>
> Before you build, ask me up to 3 questions and list anything you're assuming.

### Then

Keep asking for changes until you like it — "make the heading bigger", "put the price on its own
line". Check it against your feature's **Definition of Done** in `docs/PLAN.md`; Rene will
share it.

**Use sample values, not real data.** Rene wires your block up to real data afterwards. Your job
is how it looks and reads, not where the numbers come from.

---

## Job 2 — your two purchase cards

Each card is research on one product someone might buy. Two each, with one done together as a
worked example. There's a suggested list in `docs/BRIEF.md`, but it's only a suggestion — pick
anything you'd actually buy.

In a **new** Claude chat, use the research prompt template Rene sends you. Do the steps in
this order — it matters, and here's why.

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

Send Rene or Camila:

- your component's code (copy the artifact, or send its share link)
- your two filled-in card templates
- any images — the actual files, and where they came from

## Please don't

- change the colours or fonts — ask Rene if you want different ones
- build a whole page — just your one block
- add JavaScript — Rene handles anything that moves

---

**You'll be asked to explain your own work at grading.** So when Claude gives you something you
don't understand, ask it "explain this like I'll have to defend it" until you do. That matters
more than it looking perfect.
