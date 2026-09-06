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
  --bg: #f5f7fc;
  --surface: #ffffff;
  --surface2: #eef2fa;
  --ink: #0f172a;
  --ink2: #475569;
  --ink3: #94a3b8;
  --accent: #2563eb;
  --accent-light: #e3ecff;
  --accent-dark: #1d4ed8;
  --sky: #06b6d4;
  --sky-light: #dff7fb;
  --accent2: #f97316;
  --accent2-light: #fff1e6;
  --warn: #d97706;
  --warn-light: #fef3e2;
  --border: rgba(15,23,42,0.09);
  --border2: rgba(15,23,42,0.05);
  --radius: 14px;
  --radius-lg: 22px;
  --font-head: 'Space Grotesk', 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --shadow: 0 3px 8px rgba(37,99,235,0.06), 0 18px 44px rgba(37,99,235,0.10);
  --shadow-sm: 0 1px 3px rgba(37,99,235,0.05), 0 4px 14px rgba(37,99,235,0.06);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font-body);
  background: radial-gradient(1100px 520px at 12% -10%, rgba(37,99,235,0.10), transparent 60%), radial-gradient(900px 480px at 92% -5%, rgba(6,182,212,0.10), transparent 60%), var(--bg);
  background-attachment: fixed;
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
  background: rgba(245,247,252,0.92);
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
  box-shadow: 0 2px 8px rgba(37,99,235,0.35);
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
  background: linear-gradient(135deg, var(--accent) 0%, var(--sky) 130%) !important;
  box-shadow: 0 4px 14px rgba(37,99,235,0.28);
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
  border: 1px solid rgba(37,99,235,0.16);
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
.hero h1 em { font-style: normal; background: linear-gradient(90deg, var(--accent), var(--sky)); -webkit-background-clip: text; background-clip: text; color: transparent; }

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
  box-shadow: 0 0 0 4px rgba(37,99,235,0.14), var(--shadow);
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
  background: linear-gradient(135deg, var(--accent) 0%, var(--sky) 130%);
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
  background: linear-gradient(90deg, var(--accent), var(--sky)); -webkit-background-clip: text; background-clip: text; color: transparent;
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
  border-color: rgba(37,99,235,0.35);
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
.status-badge.active { background: var(--accent-light); color: var(--accent); border: 1px solid rgba(37,99,235,0.2); }
.status-badge.active::before { content: ''; width: 5px; height: 5px; background: var(--accent); border-radius: 50%; }
.status-badge.upcoming { background: var(--warn-light); color: var(--warn); border: 1px solid rgba(217,119,6,0.22); }
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
  border: 1px solid rgba(249,115,22,0.2);
}

.warn {
  font-size: 10px;
  font-weight: 500;
  padding: 3px 9px;
  border-radius: 100px;
  flex-shrink: 0;
  background: var(--warn-light);
  color: var(--warn);
  border: 1px solid rgba(217,119,6,0.2);
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
.meta-tag.domain { background: var(--sky-light); color: #0e7490; }
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
  border: 1px solid rgba(37,99,235,0.2);
  padding: 5px 13px;
  border-radius: 7px;
  cursor: pointer;
  transition: background 0.12s;
  white-space: nowrap;
}
.btn-detail:hover { background: #d3e0ff; }

/* ── MODAL ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15,23,42,0.45);
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
  box-shadow: 0 6px 12px rgba(15,23,42,0.10), 0 24px 64px rgba(15,23,42,0.14);
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
  border: 1px solid rgba(37,99,235,0.2);
  background: var(--accent-light);
  padding: 6px 12px;
  border-radius: var(--radius);
  margin-right: 6px;
  margin-bottom: 6px;
  transition: background 0.1s;
}
.source-link:hover { background: #d3e0ff; }

.disclaimer {
  background: var(--warn-light);
  border: 1px solid rgba(217,119,6,0.18);
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
  background: rgba(15,23,42,0.5);
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
  box-shadow: 0 6px 12px rgba(15,23,42,0.10), 0 24px 64px rgba(15,23,42,0.14);
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
  box-shadow: 0 8px 32px rgba(15,23,42,0.25);
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
  background: linear-gradient(90deg, var(--surface2) 25%, #e2e8f0 50%, var(--surface2) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: var(--radius);
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

/* ── FOOTER ── */
footer {
  background: linear-gradient(180deg, #0f172a, #111c3a);
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

/* ── MATCH PROMPT ── */
.m-prompt {
  width: 100%;
  min-height: 150px;
  padding: 14px 16px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--ink);
  background: var(--surface);
  resize: vertical;
  outline: none;
  transition: border-color .15s, box-shadow .15s;
}
.m-prompt::placeholder { color: var(--ink3); font-weight: 300; }
.m-prompt:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37,99,235,.10); }
.m-example {
  font-size: 11.5px;
  color: var(--ink2);
  background: var(--surface2);
  border: 1px solid var(--border);
  padding: 4px 10px;
  border-radius: 100px;
  cursor: pointer;
  font-family: var(--font-body);
  transition: all .12s;
}
.m-example:hover { background: var(--accent-light); color: var(--accent); border-color: rgba(37,99,235,.25); }
@media (max-width: 768px) {
  #view-match [style*="grid-template-columns:1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
}

/* ── DEADLINE BAR ── */
.deadline-bar { height: 3px; background: var(--surface2); border-radius: 100px; overflow: hidden; margin: 2px 0 10px; }
.deadline-bar > div { height: 100%; border-radius: 100px; transition: width .3s; }
/* ── CLOSING STRIP ── */
.closing-strip { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: .9rem 1.1rem; box-shadow: var(--shadow-sm); text-align: left; }
.closing-strip-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: .6rem; }
.closing-strip-title { font-size: 12px; font-weight: 600; color: var(--accent2); letter-spacing: .4px; text-transform: uppercase; display: flex; align-items: center; gap: 6px; }
.closing-item { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 7px 0; border-top: 1px solid var(--border2); cursor: pointer; }
.closing-item:first-of-type { border-top: none; }
.closing-item:hover .closing-name { color: var(--accent); }
.closing-name { font-size: 13px; font-weight: 500; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; }
.closing-days { font-size: 11px; font-weight: 600; padding: 2px 9px; border-radius: 100px; white-space: nowrap; }
/* ── CALENDAR ── */
.cal-month { margin-bottom: 1.5rem; }
.cal-month-head { display: flex; align-items: baseline; gap: 10px; margin-bottom: .6rem; position: sticky; top: 62px; background: var(--bg); padding: 6px 0; z-index: 5; }
.cal-month-name { font-family: var(--font-head); font-size: 1.05rem; font-weight: 700; letter-spacing: -.3px; }
.cal-month-count { font-size: 12px; color: var(--ink3); }
.cal-row { display: grid; grid-template-columns: 58px 1fr auto; gap: 14px; align-items: center; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: .75rem 1rem; margin-bottom: 6px; cursor: pointer; transition: border-color .12s, transform .12s, box-shadow .12s; box-shadow: var(--shadow-sm); }
.cal-row:hover { border-color: rgba(37,99,235,.35); transform: translateY(-1px); box-shadow: var(--shadow); }
.cal-day { text-align: center; }
.cal-day-num { font-family: var(--font-head); font-size: 1.3rem; font-weight: 700; line-height: 1; }
.cal-day-name { font-size: 10px; color: var(--ink3); text-transform: uppercase; letter-spacing: .5px; }
.cal-title { font-size: 13.5px; font-weight: 500; color: var(--ink); margin-bottom: 2px; }
.cal-meta { font-size: 11.5px; color: var(--ink3); }
.cal-right { text-align: right; white-space: nowrap; }
.cal-grant { font-family: var(--font-head); font-weight: 700; font-size: 13px; }
@media (max-width: 768px) { .cal-row { grid-template-columns: 48px 1fr; } .cal-right { display: none; } }
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
    <li><a onclick="showView('match')">Potrivire AI</a></li>
    <li><a onclick="showView('calendar')">Calendar</a></li>
    <li><a onclick="showView('saved')">Salvate</a></li>
    <li><a onclick="showView('alerts')">Alerte</a></li>
    <li><a onclick="showView('sources')">Surse</a></li>
    <li><a onclick="showView('admin')">Admin</a></li>
    <li><a class="nav-cta" id="nav-auth" onclick="openAuth()">Intră în cont</a></li>
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
    <div id="closing-strip" style="display:none;max-width:860px;margin:1.25rem auto 0;"></div>
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

<div id="view-match" style="display:none;max-width:860px;margin:2.5rem auto;padding:0 2rem 4rem;">
  <div style="text-align:center;margin-bottom:1.75rem;">
    <div class="hero-badge" style="margin-bottom:.9rem;">✨ Asistent AI de potrivire</div>
    <h2 style="font-family:var(--font-head);font-size:1.6rem;font-weight:700;letter-spacing:-0.5px;margin-bottom:0.45rem;">Descrie proiectul tău. AI-ul găsește finanțarea.</h2>
    <p style="color:var(--ink2);font-size:14px;font-weight:300;max-width:540px;margin:0 auto;">Cu cât descrii mai concret ce vrei să faci, cu atât potrivirile și explicațiile sunt mai bune.</p>
  </div>

  <div id="m-gate" style="display:none;background:var(--surface);border:1.5px solid rgba(37,99,235,.25);border-radius:var(--radius-lg);box-shadow:var(--shadow);padding:1.5rem;margin-bottom:1.25rem;align-items:center;gap:16px;flex-wrap:wrap;">
    <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,var(--accent) 0%,var(--sky) 130%);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">🔒</div>
    <div style="flex:1;min-width:220px;">
      <div style="font-family:var(--font-head);font-weight:700;font-size:1rem;margin-bottom:3px;">Potrivirea AI necesită un cont gratuit</div>
      <div style="font-size:13px;color:var(--ink2);font-weight:300;line-height:1.5;">Fără parolă — un link pe email și ești înăuntru. Contul îți păstrează și alertele.</div>
    </div>
    <button onclick="openAuth('match')" style="padding:10px 20px;background:linear-gradient(135deg,var(--accent) 0%,var(--sky) 130%);color:white;border:none;border-radius:var(--radius);font-family:var(--font-body);font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;">Creează cont / Intră →</button>
  </div>

  <div id="m-form" style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);overflow:hidden;margin-bottom:1.5rem;transition:opacity .2s,filter .2s;">

    <!-- PROMPT: the primary input -->
    <div style="padding:1.25rem 1.5rem 0.75rem;">
      <label class="filter-label" style="display:flex;justify-content:space-between;align-items:center;">
        <span>Descrie proiectul</span>
        <span id="m-desc-count" style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--ink3);">0 / 1500</span>
      </label>
      <textarea id="m-desc" class="m-prompt" rows="6" maxlength="1500" oninput="mDescCount(this)"
        placeholder="ex: Suntem o fermă de familie din județul Timiș (SRL, 3 angajați). Vrem să instalăm panouri fotovoltaice de 100 kW pe hala de depozitare și să cumpărăm un sistem de irigații prin picurare. Buget estimat 180.000 €, putem cofinanța 20%. Am mai avut un proiect AFIR în 2022."></textarea>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
        <span style="font-size:11px;color:var(--ink3);align-self:center;margin-right:2px;">Exemple:</span>
        <button type="button" class="m-example" onclick="mUseExample(this)">Digitalizare magazin online IMM</button>
        <button type="button" class="m-example" onclick="mUseExample(this)">ONG — centru de zi pentru vârstnici</button>
        <button type="button" class="m-example" onclick="mUseExample(this)">Primărie — eficiență energetică școală</button>
        <button type="button" class="m-example" onclick="mUseExample(this)">Startup tech — produs AI, seed</button>
      </div>
    </div>

    <hr class="filter-sep" style="margin:0.75rem 1.5rem;">

    <!-- STRUCTURED HINTS: secondary -->
    <div style="padding:0.75rem 1.5rem 1.5rem;">
      <div style="font-size:11px;color:var(--ink3);margin-bottom:10px;">Opțional — precizează ca să restrângem candidații:</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">
        <div>
          <label class="filter-label">Tip organizație</label>
          <select id="m-org" class="wl-input">
            <option value="">Nespecificat</option>
            <option value="IMM">IMM</option>
            <option value="Startup">Startup</option>
            <option value="ONG">ONG</option>
            <option value="UAT">UAT / Autoritate publică</option>
            <option value="Fermier">Fermier</option>
            <option value="Universitate">Universitate</option>
          </select>
        </div>
        <div>
          <label class="filter-label">Regiune</label>
          <select id="m-region" class="wl-input">
            <option value="Oricare">Oricare</option>
            <option value="Vest">Vest</option>
            <option value="Nord-Vest">Nord-Vest</option>
            <option value="Nord-Est">Nord-Est</option>
            <option value="Centru">Centru</option>
            <option value="București-Ilfov">București-Ilfov</option>
            <option value="Național">Național</option>
          </select>
        </div>
        <div>
          <label class="filter-label">Buget estimat (€)</label>
          <input type="number" id="m-size" class="wl-input" placeholder="ex: 250000" min="0" step="10000">
        </div>
      </div>

      <div style="margin-top:12px;">
        <label class="filter-label">Domenii</label>
        <div class="filter-chips" id="m-domains">
          <button type="button" class="chip" onclick="mToggleDomain(this)" data-val="Digitalizare">Digitalizare</button>
          <button type="button" class="chip" onclick="mToggleDomain(this)" data-val="Energie">Energie</button>
          <button type="button" class="chip" onclick="mToggleDomain(this)" data-val="Agricultură">Agricultură</button>
          <button type="button" class="chip" onclick="mToggleDomain(this)" data-val="Antreprenoriat">Antreprenoriat</button>
          <button type="button" class="chip" onclick="mToggleDomain(this)" data-val="Infrastructură">Infrastructură</button>
          <button type="button" class="chip" onclick="mToggleDomain(this)" data-val="Mediu">Mediu</button>
          <button type="button" class="chip" onclick="mToggleDomain(this)" data-val="Sănătate">Sănătate</button>
          <button type="button" class="chip" onclick="mToggleDomain(this)" data-val="Cercetare / inovare">Cercetare</button>
          <button type="button" class="chip" onclick="mToggleDomain(this)" data-val="Incluziune socială">Incluziune</button>
          <button type="button" class="chip" onclick="mToggleDomain(this)" data-val="Cultură">Cultură</button>
          <button type="button" class="chip" onclick="mToggleDomain(this)" data-val="Turism">Turism</button>
        </div>
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:18px;flex-wrap:wrap;">
        <span style="font-size:11px;color:var(--ink3);">Ctrl/⌘ + Enter pentru a rula</span>
        <button onclick="runMatch()" id="m-btn" style="padding:11px 26px;background:linear-gradient(135deg,var(--accent) 0%,var(--sky) 130%);color:white;border:none;border-radius:var(--radius);font-family:var(--font-body);font-size:14px;font-weight:500;cursor:pointer;box-shadow:var(--shadow-sm);">
          ✨ Găsește potrivirile
        </button>
      </div>
    </div>
  </div>

  <div id="m-results"></div>
</div>

