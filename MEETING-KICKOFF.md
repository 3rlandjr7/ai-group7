# Group 7 — kickoff meeting

**Goal of tonight:** everyone leaves knowing exactly what they're building and can start
immediately. Should take about 40 minutes.

---

## What we're building

**Shortlist** — a web app for people buying things like appliances, tools and electronics, who want
real research instead of SEO listicles and affiliate blogs.

Each thing you're shopping for is a **card**. The card holds: where the information came from and
how much to trust it, the 2–3 products worth considering, and a live price table showing where it's
cheapest today.

The prices update themselves automatically. The research is ours.

**You don't need to know how to code.** Four of the six of us won't write any.

---

## What tonight has to decide

Four things. Everything else is already done.

| # | Decision |
|---|---|
| 1 | Is **Shortlist** the right name? (we can change it) |
| 2 | ~~Who is the **co-integrator**~~ — **settled: Camila** |
| 3 | ~~Who takes each of the four components~~ — **dropped.** Avery plans the build, Camila implements it in Claude Code (`docs/decisions/0007`) |
| 4 | Who researches which **two products** — the one still open |
| 5 | Where we send work to each other (group chat) |

---

## Agenda

**1. What it is and why — 10 min**
Walk through the app. Open the repo and look at the live page.

**2. The job — 5 min**
Everyone who isn't the lead, the co-integrator or the planner does one thing:
- research **two products**, one purchase card each

Building a component each was the old plan; it was dropped here — see `docs/decisions/0007`.

**3. Pick products — 5 min**
Two each. The list in `docs/BRIEF.md` §10 is an example, not a menu — pick something you would
actually buy.

| Component | What it is |
|---|---|
| **Purchase card tile** | The box showing one product you're shopping for, and what stage it's at |
| **Comparison table** | Side-by-side of 2–3 products, with what each costs to own |
| **Price table** | Where to buy, cheapest first, and whether a "sale" is actually a sale |
| **Share box** | The plain-text summary you'd text to someone |

**4. Pick products — 10 min**
Two products each, one done together as a worked example. This list is only a starting
point — swap in anything you'd actually buy:

> fridge · printer/scanner · fireplace tools · acorn picker-upper · OBD2 scanner · safety razor ·
> under-desk footrest · stove drip pans · gaming mouse

Pick things you'd actually buy or already know about. The research is better when you care.
Already taken: **gaming keyboard — Bryce**.

**5. Questions and logistics — 10 min**
When to check in, who to ask when stuck.

---

## What you leave with

- Your two products
- `prompts/product-research.md` — the shared research template everyone uses
- `TEAMMATE-GUIDE.md` — step-by-step for the research job
- The colours to use (already in the guide; please don't change them)

---

## Two things that will save us pain

**Build only your own piece.** Not the whole page. Everyone's work lives in its own file, so nobody
can break anyone else's — but only if you stay in your own.

**Research the sources before you look at shops.** Find who's tested the product first — Consumer
Reports, RTINGS, Wirecutter — and let *them* tell you which 2–3 products are worth considering.
Then find where to buy those.

Doing it the other way round means we end up recommending whatever happens to be easy to find,
rather than what's actually good. The guide explains this in more detail.

---

## For the record

You'll each be asked to **explain your own work** at grading. So when Claude hands you something you
don't follow, ask it *"explain this like I'll have to defend it"* until you do. That matters more
than it looking perfect.

Everything about the project — what it does, why it's built this way, what's still undecided —
is in the repo: `docs/PLAN.md`, `docs/decisions/`, `DEVBOOK.md`.
