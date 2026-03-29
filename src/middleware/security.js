// ─── Rate limiting en memoria ───────────────────────────────────────────────
// Sin dependencias extra. Resetea con cada deploy — suficiente para MVP.
const ipMap = new Map();

export function rateLimit(options = {}) {
  const { windowMs = 60_000, max = 8 } = options;

  return (req, res, next) => {
    // Railway pone la IP real en x-forwarded-for
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ??
      req.socket?.remoteAddress ??
      'unknown';

    const now = Date.now();
    const hits = (ipMap.get(ip) ?? []).filter(t => now - t < windowMs);

    if (hits.length >= max) {
      return res.status(429).json({
        error: 'Demasiadas solicitudes. Esperá un momento.',
        retryAfter: Math.ceil(windowMs / 1000),
      });
    }

    ipMap.set(ip, [...hits, now]);
    next();
  };
}

// ─── Validación y sanitización de input ────────────────────────────────────
export function validateGenerateInput(req, res, next) {
  const { name = '', what = '', location = '', website = '' } = req.body ?? {};

  // Campo requerido
  if (!what || typeof what !== 'string' || what.trim().length < 3) {
    return res.status(400).json({ error: 'Descripción del negocio requerida.' });
  }

  // Límites de longitud — evita tokens inflados y prompt injection
  if (
    what.trim().length > 600   ||
    name.length        > 200   ||
    location.length    > 200   ||
    website.length     > 300
  ) {
    return res.status(400).json({ error: 'Input demasiado largo.' });
  }

  // Sanitización — elimina caracteres de control y básico XSS
  const clean = (s) => String(s).replace(/[\u0000-\u001F<>]/g, '').trim();

  // Reemplazá el body con los valores limpios
  req.body = {
    name:     clean(name),
    what:     clean(what),
    location: clean(location),
    website:  clean(website),
  };

  next();
}

// ─── Headers de seguridad HTTP ──────────────────────────────────────────────
export function securityHeaders(req, res, next) {
  res.setHeader('X-Content-Type-Options',   'nosniff');
  res.setHeader('X-Frame-Options',          'DENY');
  res.setHeader('Referrer-Policy',          'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy',       'camera=(), microphone=(), geolocation=()');
  res.setHeader('Strict-Transport-Security','max-age=63072000; includeSubDomains');
  res.setHeader('X-XSS-Protection',         '1; mode=block');
  next();
}