<div id="view-calendar" style="display:none;max-width:960px;margin:2.5rem auto;padding:0 2rem 4rem;">
  <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:1.5rem;">
    <div>
      <h2 style="font-family:var(--font-head);font-size:1.4rem;font-weight:700;letter-spacing:-0.5px;margin-bottom:.3rem;">Calendar finanțări</h2>
      <p style="color:var(--ink2);font-size:14px;font-weight:300;">Termene limită pe următoarele 6 luni. Nu rata niciun apel.</p>
    </div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;">
      <button class="chip active" onclick="calSetFilter('all',this)">Toate</button>
      <button class="chip" onclick="calSetFilter('30',this)">≤ 30 zile</button>
      <button class="chip" onclick="calSetFilter('active',this)">Doar active</button>
    </div>
  </div>
  <div id="cal-body"></div>
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
      <input type="text" id="alert-query" placeholder="Cuvinte cheie (ex: digitalizare IMM)" style="flex:1;padding:9px 12px;border:1px solid var(--border);border-radius:8px;font-family:var(--font-body);font-size:14px;outline:none;background:var(--surface);">
      <input type="email" id="alert-email" placeholder="email@exemplu.ro" style="flex:1;padding:9px 12px;border:1px solid var(--border);border-radius:8px;font-family:var(--font-body);font-size:14px;outline:none;background:var(--surface);">
      <button onclick="saveAlert()" style="background:var(--accent);color:white;border:none;padding:9px 18px;border-radius:8px;font-family:var(--font-body);font-size:13px;font-weight:500;cursor:pointer;">+ Adaugă alertă</button>
    </div>
    <p style="font-size:12px;color:var(--ink3);font-weight:300;">Cu email: primești imediat un rezumat, apoi un digest săptămânal cu oportunități noi și termene care se apropie. Fără email: alerta e doar locală, în acest browser.</p>
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
        <button onclick="submitWaitlist()" style="margin-top:4px;padding:12px;background:var(--accent);color:white;border:none;border-radius:var(--radius);font-family:var(--font-body);font-size:14px;font-weight:500;cursor:pointer;transition:background .15s;" onmouseover="this.style.background='#1e40af'" onmouseout="this.style.background='var(--accent)'">
          Înscrie-te pe lista de așteptare →
        </button>
        <p style="font-size:11px;color:var(--ink3);text-align:center;font-weight:300;">Fără spam. Poți anula oricând.</p>
      </div>
    </div>
  </div>
</div>

<!-- AUTH MODAL -->
<div class="modal-overlay" id="auth-overlay" onclick="closeAuth(event)">
  <div class="modal" style="max-width:440px;">
    <div class="modal-header">
      <button class="modal-close" onclick="closeAuth()">×</button>
      <div style="display:inline-flex;align-items:center;gap:6px;background:var(--accent-light);color:var(--accent);font-size:11px;font-weight:600;padding:4px 10px;border-radius:100px;margin-bottom:10px;letter-spacing:.3px;text-transform:uppercase;">Cont FinMatch</div>
      <h2 style="font-family:var(--font-head);font-size:1.2rem;font-weight:700;letter-spacing:-.3px;margin-bottom:5px;" id="auth-title">Intră sau creează cont</h2>
      <p style="font-size:13px;color:var(--ink2);font-weight:300;" id="auth-sub">Fără parolă. Îți trimitem un link pe email — un click și ești înăuntru.</p>
    </div>
    <div class="modal-body" id="auth-body">
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div>
          <label class="wl-label">Email</label>
          <input type="email" id="auth-email" class="wl-input" placeholder="email@exemplu.ro" autocomplete="email">
        </div>
        <div id="auth-extra" style="display:flex;flex-direction:column;gap:12px;">
          <div>
            <label class="wl-label">Nume <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--ink3);">(opțional)</span></label>
            <input type="text" id="auth-name" class="wl-input" placeholder="Numele tău" autocomplete="name">
          </div>
          <div>
            <label class="wl-label">Tip organizație <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--ink3);">(opțional)</span></label>
            <select id="auth-org" class="wl-input" style="cursor:pointer;">
              <option value="">Selectează...</option>
              <option>IMM / Startup</option>
              <option>ONG</option>
              <option>UAT / Instituție publică</option>
              <option>Consultant fonduri europene</option>
              <option>Fermier / Agricultură</option>
              <option>Altele</option>
            </select>
          </div>
        </div>
        <button onclick="requestLogin()" id="auth-btn" style="margin-top:4px;padding:12px;background:linear-gradient(135deg,var(--accent) 0%,var(--sky) 130%);color:white;border:none;border-radius:var(--radius);font-family:var(--font-body);font-size:14px;font-weight:500;cursor:pointer;">Trimite-mi linkul de acces →</button>
        <p style="font-size:11px;color:var(--ink3);text-align:center;font-weight:300;">Prin continuare accepți că îți stocăm emailul pentru autentificare și alerte. Fără spam.</p>
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
    name: 'Fonduri Structurale', tier: 3, status: 'ok', note: 'Sursă editorială — crawling live via Firecrawl', opps: 1,
    pages: ['https://www.fonduri-structurale.ro']
  },
  'startupcafe.ro': {
    name: 'StartupCafe', tier: 3, status: 'ok', note: 'Sursă editorială — crawling live via Firecrawl', opps: 1,
    pages: ['https://www.startupcafe.ro/finantari']
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
  'cinea.ec.europa.eu': {
    name: 'CINEA (Comisia Europeană)', tier: 1, status: 'warn',
    note: 'Agenția Executivă pentru Climă, Infrastructură și Mediu — LIFE, CEF, Innovation Fund. Crawling live via Firecrawl.',
    opps: 0,
    pages: ['https://cinea.ec.europa.eu/funding-and-tenders_en', 'https://cinea.ec.europa.eu/programmes/life_en']
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

async function loadPublished() {
  try {
    const r = await fetch('/api/opportunities');
    if (!r.ok) return;
    const j = await r.json();
    if (j.opportunities && j.opportunities.length) {
      const existing = new Set(OPPORTUNITIES.map(o => o.id));
      for (const o of j.opportunities) if (!existing.has(o.id)) OPPORTUNITIES.push(o);
      const ac = OPPORTUNITIES.filter(o => o.status === 'ACTIV').length;
      const el = document.getElementById('cnt-active'); if (el) el.textContent = ac;
      const ct = document.getElementById('cnt-today'); if (ct) ct.textContent = OPPORTUNITIES.length;
      if (typeof renderResults === 'function') renderResults();
      renderClosingStrip();
    }
  } catch(e) {}
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
  renderClosingStrip();
  loadPublished();
  checkAuth();
  document.getElementById('search-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') doSearch();
  });
}

