<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Signal — Que te encuentren.</title>
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='16' fill='%238B5CF6'/><text x='16' y='22' font-family='Georgia,serif' font-size='18' font-weight='700' text-anchor='middle' fill='%23000000'>S</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #0a0a0b;
    --surface: #111113;
    --surface2: #16161a;
    --border: #1e1e24;
    --border2: #27272f;
    --text: #eeeef0;
    --text-muted: #64646e;
    --text-dim: #38383f;
    --accent: #8B5CF6;
    --accent-dim: rgba(139,92,246,0.1);
    --accent-hover: #9d74f7;
    --positive: #6ee7b7;
    --positive-dim: rgba(110,231,183,0.1);
    --warning: #fbbf24;
    --warning-dim: rgba(251,191,36,0.1);
    --danger: #f87171;
    --danger-dim: rgba(248,113,113,0.1);
    --info: #93c5fd;
    --info-dim: rgba(147,197,253,0.1);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    min-height: 100vh;
    overflow-x: hidden;
    padding-bottom: 48px;
  }

  .font-mono { font-family: 'DM Mono', monospace; }

  .screen { display: none; min-height: 100vh; }
  .screen.active { display: flex; flex-direction: column; }

  /* ══════════════════════════════
     NAV + PROGRESS
  ══════════════════════════════ */
  .progress-bar {
    position: fixed; top: 0; left: 0;
    height: 1px; background: var(--accent);
    transition: width 0.45s ease;
    z-index: 200; opacity: 0.6;
  }

  .nav {
    position: fixed; top: 0; left: 0; right: 0;
    padding: 18px 28px;
    display: flex; align-items: center; justify-content: space-between;
    z-index: 100;
    background: linear-gradient(to bottom, rgba(10,10,11,0.97) 0%, transparent 100%);
  }

  .nav-logo {
    font-size: 15px; font-weight: 600; letter-spacing: -0.02em;
    color: var(--text); display: flex; align-items: center;
  }
  .nav-logo .dot { color: var(--accent); }

  .nav-hint {
    font-family: 'DM Mono', monospace; font-size: 10px;
    color: var(--text-dim); letter-spacing: 0.06em; text-transform: uppercase;
  }

  /* ══════════════════════════════
     LANDING
  ══════════════════════════════ */
  #landing {
    align-items: center; justify-content: center;
    padding: 80px 24px 80px; position: relative;
  }

  #landing::after {
    content: ''; position: fixed;
    top: -300px; left: 50%; transform: translateX(-50%);
    width: 560px; height: 480px;
    background: radial-gradient(ellipse at center, rgba(139,92,246,0.07) 0%, transparent 68%);
    pointer-events: none;
  }

  .landing-inner {
    max-width: 580px; width: 100%;
    text-align: center; animation: fadeUp 0.7s ease both;
  }

  .signal-badge {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'DM Mono', monospace; font-size: 11px;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--text-muted); border: 1px solid var(--border2);
    border-radius: 100px; padding: 6px 16px; margin-bottom: 40px;
    background: var(--surface);
  }
  .signal-badge::before {
    content: ''; width: 5px; height: 5px;
    border-radius: 50%; background: var(--accent); flex-shrink: 0;
  }

  .landing-title {
    font-size: clamp(38px, 7vw, 62px); font-weight: 600;
    line-height: 1.0; letter-spacing: -0.03em;
    margin-bottom: 18px; color: var(--text);
  }
  .landing-title .accent-word { color: var(--accent); display: block; }

  .landing-subtitle {
    font-size: 16px; font-weight: 300; color: var(--text-muted);
    line-height: 1.65; max-width: 380px; margin: 0 auto 48px;
  }

  .cta-btn {
    display: inline-flex; align-items: center; gap: 9px;
    background: var(--accent); color: #fff;
    font-weight: 500; font-size: 15px;
    padding: 13px 30px; border-radius: 6px;
    border: none; cursor: pointer;
    transition: background 0.18s, transform 0.18s;
  }
  .cta-btn:hover { background: var(--accent-hover); transform: translateY(-1px); }
  .cta-btn svg { transition: transform 0.18s; }
  .cta-btn:hover svg { transform: translateX(3px); }

  .landing-note {
    margin-top: 20px; font-family: 'DM Mono', monospace;
    font-size: 11px; color: var(--text-dim); letter-spacing: 0.05em;
  }

  .how-it-works {
    margin-top: 72px; display: flex; gap: 8px;
    justify-content: center; flex-wrap: wrap; align-items: center;
  }
  .step-pill {
    display: flex; align-items: center; gap: 8px;
    font-size: 12px; font-family: 'DM Mono', monospace;
    color: var(--text-muted); padding: 7px 14px;
    border: 1px solid var(--border); border-radius: 100px;
    background: var(--surface);
  }
  .step-pill .num {
    font-size: 10px; font-weight: 500; color: var(--accent);
    background: var(--accent-dim); width: 17px; height: 17px;
    border-radius: 50%; display: flex; align-items: center;
    justify-content: center; flex-shrink: 0;
  }
  .step-arrow { color: var(--text-dim); font-size: 14px; }

  /* ══════════════════════════════
     FORM
  ══════════════════════════════ */
  #form-screen {
    align-items: center; justify-content: center; padding: 80px 24px 80px;
  }

  .form-container {
    max-width: 500px; width: 100%; animation: fadeUp 0.45s ease both;
  }

  .back-btn {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: 'DM Mono', monospace; font-size: 11px;
    color: var(--text-dim); background: none; border: none;
    cursor: pointer; padding: 0; margin-bottom: 40px;
    letter-spacing: 0.06em; text-transform: uppercase;
    transition: color 0.2s;
  }
  .back-btn:hover { color: var(--text-muted); }

  .form-label-top {
    font-family: 'DM Mono', monospace; font-size: 11px;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--text-dim); margin-bottom: 10px; display: block;
  }
  .form-title {
    font-size: 24px; font-weight: 600;
    letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 8px;
  }
  .form-hint { font-size: 14px; color: var(--text-muted); line-height: 1.55; margin-bottom: 32px; }

  .field { display: flex; flex-direction: column; gap: 7px; margin-bottom: 16px; }

  .field label {
    font-family: 'DM Mono', monospace; font-size: 11px;
    letter-spacing: 0.07em; text-transform: uppercase; color: var(--text-muted);
  }
  .field label .optional {
    color: var(--text-dim); text-transform: none;
    letter-spacing: 0; font-size: 10px; margin-left: 5px;
  }

  .field input, .field textarea {
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: 5px; padding: 13px 15px;
    color: var(--text); font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 300; outline: none;
    transition: border-color 0.18s, background 0.18s; width: 100%;
  }
  .field textarea { resize: vertical; min-height: 80px; line-height: 1.55; }
  .field input::placeholder, .field textarea::placeholder { color: var(--text-dim); }
  .field input:focus, .field textarea:focus {
    border-color: rgba(139,92,246,0.4); background: var(--surface2);
  }
  .field-error { border-color: rgba(248,113,113,0.4) !important; }

  .submit-btn {
    width: 100%; background: var(--accent); color: #fff;
    font-weight: 500; font-size: 15px; padding: 15px;
    border-radius: 6px; border: none; cursor: pointer;
    transition: background 0.18s, transform 0.18s;
    display: flex; align-items: center; justify-content: center; gap: 9px;
    margin-top: 8px;
  }
  .submit-btn:hover:not(:disabled) { background: var(--accent-hover); transform: translateY(-1px); }
  .submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  /* ══════════════════════════════
     LOADING
  ══════════════════════════════ */
  #loading-screen {
    align-items: center; justify-content: center;
    padding: 40px 24px; flex-direction: column; gap: 36px;
  }

  .loading-signal {
    position: relative; width: 72px; height: 72px;
    display: flex; align-items: center; justify-content: center;
  }
  .loading-signal .core {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--accent); box-shadow: 0 0 10px rgba(139,92,246,0.35);
    z-index: 1; position: relative;
  }
  .ring {
    position: absolute; border-radius: 50%;
    border: 1px solid rgba(139,92,246,0.18);
    animation: expand 2.4s ease-out infinite;
  }
  .ring:nth-child(1) { width: 32px; height: 32px; animation-delay: 0s; }
  .ring:nth-child(2) { width: 52px; height: 52px; animation-delay: 0.7s; }
  .ring:nth-child(3) { width: 72px; height: 72px; animation-delay: 1.4s; }

  @keyframes expand {
    0%   { opacity: 0.6; transform: scale(0.5); }
    100% { opacity: 0;   transform: scale(1); }
  }

  .loading-text {
    font-family: 'DM Mono', monospace; font-size: 12px;
    color: var(--text-dim); letter-spacing: 0.07em; text-align: center;
  }
  .loading-steps {
    display: flex; flex-direction: column; gap: 10px;
    width: 100%; max-width: 300px;
  }
  .loading-step {
    display: flex; align-items: center; gap: 10px;
    font-family: 'DM Mono', monospace; font-size: 11px;
    color: var(--text-dim); letter-spacing: 0.04em; transition: color 0.35s;
  }
  .loading-step.done   { color: var(--text-muted); }
  .loading-step.active { color: var(--text); }
  .step-icon {
    width: 20px; height: 20px; border-radius: 50%;
    border: 1px solid var(--border2); display: flex;
    align-items: center; justify-content: center;
    font-size: 10px; flex-shrink: 0; transition: all 0.35s;
  }
  .loading-step.done .step-icon {
    background: var(--accent-dim); border-color: var(--accent); color: var(--accent);
  }
  .loading-step.active .step-icon {
    border-color: rgba(139,92,246,0.45); animation: blink 1s ease-in-out infinite;
  }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

  /* ══════════════════════════════
     RESULTS
  ══════════════════════════════ */
  #results-screen {
    padding: 72px 24px 80px; align-items: center;
  }

  .results-container {
    max-width: 660px; width: 100%; animation: fadeUp 0.5s ease both;
  }

  /* ── 1. DIAGNÓSTICO HERO ── */
  .diag-block {
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: 10px;
    padding: 28px 28px 24px;
    margin-bottom: 10px;
    position: relative;
    overflow: hidden;
  }

  .diag-block::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--accent), transparent);
  }

  .diag-top {
    display: flex; align-items: flex-start;
    justify-content: space-between; gap: 20px; margin-bottom: 20px;
  }

  .diag-score-wrap { flex-shrink: 0; }

  .diag-score-number {
    font-size: 56px; font-weight: 600; letter-spacing: -0.04em;
    line-height: 1; color: var(--accent);
  }
  .diag-score-denom {
    font-family: 'DM Mono', monospace; font-size: 13px;
    color: var(--text-dim); letter-spacing: 0.02em;
  }

  .diag-right { flex: 1; padding-top: 4px; }

  .diag-status-row {
    display: flex; align-items: center; gap: 8px; margin-bottom: 6px;
  }
  .diag-status-pill {
    font-family: 'DM Mono', monospace; font-size: 10px;
    font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 100px;
    border: 1px solid; display: inline-block;
  }
  .diag-status-pill.alto  { color: var(--positive); border-color: rgba(110,231,183,0.3); background: var(--positive-dim); }
  .diag-status-pill.medio { color: var(--accent);   border-color: rgba(139,92,246,0.3); background: var(--accent-dim); }
  .diag-status-pill.bajo  { color: var(--danger);   border-color: rgba(248,113,113,0.3); background: var(--danger-dim); }

  .diag-headline {
    font-size: 18px; font-weight: 500; letter-spacing: -0.01em;
    line-height: 1.35; color: var(--text); margin-bottom: 6px;
  }

  .diag-insight {
    font-size: 13px; color: var(--text-muted); line-height: 1.5;
  }

  .diag-prediction {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 16px;
    background: var(--surface2);
    border-radius: 6px;
    border: 1px solid var(--border);
  }

  .diag-prediction-icon {
    width: 28px; height: 28px; border-radius: 6px;
    background: var(--positive-dim); border: 1px solid rgba(110,231,183,0.2);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; font-size: 14px;
  }

  .diag-prediction-text {
    font-size: 13px; color: var(--text); line-height: 1.4;
  }

  .diag-prediction-text strong {
    color: var(--positive); font-weight: 500;
  }

  /* ── 2. ACCIONES ── */
  .section-header {
    display: flex; align-items: baseline; gap: 10px;
    margin: 24px 0 10px;
  }

  .section-title {
    font-size: 13px; font-weight: 500;
    letter-spacing: -0.01em; color: var(--text);
  }

  .section-count {
    font-family: 'DM Mono', monospace; font-size: 10px;
    color: var(--text-dim); letter-spacing: 0.05em;
  }

  .actions-stack {
    display: flex; flex-direction: column; gap: 6px;
  }

  .action-row {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 14px 16px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 7px;
    transition: border-color 0.18s;
  }
  .action-row:hover { border-color: var(--border2); }

  .action-row-num {
    font-family: 'DM Mono', monospace; font-size: 10px;
    font-weight: 500; color: var(--accent);
    background: var(--accent-dim);
    border: 1px solid rgba(139,92,246,0.2);
    width: 20px; height: 20px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 1px;
  }

  .action-row-body { flex: 1; }

  .action-row-text {
    font-size: 14px; color: var(--text);
    line-height: 1.5; font-weight: 300; margin-bottom: 8px;
  }

  .action-row-tags {
    display: flex; gap: 6px; flex-wrap: wrap;
  }

  .tag {
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.06em; text-transform: uppercase;
    padding: 3px 8px; border-radius: 4px; border: 1px solid;
  }

  .tag-impact-alto    { color: var(--positive); border-color: rgba(110,231,183,0.25); background: var(--positive-dim); }
  .tag-impact-medio   { color: var(--warning);  border-color: rgba(251,191,36,0.25);  background: var(--warning-dim); }
  .tag-impact-bajo    { color: var(--text-muted); border-color: var(--border2); background: var(--surface2); }
  .tag-dif-facil      { color: var(--info);     border-color: rgba(147,197,253,0.25); background: var(--info-dim); }
  .tag-dif-medio      { color: var(--warning);  border-color: rgba(251,191,36,0.25);  background: var(--warning-dim); }
  .tag-dif-dificil    { color: var(--danger);   border-color: rgba(248,113,113,0.25); background: var(--danger-dim); }

  /* ── 3. QUICK WIN ── */
  .quickwin-block {
    background: var(--surface);
    border: 1px solid rgba(251,191,36,0.15);
    border-radius: 7px; overflow: hidden;
    margin-top: 6px;
  }

  .quickwin-header {
    padding: 12px 16px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center;
    justify-content: space-between;
  }

  .quickwin-label {
    display: flex; align-items: center; gap: 8px;
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted);
  }

  .quickwin-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--warning); flex-shrink: 0; }

  .quickwin-body { padding: 14px 16px; }

  .quickwin-text {
    font-size: 14px; color: var(--text); line-height: 1.6;
    font-weight: 400; padding: 12px 14px;
    background: rgba(251,191,36,0.04);
    border-radius: 5px; border-left: 2px solid rgba(251,191,36,0.3);
  }

  /* ── 4. ALTERNATIVA AGRESIVA ── */
  .aggressive-block {
    background: var(--surface);
    border: 1px solid rgba(248,113,113,0.12);
    border-radius: 7px; overflow: hidden;
    margin-top: 6px;
  }

  .aggressive-header {
    padding: 12px 16px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center;
    justify-content: space-between;
  }

  .aggressive-label {
    display: flex; align-items: center; gap: 8px;
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted);
  }

  .aggressive-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--danger); flex-shrink: 0; }

  .aggressive-body { padding: 14px 16px; display: flex; flex-direction: column; gap: 0; }

  .agg-row {
    display: grid; grid-template-columns: 44px 1fr auto;
    align-items: start; gap: 12px; padding: 10px 0;
  }
  .agg-row + .agg-row { border-top: 1px solid var(--border); }

  .agg-label-text {
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--text-dim); padding-top: 2px;
  }

  .agg-content {
    font-size: 14px; line-height: 1.55;
    color: var(--text); font-weight: 300;
  }

  /* ── 5. DIVISOR "CONTENIDO GENERADO" ── */
  .content-divider {
    display: flex; align-items: center; gap: 12px;
    margin: 28px 0 12px;
  }
  .content-divider-line {
    flex: 1; height: 1px; background: var(--border);
  }
  .content-divider-label {
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-dim);
    white-space: nowrap;
  }

  /* ── CARDS genéricas ── */
  .result-cards { display: flex; flex-direction: column; gap: 6px; }

  .result-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 7px; overflow: hidden; transition: border-color 0.18s;
  }
  .result-card:hover { border-color: var(--border2); }

  .card-header {
    padding: 12px 16px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
  }

  .card-label {
    display: flex; align-items: center; gap: 8px;
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted);
  }

  .card-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
  .dot-seo    { background: var(--accent); }
  .dot-web    { background: var(--info); }
  .dot-ai     { background: var(--positive); }

  .copy-btn {
    display: flex; align-items: center; gap: 5px;
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.05em; text-transform: uppercase;
    color: var(--text-dim); background: none;
    border: 1px solid var(--border); border-radius: 4px;
    padding: 4px 9px; cursor: pointer; flex-shrink: 0;
    transition: color 0.18s, border-color 0.18s;
  }
  .copy-btn:hover  { color: var(--text-muted); border-color: var(--border2); }
  .copy-btn.copied { color: var(--positive);   border-color: rgba(110,231,183,0.3); }

  .card-body { padding: 16px; }

  .card-content { font-size: 14px; line-height: 1.65; color: var(--text); font-weight: 300; }
  .card-content.title-content { font-size: 17px; font-weight: 500; letter-spacing: -0.01em; line-height: 1.35; }
  .card-content.meta-content  { color: #b0b0bc; line-height: 1.6; }

  .char-hint {
    font-family: 'DM Mono', monospace; font-size: 10px;
    color: var(--text-dim); margin-top: 8px; letter-spacing: 0.03em;
  }

  .keywords-list { display: flex; flex-wrap: wrap; gap: 7px; }

  .keyword-tag {
    font-family: 'DM Mono', monospace; font-size: 11px;
    color: var(--text-muted); background: var(--surface2);
    border: 1px solid var(--border2); border-radius: 4px;
    padding: 5px 10px; letter-spacing: 0.02em;
    transition: border-color 0.18s, color 0.18s; cursor: default;
  }
  .keyword-tag:hover { border-color: rgba(139,92,246,0.3); color: var(--text); }

  .section-sublabel {
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--text-dim); margin-bottom: 10px;
  }

  .ai-description {
    font-size: 14px; line-height: 1.7; color: #b0b0bc; font-weight: 300;
    padding: 13px 15px; background: var(--surface2);
    border-radius: 5px; border-left: 2px solid rgba(147,197,253,0.3);
  }

  /* ── BOTTOM ACTIONS ── */
  .results-actions {
    display: flex; gap: 10px; margin-top: 28px; flex-wrap: wrap;
  }

  .action-btn {
    display: flex; align-items: center; gap: 8px;
    padding: 11px 18px; border-radius: 6px;
    font-size: 13px; font-weight: 500; cursor: pointer;
    transition: color 0.18s, border-color 0.18s, background 0.18s, transform 0.18s;
    border: 1px solid var(--border2); background: var(--surface);
    color: var(--text-muted); flex: 1; min-width: 140px; justify-content: center;
  }
  .action-btn:hover { color: var(--text); transform: translateY(-1px); }
  .action-btn.primary { background: var(--accent); color: #fff; border-color: var(--accent); }
  .action-btn.primary:hover { background: var(--accent-hover); border-color: var(--accent-hover); transform: translateY(-1px); }

  /* ── KAIRO FOOTER ── */
  .kairo-footer {
    position: fixed; bottom: 0; left: 0; right: 0;
    padding: 12px 24px;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.06em;
    background: linear-gradient(to top, rgba(10,10,11,0.98) 0%, transparent 100%);
    z-index: 50; pointer-events: none;
  }
  .kairo-footer * { pointer-events: auto; }
  .kairo-product  { color: var(--text-muted); font-weight: 500; }
  .kairo-sep      { color: var(--text-dim); }
  .kairo-by       { color: var(--text-dim); }
  .kairo-link     { color: var(--accent); text-decoration: none; transition: opacity 0.18s; }
  .kairo-link:hover { opacity: 0.7; }
  .kairo-tagline  { color: var(--text-dim); font-style: italic; }

  /* ── IMPACT INDICATORS ── */
  .impact-indicators {
    display: flex; align-items: center;
    gap: 0; margin: 16px 0 16px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 7px; overflow: hidden;
  }

  .impact-item {
    flex: 1; display: flex; flex-direction: column;
    gap: 4px; padding: 12px 14px;
  }

  .impact-label {
    font-size: 9px; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--text-dim);
  }

  .impact-value {
    font-size: 13px; font-weight: 500;
    color: var(--positive); letter-spacing: -0.01em;
  }

  .impact-sep {
    width: 1px; height: 36px;
    background: var(--border); flex-shrink: 0;
  }

  /* ── PAYWALL UNLOCKS ── */
  .paywall-unlocks {
    display: flex; flex-direction: column; gap: 7px;
    margin: 14px 0 18px; text-align: left;
  }

  .unlock-item {
    display: flex; align-items: flex-start; gap: 9px;
    font-size: 13px; color: var(--text-muted); line-height: 1.4;
  }

  .unlock-check {
    color: var(--positive); font-size: 12px;
    flex-shrink: 0; margin-top: 1px; font-weight: 600;
  }

  /* ── PAYWALL ── */
  .paywall-gate {
    position: relative;
    margin-top: 6px;
  }

  .paywall-blur {
    filter: blur(5px);
    pointer-events: none;
    user-select: none;
    opacity: 0.5;
  }

  .paywall-inline {
    position: relative;
    background: var(--surface);
    border: 1px solid rgba(139,92,246,0.25);
    border-radius: 8px;
    padding: 20px 20px 18px;
    margin-top: 8px;
    text-align: center;
    overflow: hidden;
  }

  .paywall-inline::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
  }

  .paywall-eyebrow {
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--text-dim); margin-bottom: 8px;
  }

  .paywall-title {
    font-size: 15px; font-weight: 600;
    letter-spacing: -0.01em; color: var(--text);
    margin-bottom: 6px;
  }

  .paywall-desc {
    font-size: 13px; color: var(--text-muted);
    line-height: 1.5; margin-bottom: 16px;
  }

  .paywall-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--accent); color: #fff;
    font-weight: 500; font-size: 14px;
    padding: 11px 24px; border-radius: 6px;
    border: none; cursor: pointer;
    transition: background 0.18s, transform 0.18s;
    width: 100%; justify-content: center;
  }
  .paywall-btn:hover { background: var(--accent-hover); transform: translateY(-1px); }
  .paywall-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .paywall-microcopy {
    font-family: 'DM Mono', monospace; font-size: 10px;
    color: var(--text-dim); letter-spacing: 0.04em;
    margin-top: 10px;
  }

  .locked-section {
    position: relative;
  }

  .lock-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(10,10,11,0.85) 60%);
    border-radius: 7px;
    display: flex; align-items: flex-end;
    justify-content: center; padding-bottom: 12px;
    pointer-events: none;
  }

  .lock-badge {
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--text-dim); background: var(--surface2);
    border: 1px solid var(--border2); border-radius: 100px;
    padding: 4px 12px; display: flex; align-items: center; gap: 6px;
  }

  /* ── UTILS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }

  @media (max-width: 480px) {
    .landing-title   { font-size: 36px; }
    .how-it-works    { gap: 6px; }
    .step-arrow      { display: none; }
    .results-actions { flex-direction: column; }
    .diag-top        { flex-direction: column; gap: 16px; }
  }
</style>
</head>
<body>

<div class="progress-bar" id="progressBar" style="width:0%"></div>

<nav class="nav">
  <div class="nav-logo" onclick="goTo('landing', 0)" style="cursor:pointer">Signal<span class="dot">.</span></div>
  <div class="nav-hint" id="navHint">Beta</div>
</nav>

<!-- ══ LANDING ══ -->
<div class="screen active" id="landing">
  <div class="landing-inner">
    <div class="signal-badge">Diagnóstico de visibilidad</div>
    <h1 class="landing-title">
      Clientes que te buscan<br><span class="accent-word">no te encuentran.</span>
    </h1>
    <p class="landing-subtitle">
      Descubrí por qué tu negocio es invisible en Google y en IA — y qué hacer para cambiarlo hoy.
    </p>
    <button class="cta-btn" onclick="goTo('form-screen', 33)">
      Ver mi diagnóstico gratis
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <p class="landing-note font-mono">Sin registro · Gratis · Resultado en 30 segundos</p>
    <div class="how-it-works">
      <div class="step-pill"><span class="num">1</span>Describí tu negocio</div>
      <span class="step-arrow">→</span>
      <div class="step-pill"><span class="num">2</span>Analizamos tu visibilidad</div>
      <span class="step-arrow">→</span>
      <div class="step-pill"><span class="num">3</span>Sabés exactamente qué mejorar</div>
    </div>
  </div>
</div>

<!-- ══ FORM ══ -->
<div class="screen" id="form-screen">
  <div class="form-container">
    <button class="back-btn font-mono" onclick="goTo('landing', 0)">← Volver</button>
    <span class="form-label-top font-mono">Tu diagnóstico</span>
    <h2 class="form-title">¿Cuántos clientes te estás perdiendo?</h2>
    <p class="form-hint">Completá los datos y en 30 segundos sabés exactamente dónde estás perdiendo visibilidad — y cómo recuperarla.</p>

    <div class="field">
      <label for="bizName">Nombre del negocio o marca</label>
      <input type="text" id="bizName" placeholder="Ej: Estudio Martín Diseño" autocomplete="off">
    </div>
    <div class="field">
      <label for="bizWhat">¿Qué hacés o vendés? <span class="optional">· requerido</span></label>
      <textarea id="bizWhat" placeholder="Ej: Soy diseñadora gráfica especializada en identidad de marca para emprendedores." rows="3"></textarea>
    </div>
    <div class="field">
      <label for="bizLocation">Ubicación <span class="optional">· opcional</span></label>
      <input type="text" id="bizLocation" placeholder="Ej: Buenos Aires, Argentina" autocomplete="off">
    </div>
    <div class="field">
      <label for="bizWebsite">Sitio web <span class="optional">· opcional</span></label>
      <input type="url" id="bizWebsite" placeholder="https://tu-sitio.com" autocomplete="off">
    </div>

    <button class="submit-btn" onclick="submitForm()">
      Analizar mi visibilidad
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M8 1l7 7-7 7M1 8h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</div>

<!-- ══ LOADING ══ -->
<div class="screen" id="loading-screen">
  <div class="loading-signal">
    <div class="ring"></div><div class="ring"></div><div class="ring"></div>
    <div class="core"></div>
  </div>
  <p class="loading-text font-mono">Analizando tu visibilidad...</p>
  <div class="loading-steps">
    <div class="loading-step" id="step-1"><div class="step-icon">1</div><span>Evaluando posicionamiento actual</span></div>
    <div class="loading-step" id="step-2"><div class="step-icon">2</div><span>Detectando oportunidades perdidas</span></div>
    <div class="loading-step" id="step-3"><div class="step-icon">3</div><span>Calculando impacto en negocio</span></div>
    <div class="loading-step" id="step-4"><div class="step-icon">4</div><span>Generando plan de acción</span></div>
  </div>
</div>

<!-- ══ RESULTS ══ -->
<div class="screen" id="results-screen">
  <div class="results-container">

    <!-- 1. DIAGNÓSTICO HERO -->
    <div class="diag-block">
      <div class="diag-top">
        <div class="diag-score-wrap">
          <div class="diag-score-number" id="diagScore">—</div>
          <div class="diag-score-denom font-mono">/100</div>
        </div>
        <div class="diag-right">
          <div class="diag-status-row">
            <span class="diag-status-pill" id="diagStatusPill">—</span>
          </div>
          <div class="diag-headline" id="diagHeadline">Calculando tu visibilidad...</div>
          <div class="diag-insight" id="diagInsight"></div>
        </div>
      </div>

      <!-- Indicadores de impacto -->
      <div class="impact-indicators" id="impactIndicators">
        <div class="impact-item">
          <span class="impact-label font-mono">Potencial de mejora</span>
          <span class="impact-value" id="impactPotential">—</span>
        </div>
        <div class="impact-sep"></div>
        <div class="impact-item">
          <span class="impact-label font-mono">Tiempo estimado</span>
          <span class="impact-value" id="impactTime">—</span>
        </div>
        <div class="impact-sep"></div>
        <div class="impact-item">
          <span class="impact-label font-mono">Acciones clave</span>
          <span class="impact-value" id="impactActions">—</span>
        </div>
      </div>

      <div class="diag-prediction" id="diagPrediction">
        <div class="diag-prediction-icon">↑</div>
        <div class="diag-prediction-text" id="diagPredictionText">Calculando predicción...</div>
      </div>
    </div>

    <!-- 2. QUÉ HACER AHORA -->
    <div class="section-header">
      <span class="section-title">Lo que tenés que hacer</span>
      <span class="section-count font-mono" id="actionsCount"></span>
    </div>

    <!-- Acciones FREE (1-2) -->
    <div class="actions-stack" id="actionsStack"></div>

    <!-- Acciones LOCKED (3-4) — blur + paywall -->
    <div class="paywall-gate" id="paywallGate">
      <div class="locked-section">
        <div class="actions-stack paywall-blur" id="actionsStackLocked"></div>
        <div class="lock-overlay">
          <span class="lock-badge">🔒 Incluido en tu plan</span>
        </div>
      </div>

      <!-- PAYWALL INLINE -->
      <div class="paywall-inline" id="paywallInline">
        <div class="paywall-eyebrow">Tu análisis está listo</div>
        <div class="paywall-title">Ver exactamente qué cambiar para conseguir más clientes</div>
        <div class="paywall-desc">Acciones concretas, contenido listo para copiar y una estrategia clara — todo generado para tu negocio específico.</div>

        <!-- Lo que se desbloquea -->
        <div class="paywall-unlocks">
          <div class="unlock-item">
            <span class="unlock-check">✓</span>
            <span>Las 2 mejoras de mayor impacto para tu caso</span>
          </div>
          <div class="unlock-item">
            <span class="unlock-check">✓</span>
            <span>Título y descripción SEO listos para pegar en tu web</span>
          </div>
          <div class="unlock-item">
            <span class="unlock-check">✓</span>
            <span>Estrategia de posicionamiento para diferenciarte de la competencia</span>
          </div>
          <div class="unlock-item">
            <span class="unlock-check">✓</span>
            <span>Texto optimizado para aparecer en ChatGPT, Perplexity y Google</span>
          </div>
        </div>

        <button class="paywall-btn" id="paywallBtn" onclick="handleUpgrade()">
          Ver mi plan completo — USD $19
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 1l7 7-7 7M1 8h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="paywall-microcopy">Pago único · Sin suscripción · Acceso inmediato</div>
      </div>
    </div>

    <!-- 3. QUICK WIN -->
    <div class="section-header" style="margin-top:20px">
      <span class="section-title">Aplicá esto hoy</span>
      <span class="section-count font-mono">1 cambio · máximo impacto</span>
    </div>
    <div class="quickwin-block">
      <div class="quickwin-header">
        <div class="quickwin-label"><span class="quickwin-dot"></span>Quick win</div>
        <button class="copy-btn font-mono" onclick="copyText(this, 'quickWinText')">
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="currentColor" stroke-width="1.5"/></svg>
          Copiar
        </button>
      </div>
      <div class="quickwin-body">
        <p class="quickwin-text" id="quickWinText">—</p>
      </div>
    </div>

    <!-- 4. ALTERNATIVA AGRESIVA — locked -->
    <div class="section-header" style="margin-top:20px">
      <span class="section-title">Posicionamiento agresivo</span>
      <span class="section-count font-mono">máxima conversión</span>
    </div>
    <div class="locked-section" id="aggressiveSection">
      <div class="aggressive-block paywall-blur">
        <div class="aggressive-header">
          <div class="aggressive-label"><span class="aggressive-dot"></span>Posicionamiento fuerte</div>
        </div>
        <div class="aggressive-body">
          <div class="agg-row">
            <span class="agg-label-text font-mono">Título</span>
            <p class="agg-content" id="aggTitle">—</p>
          </div>
          <div class="agg-row">
            <span class="agg-label-text font-mono">Meta</span>
            <p class="agg-content" id="aggMeta">—</p>
          </div>
        </div>
      </div>
      <div class="lock-overlay">
        <span class="lock-badge">🔒 Incluido en tu plan</span>
      </div>
    </div>

    <!-- DIVISOR -->
    <div class="content-divider">
      <div class="content-divider-line"></div>
      <span class="content-divider-label">Contenido listo para usar</span>
      <div class="content-divider-line"></div>
    </div>

    <!-- 5. CONTENIDO — locked -->
    <div class="locked-section" id="contentSection">
      <div class="result-cards paywall-blur">

        <div class="result-card">
          <div class="card-header">
            <div class="card-label"><span class="card-dot dot-seo"></span>Título SEO</div>
          </div>
          <div class="card-body">
            <p class="card-content title-content" id="seoTitle">—</p>
            <p class="char-hint font-mono" id="seoTitleLen"></p>
          </div>
        </div>

        <div class="result-card">
          <div class="card-header">
            <div class="card-label"><span class="card-dot dot-seo"></span>Meta descripción</div>
          </div>
          <div class="card-body">
            <p class="card-content meta-content" id="metaDesc">—</p>
          </div>
        </div>

        <div class="result-card">
          <div class="card-header">
            <div class="card-label"><span class="card-dot dot-seo"></span>Palabras clave</div>
          </div>
          <div class="card-body">
            <div class="keywords-list" id="keywordsList"></div>
          </div>
        </div>

        <div class="result-card">
          <div class="card-header">
            <div class="card-label"><span class="card-dot dot-web"></span>Párrafo para tu web</div>
          </div>
          <div class="card-body">
            <p class="card-content" id="webPara">—</p>
          </div>
        </div>

        <div class="result-card">
          <div class="card-header">
            <div class="card-label"><span class="card-dot dot-ai"></span>Descripción para IA</div>
          </div>
          <div class="card-body">
            <p class="section-sublabel font-mono">Para ChatGPT · Perplexity · AI Search</p>
            <div class="ai-description" id="aiDesc">—</div>
          </div>
        </div>

      </div>
      <div class="lock-overlay" style="align-items:center;justify-content:center;padding:0">
        <span class="lock-badge">🔒 Desbloqueá con Signal Pro</span>
      </div>
    </div>

    <!-- BOTTOM ACTIONS -->
    <div class="results-actions">
      <button class="action-btn" onclick="goTo('form-screen', 33)">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M7 4l-4 4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Analizar otro negocio
      </button>
      <button class="action-btn primary" onclick="copyAll(this)">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
          <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="currentColor" stroke-width="1.5"/>
        </svg>
        Copiar reporte completo
      </button>
    </div>

  </div>
</div>

<!-- KAIRO FOOTER -->
<footer class="kairo-footer">
  <span class="kairo-product">Signal</span>
  <span class="kairo-sep">·</span>
  <span class="kairo-by">by <a href="https://kairo.lat" target="_blank" class="kairo-link">Kairo</a></span>
  <span class="kairo-sep">·</span>
  <span class="kairo-tagline">Make it simple.</span>
</footer>

<script>
  // ── STATE ──
  let resultData = {};
  let isPro      = false;

  // ── NAVIGATION ──
  function goTo(id, progress) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.getElementById('progressBar').style.width = progress + '%';
    window.scrollTo({ top: 0, behavior: 'instant' });
    const hints = { landing: 'Beta', 'form-screen': 'Tu negocio', 'loading-screen': 'Analizando...', 'results-screen': 'Tu diagnóstico' };
    document.getElementById('navHint').textContent = hints[id] || '';
    if (id === 'form-screen') resetSteps();
  }

  // ── SUBMIT ──
  async function submitForm() {
    const name     = document.getElementById('bizName').value.trim();
    const what     = document.getElementById('bizWhat').value.trim();
    const location = document.getElementById('bizLocation').value.trim();
    const website  = document.getElementById('bizWebsite').value.trim();

    if (!what) {
      const el = document.getElementById('bizWhat');
      el.classList.add('field-error');
      el.focus();
      setTimeout(() => el.classList.remove('field-error'), 2400);
      return;
    }

    goTo('loading-screen', 66);

    const [result] = await Promise.all([
      callAPI(name, what, location, website).catch(err => { console.error(err); return null; }),
      runLoadingSequence()
    ]);

    if (!result) {
      showError('No pudimos generar el reporte. Revisá tu conexión e intentá de nuevo.');
      goTo('form-screen', 33);
      return;
    }

    resultData = result;
    render(result, isPro);
    goTo('results-screen', 100);
  }

  // ── LOADING ──
  function runLoadingSequence() {
    return new Promise(resolve => {
      const steps = ['step-1','step-2','step-3','step-4'];
      let i = 0;
      function tick() {
        if (i > 0) {
          const p = document.getElementById(steps[i-1]);
          p.classList.remove('active'); p.classList.add('done');
          p.querySelector('.step-icon').textContent = '✓';
        }
        if (i < steps.length) {
          document.getElementById(steps[i]).classList.add('active');
          i++; setTimeout(tick, 950);
        } else { setTimeout(resolve, 200); }
      }
      tick();
    });
  }

  function resetSteps() {
    ['step-1','step-2','step-3','step-4'].forEach((id, i) => {
      const el = document.getElementById(id);
      el.classList.remove('active','done');
      el.querySelector('.step-icon').textContent = i + 1;
    });
  }

  // ── API ──
  async function callAPI(name, what, location, website) {
    const ctx = [
      name     ? `Nombre: ${name}`        : '',
      what     ? `Actividad: ${what}`     : '',
      location ? `Ubicación: ${location}` : '',
      website  ? `Web: ${website}`        : ''
    ].filter(Boolean).join('\n');

    const system = `Actuás como un experto en SEO, posicionamiento y crecimiento de negocios.
Tu objetivo es generar un reporte que NO solo informe, sino que muestre el impacto real en el negocio: clientes perdidos, oportunidades sin aprovechar, y cómo revertirlo.

REGLAS DE SCORE (0–100) — basado en 5 factores:
1. Claridad del posicionamiento (¿se entiende qué hace el negocio?)
2. Especificidad (¿es genérico o concreto?)
3. Uso de keywords (¿hay intención de búsqueda real?)
4. Propuesta de valor (¿está clara?)
5. Diferenciación (¿se distingue o es igual a todos?)

INTERPRETACIÓN: 0–40 Bajo · 41–70 Medio · 71–100 Alto
Score alineado con diagnóstico y mejoras.

PREDICCIÓN: Bajo +20/+30 · Medio +10/+20 · Alto +5/+10

INSIGHT: 1 línea directa sobre el problema principal — en términos de negocio, no técnicos. Ej: "Tus clientes ideales no te encuentran porque no sabés cómo se llama lo que buscan."

ACCIONES: Orientadas a resultado de negocio, no a tareas técnicas. Ej en lugar de "Agregar keywords", escribir "Incluí la palabra exacta que usa tu cliente cuando te busca en Google — hoy no aparece en ningún lugar de tu web."
IMPACTO: Alto=cambia posicionamiento · Medio=mejora contenido · Bajo=ajustes menores
DIFICULTAD: Fácil=cambiar texto · Medio=crear contenido · Difícil=rediseño estructural

PROHIBIDO: métricas inventadas, texto genérico, frases vacías, jerga técnica sin explicación.
Solo JSON válido, sin texto adicional.`;

    const user = `NEGOCIO:\n${ctx}\n\nDevuelve SOLO JSON válido (sin markdown):\n{"visibilityScore":68,"status":"Medio","insight":"1 línea directa del problema principal.","prediction":"Con estos cambios podés pasar de X a Y en Z semanas.","actions":[{"text":"Acción concreta 1","impact":"Alto","difficulty":"Fácil"},{"text":"Acción 2","impact":"Medio","difficulty":"Medio"},{"text":"Acción 3","impact":"Alto","difficulty":"Fácil"},{"text":"Acción 4","impact":"Medio","difficulty":"Difícil"}],"quickWin":"1 cambio concreto aplicable hoy.","aggressive":{"title":"Título agresivo. Máx 60 car.","meta":"Meta agresiva. 140-155 car."},"seoTitle":"Título SEO. Máx 60 car.","metaDescription":"140-155 car.","keywords":["kw1","kw2","kw3","local","long tail 1","long tail 2"],"webParagraph":"3-4 líneas directas.","aiDescription":"Máx 5 líneas para IA."}\n\nREGLAS: status exactamente "Bajo"/"Medio"/"Alto" · impact "Alto"/"Medio"/"Bajo" · difficulty "Fácil"/"Medio"/"Difícil" · todo en español`;

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1600,
        system,
        messages: [{ role: 'user', content: user }]
      })
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const raw  = data.content.map(b => b.text || '').join('');
    return JSON.parse(raw.replace(/```json|```/g, '').trim());
  }

  // ── RENDER ──
  function render(d, pro) {
    const score  = Math.min(100, Math.max(0, parseInt(d.visibilityScore) || 60));
    const status = d.status || 'Medio';
    const color  = status === 'Alto' ? '#6ee7b7' : status === 'Bajo' ? '#f87171' : '#8B5CF6';

    document.getElementById('diagScore').textContent   = score;
    document.getElementById('diagScore').style.color   = color;
    const pill = document.getElementById('diagStatusPill');
    pill.textContent = status;
    pill.className   = 'diag-status-pill ' + status.toLowerCase();

    // Headline orientado a pérdida/oportunidad según score
    let headline;
    if (status === 'Bajo') {
      headline = `Tu negocio es invisible para el ${100 - score}% de los que te buscan.`;
    } else if (status === 'Medio') {
      headline = `Estás perdiendo clientes que buscan exactamente lo que ofrecés.`;
    } else {
      headline = `Buena base — todavía hay oportunidades sin aprovechar.`;
    }
    document.getElementById('diagHeadline').textContent = headline;
    document.getElementById('diagInsight').textContent = d.insight || '';
    document.getElementById('diagPredictionText').innerHTML =
      `<strong>${d.prediction || 'Aplicá estos cambios para mejorar tu visibilidad.'}</strong>`;

    // Indicadores de impacto
    const altoCount = (d.actions || []).filter(a => a.impact === 'Alto').length;
    const potencial = status === 'Bajo' ? `+25 a +40 pts` : status === 'Medio' ? `+15 a +25 pts` : `+5 a +15 pts`;
    const tiempo    = status === 'Bajo' ? `3 a 5 semanas` : status === 'Medio' ? `2 a 4 semanas` : `1 a 2 semanas`;
    document.getElementById('impactPotential').textContent = potencial;
    document.getElementById('impactTime').textContent      = tiempo;
    document.getElementById('impactActions').textContent   = `${altoCount} de alto impacto`;

    // Acciones free (1-2) y locked (3-4)
    const all    = d.actions || [];
    document.getElementById('actionsCount').textContent = `${all.length} acciones`;
    buildActions(all.slice(0, 2), 'actionsStack',       0);
    buildActions(all.slice(2),    'actionsStackLocked',  2);

    // Quick win
    document.getElementById('quickWinText').textContent = d.quickWin || '—';

    // Aggressive + contenido (siempre poblar, blur lo cubre)
    document.getElementById('aggTitle').textContent = d.aggressive?.title || '—';
    document.getElementById('aggMeta').textContent  = d.aggressive?.meta  || '—';
    document.getElementById('seoTitle').textContent = d.seoTitle || '—';
    document.getElementById('metaDesc').textContent = d.metaDescription || '—';
    document.getElementById('webPara').textContent  = d.webParagraph || '—';
    document.getElementById('aiDesc').textContent   = d.aiDescription || '—';

    const tLen = (d.seoTitle || '').length;
    document.getElementById('seoTitleLen').textContent =
      `${tLen} car. · ideal 50–60` + (tLen > 60 ? ' · largo' : tLen < 40 ? ' · podría ser más específico' : ' · ✓');

    const kwList = document.getElementById('keywordsList');
    kwList.innerHTML = '';
    (d.keywords || []).forEach(kw => {
      const t = document.createElement('span');
      t.className = 'keyword-tag font-mono'; t.textContent = kw;
      kwList.appendChild(t);
    });

    applyAccess(pro);
  }

  function buildActions(actions, containerId, offset) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '';
    actions.forEach((a, i) => {
      const ic = { Alto:'tag-impact-alto', Medio:'tag-impact-medio', Bajo:'tag-impact-bajo' }[a.impact] || 'tag-impact-bajo';
      const dc = { Fácil:'tag-dif-facil', Medio:'tag-dif-medio', Difícil:'tag-dif-dificil' }[a.difficulty] || 'tag-dif-medio';
      const row = document.createElement('div');
      row.className = 'action-row';
      row.innerHTML = `
        <div class="action-row-num">${i + offset + 1}</div>
        <div class="action-row-body">
          <div class="action-row-text">${a.text}</div>
          <div class="action-row-tags">
            <span class="tag ${ic}">Impacto ${a.impact}</span>
            <span class="tag ${dc}">${a.difficulty}</span>
          </div>
        </div>`;
      el.appendChild(row);
    });
  }

  function applyAccess(pro) {
    if (!pro) return;  // free: dejar blur/locks intactos

    // Quitar blur y overlays
    document.querySelectorAll('.paywall-blur').forEach(el => el.classList.remove('paywall-blur'));
    document.querySelectorAll('.lock-overlay').forEach(el => el.remove());

    // Quitar paywall inline
    document.getElementById('paywallInline')?.remove();

    // Agregar botones de copiar a alternativa agresiva
    ['aggTitle','aggMeta'].forEach(id => {
      const row = document.getElementById(id)?.closest('.agg-row');
      if (row && !row.querySelector('.copy-btn'))
        row.insertAdjacentHTML('beforeend', mkCopyBtn(id));
    });

    // Agregar botones de copiar a contenido
    [['seoTitle'],['metaDesc'],['webPara'],['aiDesc']].forEach(([id]) => {
      const header = document.getElementById(id)?.closest('.result-card')?.querySelector('.card-header');
      if (header && !header.querySelector('.copy-btn'))
        header.insertAdjacentHTML('beforeend', mkCopyBtn(id));
    });
    const kwHeader = document.getElementById('keywordsList')?.closest('.result-card')?.querySelector('.card-header');
    if (kwHeader && !kwHeader.querySelector('.copy-btn'))
      kwHeader.insertAdjacentHTML('beforeend',
        `<button class="copy-btn font-mono" onclick="copyKeywords(this)"><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="currentColor" stroke-width="1.5"/></svg>Copiar todas</button>`
      );
  }

  function mkCopyBtn(id) {
    return `<button class="copy-btn font-mono" onclick="copyText(this,'${id}')"><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="currentColor" stroke-width="1.5"/></svg>Copiar</button>`;
  }

  // ── UPGRADE → MERCADO PAGO ──
  async function handleUpgrade() {
    const btn  = document.getElementById('paywallBtn');
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = 'Redirigiendo...';

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId: Date.now().toString() })
      });
      const { url, error } = await res.json();
      if (error || !url) throw new Error(error || 'No URL');

      sessionStorage.setItem('signal_report', JSON.stringify(resultData));
      window.location.href = url;

    } catch (err) {
      console.error(err);
      btn.disabled = false;
      btn.innerHTML = orig;
      showError('No pudimos iniciar el pago. Intentá de nuevo en un momento.');
    }
  }

  // ── RETORNO DE PAGO ──
  function checkPaymentReturn() {
    const params  = new URLSearchParams(window.location.search);
    const payment = params.get('payment');
    const saved   = sessionStorage.getItem('signal_report');

    if (payment === 'success' && saved) {
      isPro      = true;
      resultData = JSON.parse(saved);
      sessionStorage.removeItem('signal_report');
      window.history.replaceState({}, '', '/');
      render(resultData, true);
      goTo('results-screen', 100);
    } else if (payment === 'failure' || payment === 'pending') {
      window.history.replaceState({}, '', '/');
      showError(payment === 'pending'
        ? 'Tu pago está siendo procesado. Te avisamos cuando se confirme.'
        : 'El pago no se completó. Tu reporte sigue disponible — intentá de nuevo.');
    }
  }

  checkPaymentReturn();

  // ── COPY ──
  const CHECK_ICON = `<svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  function flash(btn, orig) {
    btn.classList.add('copied');
    btn.innerHTML = `${CHECK_ICON} Copiado`;
    setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = orig; }, 2000);
  }

  function copyText(btn, id) {
    const el = document.getElementById(id);
    if (!el) return;
    const orig = btn.innerHTML;
    navigator.clipboard.writeText(el.textContent.trim()).then(() => flash(btn, orig));
  }

  function copyKeywords(btn) {
    const text = Array.from(document.querySelectorAll('.keyword-tag')).map(t => t.textContent).join(', ');
    const orig = btn.innerHTML;
    navigator.clipboard.writeText(text).then(() => flash(btn, orig));
  }

  function copyAll(btn) {
    if (!isPro) { handleUpgrade(); return; }
    const g = id => (document.getElementById(id)?.textContent || '').trim();
    const actions = Array.from(document.querySelectorAll('.action-row-text'))
      .map((el, i) => `${i+1}. ${el.textContent.trim()}`).join('\n');
    const out = [
      `SCORE: ${g('diagScore')}/100 — ${document.getElementById('diagStatusPill')?.textContent}`,
      `PREDICCIÓN\n${g('diagPredictionText')}`,
      `QUÉ HACER AHORA\n${actions}`,
      `QUICK WIN\n${g('quickWinText')}`,
      `ALTERNATIVA AGRESIVA\nTítulo: ${g('aggTitle')}\nMeta: ${g('aggMeta')}`,
      `TÍTULO SEO\n${g('seoTitle')}`,
      `META DESCRIPCIÓN\n${g('metaDesc')}`,
      `PALABRAS CLAVE\n${Array.from(document.querySelectorAll('.keyword-tag')).map(t=>t.textContent).join(', ')}`,
      `PÁRRAFO WEB\n${g('webPara')}`,
      `DESCRIPCIÓN PARA IA\n${g('aiDesc')}`,
      `---\nBuilt by Kairo · Make it simple.`
    ].join('\n\n---\n\n');
    const orig = btn.innerHTML;
    navigator.clipboard.writeText(out).then(() => flash(btn, orig));
  }

  // ── ERROR TOAST ──
  function showError(msg) {
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#16161a;border:1px solid rgba(248,113,113,0.25);color:#fca5a5;font-family:DM Mono,monospace;font-size:11px;padding:11px 18px;border-radius:6px;z-index:9999;letter-spacing:0.04em;max-width:380px;text-align:center';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 5000);
  }
</script>
</body>
</html>
