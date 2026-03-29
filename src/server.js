import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { generate } from './routes/generate.js';
import { checkout } from './routes/checkout.js';
import { securityHeaders, rateLimit, validateGenerateInput } from './middleware/security.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app  = express();
const PORT = process.env.PORT || 3000;

// Railway: leer IP real detrás del proxy
app.set('trust proxy', 1);

// Middlewares globales
app.use(express.json({ limit: '10kb' }));
app.use(securityHeaders);

// Rate limit solo en /api
app.use('/api/', rateLimit({ windowMs: 60_000, max: 8 }));

// Rutas API
app.post('/api/generate', validateGenerateInput, generate);
app.post('/api/checkout', checkout);

// Archivos estáticos
app.use(express.static(join(__dirname, '../public')));

// Landing page → /
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../public/index.html'));
});

// Producto (app) → /app
app.get('/app', (req, res) => {
  res.sendFile(join(__dirname, '../public/app.html'));
});

// Fallback
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Signal running on http://localhost:${PORT}`);
});