/* ── View routing ────────────────────────────────────────────────────────── */
function showView(view) {
  ['search','match','calendar','saved','alerts','sources','admin'].forEach(v => {
    const el = document.getElementById('view-' + v);
    if (el) el.style.display = v === view ? 'block' : 'none';
  });
  document.querySelectorAll('.nav-links a').forEach((a, i) => {
    a.classList.toggle('active', ['search','match','calendar','saved','alerts','sources','admin'][i] === view);
  });
  if (view === 'saved') renderSaved();
  if (view === 'alerts') { renderAlerts(); try { const e = localStorage.getItem('fm_email'); const el = document.getElementById('alert-email'); if (e && el && !el.value) el.value = e; } catch(x) {} }
  if (view === 'sources') renderSources();
  if (view === 'admin') renderAdmin();
  if (view === 'match') initMatch();
  if (view === 'calendar') renderCalendar();
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
            \${o.isUrgent ? '<span style="font-size:11px;background:#fff1e6;color:#c2410c;padding:3px 8px;border-radius:100px;font-weight:500;">⏰ Termen aproape</span>' : ''}
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
        <div class="deadline-bar" style="\${dlBar(o).style}"><div style="width:\${dlBar(o).pct}%;background:\${dlBar(o).color};"></div></div>
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
async function saveAlert() {
  const q = document.getElementById('alert-query').value.trim();
  const emailEl = document.getElementById('alert-email');
  const email = emailEl ? emailEl.value.trim() : '';
  if (!q) return showToast('Introduceți un termen de căutare');
  const entry = { query: q, created: new Date().toLocaleDateString('ro-RO'), active: true, email: email || null, subId: null };
  if (email) {
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(email)) return showToast('Email invalid');
    try { localStorage.setItem('fm_email', email); } catch(e) {}
    try {
      const r = await fetch('/api/alerts/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, query: q }) });
      const j = await r.json();
      if (j.ok) {
        entry.subId = j.id;
        showToast(j.emailSent ? ('\u2713 Alert\u0103 activ\u0103 \u2014 email trimis (' + (j.matches||0) + ' potriviri)') : ('Alert\u0103 salvat\u0103. Email: ' + (j.emailError || 'nesetat')));
      } else { showToast('\u2717 ' + (j.error || 'Eroare la abonare')); return; }
    } catch(e) { showToast('\u2717 Eroare re\u021Bea'); return; }
  } else {
    showToast('Alert\u0103 local\u0103 creat\u0103: \"' + q + '\"');
  }
  alerts.push(entry);
  document.getElementById('alert-query').value = '';
  renderAlerts();
  persistState();
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
        <span style="font-size:11px;background:\${a.email?'var(--accent-light)':'var(--surface2)'};color:\${a.email?'var(--accent)':'var(--ink3)'};padding:3px 8px;border-radius:100px;">\${a.email?'\u2709 '+a.email:'Local\u0103'}</span>
        <button onclick="setSearch('\${a.query}');showView('search');" style="font-size:11px;background:var(--surface2);border:1px solid var(--border);padding:3px 9px;border-radius:6px;cursor:pointer;font-family:var(--font-body);">Caută acum</button>
        <button onclick="removeAlert(\${i})" style="background:none;border:none;color:var(--ink3);cursor:pointer;font-size:18px;line-height:1;">×</button>
      </div>
    </div>
  \`).join('');
}

function removeAlert(i) {
  const a = alerts[i];
  if (a && a.subId && a.email) { fetch('/api/alerts/unsubscribe?id=' + encodeURIComponent(a.subId) + '&e=' + encodeURIComponent(a.email)).catch(()=>{}); }
  alerts.splice(i, 1); renderAlerts(); persistState(); showToast('Alert\u0103 eliminat\u0103');
}

/* ── Sources view ────────────────────────────────────────────────────────── */
async function renderSources() {
  const container = document.getElementById('sources-grid');
  let live = {}, lastRun = null;
  try { const r = await fetch('/api/sources'); if (r.ok) { const j = await r.json(); live = j.sources || {}; lastRun = j.lastFullRun; } } catch(e) {}
  window.__lastCrawl = lastRun;
  const merged = {};
  for (const [h, s] of Object.entries(SOURCES)) {
    const l = live[h];
    merged[h] = l ? Object.assign({}, s, { status: l.status, lastRun: l.lastRun, chars: l.chars, error: l.error }) : s;
  }
  // Custom sources added from Admin (not in the static SOURCES map)
  try {
    const rr = await fetch('/api/sources'); const jj = rr.ok ? await rr.json() : {};
    for (const s of (jj.registry || [])) {
      if (merged[s.host] || !s.enabled) continue;
      const l = live[s.host] || {};
      merged[s.host] = { name: s.name, tier: s.tier, status: l.status || 'warn', note: s.builtin ? 'Surs\u0103 monitorizat\u0103' : 'Ad\u0103ugat\u0103 manual din Admin', opps: (l.published||0), pages: [s.url], lastRun: l.lastRun, error: l.error };
    }
  } catch(e) {}
  const srcList = Object.entries(merged);
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
    c.innerHTML = '<div class="empty-state" style="padding:2rem;"><p>Se încarcă coada de review...</p></div>';
    Promise.all([fetch('/api/review').then(r=>r.json()), fetch('/api/opportunities').then(r=>r.json())]).then(function(res){
      const j = res[0] || {}; const pubj = res[1] || {};
      const published = (pubj.opportunities || []);
      const pubHtml = '<div style="display:flex;align-items:center;justify-content:space-between;margin:0 0 10px;">'
        + '<div style="font-size:12px;color:var(--ink3);"><strong style="color:var(--ink);">' + published.length + '</strong> publicate automat (confidence \u2265 78)</div>'
        + (published.length ? '<button onclick="purgeAuto(this)" style="font-size:11px;background:var(--accent2-light);color:var(--accent2);border:1px solid rgba(249,115,22,.25);padding:4px 10px;border-radius:6px;cursor:pointer;font-family:var(--font-body);">Retrage toate auto-publicate</button>' : '')
        + '</div>'
        + published.map(function(o){
          return '<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:.75rem 1rem;margin-bottom:6px;display:flex;align-items:center;gap:10px;">'
            + '<div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + o.title + '</div>'
            + '<div style="font-size:11px;color:var(--ink3);">' + o.source + ' \u00b7 conf ' + (o.confidence||0) + '% \u00b7 ' + (o.deadline||'') + '</div></div>'
            + '<button onclick="unpublishAuto(' + o.id + ',this)" style="font-size:11px;background:var(--surface2);border:1px solid var(--border);color:var(--ink2);padding:4px 10px;border-radius:6px;cursor:pointer;font-family:var(--font-body);flex-shrink:0;">Retrage</button>'
            + '</div>';
        }).join('')
        + (published.length ? '<hr class="filter-sep" style="margin:14px 0;">' : '');
      const items = (j && j.items) || [];
      if (!items.length) { c.innerHTML = pubHtml + '<div class="empty-state" style="padding:2rem;"><h3>Coadă goală</h3><p>Nicio oportunitate auto-extrasă în așteptare. Rulează un re-crawl în tab-ul Surse.</p></div>'; return; }
      c.innerHTML = pubHtml + '<div style="font-size:12px;color:var(--ink3);margin-bottom:10px;">' + items.length + ' oportunități auto-extrase, sub pragul de auto-publicare (confidence &lt; 78). Aprobă pentru a le publica.</div>' + items.map(function(o){
        return '<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1rem 1.25rem;margin-bottom:8px;box-shadow:var(--shadow-sm);">'
          + '<div style="display:flex;align-items:flex-start;gap:12px;flex-wrap:wrap;">'
          + '<div style="flex:1;min-width:0;">'
          + '<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-bottom:6px;">'
          + '<span style="font-size:10px;background:var(--warn-light);color:var(--warn);padding:2px 8px;border-radius:100px;">Confidence ' + (o.confidence||0) + '%</span>'
          + '<span style="font-size:10px;background:var(--surface2);color:var(--ink3);padding:2px 8px;border-radius:100px;">' + o.source + '</span>'
          + (o.deadline && o.deadline!=='Nespecificat' ? '<span style="font-size:10px;background:var(--surface2);color:var(--ink3);padding:2px 8px;border-radius:100px;">' + o.deadline + '</span>' : '')
          + '</div>'
          + '<div style="font-weight:500;font-size:13px;margin-bottom:3px;">' + o.title + '</div>'
          + '<div style="font-size:12px;color:var(--ink3);line-height:1.5;">' + (o.summary||'').slice(0,160) + '</div>'
          + '<div style="font-size:11px;color:var(--ink3);margin-top:5px;">' + (o.domains||[]).join(', ') + (o.grantMax? ' \u00b7 pân\u0103 la \u20ac' + o.grantMax.toLocaleString('ro-RO') : '') + '</div>'
          + '</div>'
          + '<div style="display:flex;gap:6px;flex-shrink:0;">'
          + '<button onclick="reviewAction(' + o.id + ',\\'approve\\',this)" style="font-size:12px;background:var(--accent);color:white;border:none;padding:6px 13px;border-radius:6px;cursor:pointer;font-family:var(--font-body);">Aprob\u0103</button>'
          + '<button onclick="reviewAction(' + o.id + ',\\'reject\\',this)" style="font-size:12px;background:var(--surface2);border:1px solid var(--border);color:var(--ink2);padding:6px 13px;border-radius:6px;cursor:pointer;font-family:var(--font-body);">Respinge</button>'
          + '</div></div></div>';
      }).join('');
    }).catch(function(){ c.innerHTML = '<div class="empty-state" style="padding:2rem;"><p>Eroare la încărcarea cozii.</p></div>'; });
    return;
  }
  if (tab === '__never__') {
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
    c.innerHTML = '<div class="empty-state" style="padding:1.5rem;"><p>Se încarcă sursele...</p></div>';
    fetch('/api/sources').then(r => r.json()).then(function(j) {
      const reg = (j.registry || []);
      const live = j.sources || {};
      const known = new Set(reg.map(s => s.host));
      const suggestions = SOURCE_SUGGESTIONS.filter(s => !known.has(s.host));

      const form = '<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem 1.375rem;margin-bottom:1.25rem;box-shadow:var(--shadow-sm);">'
        + '<div style="font-family:var(--font-head);font-weight:700;font-size:14px;margin-bottom:10px;">+ Adaugă sursă nouă</div>'
        + '<div style="display:grid;grid-template-columns:2fr 1.2fr;gap:10px;margin-bottom:10px;">'
        + '<input id="src-url" class="wl-input" placeholder="https://exemplu.ro/apeluri (pagina cu lista de apeluri)">'
        + '<input id="src-name" class="wl-input" placeholder="Nume afișat (opțional)">'
        + '</div>'
        + '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">'
        + '<select id="src-tier" class="wl-input" style="width:auto;"><option value="1">Tier 1 — Oficială</option><option value="2" selected>Tier 2 — Instituție / regională</option><option value="3">Tier 3 — Editorială</option></select>'
        + '<select id="src-proxy" class="wl-input" style="width:auto;"><option value="auto" selected>Proxy: auto</option><option value="stealth">Proxy: stealth (anti-bot)</option><option value="enhanced">Proxy: enhanced</option></select>'
        + '<button id="src-add-btn" onclick="addSource()" style="margin-left:auto;padding:10px 18px;background:linear-gradient(135deg,var(--accent) 0%,var(--sky) 130%);color:white;border:none;border-radius:var(--radius);font-family:var(--font-body);font-size:13px;font-weight:500;cursor:pointer;">Adaugă & crawlează</button>'
        + '</div>'
        + '<div style="font-size:11px;color:var(--ink3);margin-top:8px;">Sfat: folosește pagina care listează apelurile (nu homepage-ul). Sursa e crawl-ată imediat ca să vezi dacă e accesibilă.</div>'
        + '</div>';

      const quick = suggestions.length ? '<div style="margin-bottom:1.25rem;">'
        + '<div style="font-size:11px;font-weight:600;color:var(--ink3);text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px;">Surse recomandate — adaugă cu un click</div>'
        + '<div style="display:flex;flex-wrap:wrap;gap:6px;">'
        + suggestions.map(s => '<button class="quick-tag" title="' + s.url + '" onclick="quickAddSource(\\'' + s.url + '\\',\\'' + s.name.replace(/\\'/g, '') + '\\',' + s.tier + ',this)">+ ' + s.name + '</button>').join('')
        + '</div></div>' : '';

      const rows = reg.map(function(s) {
        const l = live[s.host] || {};
        const st = l.status || 'warn';
        const stLabel = l.status ? (st === 'ok' ? 'OK' : st === 'warn' ? 'Avertisment' : 'Eroare') : 'Necrawlat';
        const when = l.lastRun ? new Date(l.lastRun).toLocaleDateString('ro-RO') : '—';
        const extra = (l.published || l.queued) ? (' · ' + (l.published||0) + ' publicate, ' + (l.queued||0) + ' review') : (l.chars ? ' · ' + l.chars + ' car.' : '');
        return '<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:.9rem 1.1rem;margin-bottom:8px;display:flex;align-items:center;gap:12px;opacity:' + (s.enabled ? '1' : '.55') + ';">'
          + '<div class="source-indicator ' + (s.enabled ? st : 'warn') + '"></div>'
          + '<div style="flex:1;min-width:0;">'
          + '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;"><strong style="font-size:13px;">' + s.name + '</strong>'
          + '<span style="font-size:10px;background:var(--surface2);color:var(--ink3);padding:1px 7px;border-radius:100px;">Tier ' + s.tier + '</span>'
          + (s.builtin ? '' : '<span style="font-size:10px;background:var(--accent-light);color:var(--accent);padding:1px 7px;border-radius:100px;">manual</span>')
          + (s.enabled ? '' : '<span style="font-size:10px;background:var(--surface2);color:var(--ink3);padding:1px 7px;border-radius:100px;">dezactivată</span>')
          + '</div>'
          + '<div style="font-size:11.5px;color:var(--ink3);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"><a href="' + s.url + '" target="_blank" style="color:var(--ink3);">' + s.url.replace(/^https?:\\/\\//, '') + '</a></div>'
          + '<div style="font-size:11px;color:var(--ink3);margin-top:2px;">' + stLabel + ' · ' + when + extra + (l.error ? ' · <span style="color:var(--accent2);">' + l.error + '</span>' : '') + '</div>'
          + '</div>'
          + '<div style="display:flex;gap:6px;flex-shrink:0;">'
          + '<button onclick="recrawlSource(\\'' + s.host + '\\', this)" ' + (s.enabled ? '' : 'disabled ') + 'style="font-size:11px;background:var(--surface2);border:1px solid var(--border);color:var(--ink2);padding:5px 10px;border-radius:6px;cursor:pointer;font-family:var(--font-body);">Re-crawl</button>'
          + '<button onclick="toggleSource(\\'' + s.host + '\\', this)" style="font-size:11px;background:var(--surface2);border:1px solid var(--border);color:var(--ink2);padding:5px 10px;border-radius:6px;cursor:pointer;font-family:var(--font-body);">' + (s.enabled ? 'Dezactivează' : 'Activează') + '</button>'
          + (s.builtin ? '' : '<button onclick="removeSource(\\'' + s.host + '\\', this)" style="font-size:11px;background:var(--accent2-light);border:1px solid rgba(249,115,22,.25);color:var(--accent2);padding:5px 10px;border-radius:6px;cursor:pointer;font-family:var(--font-body);">Șterge</button>')
          + '</div></div>';
      }).join('');

      c.innerHTML = form + quick
        + '<div style="font-size:11px;font-weight:600;color:var(--ink3);text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px;">Surse monitorizate (' + reg.length + ')</div>'
        + rows;
    }).catch(function() { c.innerHTML = '<div class="empty-state" style="padding:2rem;"><p>Eroare la încărcarea surselor.</p></div>'; });
    return;
  }
  if (tab === '__old_sources__') {
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
        <button onclick="recrawlSource(\'\${id}\', this)" style="font-size:12px;background:var(--surface2);border:1px solid var(--border);color:var(--ink2);padding:6px 12px;border-radius:6px;cursor:pointer;font-family:var(--font-body);flex-shrink:0;">Re-crawl</button>
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
async function recrawlSource(host, btn) {
  const original = btn ? btn.textContent : '';
  if (btn) { btn.textContent = 'Se crawleaza...'; btn.disabled = true; }
  try {
    const r = await fetch('/api/recrawl?host=' + encodeURIComponent(host), { method: 'POST' });
    const j = await r.json();
    if (j.ok && j.result) {
      const s = j.result;
      showToast('\u2713 ' + host + ': ' + s.status.toUpperCase() + ((s.published||s.queued)?(' \u2014 ' + (s.published||0) + ' publicate, ' + (s.queued||0) + ' \xeen review'):(' \u2014 ' + (s.chars||0) + ' caractere')));
    } else {
      showToast('\u2717 ' + host + ': ' + ((j.result && j.result.error) || j.error || 'eroare'));
    }
  } catch(e) {
    showToast('\u2717 Eroare retea: ' + host);
  } finally {
    if (btn) { btn.textContent = original; btn.disabled = false; }
    const sv = document.getElementById('view-sources');
    if (typeof renderSources === 'function' && sv && sv.style.display !== 'none') renderSources();
  }
}

function mDescCount(el) {
  const c = document.getElementById('m-desc-count');
  if (c) c.textContent = el.value.length + ' / 1500';
}
const M_EXAMPLES = {
  'Digitalizare magazin online IMM': 'Suntem un IMM din retail (SRL, 8 angaja\u021Bi, Cluj). Vrem s\u0103 lans\u0103m un magazin online cu ERP integrat, sistem de facturare electronic\u0103 \u0219i automatizare stocuri. Buget estimat 60.000 \u20ac, cofinan\u021Bare posibil\u0103 25%.',
  'ONG \u2014 centru de zi pentru v\u00e2rstnici': 'Asocia\u021Bie non-profit din Ia\u0219i, activ\u0103 din 2015 \u00een servicii sociale. Vrem s\u0103 deschidem un centru de zi pentru 40 de v\u00e2rstnici: amenajare spa\u021Biu, echipamente, personal 12 luni. Buget ~180.000 \u20ac. Avem experien\u021B\u0103 cu FSE.',
  'Prim\u0103rie \u2014 eficien\u021B\u0103 energetic\u0103 \u0219coal\u0103': 'UAT comun\u0103 din jude\u021Bul Hunedoara. Reabilitare termic\u0103 \u0219i panouri fotovoltaice pentru \u0219coala gimnazial\u0103 (1.200 mp). Buget estimat 900.000 \u20ac. Zona este \u00een tranzi\u021Bie just\u0103.',
  'Startup tech \u2014 produs AI, seed': 'Startup fondat \u00een 2025 \u00een Timi\u0219oara, 3 co-fondatori, produs SaaS cu AI pentru logistic\u0103, MVP validat cu 5 clien\u021Bi pilot. C\u0103ut\u0103m 100.000 \u20ac pentru accelerare \u0219i dezvoltare produs.',
};
function mUseExample(btn) {
  const key = btn.textContent.trim();
  const ta = document.getElementById('m-desc');
  ta.value = M_EXAMPLES[key] || key;
  mDescCount(ta);
  ta.focus();
}
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && document.activeElement && document.activeElement.id === 'm-desc') { e.preventDefault(); runMatch(); }
});

let mDomains = new Set();

function initMatch() {
  renderAuthState();
}

function mToggleDomain(btn) {
  const v = btn.dataset.val;
  if (mDomains.has(v)) { mDomains.delete(v); btn.classList.remove('active'); }
  else { mDomains.add(v); btn.classList.add('active'); }
}

async function runMatch() {
  const btn = document.getElementById('m-btn');
  const box = document.getElementById('m-results');
  const profile = {
    orgType: document.getElementById('m-org').value,
    region: document.getElementById('m-region').value,
    domains: [...mDomains],
    projectSize: Number(document.getElementById('m-size').value) || 0,
    description: document.getElementById('m-desc').value.trim(),
  };
  if (!currentUser) { openAuth('match'); return; }
  if (!profile.description && !profile.domains.length && !profile.orgType) { showToast('Descrie proiectul sau alege m\u0103car un domeniu'); return; }
  btn.disabled = true; btn.textContent = '\u2728 Se analizeaz\u0103...';
  box.innerHTML = '<div style="display:flex;flex-direction:column;gap:10px;">' +
    Array(3).fill('<div class="skeleton" style="height:96px;"></div>').join('') + '</div>';
  try {
    const r = await fetch('/api/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(profile),
    });
    const j = await r.json();
    if (r.status === 401) { box.innerHTML = ''; currentUser = null; renderAuthState(); openAuth('match'); return; }
    renderMatchResults(j);
  } catch (e) {
    box.innerHTML = '<div class="empty-state"><h3>Eroare</h3><p>Nu am putut rula potrivirea. Încearcă din nou.</p></div>';
  } finally {
    btn.disabled = false; btn.textContent = '\u2728 Găsește potrivirile';
  }
}

function renderMatchResults(data) {
  const box = document.getElementById('m-results');
  if (!data || !data.results || !data.results.length) {
    box.innerHTML = '<div class="empty-state"><h3>Nicio potrivire găsită</h3><p>Încearcă să lărgești domeniile sau regiunea.</p></div>';
    return;
  }
  const badge = data.usedAI
    ? '<span style="font-size:11px;color:var(--accent);background:var(--accent-light);padding:3px 10px;border-radius:100px;border:1px solid rgba(37,99,235,.2);">✨ Clasat de AI</span>'
    : '<span style="font-size:11px;color:var(--ink3);background:var(--surface2);padding:3px 10px;border-radius:100px;">Clasat pe reguli</span>';
  const head = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">' +
    '<div style="font-size:13px;color:var(--ink2);"><strong>' + data.results.length + '</strong> potriviri</div>' + badge + '</div>';

  box.innerHTML = head + data.results.map(function(r) {
    const o = r.opp;
    const sc = r.score || 0;
    const col = sc >= 75 ? 'var(--accent)' : sc >= 50 ? 'var(--warn)' : 'var(--ink3)';
    const statusCls = o.status === 'ACTIV' ? 'active' : o.status === 'URMEAZĂ' ? 'upcoming' : 'closed';
    return '<div class="opp-card" onclick="openDetail(' + o.id + ')" style="cursor:pointer;">' +
      '<div style="display:flex;align-items:flex-start;gap:14px;">' +
        '<div style="flex-shrink:0;width:52px;height:52px;border-radius:50%;background:conic-gradient(' + col + ' ' + (sc*3.6) + 'deg, var(--surface2) 0deg);display:flex;align-items:center;justify-content:center;position:relative;">' +
          '<div style="position:absolute;width:42px;height:42px;border-radius:50%;background:var(--surface);"></div>' +
          '<span style="position:relative;font-family:var(--font-head);font-weight:700;font-size:14px;color:' + col + ';">' + sc + '</span>' +
        '</div>' +
        '<div style="flex:1;min-width:0;">' +
          '<div style="display:flex;align-items:center;gap:6px;margin-bottom:5px;flex-wrap:wrap;">' +
            '<span class="status-badge ' + statusCls + '">' + o.status + '</span>' +
            '<span class="source-tier ' + (o.sourceTier===1?'tier1':'') + '">' + o.source + '</span>' +
          '</div>' +
          '<div class="opp-title" style="margin-bottom:5px;">' + o.title + '</div>' +
          '<div style="font-size:12.5px;color:var(--ink2);line-height:1.55;font-weight:300;"><strong style="color:var(--ink);font-weight:500;">De ce se potrivește:</strong> ' + (r.reason || '\u2014') + '</div>' +
          '<div style="margin-top:8px;font-size:12px;color:var(--ink3);">Grant până la <strong style="color:var(--ink);">\u20ac' + o.grantMax.toLocaleString('ro-RO') + '</strong> \u00b7 ' + o.deadline + '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

async function reviewAction(id, action, btn) {
  if (btn) { btn.disabled = true; btn.textContent = '...'; }
  try {
    const r = await fetch('/api/review/' + action + '?id=' + id, { method: 'POST' });
    const j = await r.json();
    if (j.ok) {
      showToast(action === 'approve' ? '\u2713 Publicat\u0103' : 'Respins\u0103');
      if (action === 'approve') loadPublished();
      switchAdminTab('review');
    } else {
      showToast('\u2717 ' + (j.error || 'Eroare'));
      if (btn) { btn.disabled = false; btn.textContent = action==='approve'?'Aprob\u0103':'Respinge'; }
    }
  } catch(e) {
    showToast('\u2717 Eroare re\u021Bea');
    if (btn) { btn.disabled = false; }
  }
}

async function unpublishAuto(id, btn) {
  if (btn) { btn.disabled = true; btn.textContent = '...'; }
  try {
    const r = await fetch('/api/published/remove?id=' + id, { method: 'POST' });
    const j = await r.json();
    if (j.ok) {
      const i = OPPORTUNITIES.findIndex(o => o.id === id); if (i >= 0) OPPORTUNITIES.splice(i, 1);
      showToast('Retras\u0103 din publicare');
      if (typeof renderResults === 'function') renderResults();
      switchAdminTab('review');
    } else { showToast('\u2717 ' + (j.error || 'Eroare')); if (btn) { btn.disabled=false; btn.textContent='Retrage'; } }
  } catch(e) { showToast('\u2717 Eroare re\u021Bea'); if (btn) btn.disabled=false; }
}

async function purgeAuto(btn) {
  if (!confirm('Retragi TOATE oportunit\u0103\u021Bile publicate automat \u0219i gole\u0219ti coada de review?')) return;
  if (btn) { btn.disabled = true; btn.textContent = '...'; }
  try {
    const r = await fetch('/api/published/purge', { method: 'POST' });
    const j = await r.json();
    if (j.ok) {
      for (let i = OPPORTUNITIES.length - 1; i >= 0; i--) if (OPPORTUNITIES[i]._auto) OPPORTUNITIES.splice(i, 1);
      showToast('Retrase ' + (j.removed||0) + ' oportunit\u0103\u021Bi');
      if (typeof renderResults === 'function') renderResults();
      switchAdminTab('review');
    } else { showToast('\u2717 Eroare'); if (btn) btn.disabled=false; }
  } catch(e) { showToast('\u2717 Eroare re\u021Bea'); if (btn) btn.disabled=false; }
}

/* ── Deadline helpers ── */
function dlDays(o) {
  if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(o.deadline || '')) return null;
  return Math.ceil((new Date(o.deadline) - new Date()) / 86400000);
}
function dlBar(o) {
  const d = dlDays(o);
  if (d === null || o.status === 'ÎNCHIS' || d <= 0) return { style: 'display:none;', pct: 0, color: 'transparent' };
  const launch = /^\\d{4}-\\d{2}-\\d{2}$/.test(o.launchDate||'') ? new Date(o.launchDate) : null;
  const total = launch ? Math.max(1, (new Date(o.deadline) - launch) / 86400000) : 120;
  const pct = Math.max(4, Math.min(100, 100 - (d / total) * 100));
  const color = d <= 14 ? 'var(--accent2)' : d <= 30 ? 'var(--warn)' : 'var(--accent)';
  return { style: '', pct: Math.round(pct), color };
}
function dlLabel(d) { return d <= 0 ? 'expirat' : d === 1 ? 'mâine' : d + ' zile'; }
function dlColor(d) { return d <= 14 ? 'var(--accent2)' : d <= 30 ? 'var(--warn)' : 'var(--accent)'; }
function dlBg(d) { return d <= 14 ? 'var(--accent2-light)' : d <= 30 ? 'var(--warn-light)' : 'var(--accent-light)'; }

/* ── Closing-soon strip (homepage) ── */
function renderClosingStrip() {
  const el = document.getElementById('closing-strip');
  if (!el) return;
  const soon = OPPORTUNITIES
    .map(o => ({ o, d: dlDays(o) }))
    .filter(x => x.d !== null && x.d > 0 && x.d <= 30 && x.o.status !== 'ÎNCHIS')
    .sort((a, b) => a.d - b.d).slice(0, 5);
  if (!soon.length) { el.style.display = 'none'; return; }
  el.style.display = 'block';
  el.innerHTML = '<div class="closing-strip">'
    + '<div class="closing-strip-head"><div class="closing-strip-title">⏰ Se închid în 30 de zile</div>'
    + '<a onclick="showView(\\'calendar\\')" style="font-size:12px;color:var(--accent);cursor:pointer;font-weight:500;">Calendar complet →</a></div>'
    + soon.map(x => '<div class="closing-item" onclick="openDetail(' + x.o.id + ')">'
        + '<div class="closing-name">' + x.o.title + '</div>'
        + '<span class="closing-days" style="color:' + dlColor(x.d) + ';background:' + dlBg(x.d) + ';">' + dlLabel(x.d) + '</span></div>').join('')
    + '</div>';
}

/* ── Calendar view ── */
let calFilter = 'all';
function calSetFilter(f, btn) {
  calFilter = f;
  document.querySelectorAll('#view-calendar .chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderCalendar();
}
const RO_MONTHS = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie'];
const RO_DAYS = ['Dum','Lun','Mar','Mie','Joi','Vin','Sâm'];
function renderCalendar() {
  const body = document.getElementById('cal-body');
  if (!body) return;
  const items = OPPORTUNITIES
    .map(o => ({ o, d: dlDays(o) }))
    .filter(x => x.d !== null && x.d > 0 && x.d <= 183 && x.o.status !== 'ÎNCHIS')
    .filter(x => calFilter === '30' ? x.d <= 30 : calFilter === 'active' ? x.o.status === 'ACTIV' : true)
    .sort((a, b) => new Date(a.o.deadline) - new Date(b.o.deadline));
  const undated = OPPORTUNITIES.filter(o => dlDays(o) === null && o.status !== 'ÎNCHIS');
  if (!items.length) {
    body.innerHTML = '<div class="empty-state"><h3>Niciun termen în interval</h3><p>Încearcă alt filtru.</p></div>';
    return;
  }
  const groups = {};
  for (const x of items) {
    const dt = new Date(x.o.deadline);
    const key = dt.getFullYear() + '-' + String(dt.getMonth()).padStart(2, '0');
    (groups[key] = groups[key] || { name: RO_MONTHS[dt.getMonth()] + ' ' + dt.getFullYear(), rows: [] }).rows.push(x);
  }
  body.innerHTML = Object.keys(groups).sort().map(k => {
    const g = groups[k];
    return '<div class="cal-month"><div class="cal-month-head"><div class="cal-month-name">' + g.name + '</div><div class="cal-month-count">' + g.rows.length + ' termene</div></div>'
      + g.rows.map(x => {
        const dt = new Date(x.o.deadline);
        const statusCls = x.o.status === 'ACTIV' ? 'active' : 'upcoming';
        return '<div class="cal-row" onclick="openDetail(' + x.o.id + ')">'
          + '<div class="cal-day"><div class="cal-day-num" style="color:' + dlColor(x.d) + ';">' + dt.getDate() + '</div><div class="cal-day-name">' + RO_DAYS[dt.getDay()] + '</div></div>'
          + '<div><div class="cal-title">' + x.o.title + '</div><div class="cal-meta"><span class="status-badge ' + statusCls + '" style="font-size:9px;padding:1px 7px;margin-right:6px;">' + x.o.status + '</span>' + x.o.source + ' · ' + (x.o.domains||[]).slice(0,2).join(', ') + '</div></div>'
          + '<div class="cal-right"><div class="cal-grant">€' + (x.o.grantMax||0).toLocaleString('ro-RO') + '</div><span class="closing-days" style="color:' + dlColor(x.d) + ';background:' + dlBg(x.d) + ';">' + dlLabel(x.d) + '</span></div>'
          + '</div>';
      }).join('') + '</div>';
  }).join('')
  + (undated.length ? '<div style="font-size:12px;color:var(--ink3);margin-top:1rem;">' + undated.length + ' oportunități fără termen fix (estimate/„vezi portal”) nu apar în calendar.</div>' : '');
}

/* ── Source management ── */
// Curated portals commonly missing. Point at the *calls listing* page where possible.
const SOURCE_SUGGESTIONS = [
  { host: 'adrnordvest.ro',       name: 'ADR Nord-Vest',              url: 'https://www.nord-vest.ro/apeluri/',                       tier: 1 },
  { host: 'adrcentru.ro',         name: 'ADR Centru',                 url: 'https://www.adrcentru.ro/apeluri-de-proiecte/',           tier: 1 },
  { host: 'adrmuntenia.ro',       name: 'ADR Sud-Muntenia',           url: 'https://www.adrmuntenia.ro/apeluri-proiecte/',             tier: 1 },
  { host: 'adrse.ro',             name: 'ADR Sud-Est',                url: 'https://www.adrse.ro/apeluri/',                            tier: 1 },
  { host: 'adroltenia.ro',        name: 'ADR Sud-Vest Oltenia',       url: 'https://www.adroltenia.ro/apeluri-de-proiecte/',           tier: 1 },
  { host: 'adrbi.ro',             name: 'ADR București-Ilfov',        url: 'https://www.adrbi.ro/apeluri/',                            tier: 1 },
  { host: 'afm.ro',               name: 'AFM — Administrația Fondului pentru Mediu', url: 'https://www.afm.ro/programe_finantare.php',   tier: 1 },
  { host: 'fonduri-ue.ro',        name: 'Fonduri UE (MIPE)',          url: 'https://www.fonduri-ue.ro/apeluri',                        tier: 1 },
  { host: 'imm.gov.ro',           name: 'Ministerul Economiei — IMM', url: 'https://imm.gov.ro/',                                      tier: 1 },
  { host: 'uefiscdi.gov.ro',      name: 'UEFISCDI — Cercetare',       url: 'https://uefiscdi.gov.ro/competitii',                       tier: 1 },
  { host: 'afcn.ro',              name: 'AFCN — Fondul Cultural',     url: 'https://www.afcn.ro/finantari',                            tier: 1 },
  { host: 'madr.ro',              name: 'MADR — Agricultură',         url: 'https://www.madr.ro/dezvoltare-rurala.html',               tier: 1 },
  { host: 'mmuncii.gov.ro',       name: 'Ministerul Muncii — PoEO',   url: 'https://mmuncii.gov.ro/j33/index.php/ro/',                 tier: 1 },
  { host: 'anpm.ro',              name: 'ANPM',                       url: 'https://www.anpm.ro/',                                     tier: 2 },
  { host: 'ec.europa.eu',         name: 'EU Funding & Tenders Portal', url: 'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-search', tier: 1 },
  { host: 'eismea.ec.europa.eu',  name: 'EISMEA — IMM & Inovare',     url: 'https://eismea.ec.europa.eu/funding-opportunities_en',     tier: 1 },
  { host: 'erasmus-plus.ec.europa.eu', name: 'Erasmus+',              url: 'https://erasmus-plus.ec.europa.eu/opportunities',          tier: 1 },
  { host: 'anpcdefp.ro',          name: 'ANPCDEFP — Erasmus+ RO',     url: 'https://www.anpcdefp.ro/',                                 tier: 1 },
  { host: 'interreg.ro',          name: 'Interreg România',           url: 'https://interreg.ro/',                                     tier: 1 },
  { host: 'finantare.ro',         name: 'Finantare.ro',               url: 'https://www.finantare.ro/',                                tier: 3 },
  { host: 'fondurieuropene.ro',   name: 'FonduriEuropene.ro',         url: 'https://www.fondurieuropene.ro/',                          tier: 3 },
];

async function addSource() {
  const url = document.getElementById('src-url').value.trim();
  const name = document.getElementById('src-name').value.trim();
  const tier = document.getElementById('src-tier').value;
  const proxy = document.getElementById('src-proxy').value;
  if (!url) return showToast('Introdu URL-ul sursei');
  const btn = document.getElementById('src-add-btn');
  btn.disabled = true; btn.textContent = 'Se adaugă & crawlează…';
  try {
    const r = await fetch('/api/sources/add', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url, name, tier, proxy }) });
    const j = await r.json();
    if (j.ok) {
      const cr = j.crawl || {};
      showToast('✓ ' + j.source.host + ' adăugată — ' + (cr.status ? cr.status.toUpperCase() : '?') + (cr.published || cr.queued ? (' · ' + (cr.published||0) + ' publicate, ' + (cr.queued||0) + ' review') : ''));
      switchAdminTab('sources');
    } else {
      showToast('✗ ' + (j.error || 'Eroare'));
      btn.disabled = false; btn.textContent = 'Adaugă & crawlează';
    }
  } catch(e) { showToast('✗ Eroare rețea'); btn.disabled = false; btn.textContent = 'Adaugă & crawlează'; }
}

async function quickAddSource(url, name, tier, btn) {
  if (btn) { btn.disabled = true; btn.textContent = '…'; }
  try {
    const r = await fetch('/api/sources/add', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url, name, tier, proxy: 'auto' }) });
    const j = await r.json();
    if (j.ok) { const cr = j.crawl || {}; showToast('✓ ' + name + ' — ' + (cr.status ? cr.status.toUpperCase() : 'adăugată')); switchAdminTab('sources'); }
    else { showToast('✗ ' + (j.error || 'Eroare')); if (btn) { btn.disabled = false; btn.textContent = '+ ' + name; } }
  } catch(e) { showToast('✗ Eroare rețea'); if (btn) { btn.disabled = false; btn.textContent = '+ ' + name; } }
}

async function toggleSource(host, btn) {
  if (btn) btn.disabled = true;
  try {
    const r = await fetch('/api/sources/toggle?host=' + encodeURIComponent(host), { method: 'POST' });
    const j = await r.json();
    if (j.ok) { showToast(host + (j.enabled ? ' activată' : ' dezactivată')); switchAdminTab('sources'); }
    else { showToast('✗ ' + (j.error || 'Eroare')); if (btn) btn.disabled = false; }
  } catch(e) { showToast('✗ Eroare rețea'); if (btn) btn.disabled = false; }
}

async function removeSource(host, btn) {
  if (!confirm('Ștergi sursa ' + host + '? Oportunitățile deja publicate rămân.')) return;
  if (btn) btn.disabled = true;
  try {
    const r = await fetch('/api/sources/remove?host=' + encodeURIComponent(host), { method: 'POST' });
    const j = await r.json();
    if (j.ok) { showToast('Sursă ștearsă: ' + host); switchAdminTab('sources'); }
    else { showToast('✗ ' + (j.error || 'Eroare')); if (btn) btn.disabled = false; }
  } catch(e) { showToast('✗ Eroare rețea'); if (btn) btn.disabled = false; }
}

/* ── Auth (client) ── */
let currentUser = null;

async function checkAuth() {
  try {
    const r = await fetch('/api/auth/me', { credentials: 'same-origin' });
    if (r.ok) { const j = await r.json(); currentUser = j.user || null; }
    else currentUser = null;
  } catch(e) { currentUser = null; }
  renderAuthState();
  return currentUser;
}

function renderAuthState() {
  const cta = document.getElementById('nav-auth');
  if (cta) {
    if (currentUser) {
      const label = currentUser.name ? currentUser.name.split(' ')[0] : currentUser.email.split('@')[0];
      cta.textContent = '👤 ' + label;
      cta.setAttribute('onclick', 'openAccountMenu()');
      cta.title = currentUser.email + ' — click pentru a ieși';
    } else {
      cta.textContent = 'Intră în cont';
      cta.setAttribute('onclick', 'openAuth()');
      cta.title = '';
    }
  }
  // Gate on the match view
  const gate = document.getElementById('m-gate');
  const form = document.getElementById('m-form');
  if (gate && form) {
    gate.style.display = currentUser ? 'none' : 'flex';
    form.style.opacity = currentUser ? '1' : '.45';
    form.style.pointerEvents = currentUser ? 'auto' : 'none';
    form.style.filter = currentUser ? 'none' : 'blur(1.5px)';
  }
}

function openAuth(reason) {
  const t = document.getElementById('auth-title'), s = document.getElementById('auth-sub');
  if (reason === 'match') {
    t.textContent = 'Creează-ți un cont gratuit';
    s.textContent = 'Potrivirea AI e disponibilă cu cont. Fără parolă — primești un link pe email.';
  } else {
    t.textContent = 'Intră sau creează cont';
    s.textContent = 'Fără parolă. Îți trimitem un link pe email — un click și ești înăuntru.';
  }
  document.getElementById('auth-body').style.display = '';
  const done = document.getElementById('auth-done'); if (done) done.remove();
  try { const e = localStorage.getItem('fm_email'); const el = document.getElementById('auth-email'); if (e && el && !el.value) el.value = e; } catch(x) {}
  document.getElementById('auth-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => { const el = document.getElementById('auth-email'); if (el) el.focus(); }, 60);
}
function closeAuth(e) {
  if (e && e.target !== document.getElementById('auth-overlay')) return;
  document.getElementById('auth-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

async function requestLogin() {
  const email = document.getElementById('auth-email').value.trim();
  const name = document.getElementById('auth-name').value.trim();
  const org = document.getElementById('auth-org').value;
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(email)) return showToast('Email invalid');
  const btn = document.getElementById('auth-btn');
  btn.disabled = true; btn.textContent = 'Se trimite…';
  try { localStorage.setItem('fm_email', email); } catch(e) {}
  try {
    const r = await fetch('/api/auth/request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', body: JSON.stringify({ email, name, org }) });
    const j = await r.json();
    if (!j.ok) { showToast('✗ ' + (j.error || 'Eroare')); btn.disabled = false; btn.textContent = 'Trimite-mi linkul de acces →'; return; }
    // Success state inside the modal
    const body = document.getElementById('auth-body');
    body.style.display = 'none';
    const done = document.createElement('div');
    done.id = 'auth-done';
    done.className = 'modal-body';
    done.innerHTML = '<div style="text-align:center;padding:.5rem 0;">'
      + '<div style="width:52px;height:52px;border-radius:50%;background:var(--accent-light);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:24px;">✉️</div>'
      + '<div style="font-family:var(--font-head);font-weight:700;font-size:1.05rem;margin-bottom:6px;">' + (j.sent ? 'Verifică emailul' : 'Emailul nu a putut fi trimis') + '</div>'
      + '<div style="font-size:13px;color:var(--ink2);line-height:1.6;">' + (j.sent
          ? ('Am trimis un link de acces la <strong>' + email + '</strong>.<br>Valabil 15 minute. Verifică și folderul Spam.')
          : ('<span style="color:var(--accent2);">' + (j.error || 'Serviciul de email nu este configurat.') + '</span>'))
      + '</div>'
      + (j.devLink ? '<div style="margin-top:14px;font-size:11px;color:var(--ink3);">Mod dezvoltare — <a href="' + j.devLink + '" style="color:var(--accent);">deschide linkul aici</a></div>' : '')
      + '<button onclick="closeAuth()" style="margin-top:18px;padding:9px 18px;background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius);font-family:var(--font-body);font-size:13px;cursor:pointer;">Închide</button>'
      + '</div>';
    body.parentNode.appendChild(done);
  } catch(e) { showToast('✗ Eroare rețea'); }
  btn.disabled = false; btn.textContent = 'Trimite-mi linkul de acces →';
}

function openAccountMenu() {
  if (!currentUser) return openAuth();
  if (confirm('Ieși din cont (' + currentUser.email + ')?')) logout();
}
async function logout() {
  try { await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' }); } catch(e) {}
  currentUser = null;
  renderAuthState();
  showToast('Ai ieșit din cont');
}

// Handle return from magic link: /?auth=ok#match
(function handleAuthReturn() {
  try {
    const q = new URLSearchParams(location.search);
    if (q.get('auth') === 'ok') {
      history.replaceState(null, '', location.pathname + (location.hash || ''));
      setTimeout(() => { showToast('✓ Ești autentificat'); if (location.hash === '#match') showView('match'); }, 300);
    } else if (q.get('auth') === 'retry') {
      history.replaceState(null, '', location.pathname);
      setTimeout(() => openAuth(), 300);
    }
  } catch(e) {}
})();

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
    closeAuth();
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
  { id:1,  status:'ACTIV',   source:'mfe.gov.ro',             sourceTier:1, domains:['Antreprenoriat','Digitalizare'],                  beneficiaries:['IMM','Universitate'],       regions:[`Național`],  grantMin:500000,  grantMax:5000000,  program:'PoCIDIF' , title:'PoCIDIF — HUB Antreprenorial Național (creare/operaționalizare)', summary:'Finanțare pentru crearea sau operaționalizarea unui HUB antreprenorial național — sprijin pentru ecosistemul de inovare, accelerare startup și transfer de cunoștințe.' },
  { id:2,  status:'ACTIV',   source:'mfe.gov.ro',             sourceTier:1, domains:['Energie'],                                         beneficiaries:['IMM'],                      regions:[`Național`],  grantMin:5000,    grantMax:30000,    program:'PNRR C16' , title:'PNRR C16 REPowerEU — Granturi bonuri valorice energie regenerabilă (gospodării)', summary:'Schema de granturi sub formă de bonuri valorice pentru gospodăriile care instalează sisteme de energie din surse regenerabile. Finanțare 50% grant, 50% împrumut PNRR.' },
  { id:3,  status:'ACTIV',   source:'mfe.gov.ro',             sourceTier:1, domains:['Mediu'],                                           beneficiaries:['ONG','UAT','Universitate'], regions:[`Național`],  grantMin:100000,  grantMax:3000000,  program:'PDD' , title:'Programul pentru Dezvoltare Durabilă (PDD) — Conservarea speciilor și habitatelor', summary:'Ghid pentru proiecte dedicate menținerii și îmbunătățirii stării de conservare a speciilor și habitatelor prin măsuri de conservare activă și management ecologic.' },
  { id:4,  status:'ACTIV',   source:'mfe.gov.ro',             sourceTier:1, domains:['Sănătate'],                                        beneficiaries:['UAT','Universitate'],       regions:[`Național`],  grantMin:1000000, grantMax:50000000, program:'Programul Sănătate' , title:'Programul Sănătate — Infrastructură PNRR unități sanitare (ghid actualizat)', summary:'Finanțare pentru construcția, dotarea și modernizarea unităților sanitare publice, cu accent pe reducerea disparităților regionale în accesul la servicii medicale.' },
  { id:5,  status:'ACTIV',   source:'mfe.gov.ro',             sourceTier:1, domains:['Incluziune socială'],                              beneficiaries:['ONG','UAT'],                regions:[`Național`],  grantMin:50000,   grantMax:500000,   program:'PoIDS' , title:'PoIDS — Servicii comunitare pentru copii și familii (ITI Moții, Țara de Piatră)', summary:'Sprijin pentru servicii comunitare destinate copiilor și familiilor aflate în situații de risc, prevenirea separării și reintegrarea în familie.' },
  { id:6,  status:'URMEAZĂ', source:'mfe.gov.ro',             sourceTier:1, domains:['Energie','Infrastructură'],                        beneficiaries:['UAT','IMM'],                regions:[`Național`],  grantMin:200000,  grantMax:10000000, program:'PTJ' , title:'PTJ — Mobilitate verde și energie accesibilă (apeluri competitive + necompetitive)', summary:'Apeluri competitive și necompetitive pentru "Energie verde accesibilă și mobilitate nepoluantă", Prioritățile 1-6, metodologii aprobate feb. 2026.' },
  { id:7,  status:'ÎNCHIS',  source:'adrvest.ro',             sourceTier:1, domains:['Antreprenoriat','Energie'],                        beneficiaries:['IMM'],                      regions:['Vest'],      grantMin:50000,   grantMax:2000000,  program:'PTJ IMM' , title:'ADR Vest — Investiții IMM Valea Jiului (Tranziție Justă)', summary:'Finanțare pentru investiții productive în IMM-uri din Valea Jiului. Sprijin pentru diversificarea economică în zonele afectate de tranziția de la cărbune.' },
  { id:8,  status:'ACTIV',   source:'adrvest.ro',             sourceTier:1, domains:['Infrastructură','Antreprenoriat'],                 beneficiaries:['UAT','IMM'],                regions:['Vest'],      grantMin:1000000, grantMax:20000000, program:'PTJ Parcuri' , title:'ADR Vest — Parcuri industriale și tehnologice (Tranziție Justă)', summary:'Sprijin pentru crearea și dezvoltarea parcurilor industriale și tehnologice în Regiunea Vest, pentru atragerea de investiții și locuri de muncă.' },
  { id:9,  status:'ACTIV',   source:'adrvest.ro',             sourceTier:1, domains:['Energie'],                                         beneficiaries:['IMM','UAT'],                regions:['Vest'],      grantMin:200000,  grantMax:10000000, program:'PTJ Energie' , title:'ADR Vest — Energie regenerabilă Tranziție Justă', summary:'Finanțare pentru dezvoltarea surselor de energie regenerabilă în Regiunea Vest — eolian, solar, biomasă — ca parte a tranziției economice.' },
  { id:10, status:'ACTIV',   source:'adrvest.ro',             sourceTier:1, domains:['Antreprenoriat','Digitalizare'],                   beneficiaries:['Startup'],                  regions:['Vest'],      grantMin:50000,   grantMax:100000,   program:'Vest Ventures' , title:'ADR Vest — Vest Ventures: Fond de accelerare startup (până la €100K/startup)', summary:'Primul accelerator regional cu finanțare europeană — 9 startup-uri selectate în prima cohortă. Investiții de până la €100K per startup, plus mentorat și acces la piață.' },
  { id:11, status:'ACTIV',   source:'adrvest.ro',             sourceTier:1, domains:['Cultură','Turism'],                                beneficiaries:['UAT','ONG'],                regions:['Vest'],      grantMin:200000,  grantMax:4000000,  program:'PR Vest UNESCO' , title:'ADR Vest — Patrimoniu cultural UNESCO Vest (€4M)', summary:'Fonduri europene pentru protejarea și valorificarea obiectivelor de patrimoniu cultural UNESCO din Regiunea Vest — restaurare, digitalizare și promovare turistică.' },
  { id:12, status:'ACTIV',   source:'adrvest.ro',             sourceTier:1, domains:['Sănătate'],                                        beneficiaries:['UAT'],                      regions:['Vest'],      grantMin:1000000, grantMax:3000000,  program:'PR Vest Sănătate' , title:'ADR Vest — Spital Copii "Louis Țurcanu" Timișoara (~€3M)', summary:'Investiție europeană de aproape €3M în dotarea și modernizarea Spitalului de Copii din Timișoara, principala unitate pediatrică a Regiunii Vest.' },
  { id:13, status:'ACTIV',   source:'adrnordest.ro',          sourceTier:1, domains:['Antreprenoriat','Infrastructură','Digitalizare'],  beneficiaries:['IMM','UAT','ONG'],          regions:['Nord-Est'],  grantMin:50000,   grantMax:15000000, program:'PR Nord-Est' , title:'ADR Nord-Est — Fonduri europene Regiunea Nord-Est 2021-2027', summary:'Portal oficial al ADR Nord-Est cu apeluri active pentru IMM-uri, UAT-uri și ONG-uri din județele Bacău, Botoșani, Iași, Neamț, Suceava și Vaslui.' },
  { id:14, status:'ACTIV',   source:'afir.ro',                sourceTier:1, domains:['Agricultură'],                                     beneficiaries:['Fermier'],                  regions:[`Național`],  grantMin:10000,   grantMax:300000,   program:'PNDR' , title:'PNDR — Investiții în exploatații agricole mici și medii', summary:'Finanțare pentru modernizarea exploatațiilor agricole: utilaje, irigații, construcții ferme, procesare produse agricole, standarde UE.' },
  { id:15, status:'ÎNCHIS',  source:'commission.europa.eu',   sourceTier:1, domains:['Cercetare / inovare','Digitalizare'],              beneficiaries:['Universitate','IMM'],       regions:[`Național`],  grantMin:500000,  grantMax:10000000, program:'Horizon Europe' , title:'Horizon Europe — Parteneriate cercetare și inovare', summary:'Cel mai amplu program european de cercetare și inovare — parteneriate transnaționale în sănătate, digital, energie, mobilitate și climă.' },
  { id:16, status:'URMEAZĂ', source:'fonduri-structurale.ro', sourceTier:3, domains:['Incluziune socială'],                              beneficiaries:['ONG'],                      regions:[`Național`],  grantMin:50000,   grantMax:400000,   program:'FSE+' , title:'FSE+ — Inovare socială și economie socială (ONG-uri)', summary:'Program estimat pentru sprijinirea ONG-urilor și întreprinderilor sociale cu proiecte de incluziune a grupurilor vulnerabile, inserție profesională și servicii sociale.' },
  { id:17, status:'ACTIV',   source:'oportunitati-ue.gov.ro', sourceTier:1, domains:['Digitalizare'],                                    beneficiaries:['IMM','Startup'],            regions:[`Național`],  grantMin:30000,   grantMax:500000,   program:'PNRR C7' , title:'Sprijin IMM — Digitalizare și transformare digitală (PNRR C7)', summary:'Finanțare nerambursabilă pentru IMM-uri care implementează soluții digitale, automatizare, cloud computing și securitate cibernetică.' },
  { id:18, status:'ÎNCHIS',  source:'startupcafe.ro',         sourceTier:3, domains:['Antreprenoriat'],                                  beneficiaries:['Startup'],                  regions:[`Național`],  grantMin:25000,   grantMax:250000,   program:'Start-Up Nation' , title:'Start-Up Nation România — Granturi afaceri noi', summary:'Program de finanțare pentru antreprenori la debut. Grant maxim 250.000 RON pentru echipamente, amenajare spații, stoc și marketing.' },
  { id:19, status:'ÎNCHIS',  source:'vest.ro',                sourceTier:1, domains:['Antreprenoriat'],                                  beneficiaries:['IMM'],                      regions:['Vest'],      grantMin:200000,  grantMax:2000000,  program:'POR Vest' , title:'POR Vest — Clustere inovative regionale', summary:'Apel finalizat pentru sprijinirea clusterelor de inovare și competitivitate din Regiunea Vest. Informativ pentru sesiunile viitoare.' },

  { id:20, status:'URMEĂZĂ', source:'eeagrants.ro', sourceTier:1, domains:['Mediu','Educație','Sănătate','Cercetare / inovare','Incluziune socială','Cultură'], beneficiaries:['ONG','IMM','UAT','Universitate'], regions:[`Național`], grantMin:50000, grantMax:5000000, program:'Granturi SEE & Norvegiene' , title:'Granturi SEE & Norvegiene 2021–2028 — Noul ciclu (apeluri în pregătire)', summary:'Islanda, Liechtenstein și Norvegia finanțează proiecte în România. Ciclul 2014-2021 s-a încheiat; noul ciclu 2021-2028 este în negociere — apeluri estimate în a doua jumătate a lui 2026.' },];


/* ═══ CRAWLING LAYER — Firecrawl + KV ═══
   Secret: FIRECRAWL_API_KEY | KV binding: FINMATCH_KV (namespace finmatch-kv)
   KV keys: src:status (map), src:raw:<host>, src:lastFullRun */
const CRAWL_SOURCES = [
  { host: 'mfe.gov.ro',             url: 'https://mfe.gov.ro/category/ultimele-apeluri-prima-pagina/', tier: 1, proxy: 'enhanced' },
  { host: 'adrvest.ro',             url: 'https://adrvest.ro/programul-tranzitie-justa-ghiduri-de-finantare-active/', tier: 1, proxy: 'auto' },
  { host: 'adrnordest.ro',          url: 'https://www.adrnordest.ro', tier: 1, proxy: 'enhanced' },
  { host: 'oportunitati-ue.gov.ro', url: 'https://oportunitati-ue.gov.ro', tier: 1, proxy: 'auto' },
  { host: 'afir.ro',                url: 'https://afir.ro', tier: 1, proxy: 'auto' },
  { host: 'commission.europa.eu',   url: 'https://commission.europa.eu/funding-tenders/find-funding/eu-funding-programmes_ro', tier: 1, proxy: 'auto' },
  { host: 'cinea.ec.europa.eu',     url: 'https://cinea.ec.europa.eu/funding-and-tenders_en', tier: 1, proxy: 'auto' },
  { host: 'fonduri-structurale.ro', url: 'https://www.fonduri-structurale.ro', tier: 3, proxy: 'auto' },
  { host: 'startupcafe.ro',         url: 'https://www.startupcafe.ro/finantari', tier: 3, proxy: 'auto' },
  { host: 'eeagrants.ro',           url: 'https://www.eeagrants.ro/apeluri?filtru_status=Activ', tier: 1, proxy: 'auto' },
];

async function firecrawlScrape(src, apiKey) {
  const started = Date.now();
  try {
    const res = await fetch('https://api.firecrawl.dev/v2/scrape', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: src.url, formats: ['markdown'], onlyMainContent: true, blockAds: true,
        proxy: src.proxy || 'auto', timeout: 45000,
        location: { country: 'RO', languages: ['ro-RO'] },
      }),
    });
    const ms = Date.now() - started;
    if (!res.ok) {
      let msg = 'HTTP ' + res.status;
      try { const j = await res.json(); msg = j.error || msg; } catch (e) {}
      return { ok: false, ms, error: msg, statusCode: res.status };
    }
    const j = await res.json();
    const md = (j && j.data && j.data.markdown) ? j.data.markdown : '';
    const meta = (j && j.data && j.data.metadata) ? j.data.metadata : {};
    const title = Array.isArray(meta.title) ? meta.title[0] : (meta.title || '');
    return { ok: !!md, ms, markdown: md, title, statusCode: meta.statusCode || 200 };
  } catch (e) {
    return { ok: false, ms: Date.now() - started, error: String(e && e.message || e) };
  }
}

// ─── EXTRACTION: crawled markdown → structured opportunities ───────────────
// Rule-based. High-confidence entries auto-publish; the rest go to review.
const DOMAIN_KEYWORDS = {
  'Digitalizare': ['digital', 'digitaliz', 'IT', 'software', 'cloud', 'cyber', 'tehnolog'],
  'Energie': ['energie', 'energetic', 'fotovoltaic', 'solar', 'eolian', 'regenerabil', 'REPowerEU'],
  'Agricultură': ['agricultur', 'fermier', 'rural', 'AFIR', 'PNDR', 'exploata'],
  'Educație': ['educa', 'școal', 'universit', 'formare', 'training'],
  'Antreprenoriat': ['antreprenor', 'startup', 'start-up', 'IMM', 'afacer', 'microîntreprin'],
  'Infrastructură': ['infrastructur', 'drum', 'construc', 'reabilitare', 'moderniz'],
  'Mediu': ['mediu', 'ecolog', 'biodiversit', 'clim', 'deșeuri', 'apă'],
  'Sănătate': ['sănăta', 'spital', 'medic', 'sanitar', 'clinic'],
  'Cercetare / inovare': ['cercetare', 'inovare', 'R&D', 'Horizon', 'științ'],
  'Incluziune socială': ['incluziune', 'social', 'vulnerabil', 'defavoriza', 'marginaliz'],
  'Cultură': ['cultur', 'patrimoniu', 'artist', 'UNESCO', 'muze'],
  'Turism': ['turism', 'turistic', 'cazare', 'agroturism'],
};
const BENEF_KEYWORDS = {
  'IMM': ['IMM', 'întreprindere mic', 'microîntreprin', 'firm'],
  'Startup': ['startup', 'start-up'],
  'ONG': ['ONG', 'organizați', 'asociați', 'fundați', 'societate civil'],
  'UAT': ['UAT', 'autoritate local', 'primări', 'comun', 'municipi', 'consiliu județ'],
  'Fermier': ['fermier', 'agricultor', 'exploatați agricol'],
  'Universitate': ['universit', 'institut de cercetare', 'facultat'],
};
const REGION_KEYWORDS = {
  'Vest': ['regiunea vest', 'timiș', 'arad', 'hunedoara', 'caraș'],
  'Nord-Vest': ['nord-vest', 'cluj', 'bihor', 'maramureș', 'satu mare'],
  'Nord-Est': ['nord-est', 'iași', 'bacău', 'suceava', 'botoșani', 'neamț', 'vaslui'],
  'Centru': ['regiunea centru', 'brașov', 'sibiu', 'mureș', 'alba', 'harghita', 'covasna'],
  'București-Ilfov': ['bucurești', 'ilfov'],
};
const MONTHS_RO = { 'ianuarie':1,'februarie':2,'martie':3,'aprilie':4,'mai':5,'iunie':6,'iulie':7,'august':8,'septembrie':9,'octombrie':10,'noiembrie':11,'decembrie':12 };

function euroToNumber(str) {
  if (!str) return 0;
  const lower = str.toLowerCase();
  let mult = 1;
  if (/mld|miliard/.test(lower)) mult = 1000000000;
  else if (/mil/.test(lower)) mult = 1000000;
  else if (/\bmii\b/.test(lower)) mult = 1000;
  // RON → EUR approx (only used when the amount is explicitly in lei)
  const isLei = /\blei\b|\bron\b/.test(lower);
  const num = lower.replace(/[^\d.,]/g, '');
  // Romanian formats: "2,5" decimal, "250.000" thousands
  let n;
  if (/\d\.\d{3}(?!\d)/.test(num) && !/,/.test(num)) n = parseFloat(num.replace(/\./g, ''));
  else n = parseFloat(num.replace(/\./g, '').replace(',', '.'));
  if (isNaN(n)) return 0;
  let v = Math.round(n * mult);
  if (isLei) v = Math.round(v * 0.2);
  return v;
}

function parseDeadline(text) {
  let m = text.match(/(\d{1,2})[.\/](\d{1,2})[.\/](\d{4})/);
  if (m) return m[3] + '-' + String(m[2]).padStart(2,'0') + '-' + String(m[1]).padStart(2,'0');
  m = text.match(/(\d{1,2})\s+(ianuarie|februarie|martie|aprilie|mai|iunie|iulie|august|septembrie|octombrie|noiembrie|decembrie)\s+(\d{4})/i);
  if (m) { const mo = MONTHS_RO[m[2].toLowerCase()]; return m[3] + '-' + String(mo).padStart(2,'0') + '-' + String(m[1]).padStart(2,'0'); }
  return null;
}

function matchKeywords(text, table, max) {
  const lt = text.toLowerCase();
  const hits = [];
  for (const [label, kws] of Object.entries(table)) {
    if (kws.some(k => lt.includes(k.toLowerCase()))) hits.push(label);
  }
  return max ? hits.slice(0, max) : hits;
}

// ── Relevance gate ─────────────────────────────────────────────────────────
// STRONG signals: the text describes an actual call / scheme people can apply to.
const STRONG_SIGNALS = [
  'apel de proiecte', 'apel de finan', 'apelul', 'ghidul solicitantului', 'ghid al solicitantului',
  'sesiune de depunere', 'sesiunea de depunere', 'se deschide sesiunea', 'deschide sesiunea',
  'depunere', 'cerere de finan', 'cereri de finan', 'nerambursabil', 'grant', 'granturi',
  'ajutor de stat', 'schem', 'linie de finan', 'termen limit', 'termen de depunere',
  'termenul de depunere', 'beneficiari eligibili', 'eligibil', 'lanseaz', 'se lanseaz',
  'până la data de', 'pot aplica', 'poți aplica', 'aplica', 'inscrier', 'înscrier', 'voucher',
];
// WEAK signals: funding-adjacent vocabulary that also appears in generic business news.
const WEAK_SIGNALS = ['finanț', 'fonduri', 'program', 'buget', 'sprijin', 'investiț', 'alocare'];
// NOISE: if present in the title, the block is news/analysis/commerce — not an opportunity.
const NOISE_TITLE = [
  'studiu', 'sondaj', 'webinar', 'video', 'podcast', 'interviu', 'opinie', 'editorial', 'analiz',
  'dobânz', 'dobanz', 'fidelis', 'titluri de stat', 'obligațiuni', 'pensi', 'bursă', 'bursa', 'acțiuni',
  'profit', 'cifra de afaceri', 'rezultate financiare', 'achiziți', 'cumpără', 'cumpara', 'vândut', 'vinde',
  'fond de investiții', 'fond de investitii', 'venture', 'private equity', 'investitori', 'listare',
  'angajat', 'angajaț', 'salari', 'patron', 'ceo', 'director', 'numit', 'demisi',
  'tva', 'anaf', 'amnisti', 'impozit', 'fiscal', 'taxe', 'declarați',
  'credit', 'creditar', 'garanți', 'împrumut', 'imprumut', 'dobând', 'leasing',
  'dolari', 'usd', 'crypto', 'bitcoin',
  'termen final pentru reform', 'reforme', 'jaloane', 'ținte pnrr',
  'imobiliar', 'hale', 'terenuri', 'apartament', 'chirii',
  'jocuri de noroc', 'pariuri', 'superbet', 'cazino',
  'cele mai citite', 'recomand', 'articole similare', 'newsletter', 'abonare', 'abonează',
  'contact', 'redacți', 'termeni', 'cookie', 'politica', 'despre noi', 'autentificare', 'login',
  'comentarii', 'distribuie', 'share', 'urmăre', 'facebook', 'linkedin', 'instagram', 'youtube',
  'expir', 's-a încheiat', 'a expirat', 'închis', 'închide', 'inchis',
];
// Section labels / navigation headings that are never opportunities.
const SECTION_LABELS = /^(finanț(ă|a)ri|fonduri( europene)?|știri|stiri|noutăți|noutati|ultimele|categorii|meniu|acasă|acasa|home|cele mai citite|parteneri|descoperă|descopera|newsletter|căutare|cautare|search)$/i;

function cleanTitle(raw) {
  let t = raw || '';
  // [text](url) → text ; ![alt](src) → ''
  t = t.replace(/!\[[^\]]*\]\([^)]*\)/g, '');
  t = t.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  t = t.replace(/[#*_`]/g, '').replace(/\s+/g, ' ').trim();
  // Drop trailing site-name suffixes: " - StartupCafe", " | MFE"
  t = t.replace(/\s*[-|–—]\s*(startupcafe|fonduri[- ]structurale|mfe|mipe|adr\s?\w+|afir|hotnews|economica)\.?(ro)?\s*$/i, '');
  return t;
}

