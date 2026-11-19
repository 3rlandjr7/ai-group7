# Building your part (no coding needed)

You have two jobs: **one component** of the app, and **two purchase cards** of research.
You'll build both in free Claude (claude.ai), then send them to [lead] or [co-integrator], who
adds them to the site. You don't need GitHub.

---

## Job 1 — your component

A component is one self-contained block of the page. Yours is:

> **[hero tile / comparison table / price table / share box — lead fills this in]**

### Start a new chat in Claude and paste this

> Build one component of a web app as a single HTML snippet with its CSS in a `<style>` tag.
> Make it an artifact.
>
> Component: **[your component]**
> What it shows: **[lead fills in — see docs/PLAN.md for your feature's Definition of Done]**
>
> Colors: background [#fff], text [#1d1d1f], main [#2f5bea], accent [#f2a541] [lead fills in final colors]
> Font: [font name]
>
> Rules: no page header, footer or navigation menu — just this one block. No JavaScript.
> No external libraries. Must look good on a phone (375px wide). Use made-up sample values so
> I can see it filled in.
>
> Before you build, ask me up to 3 questions and list anything you're assuming.

### Then

Keep asking for changes until you like it — "make the heading bigger", "put the price on its own
line". Check it against your feature's **Definition of Done** in `docs/PLAN.md`; [lead] will
share it.

**Use sample values, not real data.** [lead] wires your block up to real data afterwards. Your job
is how it looks and reads, not where the numbers come from.

---

## Job 2 — your two purchase cards

Each card is research on one product someone might buy. Pick up your two from [lead].

In a **new** Claude chat, research your product and fill in the template [lead] sends you. What
each card needs:

- **At least 3 sources**, each labelled by how much to trust it:
  - *Most credible:* CPSC, Consumer Reports, RTINGS, Wirecutter
  - *Fair:* manufacturer pages, established retailers
  - *Low:* forums, Reddit, Trustpilot — usable, but say so
- **2–3 finalists**, with one line on why each made the cut
- **Prices** — where, how much, and **the date you checked**
- **One-line pick**: "Choose X if… / Choose Y if…"

**Never guess.** If a spec isn't published, write "Not published". If a price isn't listed, write
"Not shown". A made-up number is worse than a gap.

---

## Send it in

Message [integrator] in [group chat] with:

- your component's code (copy the artifact, or send its share link)
- your two filled-in card templates
- any images — the actual files, and where they came from

## Please don't

- change the colours or fonts — ask [lead] if you want different ones
- build a whole page — just your one block
- add JavaScript — [lead] handles anything that moves

## Deadline

Send your first version by **[date]**.

---

**You'll be asked to explain your own work at grading.** So when Claude gives you something you
don't understand, ask it "explain this like I'll have to defend it" until you do. That matters
more than it looking perfect.
