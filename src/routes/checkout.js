const MP_API = 'https://api.mercadopago.com/checkout/preferences';
const isProd = process.env.APP_ENV === 'production';
const MP_TOKEN = isProd
  ? process.env.MP_ACCESS_TOKEN_PROD
  : process.env.MP_ACCESS_TOKEN_TEST;

// Precios fijos en ARS
// (temporalmente en 100 para prueba de sandbox — subir a producción antes de lanzar)
const PLANS = {
  starter: {
    id:          'signal-starter',
    title:       'Signal Starter — Diagnóstico completo de visibilidad',
    description: 'Signal Report, meta title + descripción SEO, párrafo para IA, checklist Maps y plan 7 días',
    ars:         100, // TODO: cambiar a 29900 antes de producción
  },
  pro: {
    id:          'signal-pro',
    title:       'Signal Pro — Sistema completo de visibilidad',
    description: 'Todo Starter + análisis vs competidores, contenido 3 páginas, keywords local, re-diagnóstico 30 días y soporte email',
    ars:         100, // TODO: cambiar a 79900 antes de producción
  },
  agency: {
    id:          'signal-agency',
    title:       'Signal Agency — Suscripción mensual hasta 10 negocios',
    description: 'Todo Pro por negocio + panel multi-cliente, reportes PDF con marca y actualizaciones mensuales',
    ars:         100, // TODO: cambiar a 49900 antes de producción
    recurring:   true,
  },
};

export async function checkout(req, res) {
  const { reportId, email, plan: planKey = 'pro' } = req.body;

  const plan = PLANS[planKey] || PLANS.pro;

  if (!MP_TOKEN) {
    console.error(`Missing ${isProd ? 'MP_ACCESS_TOKEN_PROD' : 'MP_ACCESS_TOKEN_TEST'}`);
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const baseUrl = process.env.APP_URL || 'https://getsignalatam.lat';

  try {
    const unitPrice = plan.ars;

    const preference = {
      items: [
        {
          id:          plan.id,
          title:       plan.title,
          description: plan.description,
          quantity:    1,
          currency_id: 'ARS',
          unit_price:  unitPrice,
        },
      ],
      payer: email ? { email } : undefined,
      back_urls: {
        success: `${baseUrl}/?payment=success&report=${reportId || ''}&plan=${planKey}`,
        failure: `${baseUrl}/?payment=failure`,
        pending: `${baseUrl}/?payment=pending`,
      },
      auto_return:          'approved',
      statement_descriptor: 'SIGNAL KAIRO',
      external_reference:   `${plan.id}-${reportId || Date.now()}`,
      payment_methods: {
        excluded_payment_types: [],
        installments:           1,
      },
      expires: false,
      metadata: {
        plan:      planKey,
        ars_price: unitPrice,
        report_id: reportId || null,
      },
    };

    const response = await fetch(MP_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:  `Bearer ${MP_TOKEN}`,
      },
      body: JSON.stringify(preference),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('MP error:', data);
      return res.status(response.status).json({ error: data?.message || 'MP error' });
    }

    return res.json({
      url:      isProd ? data.init_point : data.sandbox_init_point,
      id:       data.id,
      plan:     planKey,
      arsPrice: unitPrice,
    });

  } catch (err) {
    console.error('Checkout error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