// Split markdown into candidate blocks around headings, then gate + score each.
function extractOpportunities(markdown, src) {
  if (!markdown || markdown.length < 200) return [];
  const today = new Date().toISOString().slice(0, 10);
  const lines = markdown.split('\n');
  const blocks = [];
  let cur = null;
  for (const line of lines) {
    const h = line.match(/^#{1,4}\s+(.+)/) || line.match(/^\*\*(.+?)\*\*\s*$/);
    if (h) {
      if (cur) blocks.push(cur);
      cur = { title: cleanTitle(h[1]), body: '' };
    } else if (cur) {
      // Ignore pure-link / image lines in bodies (nav clutter)
      if (/^\s*!?\[[^\]]*\]\([^)]*\)\s*$/.test(line)) continue;
      cur.body += ' ' + line;
    }
  }
  if (cur) blocks.push(cur);

  const out = [];
  for (const b of blocks) {
    const title = b.title;
    if (!title || title.length < 18 || title.length > 170) continue;
    if (SECTION_LABELS.test(title)) continue;

    const lt_title = title.toLowerCase();
    if (NOISE_TITLE.some(n => lt_title.includes(n))) continue;

    const body = cleanTitle(b.body).slice(0, 1500);
    const text = title + ' ' + body;
    const lt = text.toLowerCase();

    const strong = STRONG_SIGNALS.filter(s => lt.includes(s)).length;
    const weak = WEAK_SIGNALS.filter(s => lt.includes(s)).length;
    const deadline = parseDeadline(text);
    const euroMatches = [...text.matchAll(/(?:€|eur\b|euro)\s?([\d.,]+)\s*(mii|mil(?:ioane)?|mld|miliarde)?|([\d.,]+)\s*(mii|mil(?:ioane)?|mld|miliarde)?\s*(?:€|eur\b|euro|lei|ron)\b/gi)];
    let grantMax = 0;
    for (const em of euroMatches) {
      const raw = em[0];
      const v = euroToNumber(raw);
      if (v > grantMax) grantMax = v;
    }

    // ── Gate: must look like an applicable call, not just money-adjacent news ──
    // Need at least one STRONG signal, plus (a second strong OR a deadline OR a concrete amount).
    const concrete = (deadline ? 1 : 0) + (grantMax > 0 ? 1 : 0);
    if (strong === 0) continue;
    if (strong === 1 && concrete === 0) continue;
    // Past deadlines are not opportunities.
    if (deadline && deadline < today) continue;

    const domains = matchKeywords(text, DOMAIN_KEYWORDS);
    const beneficiaries = matchKeywords(text, BENEF_KEYWORDS);
    const regionHits = matchKeywords(text, REGION_KEYWORDS);
    const regions = regionHits.length ? regionHits : ['Național'];

    // ── Confidence ──
    let conf = 25;
    conf += Math.min(strong * 12, 36);
    conf += Math.min(weak * 3, 9);
    if (deadline) conf += 12;
    if (grantMax > 0) conf += 8;
    if (domains.length) conf += 6;
    if (beneficiaries.length) conf += 6;
    if (body.length < 80) conf -= 12;          // title-only (list pages) is weaker evidence
    if (src.tier === 3) conf = Math.min(conf, 74); // editorial sources never auto-publish
    conf = Math.max(20, Math.min(conf, 95));

    out.push({
      title: title.slice(0, 140),
      source: src.host, sourceTier: src.tier,
      official_url: src.url, sourcePages: [src.url],
      program: title.slice(0, 80), callCode: 'AUTO/' + src.host,
      summary: body.slice(0, 260) || title,
      domains: domains.length ? domains : ['Antreprenoriat'],
      beneficiaries: beneficiaries.length ? beneficiaries : ['IMM'],
      regions,
      grantMin: 0, grantMax: grantMax || 0, cofinancing: 0,
      deadline: deadline || 'Nespecificat',
      launchDate: today,
      who: beneficiaries.join(', ') || 'Vezi ghidul oficial.',
      activities: 'Extras automat — verifică sursa oficială.',
      isUrgent: false, confidence: conf,
      _auto: true, _extractedAt: new Date().toISOString(),
    });
  }
  return out;
}

