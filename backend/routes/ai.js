const express = require('express');
const fetch = require('node-fetch');

module.exports = () => {
  const router = express.Router();

  router.post('/insights', async (req, res) => {
    const product = req.body.product;
    // Compose prompt for OpenAI
    const prompt = `You are an inventory assistant. Given this product data: ${JSON.stringify(product)}. Provide:\n1) Perfect Time to Sell (short reasoning)\n2) Stock alert suggestions\n3) Pricing suggestion (selling price or margin)\n4) Whether to reorder (yes/no) and how much.\nReturn JSON with keys: perfectTimeToSell, stockAlerts, pricingSuggestion, reorderSuggestion.`;

    try {
      const key = process.env.OPENAI_API_KEY;
      if (!key) return res.status(500).send('Missing OPENAI_API_KEY');

      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.3,
          max_tokens: 400,
        }),
      });

      const data = await r.json();
      const text = data.choices?.[0]?.message?.content ?? '';
      let parsed = null;
      try { parsed = JSON.parse(text); } catch (e) { parsed = { raw: text }; }
      res.json({ raw: text, parsed });
    } catch (e) {
      console.error(e);
      res.status(500).send(String(e));
    }
  });

  return router;
};
