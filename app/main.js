// Boots the data layer and reports what loaded.
//
// This is deliberately minimal. F2 only has to prove that cards load, that a malformed card is
// rejected loudly rather than silently, and that one bad file does not blank the page. The real
// dashboard (brief section G) replaces this block in F7.

import { FakeStore } from './store.js';

const store = new FakeStore();

function render(el, { cards, problems }) {
  const lines = [];
  lines.push(`<p class="data-ok"><strong>${cards.length}</strong> card${cards.length === 1 ? '' : 's'} loaded and valid.</p>`);
  if (problems.length) {
    lines.push('<div class="data-problems"><p><strong>Some cards could not be loaded:</strong></p>');
    for (const p of problems) {
      const items = p.errors.map(e => `<li>${escapeHtml(e)}</li>`).join('');
      lines.push(`<p><code>${escapeHtml(p.path)}</code></p><ul>${items}</ul>`);
    }
    lines.push('<p>The rest of the page still works. Fix the file above and reload.</p></div>');
  }
  el.innerHTML = lines.join('');
}

// Card data is hand-written and may contain anything, so never interpolate it raw.
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const mount = document.getElementById('app-status');
if (mount) {
  store.listCards()
    .then(result => render(mount, result))
    // A failure here means the manifest itself is missing or broken. Say so on screen: a silent
    // catch is what produces the blank page this feature exists to prevent.
    .catch(err => {
      mount.innerHTML = `<div class="data-problems"><p><strong>Could not load any cards.</strong></p><p><code>${escapeHtml(err.message)}</code></p></div>`;
    });
}