// Fingerprint for dedup: normalized title + host.
function oppFingerprint(o) {
  return (o.source + '|' + (o.title||'').toLowerCase().replace(/[^a-z0-9ăâîșț]+/g,' ').trim().slice(0,60));
}

// Persist extracted opps: high-confidence -> published KV set, rest -> review queue.
const AUTOPUBLISH_THRESHOLD = 78;
async function publishExtracted(extracted, env) {
  if (!env.FINMATCH_KV || !extracted.length) return { published: 0, queued: 0 };
  let pubMap = {}, revMap = {};
  try { const p = await env.FINMATCH_KV.get('opps:published'); if (p) pubMap = JSON.parse(p); } catch(e){}
  try { const r = await env.FINMATCH_KV.get('opps:review'); if (r) revMap = JSON.parse(r); } catch(e){}

  // Existing fingerprints (seed + already stored) to avoid dupes.
  const seen = new Set();
  for (const o of API_OPPORTUNITIES) seen.add(oppFingerprint(o));
  for (const o of Object.values(pubMap)) seen.add(oppFingerprint(o));
  for (const o of Object.values(revMap)) seen.add(oppFingerprint(o));

  let published = 0, queued = 0, nextId = 1000;
  const allIds = [...Object.keys(pubMap), ...Object.keys(revMap)].map(Number).filter(n=>!isNaN(n));
  if (allIds.length) nextId = Math.max(nextId, Math.max(...allIds) + 1);

  for (const o of extracted) {
    const fp = oppFingerprint(o);
    if (seen.has(fp)) continue;
    seen.add(fp);
    o.id = nextId++;
    o.status = 'ACTIV';
    if (o.confidence >= AUTOPUBLISH_THRESHOLD) { pubMap[o.id] = o; published++; }
    else { revMap[o.id] = o; queued++; }
  }
  try {
    await env.FINMATCH_KV.put('opps:published', JSON.stringify(pubMap));
    await env.FINMATCH_KV.put('opps:review', JSON.stringify(revMap));
  } catch(e){}
  return { published, queued };
}

