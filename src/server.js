import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { generate } from './routes/generate.js';
import { checkout } from './routes/checkout.js';
import { securityHeaders, rateLimit, validateGenerateInput } from './middleware/security.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app  = express();
const PORT = process.env.PORT || 3000;

// ─── CRÍTICO para Railway: leer IP real detrás del proxy ──────────────────
app.set('trust proxy', 1);

// ─── Middlewares globales ──────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(securityHeaders);

// ─── Rate limit solo en /api ───────────────────────────────────────────────
app.use('/api/', rateLimit({ windowMs: 60_000, max: 8 }));

// ─── Rutas ────────────────────────────────────────────────────────────────
app.post('/api/generate', validateGenerateInput, generate);
app.post('/api/checkout', checkout);

// ─── Static + SPA fallback ────────────────────────────────────────────────
app.use(express.static(join(__dirname, '../public')));
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../public/index.html'));
});

// ─── Start ────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Signal running on http://localhost:${PORT}`);
});
