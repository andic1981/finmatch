/**
 * FinMatch România — Cloudflare Worker v2.1
 */

const HTML = `<!DOCTYPE html>
<html lang="ro">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FinMatch România — Motor de căutare finanțări</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #f4f9f8;
  --surface: #ffffff;
  --surface2: #ecf4f3;
  --ink: #1f2a28;
  --ink2: #5a6764;
  --ink3: #9aa8a4;
  --accent: #17a06a;
  --accent-light: #dcf5ea;
  --accent-dark: #0f7d51;
  --sky: #2ea6d8;
  --sky-light: #e0f2fb;
  --accent2: #2ea6d8;
  --accent2-light: #e0f2fb;
  --warn: #e0952e;
  --warn-light: #fdf3e2;
  --border: rgba(31,42,40,0.10);
  --border2: rgba(31,42,40,0.05);
  --radius: 14px;
  --radius-lg: 22px;
  --font-head: 'Space Grotesk', 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --shadow: 0 3px 8px rgba(23,120,90,0.06), 0 16px 40px rgba(23,120,90,0.10);
  --shadow-sm: 0 1px 3px rgba(23,120,90,0.05), 0 4px 12px rgba(23,120,90,0.06);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font-body);
  background: linear-gradient(180deg, #eef7f9 0%, var(--bg) 340px, var(--bg) 100%);
  color: var(--ink);
  font-size: 14px;
  line-height: 1.6;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }
button { font-family: var(--font-body); }

/* ── NAV ── */
nav {
  background: rgba(247,246,241,0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 54px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-family: var(--font-head);
  font-weight: 700;
  font-size: 17px;
  letter-spacing: -0.4px;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  cursor: pointer;
}

.logo-dot {
  width: 22px; height: 22px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--sky) 100%);
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
}
.logo-dot::after {
  content: '';
  width: 8px; height: 8px;
  border: 2px solid #fff;
  border-radius: 50%;
  border-right-color: transparent;
  transform: rotate(-45deg);
}

.nav-links {
  display: flex;
  gap: 2px;
  list-style: none;
  margin-left: auto;
  align-items: center;
}

.nav-links a {
  font-size: 13px;
  color: var(--ink2);
  padding: 5px 12px;
  border-radius: 7px;
  font-weight: 400;
  transition: background 0.15s, color 0.15s;
  cursor: pointer;
  display: block;
}
.nav-links a:hover { background: var(--surface2); color: var(--ink); }
.nav-links a.active { background: var(--surface2); color: var(--ink); font-weight: 500; }

.nav-cta {
  background: var(--accent) !important;
  color: #fff !important;
  font-weight: 500 !important;
  margin-left: 6px;
}
.nav-cta:hover { background: var(--accent-dark) !important; }

/* ── HERO ── */
.hero {
  padding: 4.75rem 2rem 3.25rem;
  max-width: 840px;
  margin: 0 auto;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent-light);
  color: var(--accent);
  font-size: 12px;
  font-weight: 500;
  padding: 5px 14px;
  border-radius: 100px;
  margin-bottom: 1.75rem;
  border: 1px solid rgba(26,92,56,0.16);
  letter-spacing: 0.1px;
}

.hero h1 {
  font-family: var(--font-head);
  font-size: clamp(1.9rem, 4.2vw, 2.9rem);
  font-weight: 700;
  line-height: 1.07;
  letter-spacing: -1px;
  margin-bottom: 1.25rem;
}
.hero h1 em { font-style: normal; color: var(--accent); background: linear-gradient(120deg, transparent 60%, var(--sky-light) 60%); padding: 0 2px; }

.hero > p {
  font-size: 16px;
  color: var(--ink2);
  max-width: 520px;
  margin: 0 auto 2.75rem;
  font-weight: 300;
  line-height: 1.75;
}

/* ── SEARCH ── */
.search-wrap { max-width: 660px; margin: 0 auto 1.25rem; }

.search-bar {
  display: flex;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.search-bar:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(26,92,56,0.10), var(--shadow);
}

.search-icon {
  padding: 0 13px 0 18px;
  display: flex;
  align-items: center;
  color: var(--ink3);
  flex-shrink: 0;
}

.search-bar input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--ink);
  padding: 14px 0;
  min-width: 0;
}
.search-bar input::placeholder { color: var(--ink3); font-weight: 300; }

.search-btn {
  margin: 5px;
  padding: 9px 22px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
  color: #fff;
  border: none;
  border-radius: 13px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;
}
.search-btn:hover { background: var(--accent-dark); }

.quick-searches {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  justify-content: center;
  margin-bottom: 3.25rem;
}

.quick-tag {
  font-size: 12px;
  color: var(--ink2);
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 5px 13px;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.15s;
  box-shadow: var(--shadow-sm);
}
.quick-tag:hover {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}

/* ── STATS ROW ── */
.stats-row {
  display: flex;
  justify-content: center;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  max-width: 580px;
  margin: 0 auto;
  box-shadow: var(--shadow-sm);
}

.stat { flex: 1; text-align: center; padding: 1rem 1.1rem; background: var(--surface); }

.stat-num {
  font-family: var(--font-head);
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label { font-size: 11px; color: var(--ink3); letter-spacing: 0.2px; }

/* ── MAIN LAYOUT ── */
.main {
  max-width: 1140px;
  margin: 2rem auto 0;
  padding: 0 2rem 5rem;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
  align-items: start;
}

/* ── FILTERS ── */
.filters-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.125rem 1.25rem;
  position: sticky;
  top: 70px;
  box-shadow: var(--shadow-sm);
}

.filters-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 600;
  color: var(--ink2);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 1rem;
}

.filters-title button {
  font-size: 11px;
  color: var(--accent);
  background: none;
  border: none;
  cursor: pointer;
  text-transform: none;
  letter-spacing: 0;
  padding: 2px 7px;
  border-radius: 5px;
  transition: background 0.12s;
  font-weight: 500;
}
.filters-title button:hover { background: var(--accent-light); }

.filter-section { margin-bottom: 0.5rem; }

.filter-label {
  font-size: 10px;
  font-weight: 600;
  color: var(--ink3);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.7px;
}

.filter-chips { display: flex; flex-wrap: wrap; gap: 5px; }

.chip {
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 100px;
  border: 1px solid var(--border);
  color: var(--ink2);
  cursor: pointer;
  background: transparent;
  transition: all 0.12s;
  white-space: nowrap;
  line-height: 1.6;
}
.chip:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-light); }
.chip.active { background: var(--accent); color: #fff; border-color: var(--accent); }

.chip-count { opacity: 0.65; font-size: 10px; margin-left: 3px; }

.filter-sep { border: none; border-top: 1px solid var(--border2); margin: 0.9rem 0; }

input[type=range] { width: 100%; accent-color: var(--accent); cursor: pointer; }

.filter-toggle-btn {
  display: none;
  width: 100%;
  padding: 10px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 13px;
  font-weight: 500;
  color: var(--ink);
  cursor: pointer;
  text-align: left;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-sm);
}
.filter-toggle-btn span { color: var(--ink3); font-size: 15px; }

/* ── RESULTS HEADER ── */
.results-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  gap: 12px;
  flex-wrap: wrap;
}

.results-count { font-size: 13px; color: var(--ink2); }
.results-count strong { color: var(--ink); font-weight: 600; }

.sort-select {
  font-family: var(--font-body);
  font-size: 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 6px 10px;
  background: var(--surface);
  color: var(--ink);
  outline: none;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
}

/* ── OPPORTUNITY CARDS ── */
.opp-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.25rem 1.375rem;
  margin-bottom: 10px;
  transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
  cursor: pointer;
  position: relative;
  box-shadow: var(--shadow-sm);
}
.opp-card:hover {
  border-color: rgba(26,92,56,0.28);
  box-shadow: var(--shadow);
  transform: translateY(-1px);
}

.opp-card-top {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 100px;
  white-space: nowrap;
  flex-shrink: 0;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}
.status-badge.active { background: var(--accent-light); color: var(--accent); border: 1px solid rgba(26,92,56,0.2); }
.status-badge.active::before { content: ''; width: 5px; height: 5px; background: var(--accent); border-radius: 50%; }
.status-badge.upcoming { background: var(--warn-light); color: var(--warn); border: 1px solid rgba(169,122,0,0.22); }
.status-badge.closed { background: var(--surface2); color: var(--ink3); border: 1px solid var(--border); }

.source-tier {
  font-size: 10px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: 5px;
  flex-shrink: 0;
  letter-spacing: 0.2px;
  background: var(--surface2);
  color: var(--ink3);
}
.source-tier.tier1 { background: var(--accent-light); color: var(--accent); }

.urgent {
  font-size: 10px;
  font-weight: 500;
  padding: 3px 9px;
  border-radius: 100px;
  flex-shrink: 0;
  background: var(--accent2-light);
  color: var(--accent2);
  border: 1px solid rgba(200,80,13,0.2);
}

.warn {
  font-size: 10px;
  font-weight: 500;
  padding: 3px 9px;
  border-radius: 100px;
  flex-shrink: 0;
  background: var(--warn-light);
  color: var(--warn);
  border: 1px solid rgba(169,122,0,0.2);
}

.opp-title {
  font-family: var(--font-head);
  font-size: 14px;
  font-weight: 700;
  line-height: 1.35;
  flex: 1;
  letter-spacing: -0.2px;
}

.compare-check {
  width: 20px; height: 20px;
  border: 1.5px solid var(--border);
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: transparent;
  transition: all 0.12s;
  flex-shrink: 0;
  margin-top: 1px;
}
.compare-check:hover { border-color: var(--accent); }
.compare-check.checked { background: var(--accent); border-color: var(--accent); color: #fff; }

.opp-summary {
  font-size: 13px;
  color: var(--ink2);
  line-height: 1.62;
  margin-bottom: 10px;
  font-weight: 300;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.opp-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
  margin-bottom: 10px;
}

.meta-tag {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 5px;
  background: var(--surface2);
  color: var(--ink2);
}
.meta-tag.domain { background: var(--sky-light); color: #1c6f95; }
.meta-tag.region { background: var(--accent-light); color: var(--accent); }

.opp-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid var(--border2);
  gap: 12px;
  flex-wrap: wrap;
}

.grant-info { display: flex; align-items: baseline; gap: 5px; flex-wrap: wrap; }

.grant-val {
  font-family: var(--font-head);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.3px;
}

.grant-label { font-size: 11px; color: var(--ink3); }

.opp-actions { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }

.deadline {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--ink3);
  padding: 3px 9px;
  background: var(--surface2);
  border-radius: 100px;
  white-space: nowrap;
}
.deadline.urgent {
  color: var(--accent2);
  background: var(--accent2-light);
  font-weight: 500;
  border: none;
}

.btn-save {
  width: 28px; height: 28px;
  border: 1px solid var(--border);
  border-radius: 7px;
  background: transparent;
  color: var(--ink3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.12s;
  font-size: 13px;
  flex-shrink: 0;
}
.btn-save:hover { border-color: var(--ink); color: var(--ink); }
.btn-save.saved { background: var(--accent-light); border-color: var(--accent); color: var(--accent); }

.btn-detail {
  font-size: 12px;
  font-weight: 500;
  color: var(--accent);
  background: var(--accent-light);
  border: 1px solid rgba(26,92,56,0.2);
  padding: 5px 13px;
  border-radius: 7px;
  cursor: pointer;
  transition: background 0.12s;
  white-space: nowrap;
}
.btn-detail:hover { background: #c9efdd; }

/* ── MODAL ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(25,23,17,0.45);
  z-index: 200;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 24px;
  overflow-y: auto;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}
.modal-overlay.open { opacity: 1; pointer-events: all; }

.modal {
  background: var(--surface);
  border-radius: 18px;
  max-width: 680px;
  width: 100%;
  margin-top: 20px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(25,23,17,0.10), 0 24px 64px rgba(25,23,17,0.14);
  transform: translateY(12px);
  transition: transform 0.2s;
  border: 1px solid var(--border);
}
.modal-overlay.open .modal { transform: translateY(0); }

.modal-header {
  background: var(--surface2);
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 28px;
  height: 28px;
  border: 1px solid var(--border);
  border-radius: 7px;
  background: var(--surface);
  color: var(--ink2);
  cursor: pointer;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.1s;
}
.modal-close:hover { background: var(--bg); }

.modal-body { padding: 1.5rem; }

.modal-section { margin-bottom: 1.375rem; }

.modal-section-title {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--ink3);
  margin-bottom: 0.5rem;
}

.modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

.modal-stat {
  background: var(--surface2);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
}

.modal-stat-val {
  font-family: var(--font-head);
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.2px;
}

.modal-stat-label { font-size: 11px; color: var(--ink3); }

.source-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: var(--accent);
  border: 1px solid rgba(26,92,56,0.2);
  background: var(--accent-light);
  padding: 6px 12px;
  border-radius: var(--radius);
  margin-right: 6px;
  margin-bottom: 6px;
  transition: background 0.1s;
}
.source-link:hover { background: #c9efdd; }

.disclaimer {
  background: var(--warn-light);
  border: 1px solid rgba(169,122,0,0.18);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
  font-size: 12px;
  color: var(--warn);
  margin-top: 1rem;
  line-height: 1.55;
}

/* ── COMPARE ── */
.compare-overlay {
  position: fixed;
  inset: 0;
  background: rgba(25,23,17,0.5);
  z-index: 300;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 24px;
  overflow-y: auto;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
.compare-overlay.open { opacity: 1; pointer-events: all; }

.compare-modal {
  background: var(--surface);
  border-radius: 18px;
  max-width: 960px;
  width: 100%;
  margin-top: 16px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(25,23,17,0.10), 0 24px 64px rgba(25,23,17,0.14);
  border: 1px solid var(--border);
  transform: translateY(10px);
  transition: transform 0.2s;
}
.compare-overlay.open .compare-modal { transform: translateY(0); }

/* ── SOURCE CARDS ── */
.source-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.125rem 1.375rem;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 10px 1fr auto;
  gap: 14px;
  align-items: center;
  box-shadow: var(--shadow-sm);
}

.source-indicator { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.source-indicator.ok { background: var(--accent); box-shadow: 0 0 0 3px var(--accent-light); }
.source-indicator.warn { background: var(--warn); box-shadow: 0 0 0 3px var(--warn-light); }
.source-indicator.err { background: var(--accent2); box-shadow: 0 0 0 3px var(--accent2-light); }

.src-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.src-dot.ok { background: var(--accent); box-shadow: 0 0 0 3px var(--accent-light); }
.src-dot.warn { background: var(--warn); box-shadow: 0 0 0 3px var(--warn-light); }
.src-dot.err { background: var(--accent2); box-shadow: 0 0 0 3px var(--accent2-light); }

/* ── ADMIN ── */
.admin-stat {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.admin-stat-val {
  font-family: var(--font-head);
  font-size: 1.4rem;
  font-weight: 700;
}

.admin-stat-label { font-size: 11px; color: var(--ink3); margin-top: 2px; }

.admin-tab {
  padding: 7px 16px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--ink3);
  cursor: pointer;
  transition: all 0.12s;
  margin-bottom: -1px;
}
.admin-tab:hover { color: var(--ink); }
.admin-tab.active { color: var(--accent); border-bottom-color: var(--accent); font-weight: 500; }

/* ── TOAST ── */
.toast {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  background: var(--ink);
  color: #fff;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 13px;
  z-index: 400;
  transform: translateY(6px);
  opacity: 0;
  transition: all 0.2s;
  pointer-events: none;
  box-shadow: 0 8px 32px rgba(25,23,17,0.25);
  max-width: 300px;
}
.toast.show { opacity: 1; transform: translateY(0); }

/* ── EMPTY STATE ── */
.empty-state { text-align: center; padding: 4rem 2rem; color: var(--ink3); }
.empty-state h3 {
  font-family: var(--font-head);
  font-size: 1.1rem;
  color: var(--ink2);
  margin-bottom: 0.5rem;
  font-weight: 700;
}
.empty-state p { font-size: 13px; font-weight: 300; }

/* ── SKELETON ── */
.skeleton {
  background: linear-gradient(90deg, var(--surface2) 25%, #e5e1d8 50%, var(--surface2) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: var(--radius);
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

/* ── FOOTER ── */
footer {
  background: var(--ink);
  color: rgba(255,255,255,0.35);
  text-align: center;
  padding: 1.5rem 2rem;
  font-size: 12px;
  font-weight: 300;
  line-height: 1.7;
}
footer strong { color: rgba(255,255,255,0.65); font-weight: 500; }

/* ── MOTION PREFERENCES ── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  nav { padding: 0 1rem; overflow-x: auto; }
  .hero { padding: 3rem 1.25rem 2rem; }
  .hero h1 { font-size: 1.8rem; letter-spacing: -0.6px; }
  .hero > p { font-size: 14px; }
  .main { grid-template-columns: 1fr; padding: 0 1rem 3rem; gap: 12px; margin-top: 1rem; }
  .filters-panel { position: static; }
  .filters-body { display: none; }
  .filters-body.open { display: block; }
  .filter-toggle-btn { display: flex; }
  .stats-row { max-width: 100%; flex-wrap: wrap; }
  .stats-row .stat { flex: 1 1 calc(50% - 1px); min-width: 130px; }
  .stat-num { font-size: 1.05rem; }
  .modal-grid { grid-template-columns: 1fr; }
  .source-card { grid-template-columns: 10px 1fr; }
  .nav-links li:nth-child(4), .nav-links li:nth-child(5) { display: none; }
  .opp-summary { -webkit-line-clamp: 3; }
  .opp-footer { flex-direction: column; align-items: flex-start; gap: 8px; }
}
</style>
</head>
<body>

<nav>
  <div class="logo">
    <span class="logo-dot"></span>
    FinMatch
    <span style="color:var(--ink3);font-weight:400;font-size:14px;margin-left:-4px">România</span>
  </div>
  <ul class="nav-links">
    <li><a class="active" onclick="showView('search')">Căutare</a></li>
    <li><a onclick="showView('saved')">Salvate</a></li>
    <li><a onclick="showView('alerts')">Alerte</a></li>
    <li><a onclick="showView('sources')">Surse</a></li>
    <li><a onclick="showView('admin')">Admin</a></li>
    <li><a class="nav-cta" onclick="openWaitlist()">Lista de așteptare</a></li>
  </ul>
</nav>

<div id="view-search">
  <div class="hero">
    <div class="hero-badge">
      <span style="width:6px;height:6px;background:var(--accent);border-radius:50%;display:inline-block;"></span>
      293 oportunități active în 2026
    </div>
    <h1>Găsește finanțarea<br>potrivită pentru tine <em>instant</em></h1>
    <p>Motor inteligent de căutare pentru programe de finanțare din România și UE — surse oficiale, actualizate zilnic.</p>

    <div class="search-wrap">
      <div class="search-bar">
        <div class="search-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </div>
        <input type="text" id="search-input" placeholder="ex: grant digitalizare IMM, fonduri energie..." autocomplete="off">
        <button class="search-btn" onclick="doSearch()">Caută</button>
      </div>
    </div>

    <div class="quick-searches">
      <span class="quick-tag" onclick="setSearch('digitalizare IMM')">Digitalizare IMM</span>
      <span class="quick-tag" onclick="setSearch('startup accelerare vest')">Startup grant</span>
      <span class="quick-tag" onclick="setSearch('energie regenerabilă')">Eficiență energetică</span>
      <span class="quick-tag" onclick="setSearch('agricultură fermier')">Fonduri AFIR</span>
      <span class="quick-tag" onclick="setSearch('incluziune socială ONG')">ONG incluziune</span>
      <span class="quick-tag" onclick="setSearch('infrastructură UAT vest')">UAT Vest</span>
    </div>

    <div class="stats-row">
      <div class="stat">
        <div class="stat-num" id="cnt-active">293</div>
        <div class="stat-label">Active acum</div>
      </div>
      <div class="stat">
        <div class="stat-num">11</div>
        <div class="stat-label">Surse indexate</div>
      </div>
      <div class="stat">
        <div class="stat-num">€4.1B</div>
        <div class="stat-label">Buget total disponibil</div>
      </div>
      <div class="stat">
        <div class="stat-num" id="cnt-today">28</div>
        <div class="stat-label">Actualizări azi</div>
      </div>
    </div>
  </div>

  <div class="main">
    <aside class="filters-panel">
      <button class="filter-toggle-btn" onclick="toggleFilters(this)" id="filter-toggle">
        ≡ Filtre & Sortare
        <span id="filter-arrow">▾</span>
      </button>
      <div class="filters-body" id="filters-body">
      <div class="filters-title">
        Filtre
        <button onclick="resetFilters()">Resetează</button>
      </div>

      <div class="filter-section">
        <div class="filter-label">Status</div>
        <div class="filter-chips">
          <button class="chip active" onclick="toggleChip(this,'status')" data-val="ACTIV">Activ</button>
          <button class="chip" onclick="toggleChip(this,'status')" data-val="URMEAZĂ">Urmează</button>
          <button class="chip" onclick="toggleChip(this,'status')" data-val="ÎNCHIS">Închis</button>
        </div>
      </div>

      <hr class="filter-sep">

      <div class="filter-section">
        <div class="filter-label">Domeniu</div>
        <div class="filter-chips">
          <button class="chip" onclick="toggleChip(this,'domain')" data-val="Digitalizare">Digitalizare</button>
          <button class="chip" onclick="toggleChip(this,'domain')" data-val="Energie">Energie</button>
          <button class="chip" onclick="toggleChip(this,'domain')" data-val="Agricultură">Agricultură</button>
          <button class="chip" onclick="toggleChip(this,'domain')" data-val="Educație">Educație</button>
          <button class="chip" onclick="toggleChip(this,'domain')" data-val="Antreprenoriat">Antreprenoriat</button>
          <button class="chip" onclick="toggleChip(this,'domain')" data-val="Infrastructură">Infrastructură</button>
          <button class="chip" onclick="toggleChip(this,'domain')" data-val="Mediu">Mediu</button>
          <button class="chip" onclick="toggleChip(this,'domain')" data-val="Sănătate">Sănătate</button>
          <button class="chip" onclick="toggleChip(this,'domain')" data-val="Cercetare / inovare">Cercetare</button>
          <button class="chip" onclick="toggleChip(this,'domain')" data-val="Incluziune socială">Incluziune</button>
          <button class="chip" onclick="toggleChip(this,'domain')" data-val="Cultură">Cultură</button>
          <button class="chip" onclick="toggleChip(this,'domain')" data-val="Turism">Turism</button>
        </div>
      </div>

      <hr class="filter-sep">

      <div class="filter-section">
        <div class="filter-label">Tip beneficiar</div>
        <div class="filter-chips">
          <button class="chip" onclick="toggleChip(this,'beneficiary')" data-val="IMM">IMM</button>
          <button class="chip" onclick="toggleChip(this,'beneficiary')" data-val="Startup">Startup</button>
          <button class="chip" onclick="toggleChip(this,'beneficiary')" data-val="ONG">ONG</button>
          <button class="chip" onclick="toggleChip(this,'beneficiary')" data-val="UAT">UAT</button>
          <button class="chip" onclick="toggleChip(this,'beneficiary')" data-val="Fermier">Fermier</button>
          <button class="chip" onclick="toggleChip(this,'beneficiary')" data-val="Universitate">Universitate</button>
        </div>
      </div>

      <hr class="filter-sep">

      <div class="filter-section">
        <div class="filter-label">Regiune</div>
        <div class="filter-chips">
          <button class="chip" onclick="toggleChip(this,'region')" data-val="Vest">Vest</button>
          <button class="chip" onclick="toggleChip(this,'region')" data-val="Nord-Vest">Nord-Vest</button>
          <button class="chip" onclick="toggleChip(this,'region')" data-val="Nord-Est">Nord-Est</button>
          <button class="chip" onclick="toggleChip(this,'region')" data-val="Centru">Centru</button>
          <button class="chip" onclick="toggleChip(this,'region')" data-val="București-Ilfov">Buc-Ilfov</button>
          <button class="chip" onclick="toggleChip(this,'region')" data-val="Național">Național</button>
        </div>
      </div>

      <hr class="filter-sep">

      <div class="filter-section">
        <div class="filter-label">Grant maxim (€)</div>
        <div style="padding:4px 2px;">
          <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--ink3);margin-bottom:6px;">
            <span>€0</span>
            <span id="grant-val-display">Orice</span>
          </div>
          <input type="range" id="grant-filter" min="0" max="50000000" step="50000" value="50000000"
            style="width:100%;accent-color:var(--accent);"
            oninput="updateGrantFilter(this.value)">
          <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--ink3);margin-top:4px;">
            <span>0</span><span>500K</span><span>5M</span><span>50M+</span>
          </div>
        </div>
      </div>

      <hr class="filter-sep">

      <div class="filter-section">
        <div class="filter-label">Sursă</div>
        <div class="filter-chips">
          <button class="chip" onclick="toggleChip(this,'source')" data-val="Oficială">Oficială</button>
          <button class="chip" onclick="toggleChip(this,'source')" data-val="Editorială">Editorială</button>
        </div>
      </div>
      </div>
    </aside>

    <main>
      <div class="results-header">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <div class="results-count"><strong id="results-count">0</strong> rezultate</div>
          <div id="compare-bar" style="display:none;align-items:center;gap:8px;">
            <span style="font-size:12px;color:var(--ink2);">Comparare: <strong id="compare-count">0</strong>/3</span>
            <button onclick="openCompare()" style="font-size:11px;background:var(--accent);color:white;border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-family:var(--font-body);">Compară →</button>
            <button onclick="clearCompare()" style="font-size:11px;background:var(--surface2);border:1px solid var(--border);color:var(--ink2);padding:4px 8px;border-radius:6px;cursor:pointer;font-family:var(--font-body);">×</button>
          </div>
        </div>
        <select class="sort-select" id="sort-select" onchange="renderResults()">
          <option value="relevance">Relevanță</option>
          <option value="deadline">Termen limită</option>
          <option value="grant_desc">Grant maxim ↓</option>
          <option value="newest">Cele mai noi</option>
        </select>
      </div>
      <div id="results-list"></div>
    </main>
  </div>
</div>

<div id="view-saved" style="display:none;max-width:800px;margin:3rem auto;padding:0 2rem;">
  <h2 style="font-family:var(--font-head);font-size:1.4rem;font-weight:700;margin-bottom:2rem;letter-spacing:-0.5px">Oportunități salvate</h2>
  <div id="saved-list"></div>
</div>

<div id="view-alerts" style="display:none;max-width:800px;margin:3rem auto;padding:0 2rem;">
  <h2 style="font-family:var(--font-head);font-size:1.4rem;font-weight:700;margin-bottom:1rem;letter-spacing:-0.5px">Alerte & căutări salvate</h2>
  <p style="color:var(--ink2);font-size:14px;margin-bottom:2rem;font-weight:300;">Vei fi notificat când apar oportunități noi pentru criteriile salvate.</p>

  <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;margin-bottom:12px;">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:1rem;">
      <input type="text" id="alert-query" placeholder="Cuvinte cheie..." style="flex:1;padding:8px 12px;border:1px solid var(--border);border-radius:8px;font-family:var(--font-body);font-size:14px;outline:none;background:var(--surface);">
      <button onclick="saveAlert()" style="background:var(--accent);color:white;border:none;padding:9px 18px;border-radius:8px;font-family:var(--font-body);font-size:13px;font-weight:500;cursor:pointer;">+ Adaugă alertă</button>
    </div>
    <p style="font-size:12px;color:var(--ink3);font-weight:300;">Notificări prin email când sunt detectate oportunități noi pentru această căutare.</p>
  </div>

  <div id="alerts-list"></div>
</div>

<!-- SOURCES VIEW -->
<div id="view-sources" style="display:none;max-width:960px;margin:0 auto;padding:2rem 2rem 4rem;">
  <div style="margin-bottom:2rem;">
    <h2 style="font-family:var(--font-head);font-size:1.4rem;font-weight:700;letter-spacing:-0.5px;margin-bottom:0.4rem;">Surse indexate</h2>
    <p style="color:var(--ink2);font-size:14px;font-weight:300;">Starea și configurația surselor monitorizate de FinMatch România.</p>
  </div>
  <div id="sources-grid"></div>
</div>

<!-- ADMIN VIEW -->
<div id="view-admin" style="display:none;max-width:960px;margin:0 auto;padding:2rem 2rem 4rem;">
  <div style="margin-bottom:2rem;">
    <h2 style="font-family:var(--font-head);font-size:1.4rem;font-weight:700;letter-spacing:-0.5px;margin-bottom:0.4rem;">Panou administrativ</h2>
    <p style="color:var(--ink2);font-size:14px;font-weight:300;">Review queue, surse cu erori, oportunități noi detectate și duplicate suspecte.</p>
  </div>

  <!-- Admin stat cards -->
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:2rem;" id="admin-stats"></div>

  <!-- Tabs -->
  <div style="display:flex;gap:0;border-bottom:1px solid var(--border);margin-bottom:1.5rem;" id="admin-tabs">
    <button class="admin-tab active" onclick="switchAdminTab('review',this)">Review queue</button>
    <button class="admin-tab" onclick="switchAdminTab('sources',this)">Surse monitorizate</button>
    <button class="admin-tab" onclick="switchAdminTab('new',this)">Noi detectate</button>
    <button class="admin-tab" onclick="switchAdminTab('dupes',this)">Duplicate</button>
  </div>
  <div id="admin-content"></div>
</div>

<!-- COMPARE MODAL -->
<div class="compare-overlay" id="compare-overlay" onclick="closeCompare(event)">
  <div class="compare-modal">
    <div style="background:var(--surface2);padding:1.25rem 1.5rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
      <h3 style="font-family:var(--font-head);font-size:1.1rem;font-weight:800;letter-spacing:-0.3px;">Comparare oportunități</h3>
      <button onclick="closeCompare()" style="background:none;border:none;font-size:20px;cursor:pointer;color:var(--ink2);line-height:1;">×</button>
    </div>
    <div id="compare-content" style="overflow-x:auto;"></div>
  </div>
</div>

<div class="modal-overlay" id="modal-overlay" onclick="closeModal(event)">
  <div class="modal" id="modal-content"></div>
</div>

<!-- SOURCES VIEW --><!-- ADMIN VIEW --><!-- COMPARE OVERLAY --><!-- COMPARE BAR (floating) -->
<!-- WAITLIST MODAL -->
<div class="modal-overlay" id="waitlist-overlay" onclick="closeWaitlist(event)">
  <div class="modal" style="max-width:480px;">
    <div class="modal-header">
      <button class="modal-close" onclick="closeWaitlist()">×</button>
      <h2 style="font-family:var(--font-head);font-size:1.3rem;font-weight:800;letter-spacing:-0.3px;">Acces timpuriu FinMatch</h2>
      <p style="font-size:13px;color:var(--ink2);margin-top:6px;font-weight:300;">Fii primul care află când lansăm notificări automate și export CSV.</p>
    </div>
    <div class="modal-body">
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div>
          <label style="font-size:12px;font-weight:500;color:var(--ink2);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:6px;">Nume</label>
          <input type="text" id="wl-name" placeholder="Numele tău" style="width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius);font-family:var(--font-body);font-size:14px;outline:none;background:var(--surface);color:var(--ink);">
        </div>
        <div>
          <label style="font-size:12px;font-weight:500;color:var(--ink2);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:6px;">Email</label>
          <input type="email" id="wl-email" placeholder="email@exemplu.ro" style="width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius);font-family:var(--font-body);font-size:14px;outline:none;background:var(--surface);color:var(--ink);">
        </div>
        <div>
          <label style="font-size:12px;font-weight:500;color:var(--ink2);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:6px;">Tip organizație</label>
          <select id="wl-type" style="width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius);font-family:var(--font-body);font-size:14px;outline:none;background:var(--surface);color:var(--ink);cursor:pointer;">
            <option value="">Selectează...</option>
            <option>IMM / Startup</option>
            <option>ONG</option>
            <option>UAT / Instituție publică</option>
            <option>Consultant fonduri europene</option>
            <option>Fermier / Agricultură</option>
            <option>Altele</option>
          </select>
        </div>
        <button onclick="submitWaitlist()" style="margin-top:4px;padding:12px;background:var(--accent);color:white;border:none;border-radius:var(--radius);font-family:var(--font-body);font-size:14px;font-weight:500;cursor:pointer;transition:background .15s;" onmouseover="this.style.background='#13452a'" onmouseout="this.style.background='var(--accent)'">
          Înscrie-te pe lista de așteptare →
        </button>
        <p style="font-size:11px;color:var(--ink3);text-align:center;font-weight:300;">Fără spam. Poți anula oricând.</p>
      </div>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>

<footer>
  <strong>FinMatch România</strong> — Motor de căutare finanțări UE și naționale &nbsp;·&nbsp;
  Sursele sunt indexate din platforme oficiale. Verificați întotdeauna sursa oficială pentru confirmarea finală a informațiilor.
</footer>

<script>
const SOURCES = {
  'mfe.gov.ro': {
    name: 'MFE / MIPE', tier: 1, status: 'warn',
    note: 'Blochează fetch direct — necesită Playwright în producție',
    opps: 6,
    pages: [
      'https://mfe.gov.ro/category/ultimele-apeluri-prima-pagina/',
      'https://mfe.gov.ro/category/ultimele-apeluri-prima-pagina/page/2/',
      'https://mfe.gov.ro/category/ultimele-apeluri-prima-pagina/page/3/',
      'https://mfe.gov.ro/pdd/',
      'https://mfe.gov.ro/actualizare-ghidul-solicitantului-pnrr-unitati-sanitare/',
      'https://mfe.gov.ro/calendar-apeluri-de-finantare/',
    ]
  },
  'adrvest.ro': {
    name: 'ADR Vest', tier: 1, status: 'ok', note: 'Accesibil, date în timp real', opps: 6,
    pages: ['https://www.adrvest.ro','https://adrvest.ro/programul-tranzitie-justa-ghiduri-de-finantare-active/','https://adrvest.ro/programul-sanatate-ghiduri-active/']
  },
  'adrnordest.ro': {
    name: 'ADR Nord-Est', tier: 1, status: 'err', note: 'Returnează 403 — necesită agent de crawling dedicat', opps: 1,
    pages: ['https://www.adrnordest.ro']
  },
  'oportunitati-ue.gov.ro': {
    name: 'Oportunități UE Gov', tier: 1, status: 'ok', note: 'Accesibil, sursă Tier 1 principală', opps: 1,
    pages: ['https://oportunitati-ue.gov.ro']
  },
  'afir.ro': {
    name: 'AFIR', tier: 1, status: 'ok', note: 'Accesibil, apeluri agricultură', opps: 1,
    pages: ['https://afir.ro']
  },
  'commission.europa.eu': {
    name: 'Comisia Europeană', tier: 1, status: 'ok', note: 'API structurat disponibil', opps: 1,
    pages: ['https://commission.europa.eu/funding-tenders/find-funding/eu-funding-programmes_ro']
  },
  'vest.ro': {
    name: 'Vest.ro', tier: 1, status: 'ok', note: 'Accesibil', opps: 1,
    pages: ['https://vest.ro']
  },
  'fonduri-structurale.ro': {
    name: 'Fonduri Structurale', tier: 3, status: 'ok', note: 'Sursă editorială — necesită confirmare oficială', opps: 1,
    pages: ['https://fonduri-structurale.ro']
  },
  'startupcafe.ro': {
    name: 'StartupCafe', tier: 3, status: 'ok', note: 'Sursă editorială — necesită confirmare oficială', opps: 1,
    pages: ['https://startupcafe.ro']
  },
  'eeagrants.ro': {
    name: 'Granturi SEE & Norvegiene', tier: 1, status: 'warn',
    note: 'Ciclul 2014-2021 încheiat — noul ciclu 2021-2028 în negociere. Monitorizat pentru apeluri viitoare.',
    opps: 1,
    pages: [
      'https://www.eeagrants.ro/apeluri?filtru_status=Activ',
      'https://www.eeagrants.ro/programe/dezvoltare-locala',
      'https://www.eeagrants.ro/programe/energie',
      'https://www.eeagrants.ro/programe/cetatenie-activa',
    ]
  },
};

const OPPORTUNITIES = [
  /* ── MFE / MIPE ──────────────────────────────────────────────────── */
  {
    id: 1, status: 'ACTIV',
    title: 'PoCIDIF — HUB Antreprenorial Național (creare/operaționalizare)',
    source: 'mfe.gov.ro', sourceTier: 1,
    official_url: 'https://mfe.gov.ro/category/ultimele-apeluri-prima-pagina/',
    sourcePages: ['https://mfe.gov.ro/category/ultimele-apeluri-prima-pagina/'],
    program: 'PoCIDIF', callCode: 'PoCIDIF/HUB-ANTREPRENORIAL',
    summary: 'Finanțare pentru crearea sau operaționalizarea unui HUB antreprenorial național — sprijin pentru ecosistemul de inovare, accelerare startup și transfer de cunoștințe.',
    domains: ['Antreprenoriat', 'Digitalizare'], beneficiaries: ['IMM', 'Universitate'], regions: ['Național'],
    grantMin: 500000, grantMax: 5000000, cofinancing: 15,
    deadline: '2026-06-30', launchDate: '2026-01-01',
    who: 'Consorții formate din instituții publice, universități, IMM-uri inovative, acceleratoare.',
    activities: 'Infrastructură fizică și digitală pentru hub, programe mentorat, accelerare, evenimente ecosistem.',
    isUrgent: false, confidence: 92
  },
  {
    id: 2, status: 'ACTIV',
    title: 'PNRR C16 REPowerEU — Granturi bonuri valorice energie regenerabilă (gospodării)',
    source: 'mfe.gov.ro', sourceTier: 1,
    official_url: 'https://mfe.gov.ro/category/ultimele-apeluri-prima-pagina/',
    sourcePages: ['https://mfe.gov.ro/category/ultimele-apeluri-prima-pagina/', 'https://mfe.gov.ro/category/ultimele-apeluri-prima-pagina/page/2/'],
    program: 'PNRR / Componenta 16 REPowerEU / I4', callCode: 'OMIPE-6252/2024',
    summary: 'Schema de granturi sub formă de bonuri valorice pentru gospodăriile care instalează sisteme de energie din surse regenerabile. Finanțare 50% grant, 50% împrumut PNRR.',
    domains: ['Energie'], beneficiaries: ['IMM'], regions: ['Național'],
    grantMin: 5000, grantMax: 30000, cofinancing: 0,
    deadline: '2026-06-30', launchDate: '2025-06-01',
    who: 'Gospodării individuale și mici consumatori care instalează sisteme fotovoltaice sau pompe de căldură.',
    activities: 'Achiziție și instalare panouri fotovoltaice, baterii stocare, pompe de căldură din surse regenerabile.',
    isUrgent: false, confidence: 88
  },
  {
    id: 3, status: 'ACTIV',
    title: 'Programul pentru Dezvoltare Durabilă (PDD) — Conservarea speciilor și habitatelor',
    source: 'mfe.gov.ro', sourceTier: 1,
    official_url: 'https://mfe.gov.ro/pdd/',
    sourcePages: ['https://mfe.gov.ro/pdd/', 'https://mfe.gov.ro/category/ultimele-apeluri-prima-pagina/page/3/'],
    program: 'PDD 2021-2027', callCode: 'PDD/HABITATE/2026',
    summary: 'Ghid pentru proiecte dedicate menținerii și îmbunătățirii stării de conservare a speciilor și habitatelor prin măsuri de conservare activă și management ecologic.',
    domains: ['Mediu'], beneficiaries: ['ONG', 'UAT', 'Universitate'], regions: ['Național'],
    grantMin: 100000, grantMax: 3000000, cofinancing: 15,
    deadline: '2026-09-30', launchDate: '2026-02-18',
    who: 'ONG-uri de mediu, universități, institute de cercetare ecologică, UAT-uri cu arii protejate.',
    activities: 'Măsuri de conservare habitate, monitoring biodiversitate, refacere ecosisteme, educație ecologică.',
    isUrgent: false, confidence: 85
  },
  {
    id: 4, status: 'ACTIV',
    title: 'Programul Sănătate — Infrastructură PNRR unități sanitare (ghid actualizat)',
    source: 'mfe.gov.ro', sourceTier: 1,
    official_url: 'https://mfe.gov.ro/actualizare-ghidul-solicitantului-pnrr-unitati-sanitare/',
    sourcePages: ['https://mfe.gov.ro/actualizare-ghidul-solicitantului-pnrr-unitati-sanitare/', 'https://mfe.gov.ro/category/ultimele-apeluri-prima-pagina/'],
    program: 'Programul Sănătate / PNRR', callCode: 'PS/UNITATI-SANITARE/PNRR',
    summary: 'Finanțare pentru construcția, dotarea și modernizarea unităților sanitare publice, cu accent pe reducerea disparităților regionale în accesul la servicii medicale.',
    domains: ['Sănătate'], beneficiaries: ['UAT', 'Universitate'], regions: ['Național'],
    grantMin: 1000000, grantMax: 50000000, cofinancing: 0,
    deadline: '2026-06-30', launchDate: '2025-01-01',
    who: 'Spitale publice, autorități locale, ministere cu competențe în sănătate.',
    activities: 'Construcție/reabilitare clădiri, achiziție echipamente medicale, digitalizare sisteme clinice.',
    isUrgent: false, confidence: 90
  },
  {
    id: 5, status: 'ACTIV',
    title: 'PoIDS — Servicii comunitare pentru copii și familii (ITI Moții, Țara de Piatră)',
    source: 'mfe.gov.ro', sourceTier: 1,
    official_url: 'https://mfe.gov.ro/category/ultimele-apeluri-prima-pagina/',
    sourcePages: ['https://mfe.gov.ro/category/ultimele-apeluri-prima-pagina/page/2/'],
    program: 'PoIDS / Incluziune și Demnitate Socială', callCode: 'PoIDS/COPII-FAMILIE/ITI',
    summary: 'Sprijin pentru servicii comunitare destinate copiilor și familiilor aflate în situații de risc, prevenirea separării și reintegrarea în familie.',
    domains: ['Incluziune socială'], beneficiaries: ['ONG', 'UAT'], regions: ['Național'],
    grantMin: 50000, grantMax: 500000, cofinancing: 10,
    deadline: '2026-05-31', launchDate: '2025-11-01',
    who: 'ONG-uri, autorități locale din teritoriul ITI Moții și Țara de Piatră.',
    activities: 'Servicii de consiliere familială, centre de zi, programe reintegrare, asistență socială.',
    isUrgent: false, confidence: 78
  },
  {
    id: 6, status: 'URMEAZĂ',
    title: 'PTJ — Mobilitate verde și energie accesibilă (apeluri competitive + necompetitive)',
    source: 'mfe.gov.ro', sourceTier: 1,
    official_url: 'https://mfe.gov.ro/ptj/calendar-apeluri-de-proiecte/',
    sourcePages: ['https://mfe.gov.ro/category/ultimele-apeluri-prima-pagina/', 'https://mfe.gov.ro/category/ultimele-apeluri-prima-pagina/page/2/'],
    program: 'Programul Tranziție Justă 2021-2027', callCode: 'PTJ/MOBILITATE-VERDE/2026',
    summary: 'Apeluri competitive și necompetitive pentru "Energie verde accesibilă și mobilitate nepoluantă", Prioritățile 1-6, metodologii aprobate feb. 2026.',
    domains: ['Energie', 'Infrastructură'], beneficiaries: ['UAT', 'IMM'], regions: ['Național'],
    grantMin: 200000, grantMax: 10000000, cofinancing: 20,
    deadline: 'Estimat T3 2026', launchDate: '2026-03-01',
    who: 'UAT-uri, companii din zone de tranziție justă, operatori transport public.',
    activities: 'Transport electric, stații reîncărcare, producție energie verde locală, eficiență energetică mobilitate.',
    isUrgent: false, confidence: 72
  },
  /* ── ADR VEST ─────────────────────────────────────────────────────── */
  {
    id: 7, status: 'ÎNCHIS',
    title: 'ADR Vest — Investiții IMM Valea Jiului (Tranziție Justă)',
    source: 'adrvest.ro', sourceTier: 1,
    official_url: 'https://adrvest.ro/programul-tranzitie-justa-ghiduri-de-finantare-active/',
    sourcePages: ['https://www.adrvest.ro', 'https://adrvest.ro/programul-tranzitie-justa-ghiduri-de-finantare-active/'],
    program: 'Programul Tranziție Justă / PTJ IMM', callCode: 'PTJ/IMM/VALEAJIULUI/2025',
    summary: 'Finanțare pentru investiții productive în IMM-uri din Valea Jiului. Sprijin pentru diversificarea economică în zonele afectate de tranziția de la cărbune.',
    domains: ['Antreprenoriat', 'Energie'], beneficiaries: ['IMM'], regions: ['Vest'],
    grantMin: 50000, grantMax: 2000000, cofinancing: 30,
    deadline: '2026-02-28', launchDate: '2025-11-01',
    who: 'IMM-uri cu sediu/punct de lucru în zona de tranziție justă (Valea Jiului, Hunedoara).',
    activities: 'Investiții în capacități productive, echipamente, tehnologii curate, locuri de muncă.',
    isUrgent: false, confidence: 97
  },
  {
    id: 8, status: 'ACTIV',
    title: 'ADR Vest — Parcuri industriale și tehnologice (Tranziție Justă)',
    source: 'adrvest.ro', sourceTier: 1,
    official_url: 'https://adrvest.ro/parcuri-industriale-si-tehnologice/',
    sourcePages: ['https://www.adrvest.ro', 'https://adrvest.ro/programul-tranzitie-justa-ghiduri-de-finantare-active/'],
    program: 'Programul Tranziție Justă 2021-2027', callCode: 'PTJ/PARCURI-IND/2026',
    summary: 'Sprijin pentru crearea și dezvoltarea parcurilor industriale și tehnologice în Regiunea Vest, pentru atragerea de investiții și locuri de muncă.',
    domains: ['Infrastructură', 'Antreprenoriat'], beneficiaries: ['UAT', 'IMM'], regions: ['Vest'],
    grantMin: 1000000, grantMax: 20000000, cofinancing: 30,
    deadline: '2026-07-28', launchDate: '2026-01-28',
    who: 'Administrații publice locale, companii de administrare parcuri industriale din zona de tranziție.',
    activities: 'Infrastructură utilități, drumuri interne, clădiri comune, digitalizare management parc.',
    isUrgent: false, confidence: 96
  },
  {
    id: 9, status: 'ACTIV',
    title: 'ADR Vest — Energie regenerabilă Tranziție Justă',
    source: 'adrvest.ro', sourceTier: 1,
    official_url: 'https://adrvest.ro/programul-tranzitie-justa_dezvoltarea-surselor-de-energie-regenerabila',
    sourcePages: ['https://www.adrvest.ro', 'https://adrvest.ro/programul-tranzitie-justa-ghiduri-de-finantare-active/'],
    program: 'Programul Tranziție Justă 2021-2027', callCode: 'PTJ/ENERGIE-REG/2026',
    summary: 'Finanțare pentru dezvoltarea surselor de energie regenerabilă în Regiunea Vest — eolian, solar, biomasă — ca parte a tranziției economice.',
    domains: ['Energie'], beneficiaries: ['IMM', 'UAT'], regions: ['Vest'],
    grantMin: 200000, grantMax: 10000000, cofinancing: 25,
    deadline: '2026-08-26', launchDate: '2026-02-25',
    who: 'IMM-uri, UAT-uri, companii de energie din zona de tranziție justă a Regiunii Vest.',
    activities: 'Instalare capacități SRE, stocare energie, racordare la rețea, eficiență energetică combinată.',
    isUrgent: false, confidence: 96
  },
  {
    id: 10, status: 'ACTIV',
    title: 'ADR Vest — Vest Ventures: Fond de accelerare startup (până la €100K/startup)',
    source: 'adrvest.ro', sourceTier: 1,
    official_url: 'https://adrvest.ro/vest-ventures-da-startul-primei-cohorte-noua-startup-uri-selectate-intra-intr-un-program-de-accelerare-cu-investitii-de-pana-la-100-000-euro/',
    sourcePages: ['https://www.adrvest.ro'],
    program: 'Programul Regional Vest / Vest Ventures', callCode: 'PRV/VESTVENTURES/C1',
    summary: 'Primul accelerator regional cu finanțare europeană — 9 startup-uri selectate în prima cohortă. Investiții de până la €100K per startup, plus mentorat și acces la piață.',
    domains: ['Antreprenoriat', 'Digitalizare'], beneficiaries: ['Startup'], regions: ['Vest'],
    grantMin: 50000, grantMax: 100000, cofinancing: 0,
    deadline: 'Cohortă 2 — estimat T3 2026', launchDate: '2026-04-06',
    who: 'Startup-uri inovative din Regiunea Vest, în faza seed/early stage, cu produs demonstrabil.',
    activities: 'Program accelerare 6 luni, investiție în capital, mentorat, acces la clienți pilot.',
    isUrgent: false, confidence: 99
  },
  {
    id: 11, status: 'ACTIV',
    title: 'ADR Vest — Patrimoniu cultural UNESCO Vest (€4M)',
    source: 'adrvest.ro', sourceTier: 1,
    official_url: 'https://adrvest.ro/finantari-de-4-milioane-de-euro-pentru-protejarea-si-valorificarea-patrimoniului-unesco-din-regiunea-vest/',
    sourcePages: ['https://www.adrvest.ro'],
    program: 'Programul Regional Vest 2021-2027', callCode: 'PRV/PATRIMONIU-UNESCO/2026',
    summary: 'Fonduri europene pentru protejarea și valorificarea obiectivelor de patrimoniu cultural UNESCO din Regiunea Vest — restaurare, digitalizare și promovare turistică.',
    domains: ['Cultură', 'Turism'], beneficiaries: ['UAT', 'ONG'], regions: ['Vest'],
    grantMin: 200000, grantMax: 4000000, cofinancing: 20,
    deadline: '2026-07-31', launchDate: '2026-04-01',
    who: 'Autorități locale, ONG-uri și instituții culturale care administrează obiective UNESCO.',
    activities: 'Restaurare monumente, digitalizare patrimoniu, trasee turistice, promovare internațională.',
    isUrgent: false, confidence: 99
  },
  {
    id: 12, status: 'ACTIV',
    title: 'ADR Vest — Spital Copii "Louis Țurcanu" Timișoara (~€3M)',
    source: 'adrvest.ro', sourceTier: 1,
    official_url: 'https://adrvest.ro/investitie-de-aproape-3-milioane-de-euro-in-spitalul-de-copii-louis-turcanu-din-timisoara-prin-programul-regional-vest/',
    sourcePages: ['https://www.adrvest.ro'],
    program: 'Programul Regional Vest 2021-2027', callCode: 'PRV/SANATATE/SPITAL-COPII',
    summary: 'Investiție europeană de aproape €3M în dotarea și modernizarea Spitalului de Copii din Timișoara, principala unitate pediatrică a Regiunii Vest.',
    domains: ['Sănătate'], beneficiaries: ['UAT'], regions: ['Vest'],
    grantMin: 1000000, grantMax: 3000000, cofinancing: 15,
    deadline: '2026-12-31', launchDate: '2026-04-08',
    who: 'Unități spitalicești publice din Regiunea Vest prin Programul Regional Vest.',
    activities: 'Dotare echipamente medicale, reabilitare secții, sisteme digitale de monitorizare.',
    isUrgent: false, confidence: 99
  },
  /* ── ADR NORD-EST ─────────────────────────────────────────────────── */
  {
    id: 13, status: 'ACTIV',
    title: 'ADR Nord-Est — Fonduri europene Regiunea Nord-Est 2021-2027',
    source: 'adrnordest.ro', sourceTier: 1,
    official_url: 'https://www.adrnordest.ro',
    sourcePages: ['https://www.adrnordest.ro'],
    program: 'Programul Regional Nord-Est 2021-2027', callCode: 'PRN-E/2026',
    summary: 'Portal oficial al ADR Nord-Est cu apeluri active pentru IMM-uri, UAT-uri și ONG-uri din județele Bacău, Botoșani, Iași, Neamț, Suceava și Vaslui.',
    domains: ['Antreprenoriat', 'Infrastructură', 'Digitalizare'], beneficiaries: ['IMM', 'UAT', 'ONG'], regions: ['Nord-Est'],
    grantMin: 50000, grantMax: 15000000, cofinancing: 20,
    deadline: 'Multiple apeluri — vezi portal', launchDate: '2024-01-01',
    who: 'IMM-uri, UAT-uri, ONG-uri și instituții publice din Regiunea Nord-Est.',
    activities: 'Investiții productive, digitalizare, infrastructură locală, incluziune socială.',
    isUrgent: false, confidence: 60
  },
  /* ── Alte surse ───────────────────────────────────────────────────── */
  {
    id: 14, status: 'ACTIV',
    title: 'PNDR — Investiții în exploatații agricole mici și medii',
    source: 'afir.ro', sourceTier: 1, official_url: 'https://afir.ro',
    sourcePages: ['https://afir.ro'],
    program: 'PNDR 2023-2027 / SM 4.1', callCode: 'AFIR/2024/4.1/C1',
    summary: 'Finanțare pentru modernizarea exploatațiilor agricole: utilaje, irigații, construcții ferme, procesare produse agricole, standarde UE.',
    domains: ['Agricultură'], beneficiaries: ['Fermier'], regions: ['Național'],
    grantMin: 10000, grantMax: 300000, cofinancing: 50,
    deadline: '2026-07-31', launchDate: '2024-12-01',
    who: 'Fermierii activi cu exploatații între 12.000 și 250.000 SO, înregistrați în Registrul Unic de Identificare.',
    activities: 'Achiziție tractoare și combine, sisteme de irigații, construcții adăposturi animale.',
    isUrgent: false, confidence: 94
  },
  {
    id: 15, status: 'ÎNCHIS',
    title: 'Horizon Europe — Parteneriate cercetare și inovare',
    source: 'commission.europa.eu', sourceTier: 1,
    official_url: 'https://commission.europa.eu/funding-tenders/find-funding/eu-funding-programmes_ro',
    sourcePages: ['https://commission.europa.eu/funding-tenders/find-funding/eu-funding-programmes_ro'],
    program: 'Horizon Europe 2024', callCode: 'HE/2024/RIA',
    summary: 'Cel mai amplu program european de cercetare și inovare — parteneriate transnaționale în sănătate, digital, energie, mobilitate și climă.',
    domains: ['Cercetare / inovare', 'Digitalizare'], beneficiaries: ['Universitate', 'IMM'], regions: ['Național'],
    grantMin: 500000, grantMax: 10000000, cofinancing: 0,
    deadline: '2025-09-15', launchDate: '2024-06-01',
    who: 'Consorții internaționale (min. 3 parteneri din 3 state membre UE), universități, institute, companii.',
    activities: 'Cercetare fundamentală și aplicată, demonstrare tehnologii, transfer cunoștințe.',
    isUrgent: false, confidence: 93
  },
  {
    id: 16, status: 'URMEAZĂ',
    title: 'FSE+ — Inovare socială și economie socială (ONG-uri)',
    source: 'fonduri-structurale.ro', sourceTier: 3,
    official_url: 'https://fonduri-structurale.ro',
    sourcePages: ['https://fonduri-structurale.ro'],
    program: 'FSE+ / Incluziune socială', callCode: 'N/A — Calendar estimativ',
    summary: 'Program estimat pentru sprijinirea ONG-urilor și întreprinderilor sociale cu proiecte de incluziune a grupurilor vulnerabile, inserție profesională și servicii sociale.',
    domains: ['Incluziune socială'], beneficiaries: ['ONG'], regions: ['Național'],
    grantMin: 50000, grantMax: 400000, cofinancing: 10,
    deadline: 'Estimat T3 2026', launchDate: 'Estimat mai 2026',
    who: 'ONG-uri, întreprinderi sociale, asociații acreditate în domeniu.',
    activities: 'Formare profesională, consiliere, inserție, servicii sociale comunitare.',
    isUrgent: false, confidence: 55
  },
  {
    id: 17, status: 'ACTIV',
    title: 'Sprijin IMM — Digitalizare și transformare digitală (PNRR C7)',
    source: 'oportunitati-ue.gov.ro', sourceTier: 1,
    official_url: 'https://oportunitati-ue.gov.ro',
    sourcePages: ['https://oportunitati-ue.gov.ro'],
    program: 'PNRR / Componenta 7', callCode: 'PNRR/2024/C7/I1',
    summary: 'Finanțare nerambursabilă pentru IMM-uri care implementează soluții digitale, automatizare, cloud computing și securitate cibernetică.',
    domains: ['Digitalizare'], beneficiaries: ['IMM', 'Startup'], regions: ['Național'],
    grantMin: 30000, grantMax: 500000, cofinancing: 20,
    deadline: '2026-06-30', launchDate: '2024-11-01',
    who: 'IMM-uri și startup-uri cu activitate de cel puțin 1 an, înregistrate în România.',
    activities: 'Software, licențe, echipamente IT, consultanță implementare soluții digitale.',
    isUrgent: false, confidence: 91
  },
  {
    id: 18, status: 'ÎNCHIS',
    title: 'Start-Up Nation România — Granturi afaceri noi',
    source: 'startupcafe.ro', sourceTier: 3,
    official_url: 'https://startupcafe.ro',
    sourcePages: ['https://startupcafe.ro'],
    program: 'Start-Up Nation 2024', callCode: 'SUN/2024',
    summary: 'Program de finanțare pentru antreprenori la debut. Grant maxim 250.000 RON pentru echipamente, amenajare spații, stoc și marketing.',
    domains: ['Antreprenoriat'], beneficiaries: ['Startup'], regions: ['Național'],
    grantMin: 25000, grantMax: 250000, cofinancing: 0,
    deadline: '2026-03-31', launchDate: '2025-01-15',
    who: 'Persoane fără firmă activă anterioară sau firme cu activitate sub 2 ani.',
    activities: 'Echipamente, dotări, stocuri, cheltuieli curente 12 luni, marketing digital.',
    isUrgent: false, confidence: 70
  },
  {
    id: 19, status: 'ÎNCHIS',
    title: 'POR Vest — Clustere inovative regionale',
    source: 'vest.ro', sourceTier: 1,
    official_url: 'https://vest.ro',
    sourcePages: ['https://vest.ro'],
    program: 'PR Vest / Prioritatea 1', callCode: 'PRVEST/2023/C1',
    summary: 'Apel finalizat pentru sprijinirea clusterelor de inovare și competitivitate din Regiunea Vest. Informativ pentru sesiunile viitoare.',
    domains: ['Antreprenoriat'], beneficiaries: ['IMM'], regions: ['Vest'],
    grantMin: 200000, grantMax: 2000000, cofinancing: 20,
    deadline: '2024-12-15', launchDate: '2024-05-01',
    who: 'Clustere inovative, asociații de firme, parteneriate public-privat.',
    activities: 'C&D comun, transfer tehnologic, internaționalizare, marketing cluster.',
    isUrgent: false, confidence: 98
  },
  {
    id: 20, status: 'URMEAZĂ',
    title: 'Granturi SEE & Norvegiene 2021–2028 — Noul ciclu (apeluri în pregătire)',
    source: 'eeagrants.ro', sourceTier: 1,
    official_url: 'https://www.eeagrants.ro/apeluri?filtru_status=Activ',
    sourcePages: [
      'https://www.eeagrants.ro/apeluri?filtru_status=Activ',
      'https://www.eeagrants.ro/programe/dezvoltare-locala',
      'https://www.eeagrants.ro/programe/energie',
    ],
    program: 'Granturi SEE & Norvegiene / Ciclu 2021-2028', callCode: 'EEA-NO/2026/RO',
    summary: 'Islanda, Liechtenstein și Norvegia finanțează proiecte în România. Ciclul 2014-2021 s-a încheiat; noul ciclu 2021-2028 este în negociere — apeluri estimate în a doua jumătate a lui 2026.',
    domains: ['Mediu', 'Educație', 'Sănătate', 'Cercetare / inovare', 'Incluziune socială', 'Cultură'],
    beneficiaries: ['ONG', 'IMM', 'UAT', 'Universitate'],
    regions: ['Național'],
    grantMin: 50000, grantMax: 5000000, cofinancing: 10,
    deadline: 'Estimat S2 2026', launchDate: 'Estimat 2026',
    who: 'ONG-uri, instituții publice, întreprinderi private și instituții de cercetare, în parteneriat cu entități din țările donatoare (Norvegia, Islanda, Liechtenstein).',
    activities: 'Proiecte în domeniile mediu & schimbări climatice, educație, sănătate, cetățenie activă, cultură, cercetare și afaceri & inovare.',
    isUrgent: false, confidence: 65
  },
];

/* ── State ───────────────────────────────────────────────────────────────── */
let filters = { status: ['ACTIV'], domain: [], beneficiary: [], region: [], source: [] };
let grantMax = 50000000;
let savedIds = new Set();
let alerts = [];
let currentSearch = '';
let compareIds = new Set();
let currentAdminTab = 'review';

/* ── Init ────────────────────────────────────────────────────────────────── */

function openWaitlist() {
  document.getElementById('waitlist-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeWaitlist(e) {
  if (e && e.target !== document.getElementById('waitlist-overlay')) return;
  document.getElementById('waitlist-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function submitWaitlist() {
  const name = document.getElementById('wl-name').value.trim();
  const email = document.getElementById('wl-email').value.trim();
  const type = document.getElementById('wl-type').value;
  if (!name || !email) return showToast('Completați numele și emailul');
  if (!email.includes('@')) return showToast('Email invalid');
  // In production: POST to /api/waitlist
  closeWaitlist();
  showToast('✅ Înscris! Te vom contacta la lansare.');
  // Persist locally so the button shows "enrolled"
  try { localStorage.setItem('fm_waitlist', JSON.stringify({name, email, type, date: new Date().toISOString()})); } catch(e) {}
}

function persistState() {
  try {
    localStorage.setItem('fm_saved', JSON.stringify([...savedIds]));
    localStorage.setItem('fm_alerts', JSON.stringify(alerts));
  } catch(e) {}
}

function toggleFilters(btn) {
  const body = document.getElementById('filters-body');
  const arrow = document.getElementById('filter-arrow');
  const isOpen = body.classList.toggle('open');
  if (arrow) arrow.textContent = isOpen ? '▴' : '▾';
}

function init() {
  // Update hero badge and stats with real data
  const activeCount = OPPORTUNITIES.filter(o => o.status === 'ACTIV').length;
  const el = document.getElementById('cnt-active');
  if (el) el.textContent = activeCount;
  // Update hero badge text
  const badge = document.querySelector('.hero-badge');
  if (badge) badge.innerHTML = '<span style="width:6px;height:6px;background:var(--accent);border-radius:50%;display:inline-block;"></span> ' + activeCount + ' oportunități active în 2026';

  // Load persisted saves & alerts
  try {
    const saved = localStorage.getItem('fm_saved');
    if (saved) savedIds = new Set(JSON.parse(saved));
    const alts = localStorage.getItem('fm_alerts');
    if (alts) alerts = JSON.parse(alts);
  } catch(e) {}
  renderResults();
  document.getElementById('search-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') doSearch();
  });
}

/* ── View routing ────────────────────────────────────────────────────────── */
function showView(view) {
  ['search','saved','alerts','sources','admin'].forEach(v => {
    const el = document.getElementById('view-' + v);
    if (el) el.style.display = v === view ? 'block' : 'none';
  });
  document.querySelectorAll('.nav-links a').forEach((a, i) => {
    a.classList.toggle('active', ['search','saved','alerts','sources','admin'][i] === view);
  });
  if (view === 'saved') renderSaved();
  if (view === 'alerts') renderAlerts();
  if (view === 'sources') renderSources();
  if (view === 'admin') renderAdmin();
}

function setSearch(q) {
  document.getElementById('search-input').value = q;
  doSearch();
}

function doSearch() {
  currentSearch = document.getElementById('search-input').value.toLowerCase().trim();
  renderResults();
}

/* ── Filters ─────────────────────────────────────────────────────────────── */
function toggleChip(el, type) {
  const val = el.dataset.val;
  const idx = filters[type].indexOf(val);
  if (idx > -1) { filters[type].splice(idx, 1); el.classList.remove('active'); }
  else { filters[type].push(val); el.classList.add('active'); }
  renderResults();
}

function resetFilters() {
  filters = { status: [], domain: [], beneficiary: [], region: [], source: [] };
  grantMax = 50000000;
  document.getElementById('grant-filter').value = 50000000;
  document.getElementById('grant-val-display').textContent = 'Orice';
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  renderResults();
}

function updateGrantFilter(val) {
  grantMax = parseInt(val);
  const display = grantMax >= 50000000 ? 'Orice' :
    grantMax >= 1000000 ? '€' + (grantMax/1000000).toFixed(1) + 'M' :
    '€' + (grantMax/1000).toFixed(0) + 'K';
  document.getElementById('grant-val-display').textContent = display;
  renderResults();
}

function getFiltered() {
  return OPPORTUNITIES.filter(o => {
    if (filters.status.length && !filters.status.includes(o.status)) return false;
    if (filters.domain.length && !filters.domain.some(d => o.domains.includes(d))) return false;
    if (filters.beneficiary.length && !filters.beneficiary.some(b => o.beneficiaries.includes(b))) return false;
    if (filters.region.length && !filters.region.some(r => o.regions.includes(r))) return false;
    if (filters.source.length) {
      const isOff = o.sourceTier === 1;
      if (filters.source.includes('Oficială') && !isOff) return false;
      if (filters.source.includes('Editorială') && isOff) return false;
    }
    if (grantMax < 50000000 && o.grantMax > grantMax) return false;
    if (currentSearch) {
      const hay = (o.title + o.summary + o.domains.join(' ') + o.beneficiaries.join(' ') + o.regions.join(' ') + o.program).toLowerCase();
      if (!currentSearch.split(' ').filter(Boolean).every(w => hay.includes(w))) return false;
    }
    return true;
  });
}

function getSorted(list) {
  const sort = document.getElementById('sort-select').value;
  const s = [...list];
  if (sort === 'deadline') return s.sort((a,b) => (a.deadline||'9').localeCompare(b.deadline||'9'));
  if (sort === 'grant_desc') return s.sort((a,b) => b.grantMax - a.grantMax);
  if (sort === 'newest') return s.sort((a,b) => (b.launchDate||'').localeCompare(a.launchDate||''));
  return s.sort((a,b) => (a.status==='ACTIV'?0:a.status==='URMEAZĂ'?1:2) - (b.status==='ACTIV'?0:b.status==='URMEAZĂ'?1:2));
}

/* ── Results rendering ───────────────────────────────────────────────────── */
function renderResults() {
  const filtered = getSorted(getFiltered());
  document.getElementById('results-count').textContent = filtered.length;
  const container = document.getElementById('results-list');

  if (!filtered.length) {
    container.innerHTML = \`<div class="empty-state"><h3>Nicio oportunitate găsită</h3><p>Încearcă să modifici filtrele sau termenul de căutare.</p></div>\`;
    return;
  }

  container.innerHTML = filtered.map(o => \`
    <div class="opp-card" onclick="openDetail(\${o.id})">
      <div class="opp-card-top">
        <div style="flex:1">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:7px;">
            <span class="status-badge \${o.status==='ACTIV'?'active':o.status==='URMEAZĂ'?'upcoming':'closed'}">\${o.status}</span>
            <span class="source-tier \${o.sourceTier===1?'tier1':''}">\${o.sourceTier===1?'Tier 1 Oficial':'Editorial'}</span>
            \${o.isUrgent ? '<span style="font-size:11px;background:#fff3e0;color:#c26a00;padding:3px 8px;border-radius:100px;font-weight:500;">⏰ Termen aproape</span>' : ''}
            \${(o.confidence||100) < 75 ? '<span style="font-size:11px;background:var(--warn-light);color:var(--warn);padding:3px 8px;border-radius:100px;">! Necesită verificare</span>' : ''}
          </div>
          <div class="opp-title">\${o.title}</div>
        </div>
        <button class="compare-check \${compareIds.has(o.id)?'checked':''}"
          onclick="event.stopPropagation();toggleCompare(\${o.id})"
          title="Adaugă la comparare">✓</button>
      </div>
      <div class="opp-summary">\${o.summary}</div>
      <div class="opp-meta">
        \${o.domains.map(d=>\`<span class="meta-tag domain">\${d}</span>\`).join('')}
        \${o.beneficiaries.map(b=>\`<span class="meta-tag">\${b}</span>\`).join('')}
        \${o.regions.map(r=>\`<span class="meta-tag region">\${r}</span>\`).join('')}
      </div>
      <div class="opp-footer">
        <div class="grant-info">
          <div>
            <div class="grant-val">€\${o.grantMax.toLocaleString('ro-RO')}</div>
            <div class="grant-label">grant maxim</div>
          </div>
          \${o.cofinancing > 0
            ? \`<div><div class="grant-val">\${o.cofinancing}%</div><div class="grant-label">cofinanțare</div></div>\`
            : '<div><div class="grant-val" style="color:var(--accent)">100%</div><div class="grant-label">nerambursabil</div></div>'}
        </div>
        <div class="opp-actions">
          <div class="deadline \${o.isUrgent?'urgent':''}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            \${o.deadline}
          </div>
          <button class="btn-save \${savedIds.has(o.id)?'saved':''}" onclick="event.stopPropagation();toggleSave(\${o.id},this)">
            \${savedIds.has(o.id)?'★':'☆'}
          </button>
          <button class="btn-detail" onclick="event.stopPropagation();openDetail(\${o.id})">Detalii →</button>
        </div>
      </div>
    </div>
  \`).join('');
}

function toggleSave(id, btn) {
  if (savedIds.has(id)) { savedIds.delete(id); btn.classList.remove('saved'); btn.textContent='☆'; showToast('Eliminat din salvate'); }
  else { savedIds.add(id); btn.classList.add('saved'); btn.textContent='★'; showToast('Salvat cu succes!'); }
  persistState();
}

/* ── Compare ─────────────────────────────────────────────────────────────── */
function toggleCompare(id) {
  if (compareIds.has(id)) {
    compareIds.delete(id);
  } else {
    if (compareIds.size >= 3) return showToast('Maxim 3 oportunități pentru comparare');
    compareIds.add(id);
  }
  const bar = document.getElementById('compare-bar');
  bar.style.display = compareIds.size > 0 ? 'flex' : 'none';
  document.getElementById('compare-count').textContent = compareIds.size;
  renderResults();
}

function clearCompare() {
  compareIds.clear();
  document.getElementById('compare-bar').style.display = 'none';
  renderResults();
}

function openCompare() {
  if (compareIds.size < 2) return showToast('Selectează cel puțin 2 oportunități');
  const opps = [...compareIds].map(id => OPPORTUNITIES.find(o => o.id === id)).filter(Boolean);
  const rows = [
    ['Program', o => o.program],
    ['Status', o => \`<span class="status-badge \${o.status==='ACTIV'?'active':o.status==='URMEAZĂ'?'upcoming':'closed'}" style="font-size:11px;">\${o.status}</span>\`],
    ['Grant maxim', o => \`<strong>€\${o.grantMax.toLocaleString('ro-RO')}</strong>\`],
    ['Grant minim', o => \`€\${o.grantMin.toLocaleString('ro-RO')}\`],
    ['Cofinanțare', o => o.cofinancing === 0 ? '<span style="color:var(--accent);font-weight:500;">100% nerambursabil</span>' : \`\${o.cofinancing}%\`],
    ['Termen limită', o => \`<span style="\${o.isUrgent?'color:var(--accent2);font-weight:500;':''}">\${o.deadline}</span>\`],
    ['Domenii', o => o.domains.join(', ')],
    ['Beneficiari', o => o.beneficiaries.join(', ')],
    ['Regiuni', o => o.regions.join(', ')],
    ['Sursă', o => \`\${o.source} (Tier \${o.sourceTier})\`],
    ['Cod apel', o => \`<code style="font-size:11px;background:var(--surface2);padding:2px 5px;border-radius:4px;">\${o.callCode}</code>\`],
    ['Confidence', o => {
      const c = o.confidence||100;
      const col = c >= 85 ? 'var(--accent)' : c >= 70 ? 'var(--warn)' : 'var(--accent2)';
      return \`<span style="color:\${col};font-weight:500;">\${c}%</span>\`;
    }],
  ];

  document.getElementById('compare-content').innerHTML = \`
    <table style="width:100%;border-collapse:collapse;min-width:\${opps.length * 200}px;">
      <thead>
        <tr style="background:var(--surface2);">
          <th style="padding:12px 16px;text-align:left;font-size:12px;font-weight:500;color:var(--ink3);text-transform:uppercase;letter-spacing:0.5px;width:140px;border-bottom:1px solid var(--border);">Criteriu</th>
          \${opps.map(o => \`<th style="padding:12px 16px;text-align:left;font-family:var(--font-head);font-size:13px;font-weight:700;color:var(--ink);border-bottom:1px solid var(--border);">\${o.title.length > 55 ? o.title.slice(0,55)+'…' : o.title}</th>\`).join('')}
        </tr>
      </thead>
      <tbody>
        \${rows.map(([ label, fn ], ri) => \`
          <tr style="background:\${ri%2===0?'var(--surface)':'var(--surface2)'};">
            <td style="padding:10px 16px;font-size:12px;color:var(--ink3);font-weight:500;border-bottom:1px solid var(--border2);white-space:nowrap;">\${label}</td>
            \${opps.map(o => \`<td style="padding:10px 16px;font-size:13px;color:var(--ink);border-bottom:1px solid var(--border2);">\${fn(o)}</td>\`).join('')}
          </tr>\`).join('')}
      </tbody>
    </table>
    <div style="padding:1rem 1.5rem;display:flex;gap:8px;flex-wrap:wrap;">
      \${opps.map(o => \`<a href="\${o.official_url}" target="_blank" class="source-link" style="font-size:12px;">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        \${o.source}
      </a>\`).join('')}
    </div>
  \`;
  document.getElementById('compare-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCompare(e) {
  if (e && e.target !== document.getElementById('compare-overlay')) return;
  document.getElementById('compare-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Detail modal ────────────────────────────────────────────────────────── */
function openDetail(id) {
  const o = OPPORTUNITIES.find(x => x.id === id);
  if (!o) return;
  const c = o.confidence || 100;
  const confColor = c >= 85 ? 'var(--accent)' : c >= 70 ? 'var(--warn)' : 'var(--accent2)';
  const modal = document.getElementById('modal-content');
  modal.innerHTML = \`
    <div class="modal-header">
      <button class="modal-close" onclick="closeModal()">×</button>
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px;flex-wrap:wrap;">
        <span class="status-badge \${o.status==='ACTIV'?'active':o.status==='URMEAZĂ'?'upcoming':'closed'}">\${o.status}</span>
        <span class="source-tier \${o.sourceTier===1?'tier1':''}" style="font-size:11px;">\${o.source}</span>
        <span style="font-size:11px;color:var(--ink3);">\${o.callCode}</span>
        <span style="font-size:11px;color:\${confColor};font-weight:500;margin-left:auto;">Confidence: \${c}%</span>
      </div>
      <h2 style="font-family:var(--font-head);font-size:1.2rem;font-weight:800;letter-spacing:-0.3px;line-height:1.3;margin-bottom:8px;">\${o.title}</h2>
      <div style="font-size:13px;color:var(--ink2);font-weight:300;">Program: <strong style="font-weight:500;color:var(--ink);">\${o.program}</strong></div>
    </div>
    <div class="modal-body">
      <div class="modal-section">
        <div class="modal-section-title">Rezumat</div>
        <p style="font-size:14px;color:var(--ink2);line-height:1.6;font-weight:300;">\${o.summary}</p>
      </div>
      <div class="modal-grid">
        <div class="modal-stat">
          <div class="modal-stat-val">€\${o.grantMax.toLocaleString('ro-RO')}</div>
          <div class="modal-stat-label">Grant maxim</div>
        </div>
        <div class="modal-stat">
          <div class="modal-stat-val">\${o.cofinancing === 0 ? '100% nerambursabil' : o.cofinancing + '%'}</div>
          <div class="modal-stat-label">\${o.cofinancing === 0 ? 'Finanțare' : 'Cofinanțare minimă'}</div>
        </div>
        <div class="modal-stat">
          <div class="modal-stat-val" style="\${o.isUrgent?'color:var(--accent2)':''}">\${o.deadline}</div>
          <div class="modal-stat-label">Termen limită</div>
        </div>
        <div class="modal-stat">
          <div class="modal-stat-val">\${o.launchDate}</div>
          <div class="modal-stat-label">Data lansării</div>
        </div>
      </div>
      <div class="modal-section" style="margin-top:1.25rem;">
        <div class="modal-section-title">Cine poate aplica</div>
        <p style="font-size:14px;color:var(--ink2);line-height:1.6;font-weight:300;">\${o.who}</p>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">Activități eligibile</div>
        <p style="font-size:14px;color:var(--ink2);line-height:1.6;font-weight:300;">\${o.activities}</p>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">Domenii & beneficiari</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          \${o.domains.map(d=>\`<span class="meta-tag domain">\${d}</span>\`).join('')}
          \${o.beneficiaries.map(b=>\`<span class="meta-tag">\${b}</span>\`).join('')}
          \${o.regions.map(r=>\`<span class="meta-tag region">\${r}</span>\`).join('')}
        </div>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">Surse</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <a class="source-link" href="\${o.official_url}" target="_blank">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            \${o.source} (sursă principală)
          </a>
          \${(o.sourcePages||[]).filter(u=>u!==o.official_url).map(u=>\`
            <a class="source-link" href="\${u}" target="_blank">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              \${new URL(u).hostname.replace('www.','')}
            </a>\`).join('')}
        </div>
      </div>
      <div class="disclaimer">
        ⚠ Informațiile sunt extrase automat și pot fi incomplete. Verificați întotdeauna sursa oficială înainte de a depune o cerere de finanțare.
      </div>
      <div style="display:flex;gap:8px;margin-top:1.5rem;flex-wrap:wrap;">
        <button onclick="toggleSaveModal(\${o.id})" style="background:\${savedIds.has(o.id)?'var(--accent)':'var(--surface2)'};color:\${savedIds.has(o.id)?'white':'var(--ink)'};border:1px solid var(--border);padding:9px 18px;border-radius:8px;font-family:var(--font-body);font-size:13px;font-weight:500;cursor:pointer;">
          \${savedIds.has(o.id)?'★ Salvat':'☆ Salvează'}
        </button>
        <button onclick="toggleCompare(\${o.id});closeModal();" style="background:var(--surface2);border:1px solid var(--border);padding:9px 18px;border-radius:8px;font-family:var(--font-body);font-size:13px;cursor:pointer;">
          \${compareIds.has(o.id)?'✓ În comparare':'+ Compară'}
        </button>
        <button onclick="closeModal()" style="background:var(--surface2);border:1px solid var(--border);padding:9px 18px;border-radius:8px;font-family:var(--font-body);font-size:13px;cursor:pointer;">Închide</button>
      </div>
    </div>
  \`;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function toggleSaveModal(id) {
  if (savedIds.has(id)) { savedIds.delete(id); showToast('Eliminat din salvate'); }
  else { savedIds.add(id); showToast('Salvat cu succes!'); }
  closeModal(); renderResults();
}

function closeModal(e) {
  if (e && e.target !== document.getElementById('modal-overlay')) return;
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Saved view ──────────────────────────────────────────────────────────── */
function renderSaved() {
  const container = document.getElementById('saved-list');
  const saved = OPPORTUNITIES.filter(o => savedIds.has(o.id));
  if (!saved.length) {
    container.innerHTML = \`<div class="empty-state"><h3>Nicio oportunitate salvată</h3><p>Apasă ☆ pe orice card pentru a salva.</p></div>\`;
    return;
  }
  container.innerHTML = saved.map(o => \`
    <div class="opp-card" onclick="openDetail(\${o.id})">
      <div class="opp-card-top">
        <div style="flex:1">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:7px;">
            <span class="status-badge \${o.status==='ACTIV'?'active':o.status==='URMEAZĂ'?'upcoming':'closed'}">\${o.status}</span>
            <span class="source-tier \${o.sourceTier===1?'tier1':''}">\${o.source}</span>
          </div>
          <div class="opp-title">\${o.title}</div>
        </div>
      </div>
      <div class="opp-summary">\${o.summary}</div>
      <div class="opp-footer">
        <div class="grant-info">
          <div><div class="grant-val">€\${o.grantMax.toLocaleString('ro-RO')}</div><div class="grant-label">grant maxim</div></div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <div class="deadline">\${o.deadline}</div>
          <button class="btn-save saved" onclick="event.stopPropagation();savedIds.delete(\${o.id});renderSaved();">★</button>
        </div>
      </div>
    </div>
  \`).join('');
}

/* ── Alerts view ─────────────────────────────────────────────────────────── */
function saveAlert() {
  const q = document.getElementById('alert-query').value.trim();
  if (!q) return showToast('Introduceți un termen de căutare');
  alerts.push({ query: q, created: new Date().toLocaleDateString('ro-RO'), active: true });
  document.getElementById('alert-query').value = '';
  renderAlerts();
  persistState();
  showToast('Alertă creată: "' + q + '"');
}

function renderAlerts() {
  const container = document.getElementById('alerts-list');
  if (!alerts.length) {
    container.innerHTML = \`<div class="empty-state" style="padding:2rem;"><h3>Nicio alertă creată</h3><p>Adaugă o alertă pentru a fi notificat.</p></div>\`;
    return;
  }
  container.innerHTML = alerts.map((a, i) => \`
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1rem 1.25rem;margin-bottom:8px;display:flex;align-items:center;justify-content:space-between;gap:12px;">
      <div style="flex:1;">
        <div style="font-weight:500;font-size:14px;margin-bottom:2px;">"\${a.query}"</div>
        <div style="font-size:12px;color:var(--ink3);">Creată: \${a.created}</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
        <span style="font-size:11px;background:var(--accent-light);color:var(--accent);padding:3px 8px;border-radius:100px;">Activă</span>
        <button onclick="setSearch('\${a.query}');showView('search');" style="font-size:11px;background:var(--surface2);border:1px solid var(--border);padding:3px 9px;border-radius:6px;cursor:pointer;font-family:var(--font-body);">Caută acum</button>
        <button onclick="removeAlert(\${i})" style="background:none;border:none;color:var(--ink3);cursor:pointer;font-size:18px;line-height:1;">×</button>
      </div>
    </div>
  \`).join('');
}

function removeAlert(i) { alerts.splice(i, 1); renderAlerts(); persistState(); showToast('Alertă eliminată'); }

/* ── Sources view ────────────────────────────────────────────────────────── */
function renderSources() {
  const container = document.getElementById('sources-grid');
  const srcList = Object.entries(SOURCES);
  const okCount = srcList.filter(([,s])=>s.status==='ok').length;
  const warnCount = srcList.filter(([,s])=>s.status==='warn').length;
  const errCount = srcList.filter(([,s])=>s.status==='err').length;

  container.innerHTML = \`
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:2rem;">
      <div class="admin-stat"><div class="admin-stat-val" style="color:var(--accent);">\${okCount}</div><div class="admin-stat-label">Surse OK</div></div>
      <div class="admin-stat"><div class="admin-stat-val" style="color:var(--warn);">\${warnCount}</div><div class="admin-stat-label">Avertismente</div></div>
      <div class="admin-stat"><div class="admin-stat-val" style="color:var(--accent2);">\${errCount}</div><div class="admin-stat-label">Erori</div></div>
      <div class="admin-stat"><div class="admin-stat-val">\${OPPORTUNITIES.length}</div><div class="admin-stat-label">Oportunități indexate</div></div>
    </div>
    \${srcList.map(([id, s]) => \`
      <div class="source-card">
        <div class="source-indicator \${s.status}"></div>
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
            <strong style="font-size:14px;">\${s.name}</strong>
            <span style="font-size:11px;background:\${s.tier===1?'var(--accent-light)':'var(--surface2)'};color:\${s.tier===1?'var(--accent)':'var(--ink3)'};padding:2px 7px;border-radius:100px;">Tier \${s.tier}</span>
            <span style="font-size:11px;background:\${s.status==='ok'?'var(--accent-light)':s.status==='warn'?'var(--warn-light)':'var(--accent2-light)'};color:\${s.status==='ok'?'var(--accent)':s.status==='warn'?'var(--warn)':'var(--accent2)'};padding:2px 7px;border-radius:100px;">\${s.status==='ok'?'Activ':s.status==='warn'?'Avertisment':'Eroare'}</span>
          </div>
          <div style="font-size:12px;color:var(--ink3);margin-bottom:6px;">\${s.note}</div>
          <div style="font-size:11px;color:var(--ink3);">Pagini monitorizate: \${s.pages.length} &nbsp;·&nbsp; Oportunități: \${s.opps}</div>
          <div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:4px;">
            \${s.pages.map(p=>\`<a href="\${p}" target="_blank" style="font-size:11px;color:var(--accent);background:var(--accent-light);padding:2px 7px;border-radius:4px;text-decoration:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:280px;display:inline-block;">\${p.replace('https://','')}</a>\`).join('')}
          </div>
        </div>
        <div style="text-align:right;font-size:12px;color:var(--ink3);white-space:nowrap;flex-shrink:0;">
          <div style="font-family:var(--font-head);font-size:1.1rem;font-weight:700;color:var(--ink);">\${s.opps}</div>
          <div>intrări</div>
        </div>
      </div>
    \`).join('')}
  \`;
}

/* ── Admin view ──────────────────────────────────────────────────────────── */
function renderAdmin() {
  const active = OPPORTUNITIES.filter(o=>o.status==='ACTIV').length;
  const lowConf = OPPORTUNITIES.filter(o=>(o.confidence||100)<80).length;
  const editorial = OPPORTUNITIES.filter(o=>o.sourceTier===3).length;
  const errors = Object.values(SOURCES).filter(s=>s.status==='err').length;

  document.getElementById('admin-stats').innerHTML = \`
    <div class="admin-stat"><div class="admin-stat-val">\${OPPORTUNITIES.length}</div><div class="admin-stat-label">Total oportunități</div></div>
    <div class="admin-stat"><div class="admin-stat-val" style="color:var(--accent)">\${active}</div><div class="admin-stat-label">Active</div></div>
    <div class="admin-stat"><div class="admin-stat-val" style="color:var(--warn)">\${lowConf}</div><div class="admin-stat-label">Confidence scăzut</div></div>
    <div class="admin-stat"><div class="admin-stat-val" style="color:var(--ink3)">\${editorial}</div><div class="admin-stat-label">Editoriale</div></div>
    <div class="admin-stat"><div class="admin-stat-val" style="color:var(--accent2)">\${errors}</div><div class="admin-stat-label">Surse cu erori</div></div>
  \`;
  switchAdminTab(currentAdminTab);
}

function switchAdminTab(tab, btn) {
  currentAdminTab = tab;
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  else document.querySelectorAll('.admin-tab').forEach((t,i) => {
    if (['review','sources','new','dupes'][i]===tab) t.classList.add('active');
  });

  const c = document.getElementById('admin-content');

  if (tab === 'review') {
    const queue = OPPORTUNITIES.filter(o => (o.confidence||100) < 80 || o.sourceTier === 3);
    c.innerHTML = queue.length ? queue.map(o => \`
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1rem 1.25rem;margin-bottom:8px;">
        <div style="display:flex;align-items:flex-start;gap:12px;flex-wrap:wrap;">
          <div style="flex:1;">
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:6px;">
              <span class="status-badge \${o.status==='ACTIV'?'active':o.status==='URMEAZĂ'?'upcoming':'closed'}" style="font-size:10px;">\${o.status}</span>
              <span style="font-size:11px;background:\${(o.confidence||100)<75?'var(--warn-light)':'var(--surface2)'};color:\${(o.confidence||100)<75?'var(--warn)':'var(--ink3)'};padding:2px 7px;border-radius:100px;">Confidence: \${o.confidence||100}%</span>
              \${o.sourceTier===3?'<span style="font-size:11px;background:var(--surface2);color:var(--ink3);padding:2px 7px;border-radius:100px;">Sursă editorială</span>':''}
            </div>
            <div style="font-weight:500;font-size:14px;margin-bottom:4px;">\${o.title}</div>
            <div style="font-size:12px;color:var(--ink3);">\${o.source} · \${o.callCode}</div>
          </div>
          <div style="display:flex;gap:6px;flex-shrink:0;">
            <button onclick="openDetail(\${o.id})" style="font-size:12px;background:var(--accent-light);color:var(--accent);border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-family:var(--font-body);">Verifică</button>
            <button onclick="showToast('Override aplicat pentru #\${o.id}')" style="font-size:12px;background:var(--surface2);border:1px solid var(--border);color:var(--ink2);padding:6px 12px;border-radius:6px;cursor:pointer;font-family:var(--font-body);">Confirmă OK</button>
          </div>
        </div>
      </div>
    \`).join('') : '<div class="empty-state" style="padding:2rem;"><h3>Review queue gol</h3><p>Toate oportunitățile au confidence ridicat.</p></div>';
  }

  if (tab === 'sources') {
    c.innerHTML = Object.entries(SOURCES).map(([id, s]) => \`
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1rem 1.25rem;margin-bottom:8px;display:flex;align-items:center;gap:12px;">
        <div class="source-indicator \${s.status}"></div>
        <div style="flex:1;">
          <strong style="font-size:14px;">\${s.name}</strong>
          <div style="font-size:12px;color:var(--ink3);margin-top:2px;">\${s.note}</div>
        </div>
        <div style="text-align:right;font-size:12px;color:var(--ink3);">
          <div style="font-weight:500;color:var(--ink);">\${s.pages.length} pagini</div>
          <div>\${s.opps} intrări</div>
        </div>
        <button onclick="showToast('Re-crawl inițiat pentru \${s.name}')" style="font-size:12px;background:var(--surface2);border:1px solid var(--border);color:var(--ink2);padding:6px 12px;border-radius:6px;cursor:pointer;font-family:var(--font-body);flex-shrink:0;">Re-crawl</button>
      </div>
    \`).join('');
  }

  if (tab === 'new') {
    const recent = OPPORTUNITIES.filter(o => o.launchDate >= '2026-01-01').slice(0, 8);
    c.innerHTML = recent.map(o => \`
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1rem 1.25rem;margin-bottom:8px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
        <div style="flex:1;">
          <div style="font-weight:500;font-size:14px;margin-bottom:2px;">\${o.title}</div>
          <div style="font-size:12px;color:var(--ink3);">\${o.source} · Lansat: \${o.launchDate}</div>
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0;">
          <button onclick="openDetail(\${o.id})" style="font-size:12px;background:var(--accent-light);color:var(--accent);border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-family:var(--font-body);">Detalii</button>
          <button onclick="showToast('Publicat în index: #\${o.id}')" style="font-size:12px;background:var(--accent);color:white;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-family:var(--font-body);">Publică</button>
        </div>
      </div>
    \`).join('');
  }

  if (tab === 'dupes') {
    c.innerHTML = \`
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1rem 1.25rem;margin-bottom:8px;">
        <div style="font-weight:500;margin-bottom:8px;font-size:14px;">Potențial duplicat detectat — similaritate 78%</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:10px;">
          <div style="background:var(--surface2);border-radius:8px;padding:0.75rem;font-size:13px;">
            <div style="font-weight:500;margin-bottom:4px;">ID #7 — ADR Vest IMM Valea Jiului</div>
            <div style="color:var(--ink3);font-size:12px;">PTJ/IMM/VALEAJIULUI/2025 · adrvest.ro</div>
          </div>
          <div style="background:var(--surface2);border-radius:8px;padding:0.75rem;font-size:13px;">
            <div style="font-weight:500;margin-bottom:4px;">ID #6 — PTJ Mobilitate verde</div>
            <div style="color:var(--ink3);font-size:12px;">PTJ/MOBILITATE-VERDE/2026 · mfe.gov.ro</div>
          </div>
        </div>
        <div style="display:flex;gap:8px;">
          <button onclick="showToast('Marcat ca distinct — nu duplicat')" style="font-size:12px;background:var(--surface2);border:1px solid var(--border);padding:6px 12px;border-radius:6px;cursor:pointer;font-family:var(--font-body);">Nu sunt duplicate</button>
          <button onclick="showToast('Contopite în intrare unică!')" style="font-size:12px;background:var(--accent);color:white;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-family:var(--font-body);">Contopește</button>
        </div>
      </div>
      <div class="empty-state" style="padding:1.5rem;"><p style="font-size:13px;">1 duplicat suspect detectat. Restul oportunităților au fingerprint unic.</p></div>
    \`;
  }
}

/* ── Shared utils ────────────────────────────────────────────────────────── */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeCompare();
  }
});

init();
</script>
</body>
</html>
`;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResp(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

const API_OPPORTUNITIES = [
  { id:1,  status:'ACTIV',   source:'mfe.gov.ro',             sourceTier:1, domains:['Antreprenoriat','Digitalizare'],                  beneficiaries:['IMM','Universitate'],       regions:[`Național`],  grantMin:500000,  grantMax:5000000,  program:'PoCIDIF' },
  { id:2,  status:'ACTIV',   source:'mfe.gov.ro',             sourceTier:1, domains:['Energie'],                                         beneficiaries:['IMM'],                      regions:[`Național`],  grantMin:5000,    grantMax:30000,    program:'PNRR C16' },
  { id:3,  status:'ACTIV',   source:'mfe.gov.ro',             sourceTier:1, domains:['Mediu'],                                           beneficiaries:['ONG','UAT','Universitate'], regions:[`Național`],  grantMin:100000,  grantMax:3000000,  program:'PDD' },
  { id:4,  status:'ACTIV',   source:'mfe.gov.ro',             sourceTier:1, domains:['Sănătate'],                                        beneficiaries:['UAT','Universitate'],       regions:[`Național`],  grantMin:1000000, grantMax:50000000, program:'Programul Sănătate' },
  { id:5,  status:'ACTIV',   source:'mfe.gov.ro',             sourceTier:1, domains:['Incluziune socială'],                              beneficiaries:['ONG','UAT'],                regions:[`Național`],  grantMin:50000,   grantMax:500000,   program:'PoIDS' },
  { id:6,  status:'URMEAZĂ', source:'mfe.gov.ro',             sourceTier:1, domains:['Energie','Infrastructură'],                        beneficiaries:['UAT','IMM'],                regions:[`Național`],  grantMin:200000,  grantMax:10000000, program:'PTJ' },
  { id:7,  status:'ÎNCHIS',  source:'adrvest.ro',             sourceTier:1, domains:['Antreprenoriat','Energie'],                        beneficiaries:['IMM'],                      regions:['Vest'],      grantMin:50000,   grantMax:2000000,  program:'PTJ IMM' },
  { id:8,  status:'ACTIV',   source:'adrvest.ro',             sourceTier:1, domains:['Infrastructură','Antreprenoriat'],                 beneficiaries:['UAT','IMM'],                regions:['Vest'],      grantMin:1000000, grantMax:20000000, program:'PTJ Parcuri' },
  { id:9,  status:'ACTIV',   source:'adrvest.ro',             sourceTier:1, domains:['Energie'],                                         beneficiaries:['IMM','UAT'],                regions:['Vest'],      grantMin:200000,  grantMax:10000000, program:'PTJ Energie' },
  { id:10, status:'ACTIV',   source:'adrvest.ro',             sourceTier:1, domains:['Antreprenoriat','Digitalizare'],                   beneficiaries:['Startup'],                  regions:['Vest'],      grantMin:50000,   grantMax:100000,   program:'Vest Ventures' },
  { id:11, status:'ACTIV',   source:'adrvest.ro',             sourceTier:1, domains:['Cultură','Turism'],                                beneficiaries:['UAT','ONG'],                regions:['Vest'],      grantMin:200000,  grantMax:4000000,  program:'PR Vest UNESCO' },
  { id:12, status:'ACTIV',   source:'adrvest.ro',             sourceTier:1, domains:['Sănătate'],                                        beneficiaries:['UAT'],                      regions:['Vest'],      grantMin:1000000, grantMax:3000000,  program:'PR Vest Sănătate' },
  { id:13, status:'ACTIV',   source:'adrnordest.ro',          sourceTier:1, domains:['Antreprenoriat','Infrastructură','Digitalizare'],  beneficiaries:['IMM','UAT','ONG'],          regions:['Nord-Est'],  grantMin:50000,   grantMax:15000000, program:'PR Nord-Est' },
  { id:14, status:'ACTIV',   source:'afir.ro',                sourceTier:1, domains:['Agricultură'],                                     beneficiaries:['Fermier'],                  regions:[`Național`],  grantMin:10000,   grantMax:300000,   program:'PNDR' },
  { id:15, status:'ÎNCHIS',  source:'commission.europa.eu',   sourceTier:1, domains:['Cercetare / inovare','Digitalizare'],              beneficiaries:['Universitate','IMM'],       regions:[`Național`],  grantMin:500000,  grantMax:10000000, program:'Horizon Europe' },
  { id:16, status:'URMEAZĂ', source:'fonduri-structurale.ro', sourceTier:3, domains:['Incluziune socială'],                              beneficiaries:['ONG'],                      regions:[`Național`],  grantMin:50000,   grantMax:400000,   program:'FSE+' },
  { id:17, status:'ACTIV',   source:'oportunitati-ue.gov.ro', sourceTier:1, domains:['Digitalizare'],                                    beneficiaries:['IMM','Startup'],            regions:[`Național`],  grantMin:30000,   grantMax:500000,   program:'PNRR C7' },
  { id:18, status:'ÎNCHIS',  source:'startupcafe.ro',         sourceTier:3, domains:['Antreprenoriat'],                                  beneficiaries:['Startup'],                  regions:[`Național`],  grantMin:25000,   grantMax:250000,   program:'Start-Up Nation' },
  { id:19, status:'ÎNCHIS',  source:'vest.ro',                sourceTier:1, domains:['Antreprenoriat'],                                  beneficiaries:['IMM'],                      regions:['Vest'],      grantMin:200000,  grantMax:2000000,  program:'POR Vest' },

  { id:20, status:'URMEĂZĂ', source:'eeagrants.ro', sourceTier:1, domains:['Mediu','Educație','Sănătate','Cercetare / inovare','Incluziune socială','Cultură'], beneficiaries:['ONG','IMM','UAT','Universitate'], regions:[`Național`], grantMin:50000, grantMax:5000000, program:'Granturi SEE & Norvegiene' },];

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });

    if (pathname === '/api/search') {
      const q = (url.searchParams.get('q') || '').toLowerCase().trim();
      const statusF = url.searchParams.getAll('status');
      const domainF = url.searchParams.getAll('domain');
      const benefF  = url.searchParams.getAll('beneficiary');
      const regionF = url.searchParams.getAll('region');
      const sort    = url.searchParams.get('sort') || 'relevance';

      let results = API_OPPORTUNITIES.filter(o => {
        if (statusF.length && !statusF.includes(o.status)) return false;
        if (domainF.length && !domainF.some(d => o.domains.includes(d))) return false;
        if (benefF.length  && !benefF.some(b => o.beneficiaries.includes(b))) return false;
        if (regionF.length && !regionF.some(r => o.regions.includes(r))) return false;
        if (q) {
          const hay = [o.program, ...o.domains, ...o.beneficiaries, ...o.regions, o.source].join(' ').toLowerCase();
          if (!q.split(' ').filter(Boolean).every(w => hay.includes(w))) return false;
        }
        return true;
      });

      if (sort === 'grant_desc') results.sort((a, b) => b.grantMax - a.grantMax);
      else results.sort((a, b) =>
        (a.status === 'ACTIV' ? 0 : a.status === 'URMEAZĂ' ? 1 : 2) -
        (b.status === 'ACTIV' ? 0 : b.status === 'URMEAZĂ' ? 1 : 2)
      );

      return jsonResp({ total: results.length, results });
    }

    if (pathname === '/api/stats') {
      const active = API_OPPORTUNITIES.filter(o => o.status === 'ACTIV').length;
      return jsonResp({ total: API_OPPORTUNITIES.length, active, sources: 10 });
    }

    if (pathname === '/api/waitlist') {
      return jsonResp({ ok: true, message: 'Înscris pe lista de așteptare!' });
    }

    return new Response(HTML, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=60',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  },
};
