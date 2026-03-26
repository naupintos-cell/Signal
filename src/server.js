import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { generate } from './routes/generate.js';
import { checkout } from './routes/checkout.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/generate',  generate);
app.post('/api/checkout',  checkout);

app.use(express.static(join(__dirname, '../public')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Signal running on http://localhost:${PORT}`);
});
