// ── Mercado Pago checkout ──
// Usa APP_ENV=production → token prod + init_point
// Usa APP_ENV=development → token test + sandbox_init_point

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
          title: 'Signal — Ver mi plan completo',
          description: 'Acciones concretas y contenido listo para usar para tu negocio',
          quantity: 1,
          currency_id: 'USD',
          unit_price: 19,
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

    // prod → init_point (pago real)
    // dev  → sandbox_init_point (pago simulado)
    return res.json({
      url: isProd ? data.init_point : data.sandbox_init_point,
      id: data.id,
    });

  } catch (err) {
    console.error('Checkout error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
