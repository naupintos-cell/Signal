// ── Mercado Pago checkout ──
// Genera una preferencia de pago y devuelve la init_point (URL de pago)

const MP_API = 'https://api.mercadopago.com/checkout/preferences';

export async function checkout(req, res) {
  const { reportId, email } = req.body;

  if (!process.env.MP_ACCESS_TOKEN) {
    console.error('Missing MP_ACCESS_TOKEN');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const baseUrl = process.env.APP_URL || 'https://getsignalatam.lat';

  try {
    const preference = {
      items: [
        {
          id: 'signal-pro',
          title: 'Signal Pro — Reporte completo',
          description: 'Acceso completo al reporte de visibilidad digital',
          quantity: 1,
          currency_id: 'ARS',         // cambiá a USD si tu cuenta es en dólares
          unit_price: 14900,          // $14.900 ARS ≈ $29 USD — ajustá según tu mercado
        }
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
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preference),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('MP error:', data);
      return res.status(response.status).json({ error: data?.message || 'MP error' });
    }

    // init_point = URL de pago real
    // sandbox_init_point = URL de prueba (solo en cuentas de test)
    return res.json({
      url: data.init_point,
      id:  data.id,
    });

  } catch (err) {
    console.error('Checkout error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
