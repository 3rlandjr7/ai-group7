// Where card data comes from.
//
// Decision 0002 puts a seam here: the UI calls DataStore and never learns what is behind it.
// Today that is FakeStore, reading files committed to the repo. Later the same interface is
// implemented by Supabase, and no component changes.
//
// Why a manifest instead of listing the directory: GitHub Pages serves files, it cannot list a
// folder. So something has to name the cards. `data/cards/index.json` is that something.
// Trade-off, recorded rather than hidden: it is the one shared file every new card touches, which
// is a merge-conflict risk the per-card files were designed to avoid. It stays because the
// alternatives are worse - hardcoding slugs in index.html hands every card addition to the lead,
// and guessing filenames fails silently. Conflicts here are one-line and trivial to resolve.

import { validateCard } from './schema.js';

export class DataStore {
  async listCards() { throw new Error('not implemented'); }
  async getCard(slug) { throw new Error('not implemented'); }
}

export class FakeStore extends DataStore {
  constructor(base = 'data/cards') { super(); this.base = base; this._cache = null; }

  async _fetchJson(path) {
    const res = await fetch(path, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`${path} returned HTTP ${res.status}`);
    try { return await res.json(); }
    catch (e) { throw new Error(`${path} is not valid JSON (${e.message})`); }
  }

  /**
   * Loads every card named in the manifest.
   * One bad card must not blank the page, so failures are collected and returned alongside the
   * good cards rather than thrown. The caller renders both.
   */
  async listCards() {
    if (this._cache) return this._cache;
    const manifest = await this._fetchJson(`${this.base}/index.json`);
    const slugs = Array.isArray(manifest.cards) ? manifest.cards : [];
    const cards = [], problems = [];

    for (const slug of slugs) {
      const path = `${this.base}/${slug}.json`;
      try {
        const card = await this._fetchJson(path);
        const { ok, errors } = validateCard(card, slug);
        if (ok) cards.push(card);
        else problems.push({ slug, path, errors });
      } catch (e) {
        problems.push({ slug, path, errors: [e.message] });
      }
    }
    this._cache = { cards, problems };
    return this._cache;
  }

  async getCard(slug) {
    const { cards } = await this.listCards();
    return cards.find(c => c.slug === slug) || null;
  }

  /**
   * Prices for one card, or null if it has never been fetched.
   * A missing file is NOT an error - every new card has one until the next scheduled run, and
   * treating that as a failure would break the page for exactly the cards people just added.
   */
  async getPrices(slug) {
    try { return await this._fetchJson(`data/prices/${slug}.json`); }
    catch { return null; }
  }

  /** Cards grouped by stage, for the dashboard (brief section G). */
  async byStage() {
    const { cards } = await this.listCards();
    return cards.reduce((acc, c) => { (acc[c.stage] ||= []).push(c); return acc; }, {});
  }
}
