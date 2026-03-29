// ─── Rate limiting en memoria ───────────────────────────────────────────────
const ipMap = new Map();
export function rateLimit(options = {}) {
  const { windowMs = 60_000, max = 8 } = options;
  return (req, res, next) => {
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
  const { model, max_tokens, system, messages } = req.body ?? {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages es requerido.' });
  }

  const userContent = messages.find(m => m.role === 'user')?.content ?? '';
  if (typeof userContent !== 'string' || userContent.trim().length < 3) {
    return res.status(400).json({ error: 'Contenido del mensaje requerido.' });
  }
  if (userContent.length > 4000) {
    return res.status(400).json({ error: 'Input demasiado largo.' });
  }
  if (system && system.length > 6000) {
    return res.status(400).json({ error: 'System prompt demasiado largo.' });
  }

  const clean = (s) => String(s).replace(/[\u0000-\u001F<>]/g, '').trim();
  req.body = {
    model:      model || 'claude-sonnet-4-5',
    max_tokens: Math.min(parseInt(max_tokens) || 1600, 2048),
    system:     system ? clean(system) : undefined,
    messages:   messages.map(m => ({
      role:    m.role,
      content: clean(m.content),
    })),
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
