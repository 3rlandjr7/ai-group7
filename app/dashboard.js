// The dashboard: every purchase card grouped under its stage (F7, brief section G).
//
// Why this replaces the F2 status line: F2 only had to prove cards load. The reader's actual
// question is "what am I shopping for, and where has each one got to" — which is a grouping, not
// a count. The count stays, inside each stage heading, because that is where it means something.
//
// Deliberately NOT a card tile. F3 is a teammate's component and owns how one card looks; this
// renders a plain entry per card and leaves room for that tile to drop in later. Building a
// handsome tile here would mean throwing one of them away.

import { STAGES } from './schema.js';

// Stage ids are kebab-case in the data; headings are for humans.
const STAGE_LABELS = {
  'idea': 'Idea',
  'researching': 'Researching',
  'shortlisted': 'Shortlisted',
  'decided': 'Decided',
  'watching': 'Watching the price',
  'bought': 'Bought',
  'return-window': 'In the return window',
  'owned': 'Owned',
  'closed': 'Closed',
};

// Card data is hand-written and may contain anything, so never interpolate it raw.
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/** One card's entry. Kept plain on purpose — see the note at the top about F3. */
function renderCard(card) {
  const finalists = Array.isArray(card.finalists) ? card.finalists : [];
  // A card with no fetchable price is the normal case for big-box-only shortlists (decision
  // 0003), so the dashboard says so plainly rather than leaving an empty-looking entry.
  const priced = Array.isArray(card.prices) && card.prices.length;
  return `
    <li class="dash-card">
      <h4>${escapeHtml(card.title)}</h4>
      <p class="dash-meta">
        ${finalists.length} finalist${finalists.length === 1 ? '' : 's'}
        · researched ${escapeHtml(card.researched_on)}
        ${card.owner ? `· ${escapeHtml(card.owner)}` : ''}
      </p>
      <ul class="dash-finalists">
        ${finalists.map(f => `<li>${escapeHtml(f.name)}</li>`).join('')}
      </ul>
      <p class="dash-price-note">${priced ? `${card.prices.length} price row${card.prices.length === 1 ? '' : 's'}` : 'No prices shown — these stores are linked, not priced'}</p>
    </li>`;
}

/** One stage, heading plus its cards. Returns '' for an empty stage so it is skipped entirely. */
function renderStage(stage, cards) {
  if (!cards.length) return '';
  return `
    <section class="dash-stage" aria-labelledby="stage-${stage}">
      <h3 id="stage-${stage}">${escapeHtml(STAGE_LABELS[stage] || stage)} <span class="dash-count">${cards.length}</span></h3>
      <ul class="dash-cards">${cards.map(renderCard).join('')}</ul>
    </section>`;
}

/** Problems kept from F2 verbatim: a broken card must stay loud, not vanish into the dashboard. */
function renderProblems(problems) {
  if (!problems.length) return '';
  const blocks = problems.map(p =>
    `<p><code>${escapeHtml(p.path)}</code></p><ul>${p.errors.map(e => `<li>${escapeHtml(e)}</li>`).join('')}</ul>`
  ).join('');
  return `<div class="data-problems"><p><strong>Some cards could not be loaded:</strong></p>${blocks}<p>The rest of the page still works. Fix the file above and reload.</p></div>`;
}

export function renderDashboard(el, { cards, problems }) {
  if (!cards.length && !problems.length) {
    el.innerHTML = `<h2>Your purchases</h2><p class="data-ok">No cards yet. Add one to <code>data/cards/</code> and name it in <code>index.json</code>.</p>`;
    return;
  }
  // Iterate STAGES, not the data, so the stages always read in life-cycle order regardless of
  // what order the manifest happens to list cards in.
  const byStage = cards.reduce((acc, c) => { (acc[c.stage] ||= []).push(c); return acc; }, {});
  const stages = STAGES.map(s => renderStage(s, byStage[s] || [])).join('');
  el.innerHTML = `
    <h2>Your purchases</h2>
    <p class="data-ok">${cards.length} card${cards.length === 1 ? '' : 's'} loaded and valid.</p>
    ${stages}
    ${renderProblems(problems)}`;
}
