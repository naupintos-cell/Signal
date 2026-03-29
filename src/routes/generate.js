const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';

export async function generate(req, res) {
  const { model, max_tokens, system, messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages is required' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Missing ANTHROPIC_API_KEY');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const upstream = await fetch(ANTHROPIC_API, {
      method: 'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model, max_tokens, system, messages }),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      console.error('Anthropic error:', data);
      return res.status(upstream.status).json({ error: data?.error?.message || 'Upstream error' });
    }

    return res.json(data);

  } catch (err) {
    console.error('Generate error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