async function crawlOne(src, env) {
  const apiKey = env.FIRECRAWL_API_KEY;
  if (!apiKey) return { host: src.host, status: 'err', error: 'FIRECRAWL_API_KEY nesetat' };
  const r = await firecrawlScrape(src, apiKey);
  const entry = {
    status: r.ok ? 'ok' : 'err',
    lastRun: new Date().toISOString(),
    ms: r.ms || 0, pages: r.ok ? 1 : 0,
    chars: r.markdown ? r.markdown.length : 0,
    title: r.title || '', error: r.ok ? null : (r.error || 'Continut gol'),
  };
  if (r.ok && entry.chars < 400) entry.status = 'warn';
  if (env.FINMATCH_KV) {
    try {
      if (r.ok && r.markdown) await env.FINMATCH_KV.put('src:raw:' + src.host, r.markdown, { expirationTtl: 1209600 });
      if (r.ok && r.markdown) {
        try {
          const extracted = extractOpportunities(r.markdown, src);
          const pub = await publishExtracted(extracted, env);
          entry.extracted = extracted.length;
          entry.published = pub.published;
          entry.queued = pub.queued;
        } catch (ex) { entry.extractError = String(ex && ex.message || ex); }
      }
      const raw = await env.FINMATCH_KV.get('src:status');
      const map = raw ? JSON.parse(raw) : {};
      map[src.host] = entry;
      await env.FINMATCH_KV.put('src:status', JSON.stringify(map));
    } catch (e) { entry.error = 'KV: ' + String(e && e.message || e); }
  }
  return { host: src.host, ...entry };
}

// ── Dynamic source registry: built-in CRAWL_SOURCES + custom ones stored in KV ──
// KV: sources:custom -> [ {host, url, name, tier, proxy, enabled, addedAt} ]
async function getCustomSources(env) {
  if (!env.FINMATCH_KV) return [];
  try { const r = await env.FINMATCH_KV.get('sources:custom'); return r ? JSON.parse(r) : []; } catch (e) { return []; }
}
async function putCustomSources(env, list) {
  if (!env.FINMATCH_KV) return;
  try { await env.FINMATCH_KV.put('sources:custom', JSON.stringify(list)); } catch (e) {}
}
// Disabled built-ins are tracked separately so the code list stays the source of truth.
async function getDisabledHosts(env) {
  if (!env.FINMATCH_KV) return [];
  try { const r = await env.FINMATCH_KV.get('sources:disabled'); return r ? JSON.parse(r) : []; } catch (e) { return []; }
}
async function getAllSources(env, includeDisabled) {
  const custom = await getCustomSources(env);
  const disabled = new Set(await getDisabledHosts(env));
  const seen = new Set();
  const out = [];
  for (const s of CRAWL_SOURCES) { seen.add(s.host); out.push({ ...s, builtin: true, enabled: !disabled.has(s.host) }); }
  for (const s of custom) { if (seen.has(s.host)) continue; seen.add(s.host); out.push({ ...s, builtin: false, enabled: s.enabled !== false }); }
  return includeDisabled ? out : out.filter(s => s.enabled);
}
function hostFromUrl(u) { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return ''; } }

