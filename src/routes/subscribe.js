const BREVO_API = 'https://api.brevo.com/v3/contacts';

export async function subscribe(req, res) {
  const { email, score, searchQuery } = req.body;

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const BREVO_LIST_ID = process.env.BREVO_LIST_ID;

  if (!BREVO_API_KEY) {
    console.error('Missing BREVO_API_KEY');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const payload = {
      email: email.trim().toLowerCase(),
      attributes: {
        SIGNAL_SCORE: typeof score === 'number' ? score : parseInt(score) || null,
        SIGNAL_QUERY: typeof searchQuery === 'string' ? searchQuery.slice(0, 200) : '',
      },
      listIds: BREVO_LIST_ID ? [parseInt(BREVO_LIST_ID)] : [],
      updateEnabled: true,
    };

    const response = await fetch(BREVO_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok && response.status !== 204) {
      console.error('Brevo error:', data);
      return res.status(response.status).json({ error: data?.message || 'Brevo error' });
    }

    return res.json({ ok: true });

  } catch (err) {
    console.error('Subscribe error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
