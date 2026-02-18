export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { messages } = req.body;

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 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`,
                'HTTP-Referer': 'https://timetravel-agency-pearl.vercel.app',
                'X-Title': 'TimeTravel Agency',
            },
            body: JSON.stringify({
                model: 'arcee-ai/trinity-large-preview:free',
                messages,
                max_tokens: 300,
                temperature: 0.7,
            }),
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