async function crawlAll(env) {
  const results = [];
  const sources = await getAllSources(env);
  for (const src of sources) results.push(await crawlOne(src, env));
  if (env.FINMATCH_KV) { try { await env.FINMATCH_KV.put('src:lastFullRun', new Date().toISOString()); } catch (e) {} }
  return results;
}


/* ═══ MATCHING AGENT — profile → ranked funding options ═══
   Provider-agnostic (Anthropic default). Key via secret AI_API_KEY.
   Optional: AI_PROVIDER ('anthropic'|'openai'), AI_MODEL override. */

// Deterministic pre-filter: narrow the catalog to plausible candidates.
function prefilterOpps(profile) {
  const { orgType, domains = [], region, projectSize } = profile;
  return API_OPPORTUNITIES.filter(o => {
    if (o.status === 'ÎNCHIS') return false;
    if (orgType && orgType !== '' && o.beneficiaries.length && !o.beneficiaries.includes(orgType)) return false;
    if (region && region !== 'Oricare' && o.regions.length &&
        !o.regions.includes(region) && !o.regions.includes('Național')) return false;
    if (domains.length && !domains.some(d => o.domains.includes(d))) return false;
    if (projectSize && Number(projectSize) > 0 && o.grantMax < Number(projectSize) * 0.3) return false;
    return true;
  });
}

// Rule-based scoring — used as fallback and to seed the model.
function ruleScore(o, profile) {
  let s = 0;
  const domains = profile.domains || [];
  if (profile.orgType && o.beneficiaries.includes(profile.orgType)) s += 30;
  const dm = o.domains.filter(d => domains.includes(d)).length;
  s += Math.min(dm * 20, 40);
  if (profile.region && (o.regions.includes(profile.region) || o.regions.includes('Național'))) s += 15;
  if (o.status === 'ACTIV') s += 10;
  if (profile.projectSize > 0 && o.grantMax >= profile.projectSize) s += 5;
  if (profile.description) {
    const words = profile.description.toLowerCase().split(/[^a-zăâîșț0-9]+/).filter(x => x.length > 4);
    const hay = ((o.title||'') + ' ' + o.program + ' ' + o.domains.join(' ') + ' ' + o.beneficiaries.join(' ') + ' ' + (o.summary||'')).toLowerCase();
    const hits = new Set(words.filter(x => hay.includes(x))).size;
    s += Math.min(hits * 4, 20);
  }
  return Math.min(s, 100);
}

function ruleRank(profile) {
  const cands = prefilterOpps(profile);
  return cands
    .map(o => ({ id: o.id, score: ruleScore(o, profile), reason: 'Potrivire pe tip beneficiar, domeniu și regiune.' }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

// Call the LLM to rank candidates and explain fit. Returns [{id, score, reason}].
async function aiRank(profile, candidates, env) {
  const provider = (env.AI_PROVIDER || 'anthropic').toLowerCase();
  const key = env.AI_API_KEY;
  if (!key || !candidates.length) return null;

  const slim = candidates.map(o => ({
    id: o.id, title: o.title || o.program, program: o.program, status: o.status,
    domains: o.domains, beneficiaries: o.beneficiaries, regions: o.regions,
    grantMin: o.grantMin, grantMax: o.grantMax, cofinancing: o.cofinancing,
    summary: (o.summary || '').slice(0, 240),
  }));

  const sys = 'Ești consultant de finanțări din România. Primești descrierea liberă a unui proiect (câmpul description — sursa principală de adevăr), '
    + 'eventual câteva indicii structurate, și o listă de programe candidate. '
    + 'Deduce din descriere tipul de organizație, domeniul, regiunea, mărimea proiectului și nevoia reală, chiar dacă indiciile structurate lipsesc. '
    + 'Clasifică programele de la cel mai potrivit la cel mai puțin potrivit. În reason spune concret CE din descriere se potrivește cu CE din program (ex: „panouri fotovoltaice pe fermă → PNRR C16 finanțează SRE pentru IMM"). '
    + 'Răspunde DOAR cu JSON valid, fără markdown, de forma: '
    + '{"matches":[{"id":<number>,"score":<0-100>,"reason":"<o singură propoziție în română, max 20 cuvinte>"}]}. '
    + 'Include doar programe relevante (score >= 40). Ordonează descrescător după score.';

  const userMsg = 'PROFIL APLICANT:\n' + JSON.stringify(profile)
    + '\n\nPROGRAME CANDIDATE:\n' + JSON.stringify(slim)
    + '\n\nReturnează clasamentul ca JSON.';

  try {
    let text = '';
    if (provider === 'openai') {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: env.AI_MODEL || 'gpt-4o-mini',
          messages: [{ role: 'system', content: sys }, { role: 'user', content: userMsg }],
          temperature: 0.2, max_tokens: 900,
          response_format: { type: 'json_object' },
        }),
      });
      if (!res.ok) return null;
      const j = await res.json();
      text = j.choices && j.choices[0] && j.choices[0].message ? j.choices[0].message.content : '';
    } else {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: env.AI_MODEL || 'claude-sonnet-4-6',
          max_tokens: 900,
          system: sys,
          messages: [{ role: 'user', content: userMsg }],
        }),
      });
      if (!res.ok) return null;
      const j = await res.json();
      text = (j.content && j.content[0] && j.content[0].text) ? j.content[0].text : '';
    }
    // Strip any stray markdown fences, then parse.
    text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(text);
    const arr = Array.isArray(parsed) ? parsed : parsed.matches;
    if (!Array.isArray(arr)) return null;
    const valid = new Set(candidates.map(o => o.id));
    return arr
      .filter(m => valid.has(m.id))
      .map(m => ({ id: m.id, score: Math.max(0, Math.min(100, Number(m.score) || 0)), reason: String(m.reason || '').slice(0, 160) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  } catch (e) {
    return null;
  }
}

// Orchestrator: prefilter → AI rank (fallback to rules) → hydrate full opp objects.
async function matchProfile(profile, env) {
  const candidates = prefilterOpps(profile);
  let ranked = await aiRank(profile, candidates, env);
  let usedAI = true;
  if (!ranked || !ranked.length) { ranked = ruleRank(profile); usedAI = false; }
  const byId = Object.fromEntries(API_OPPORTUNITIES.map(o => [o.id, o]));
  const results = ranked
    .map(r => ({ ...r, opp: byId[r.id] }))
    .filter(r => r.opp);
  return { usedAI, count: results.length, results };
}


/* ═══ EMAIL ALERTS — subscriptions in KV + weekly digest via Resend ═══
   Secrets: RESEND_API_KEY | Vars: ALERT_FROM (e.g. "FinMatch <alerte@domeniu.ro>")
   KV: alerts:subs -> { id: {email, query, created, lastSent, confirmed} } */

function normEmail(e) { return String(e || '').trim().toLowerCase(); }
function isEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e); }

async function getSubs(env) {
  if (!env.FINMATCH_KV) return {};
  try { const r = await env.FINMATCH_KV.get('alerts:subs'); return r ? JSON.parse(r) : {}; } catch (e) { return {}; }
}
async function putSubs(env, subs) {
  if (!env.FINMATCH_KV) return;
  try { await env.FINMATCH_KV.put('alerts:subs', JSON.stringify(subs)); } catch (e) {}
}

// Full catalog (seed + auto-published) for matching alerts server-side.
async function getCatalog(env) {
  let pub = {};
  if (env.FINMATCH_KV) { try { const p = await env.FINMATCH_KV.get('opps:published'); if (p) pub = JSON.parse(p); } catch (e) {} }
  return [...API_OPPORTUNITIES, ...Object.values(pub)];
}

function oppMatchesQuery(o, q) {
  const words = q.toLowerCase().split(/\s+/).filter(x => x.length > 2);
  if (!words.length) return false;
  const hay = ((o.title||'') + ' ' + (o.program||'') + ' ' + (o.summary||'') + ' ' + (o.domains||[]).join(' ') + ' ' + (o.beneficiaries||[]).join(' ') + ' ' + (o.regions||[]).join(' ')).toLowerCase();
  return words.every(x => hay.includes(x));
}

function daysUntil(dateStr) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr || '')) return null;
  return Math.ceil((new Date(dateStr) - new Date()) / 86400000);
}

function fmtEur(n) { return '\u20ac' + (Number(n) || 0).toLocaleString('ro-RO'); }

function digestHtml(sub, matches, closing, baseUrl) {
  const row = o => {
    const d = daysUntil(o.deadline);
    const dl = d === null ? (o.deadline || '') : (d <= 0 ? 'expirat' : d + ' zile');
    return '<tr>'
      + '<td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">'
      + '<div style="font-weight:600;color:#0f172a;font-size:14px;">' + escapeHtml(o.title || o.program) + '</div>'
      + '<div style="font-size:12px;color:#64748b;margin-top:2px;">' + escapeHtml(o.source) + ' \u00b7 ' + (o.domains||[]).slice(0,3).join(', ') + '</div>'
      + '</td>'
      + '<td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;white-space:nowrap;font-size:13px;color:#0f172a;">' + fmtEur(o.grantMax) + '</td>'
      + '<td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;white-space:nowrap;font-size:13px;color:' + (d !== null && d <= 14 ? '#c2410c' : '#475569') + ';">' + dl + '</td>'
      + '</tr>';
  };
  const table = rows => '<table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">' + rows.map(row).join('') + '</table>';
  return '<div style="font-family:Inter,Arial,sans-serif;background:#f5f7fc;padding:24px;">'
    + '<div style="max-width:620px;margin:0 auto;">'
    + '<div style="font-weight:800;font-size:18px;color:#0f172a;margin-bottom:4px;">FinMatch Rom\u00e2nia</div>'
    + '<div style="font-size:13px;color:#64748b;margin-bottom:20px;">Digest s\u0103pt\u0103m\u00e2nal pentru alerta <strong>\u201e' + escapeHtml(sub.query) + '\u201d</strong></div>'
    + (matches.length ? '<h3 style="font-size:14px;color:#0f172a;margin:16px 0 8px;">Oportunit\u0103\u021Bi care se potrivesc (' + matches.length + ')</h3>' + table(matches) : '<p style="font-size:13px;color:#64748b;">Nicio oportunitate nou\u0103 pentru aceast\u0103 alert\u0103 s\u0103pt\u0103m\u00e2na aceasta.</p>')
    + (closing.length ? '<h3 style="font-size:14px;color:#c2410c;margin:20px 0 8px;">\u23f0 Se \u00eenchid \u00een urm\u0103toarele 30 de zile (' + closing.length + ')</h3>' + table(closing) : '')
    + '<div style="margin-top:22px;"><a href="' + baseUrl + '" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:600;">Deschide FinMatch \u2192</a></div>'
    + '<div style="font-size:11px;color:#94a3b8;margin-top:22px;line-height:1.6;">Prime\u0219ti acest email pentru c\u0103 ai creat o alert\u0103 pe FinMatch. Verific\u0103 \u00eentotdeauna sursa oficial\u0103 \u00eenainte de a aplica.<br>'
    + '<a href="' + baseUrl + '/api/alerts/unsubscribe?id=' + encodeURIComponent(sub.id) + '&e=' + encodeURIComponent(sub.email) + '" style="color:#94a3b8;">Dezabonare</a></div>'
    + '</div></div>';
}

function escapeHtml(s) { return String(s || '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

async function sendEmail(env, to, subject, html) {
  const key = env.RESEND_API_KEY;
  if (!key) return { ok: false, error: 'RESEND_API_KEY nesetat' };
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: env.ALERT_FROM || 'FinMatch <onboarding@resend.dev>', to: [to], subject, html }),
    });
    if (!res.ok) { let m = 'HTTP ' + res.status; try { const j = await res.json(); m = j.message || j.error || m; } catch (e) {} return { ok: false, error: m }; }
    return { ok: true };
  } catch (e) { return { ok: false, error: String(e && e.message || e) }; }
}

// Weekly digest: for each confirmed sub not emailed in the last 6 days, send matches + closing-soon.
async function sendDigests(env, baseUrl) {
  const subs = await getSubs(env);
  const ids = Object.keys(subs);
  if (!ids.length) return { sent: 0 };
  const catalog = (await getCatalog(env)).filter(o => o.status === 'ACTIV' || o.status === 'URMEAZ\u0102');
  const now = Date.now();
  let sent = 0, errors = 0;
  for (const id of ids) {
    const s = subs[id];
    if (!s || !s.email) continue;
    if (s.lastSent && now - new Date(s.lastSent).getTime() < 6 * 86400000) continue;
    const matches = catalog.filter(o => oppMatchesQuery(o, s.query)).slice(0, 10);
    const closing = catalog.filter(o => { const d = daysUntil(o.deadline); return d !== null && d > 0 && d <= 30; })
      .sort((a, b) => daysUntil(a.deadline) - daysUntil(b.deadline)).slice(0, 8);
    if (!matches.length && !closing.length) { s.lastSent = new Date().toISOString(); continue; }
    const subject = matches.length ? ('FinMatch: ' + matches.length + ' oportunit\u0103\u021Bi pentru \u201e' + s.query + '\u201d') : 'FinMatch: termene care se apropie';
    const r = await sendEmail(env, s.email, subject, digestHtml(s, matches, closing, baseUrl));
    if (r.ok) { s.lastSent = new Date().toISOString(); sent++; } else { s.lastError = r.error; errors++; }
  }
  await putSubs(env, subs);
  return { sent, errors };
}


/* ═══ AUTH — passwordless magic links, sessions in KV ═══
   KV: auth:token:<t> (15 min) | auth:session:<sid> (30 days) | users:<email>
   No passwords are ever stored. Login link is emailed via Resend.
   Dev: set var DEV_LOGIN_ECHO="true" to get the link back in the API response
        (ONLY for local testing; never in production). */

function randToken(bytes) {
  const a = new Uint8Array(bytes || 32); crypto.getRandomValues(a);
  return Array.from(a, b => b.toString(16).padStart(2, '0')).join('');
}
function parseCookies(request) {
  const out = {};
  const c = request.headers.get('Cookie') || '';
  c.split(';').forEach(p => { const i = p.indexOf('='); if (i > 0) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim()); });
  return out;
}
async function getSession(request, env) {
  if (!env.FINMATCH_KV) return null;
  const sid = parseCookies(request).fm_session;
  if (!sid) return null;
  try {
    const raw = await env.FINMATCH_KV.get('auth:session:' + sid);
    if (!raw) return null;
    const s = JSON.parse(raw);
    const u = await env.FINMATCH_KV.get('users:' + s.email);
    return { sid, email: s.email, user: u ? JSON.parse(u) : { email: s.email } };
  } catch (e) { return null; }
}
function sessionCookie(sid, maxAge) {
  return 'fm_session=' + sid + '; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=' + (maxAge == null ? 2592000 : maxAge);
}
function loginEmailHtml(link, name) {
  return '<div style="font-family:Inter,Arial,sans-serif;background:#f5f7fc;padding:24px;"><div style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:28px;">'
    + '<div style="font-weight:800;font-size:18px;color:#0f172a;margin-bottom:6px;">FinMatch Rom\u00e2nia</div>'
    + '<p style="font-size:14px;color:#0f172a;">Salut' + (name ? ' ' + escapeHtml(name) : '') + ',</p>'
    + '<p style="font-size:14px;color:#475569;line-height:1.6;">Apas\u0103 butonul de mai jos ca s\u0103 intri \u00een cont. Linkul e valabil 15 minute \u0219i poate fi folosit o singur\u0103 dat\u0103.</p>'
    + '<p style="margin:22px 0;"><a href="' + link + '" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 22px;border-radius:8px;font-size:14px;font-weight:600;">Intr\u0103 \u00een FinMatch \u2192</a></p>'
    + '<p style="font-size:12px;color:#94a3b8;line-height:1.6;">Dac\u0103 nu ai cerut tu acest link, po\u021Bi ignora emailul.<br>Link direct: <a href="' + link + '" style="color:#94a3b8;">' + link + '</a></p>'
    + '</div></div>';
}

