import express from 'express';
import { securityHeaders, rateLimit } from './middleware/security.js'; // ← AGREGAR

const app = express();

// ─── CRÍTICO para Railway: leer IP real detrás del proxy ───────────────────
app.set('trust proxy', 1); // ← AGREGAR — sin esto el rate limit no funciona

// ─── Middlewares globales ──────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' })); // ← limit evita payloads gigantes
app.use(express.static('public'));
app.use(securityHeaders); // ← AGREGAR

// ─── Rate limit solo en /api ───────────────────────────────────────────────
app.use('/api/', rateLimit({ windowMs: 60_000, max: 8 })); // ← AGREGAR

// ... resto de tus routes (no tocar)
