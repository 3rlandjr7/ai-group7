// Validates every purchase card before the UI sees it.
//
// Why this exists: a card is hand-written (converted from a teammate's Markdown), so it WILL
// sometimes be malformed. Without validation a missing field becomes `undefined` in the page and
// the whole card silently renders blank or half-empty. A loud, readable error beats a blank box.
//
// It also enforces decision 0005: a card stores a human's judgement, never a computed verdict.
// Fields like `winner` or `score` are rejected outright rather than ignored, because accepting
// them quietly would let the design rot back to storing verdicts.

export const TIERS = ['most-credible', 'fair', 'low'];
export const STAGES = ['idea', 'researching', 'shortlisted', 'decided', 'watching',
                       'bought', 'return-window', 'owned', 'closed'];

// Decision 0005 forbids these. Named explicitly so the error can say why.
const FORBIDDEN = {
  winner: 'a stored verdict — see decision 0005, the pick is a "choose X if" branch, not a field',
  best: 'a stored verdict — see decision 0005',
  score: 'scores imply weights, which decision 0005 rejects as pseudo-precision',
  weights: 'decision 0005 rejects weighted scoring',
  rank: 'a stored ranking goes stale the moment prices move — see decision 0005',
};

function fail(errors, path, msg) { errors.push(`${path}: ${msg}`); }

function checkSource(src, i, errors) {
  const p = `sources[${i}]`;
  if (!src.name) fail(errors, p, 'missing name');
  if (!src.tier) fail(errors, p, 'missing tier');
  else if (!TIERS.includes(src.tier)) fail(errors, p, `tier "${src.tier}" is not one of ${TIERS.join(', ')}`);
  // "not stated" is allowed and expected: sites re-date pages for SEO, so we record what the
  // source claims rather than inventing precision (decision 0005).
  if (src.dated === undefined) fail(errors, p, 'missing dated — use "not stated" if the source shows no date');
}

function checkFinalist(f, i, errors) {
  const p = `finalists[${i}]`;
  if (!f.name) fail(errors, p, 'missing name');
  if (!f.why) fail(errors, p, 'missing why — one line on what put it on the shortlist');
  if (!Array.isArray(f.stores)) fail(errors, p, 'missing stores[] — where to buy it; the fetcher needs this');
}

function checkBranch(b, i, errors, finalistNames) {
  const p = `choose_if[${i}]`;
  if (!b.condition) fail(errors, p, 'missing condition');
  if (!b.pick) fail(errors, p, 'missing pick');
  else if (finalistNames.length && !finalistNames.includes(b.pick)) {
    fail(errors, p, `pick "${b.pick}" is not one of the finalists`);
  }
}

/** Returns { ok, errors[] }. Never throws — the caller decides how loudly to complain. */
export function validateCard(card, where = 'card') {
  const errors = [];
  if (!card || typeof card !== 'object') return { ok: false, errors: [`${where}: not an object`] };

  for (const [field, why] of Object.entries(FORBIDDEN)) {
    if (field in card) fail(errors, where, `has "${field}" — ${why}`);
  }

  if (!card.slug) fail(errors, where, 'missing slug');
  if (!card.title) fail(errors, where, 'missing title');
  if (!card.stage) fail(errors, where, 'missing stage');
  else if (!STAGES.includes(card.stage)) fail(errors, where, `stage "${card.stage}" is not one of ${STAGES.join(', ')}`);
  if (!card.researched_on) fail(errors, where, 'missing researched_on — the reader is told when this was done');

  if (!Array.isArray(card.sources) || card.sources.length < 3) {
    fail(errors, where, 'needs at least 3 sources');
  } else card.sources.forEach((s, i) => checkSource(s, i, errors));

  // Brief section 5: if nothing credible has tested this category, say so rather than dressing
  // up low-tier sources as authoritative.
  const hasCredible = (card.sources || []).some(s => s.tier === 'most-credible');
  if (!hasCredible && !card.no_credible_testing) {
    fail(errors, where, 'no most-credible source and no no_credible_testing note explaining that');
  }

  const finalists = Array.isArray(card.finalists) ? card.finalists : [];
  if (finalists.length < 2 || finalists.length > 3) {
    fail(errors, where, `needs 2-3 finalists, found ${finalists.length}`);
  }
  finalists.forEach((f, i) => checkFinalist(f, i, errors));
  const names = finalists.map(f => f.name).filter(Boolean);

  const branches = Array.isArray(card.choose_if) ? card.choose_if : [];
  branches.forEach((b, i) => checkBranch(b, i, errors, names));
  // Either the reader can tell the finalists apart, or we admit they can't and name a default.
  // Decision 0005: a forced "if you..." produces a fake discriminator, which is worse than none.
  if (!branches.length && !card.default_pick) {
    fail(errors, where, 'needs choose_if branches, or a default_pick when no reader-fact discriminator exists');
  }
  return { ok: errors.length === 0, errors };
}