export default {
  async scheduled(event, env, ctx) {
    const baseUrl = env.PUBLIC_URL || 'https://finmatch.workers.dev';
    ctx.waitUntil(crawlAll(env).then(() => sendDigests(env, baseUrl)));
  },

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
      return jsonResp({ total: API_OPPORTUNITIES.length, active, sources: 11 });
    }

    if (pathname === '/api/waitlist') {
      return jsonResp({ ok: true, message: 'Înscris pe lista de așteptare!' });
    }

    if (pathname === '/api/sources') {
      let map = {}, lastFullRun = null;
      if (env.FINMATCH_KV) {
        try {
          const raw = await env.FINMATCH_KV.get('src:status');
          if (raw) map = JSON.parse(raw);
          lastFullRun = await env.FINMATCH_KV.get('src:lastFullRun');
        } catch (e) {}
      }
      const registry = await getAllSources(env, true);
      return jsonResp({ sources: map, lastFullRun, registry: registry.map(s => ({ host: s.host, url: s.url, name: s.name || s.host, tier: s.tier, proxy: s.proxy || 'auto', builtin: !!s.builtin, enabled: s.enabled !== false })) });
    }

    // ── Auth ──
    // POST /api/auth/request {email, name?, org?} → sends magic link (creates account if new)
    if (pathname === '/api/auth/request') {
      if (request.method !== 'POST') return jsonResp({ error: 'Use POST' }, 405);
      if (!env.FINMATCH_KV) return jsonResp({ error: 'KV indisponibil' }, 500);
      let b; try { b = await request.json(); } catch (e) { return jsonResp({ error: 'JSON invalid' }, 400); }
      const email = normEmail(b.email);
      if (!isEmail(email)) return jsonResp({ error: 'Email invalid' }, 400);
      // Rate limit: 1 link / 60s per email
      const rlKey = 'auth:rl:' + email;
      if (await env.FINMATCH_KV.get(rlKey)) return jsonResp({ error: 'Am trimis deja un link. Verific\u0103 emailul (\u0219i spam) sau re\u00eencearc\u0103 \u00een 1 minut.' }, 429);
      await env.FINMATCH_KV.put(rlKey, '1', { expirationTtl: 60 });
      // Upsert user
      let user = null; try { const r = await env.FINMATCH_KV.get('users:' + email); if (r) user = JSON.parse(r); } catch (e) {}
      const isNew = !user;
      user = user || { email, createdAt: new Date().toISOString() };
      if (b.name) user.name = String(b.name).trim().slice(0, 80);
      if (b.org) user.org = String(b.org).trim().slice(0, 60);
      await env.FINMATCH_KV.put('users:' + email, JSON.stringify(user));
      // Token
      const t = randToken(32);
      await env.FINMATCH_KV.put('auth:token:' + t, JSON.stringify({ email, exp: Date.now() + 15 * 60000 }), { expirationTtl: 900 });
      const link = url.origin + '/api/auth/verify?t=' + t;
      const r = await sendEmail(env, email, isNew ? 'Bun venit la FinMatch \u2014 confirm\u0103 contul' : 'Linkul t\u0103u de autentificare FinMatch', loginEmailHtml(link, user.name));
      const echo = env.DEV_LOGIN_ECHO === 'true';
      return jsonResp({ ok: true, sent: r.ok, isNew, error: r.ok ? null : r.error, devLink: echo ? link : undefined });
    }
    // GET /api/auth/verify?t= → sets session cookie, redirects to app
    if (pathname === '/api/auth/verify') {
      const t = url.searchParams.get('t') || '';
      const fail = (msg) => new Response('<html><body style="font-family:Inter,Arial;padding:40px;text-align:center;color:#0f172a;"><h2>Link invalid sau expirat</h2><p>' + msg + '</p><a href="' + url.origin + '/?auth=retry">Cere un link nou</a></body></html>', { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
      if (!t || !env.FINMATCH_KV) return fail('Lipse\u0219te tokenul.');
      let tok = null; try { const r = await env.FINMATCH_KV.get('auth:token:' + t); if (r) tok = JSON.parse(r); } catch (e) {}
      if (!tok || tok.exp < Date.now()) return fail('Linkurile sunt valabile 15 minute \u0219i o singur\u0103 dat\u0103.');
      await env.FINMATCH_KV.delete('auth:token:' + t);
      const sid = randToken(32);
      await env.FINMATCH_KV.put('auth:session:' + sid, JSON.stringify({ email: tok.email, created: new Date().toISOString(), ua: request.headers.get('User-Agent') || '' }), { expirationTtl: 2592000 });
      try { const r = await env.FINMATCH_KV.get('users:' + tok.email); const u = r ? JSON.parse(r) : { email: tok.email }; u.lastLogin = new Date().toISOString(); await env.FINMATCH_KV.put('users:' + tok.email, JSON.stringify(u)); } catch (e) {}
      return new Response(null, { status: 302, headers: { 'Location': url.origin + '/?auth=ok#match', 'Set-Cookie': sessionCookie(sid) } });
    }
    // GET /api/auth/me
    if (pathname === '/api/auth/me') {
      const s = await getSession(request, env);
      return s ? jsonResp({ ok: true, user: { email: s.email, name: s.user.name || null, org: s.user.org || null } }) : jsonResp({ ok: false }, 401);
    }
    // POST /api/auth/logout
    if (pathname === '/api/auth/logout') {
      const s = await getSession(request, env);
      if (s && env.FINMATCH_KV) { try { await env.FINMATCH_KV.delete('auth:session:' + s.sid); } catch (e) {} }
      return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json', 'Set-Cookie': sessionCookie('', 0), ...CORS } });
    }

    if (pathname === '/api/match') {
      if (request.method !== 'POST') return jsonResp({ error: 'Use POST' }, 405);
      // Gate: requires a signed-in user
      const session = await getSession(request, env);
      if (!session) return jsonResp({ error: 'auth', message: 'Autentificare necesar\u0103' }, 401);
      let profile;
      try { profile = await request.json(); }
      catch (e) { return jsonResp({ error: 'JSON invalid' }, 400); }
      profile.projectSize = Number(profile.projectSize) || 0;
      profile.domains = Array.isArray(profile.domains) ? profile.domains : [];
      const out = await matchProfile(profile, env);
      return jsonResp(out);
    }

    // Merged catalog: seed + auto-published crawl results
    if (pathname === '/api/opportunities') {
      let pub = {};
      if (env.FINMATCH_KV) { try { const p = await env.FINMATCH_KV.get('opps:published'); if (p) pub = JSON.parse(p); } catch(e){} }
      const published = Object.values(pub);
      return jsonResp({ seed: API_OPPORTUNITIES.length, published: published.length, opportunities: published });
    }

    // Review queue (pending auto-extracted, below auto-publish threshold)
    if (pathname === '/api/review') {
      let rev = {};
      if (env.FINMATCH_KV) { try { const r = await env.FINMATCH_KV.get('opps:review'); if (r) rev = JSON.parse(r); } catch(e){} }
      return jsonResp({ count: Object.keys(rev).length, items: Object.values(rev) });
    }

    // Approve/reject a queued item.  POST /api/review/approve?id=  |  /reject?id=
    if (pathname === '/api/review/approve' || pathname === '/api/review/reject') {
      if (request.method !== 'POST') return jsonResp({ error: 'Use POST' }, 405);
      const id = url.searchParams.get('id');
      if (!id || !env.FINMATCH_KV) return jsonResp({ error: 'id lipsă sau KV indisponibil' }, 400);
      let rev = {}, pub = {};
      try { const r = await env.FINMATCH_KV.get('opps:review'); if (r) rev = JSON.parse(r); } catch(e){}
      const item = rev[id];
      if (!item) return jsonResp({ error: 'Element inexistent' }, 404);
      delete rev[id];
      if (pathname.endsWith('approve')) {
        try { const p = await env.FINMATCH_KV.get('opps:published'); if (p) pub = JSON.parse(p); } catch(e){}
        item.status = 'ACTIV';
        pub[id] = item;
        await env.FINMATCH_KV.put('opps:published', JSON.stringify(pub));
      }
      await env.FINMATCH_KV.put('opps:review', JSON.stringify(rev));
      return jsonResp({ ok: true, action: pathname.endsWith('approve') ? 'approved' : 'rejected', id });
    }

    // Unpublish one auto item: POST /api/published/remove?id=   |  Purge all auto: POST /api/published/purge
    if (pathname === '/api/published/remove' || pathname === '/api/published/purge') {
      if (request.method !== 'POST') return jsonResp({ error: 'Use POST' }, 405);
      if (!env.FINMATCH_KV) return jsonResp({ error: 'KV indisponibil' }, 400);
      let pub = {};
      try { const p = await env.FINMATCH_KV.get('opps:published'); if (p) pub = JSON.parse(p); } catch(e){}
      if (pathname.endsWith('purge')) {
        const n = Object.keys(pub).length;
        await env.FINMATCH_KV.put('opps:published', JSON.stringify({}));
        await env.FINMATCH_KV.put('opps:review', JSON.stringify({}));
        return jsonResp({ ok: true, removed: n });
      }
      const id = url.searchParams.get('id');
      if (!id || !pub[id]) return jsonResp({ error: 'Element inexistent' }, 404);
      delete pub[id];
      await env.FINMATCH_KV.put('opps:published', JSON.stringify(pub));
      return jsonResp({ ok: true, id });
    }

    // ── Email alerts ──
    if (pathname === '/api/alerts/subscribe') {
      if (request.method !== 'POST') return jsonResp({ error: 'Use POST' }, 405);
      let b; try { b = await request.json(); } catch (e) { return jsonResp({ error: 'JSON invalid' }, 400); }
      const email = normEmail(b.email); const query = String(b.query || '').trim().slice(0, 120);
      if (!isEmail(email)) return jsonResp({ error: 'Email invalid' }, 400);
      if (!query) return jsonResp({ error: 'Termen lips\u0103' }, 400);
      const subs = await getSubs(env);
      // Dedup same email+query
      const dup = Object.values(subs).find(s => s.email === email && s.query.toLowerCase() === query.toLowerCase());
      if (dup) return jsonResp({ ok: true, id: dup.id, existing: true });
      const id = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()));
      subs[id] = { id, email, query, created: new Date().toISOString(), lastSent: null };
      await putSubs(env, subs);
      // Send an immediate first digest so the user sees value right away.
      const baseUrl = url.origin;
      const catalog = (await getCatalog(env)).filter(o => o.status === 'ACTIV' || o.status === 'URMEAZ\u0102');
      const matches = catalog.filter(o => oppMatchesQuery(o, query)).slice(0, 10);
      const closing = catalog.filter(o => { const d = daysUntil(o.deadline); return d !== null && d > 0 && d <= 30; }).slice(0, 8);
      const r = await sendEmail(env, email, 'FinMatch: alert\u0103 activat\u0103 pentru \u201e' + query + '\u201d', digestHtml(subs[id], matches, closing, baseUrl));
      if (r.ok) { subs[id].lastSent = new Date().toISOString(); await putSubs(env, subs); }
      return jsonResp({ ok: true, id, emailSent: r.ok, emailError: r.ok ? null : r.error, matches: matches.length });
    }
    if (pathname === '/api/alerts/unsubscribe') {
      const id = url.searchParams.get('id'); const e = normEmail(url.searchParams.get('e'));
      const subs = await getSubs(env);
      if (id && subs[id] && subs[id].email === e) { delete subs[id]; await putSubs(env, subs); }
      return new Response('<html><body style="font-family:Inter,Arial;padding:40px;text-align:center;color:#0f172a;"><h2>Dezabonat</h2><p>Nu vei mai primi alerte pentru aceast\u0103 c\u0103utare.</p><a href="' + url.origin + '">\u00cenapoi la FinMatch</a></body></html>', { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    if (pathname === '/api/alerts/mine') {
      const e = normEmail(url.searchParams.get('e'));
      if (!isEmail(e)) return jsonResp({ items: [] });
      const subs = await getSubs(env);
      return jsonResp({ items: Object.values(subs).filter(s => s.email === e).map(s => ({ id: s.id, query: s.query, created: s.created, lastSent: s.lastSent })) });
    }
    // Manual digest trigger (admin): POST /api/alerts/send-digests
    if (pathname === '/api/alerts/send-digests') {
      if (request.method !== 'POST') return jsonResp({ error: 'Use POST' }, 405);
      const r = await sendDigests(env, url.origin);
      return jsonResp({ ok: true, ...r });
    }

    // ── Source management ──
    // POST /api/sources/add  {url, name?, tier?, proxy?}  → adds custom source (and crawls it once)
    if (pathname === '/api/sources/add') {
      if (request.method !== 'POST') return jsonResp({ error: 'Use POST' }, 405);
      let b; try { b = await request.json(); } catch (e) { return jsonResp({ error: 'JSON invalid' }, 400); }
      let u = String(b.url || '').trim();
      if (u && !/^https?:\/\//i.test(u)) u = 'https://' + u;
      const host = hostFromUrl(u);
      if (!host || !host.includes('.')) return jsonResp({ error: 'URL invalid' }, 400);
      const all = await getAllSources(env, true);
      if (all.find(s => s.host === host)) return jsonResp({ error: 'Sursa exist\u0103 deja: ' + host }, 409);
      const tier = [1, 2, 3].includes(Number(b.tier)) ? Number(b.tier) : 2;
      const proxy = ['auto', 'basic', 'stealth', 'enhanced'].includes(b.proxy) ? b.proxy : 'auto';
      const src = { host, url: u, name: String(b.name || host).trim().slice(0, 80), tier, proxy, enabled: true, addedAt: new Date().toISOString() };
      const custom = await getCustomSources(env);
      custom.push(src);
      await putCustomSources(env, custom);
      // Crawl right away so the user sees whether the site is reachable.
      const result = b.crawlNow === false ? null : await crawlOne(src, env);
      return jsonResp({ ok: true, source: src, crawl: result });
    }
    // POST /api/sources/remove?host=   (custom only)
    if (pathname === '/api/sources/remove') {
      if (request.method !== 'POST') return jsonResp({ error: 'Use POST' }, 405);
      const host = url.searchParams.get('host');
      const custom = await getCustomSources(env);
      const next = custom.filter(s => s.host !== host);
      if (next.length === custom.length) return jsonResp({ error: 'Doar sursele ad\u0103ugate manual pot fi \u0219terse' }, 400);
      await putCustomSources(env, next);
      // Drop its cached status/raw
      if (env.FINMATCH_KV) { try {
        const raw = await env.FINMATCH_KV.get('src:status'); const map = raw ? JSON.parse(raw) : {};
        delete map[host]; await env.FINMATCH_KV.put('src:status', JSON.stringify(map));
        await env.FINMATCH_KV.delete('src:raw:' + host);
      } catch (e) {} }
      return jsonResp({ ok: true, host });
    }
    // POST /api/sources/toggle?host=   (works for built-in and custom)
    if (pathname === '/api/sources/toggle') {
      if (request.method !== 'POST') return jsonResp({ error: 'Use POST' }, 405);
      const host = url.searchParams.get('host');
      const custom = await getCustomSources(env);
      const c = custom.find(s => s.host === host);
      if (c) { c.enabled = c.enabled === false; await putCustomSources(env, custom); return jsonResp({ ok: true, host, enabled: c.enabled }); }
      if (!CRAWL_SOURCES.find(s => s.host === host)) return jsonResp({ error: 'Surs\u0103 necunoscut\u0103' }, 404);
      const disabled = await getDisabledHosts(env);
      const i = disabled.indexOf(host);
      if (i >= 0) disabled.splice(i, 1); else disabled.push(host);
      if (env.FINMATCH_KV) { try { await env.FINMATCH_KV.put('sources:disabled', JSON.stringify(disabled)); } catch (e) {} }
      return jsonResp({ ok: true, host, enabled: i >= 0 });
    }

    if (pathname === '/api/recrawl') {
      if (request.method !== 'POST') return jsonResp({ error: 'Use POST' }, 405);
      const host = url.searchParams.get('host');
      if (host) {
        const src = (await getAllSources(env, true)).find(s => s.host === host);
        if (!src) return jsonResp({ error: 'Sursa necunoscuta: ' + host }, 404);
        const result = await crawlOne(src, env);
        return jsonResp({ ok: result.status !== 'err', result });
      }
      ctx.waitUntil(crawlAll(env));
      return jsonResp({ ok: true, message: 'Re-crawl pornit', count: (await getAllSources(env)).length });
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
