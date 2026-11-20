// Boots the data layer and draws the dashboard.
//
// F2 proved cards load and that a malformed card fails loudly. F7 replaces that bare count with
// the dashboard (brief section G): every card under its stage heading. The error path is
// unchanged on purpose — it is the behaviour F2 exists to guarantee.

import { FakeStore } from './store.js';
import { renderDashboard } from './dashboard.js';

const store = new FakeStore();

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const mount = document.getElementById('dashboard');
if (mount) {
  store.listCards()
    .then(result => renderDashboard(mount, result))
    // A failure here means the manifest itself is missing or broken. Say so on screen: a silent
    // catch is what produces the blank page this feature exists to prevent.
    .catch(err => {
      mount.innerHTML = `<div class="data-problems"><p><strong>Could not load any cards.</strong></p><p><code>${escapeHtml(err.message)}</code></p></div>`;
    });
}
