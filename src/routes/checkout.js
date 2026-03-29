// ── Mercado Pago checkout ──
const MP_API = 'https://api.mercadopago.com/checkout/preferences';
const isProd = process.env.APP_ENV === 'production';
const MP_TOKEN = isProd
  ? process.env.MP_ACCESS_TOKEN_PROD
  : process.env.MP_ACCESS_TOKEN_TEST;

export async function checkout(req, res) {
  const { reportId, email } = req.body;

  if (!MP_TOKEN) {
    console.error(`Missing ${isProd ? 'MP_ACCESS_TOKEN_PROD' : 'MP_ACCESS_TOKEN_TEST'}`);
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const baseUrl = process.env.APP_URL || 'https://getsignalatam.lat';

  try {
    const preference = {
      items: [
        {
          id: 'signal-pro',
          title: 'Signal Pro — Plan completo de visibilidad',
          description: 'Contenido listo para copiar: SEO, Maps, ChatGPT y Perplexity',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: 24900, // ← actualizado (era 27170)
        },
      ],
      payer: email ? { email } : undefined,
      back_urls: {
        success: `${baseUrl}/?payment=success&report=${reportId || ''}`,
        failure: `${baseUrl}/?payment=failure`,
        pending: `${baseUrl}/?payment=pending`,
      },
      auto_return: 'approved',
      statement_descriptor: 'SIGNAL KAIRO',
      external_reference: reportId || 'signal-pro',
      payment_methods: {
        excluded_payment_types: [], // acepta todo: tarjeta, débito, MP saldo
        installments: 1,            // ← sin cuotas (pago único)
      },
      expires: false,
    };

    const response = await fetch(MP_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MP_TOKEN}`,
      },
      body: JSON.stringify(preference),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('MP error:', data);
      return res.status(response.status).json({ error: data?.message || 'MP error' });
    }

    return res.json({
      url: isProd ? data.init_point : data.sandbox_init_point,
      id: data.id,
    });

  } catch (err) {
    console.error('Checkout error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```

Los únicos 3 cambios respecto al tuyo:

1. **`unit_price: 24900`** — de $27.170 a $24.900
2. **`payment_methods: { installments: 1 }`** — fuerza pago único, evita que MP ofrezca cuotas que confunden en un ticket bajo
3. **`description`** más específica — mejor para el estado de cuenta del usuario y para reducir chargebacks

---

Verificá que en Railway Variables tengas:
```
APP_ENV=production
MP_ACCESS_TOKEN_PROD=APP_USR-tu-token-real
APP_URL=https://getsignalatam.lat
