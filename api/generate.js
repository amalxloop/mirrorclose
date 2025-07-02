export async function POST(req) {
  const { offer, niche, objection } = await req.json();

  const prompt = `You are AGI Sales Closer™, an identity-aware AI. Given:
Offer: ${offer}
Niche: ${niche}
Objection: ${objection}

Generate 3 persuasive micro-scripts:
1. Counter Objection Response
2. Value Frame
3. Identity Mirror
Format in Markdown.`;

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    })
  });

  const json = await openaiRes.json();
  const result = json.choices[0].message.content;

  return Response.json({ result });
}
