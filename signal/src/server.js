import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { generate } from './routes/generate.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──
app.use(express.json());

// ── API Routes ──
app.post('/api/generate', generate);

// ── Serve frontend ──
app.use(express.static(join(__dirname, '../public')));

// Catch-all: SPA fallback
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../public/index.html'));
});

// ── Start ──
app.listen(PORT, () => {
  console.log(`Signal running on http://localhost:${PORT}`);
});
