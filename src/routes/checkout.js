const MP_API = 'https://api.mercadopago.com/checkout/preferences';
const isProd = process.env.APP_ENV === 'production';
const MP_TOKEN = isProd
  ? process.env.MP_ACCESS_TOKEN_PROD
  : process.env.MP_ACCESS_TOKEN_TEST;

// Precios base en USD — ARS calculado dinámicamente desde el frontend
// Pro: USD 97 pago único · Agency: USD 79/mes recurrente
const PLANS = {
  pro: {
    id:          'signal-pro',
    title:       'Signal Pro — Sistema completo de visibilidad',
    description: 'Título SEO, meta descripción, párrafo para IA, análisis vs competidores, checklist Maps, plan 7 días, re-diagnóstico 30 días y soporte email',
    usd:         97,
    arsDefault:  137700, // fallback si el cliente no envía clientArsPrice
  },
  agency: {
    id:          'signal-agency',
    title:       'Signal Agency — Suscripción mensual hasta 10 negocios',
    description: 'Todo Pro por negocio + panel multi-cliente, reportes PDF con tu marca y actualizaciones mensuales',
    usd:         79,
    arsDefault:  112000, // fallback si el cliente no envía clientArsPrice
    recurring:   true,
  },
};

export async function checkout(req, res) {
  // clientArsPrice: precio calculado en el frontend con el tipo de cambio oficial del día
  const { reportId, email, plan: planKey = 'pro', clientArsPrice } = req.body;

  const plan = PLANS[planKey] || PLANS.pro;

  // Usar precio del frontend si es un número válido, si no usar fallback
  const arsPrice = (clientArsPrice && Number.isFinite(Number(clientArsPrice)) && Number(clientArsPrice) > 1000)
    ? Math.round(Number(clientArsPrice))
    : plan.arsDefault;

  if (!MP_TOKEN) {
    console.error(`Missing ${isProd ? 'MP_ACCESS_TOKEN_PROD' : 'MP_ACCESS_TOKEN_TEST'}`);
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const baseUrl = process.env.APP_URL || 'https://getsignalatam.lat';

  try {
    const unitPrice = isProd ? arsPrice : 100; // sandbox siempre usa 100

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
        success: `${baseUrl}/app?payment=success&report=${reportId || ''}&plan=${planKey}`,
        failure: `${baseUrl}/app?payment=failure`,
        pending: `${baseUrl}/app?payment=pending`,
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
