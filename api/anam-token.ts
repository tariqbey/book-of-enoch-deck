// Vercel serverless function — mints Anam session tokens so the API key
// stays out of the client bundle. Set ANAM_API_KEY in Vercel env vars.
export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const apiKey = process.env.ANAM_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "ANAM_API_KEY not configured" });
  try {
    const upstream = await fetch("https://api.anam.ai/v1/auth/session-token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(req.body),
    });
    const data = await upstream.json();
    return res.status(upstream.status).json(data);
  } catch (error) {
    return res.status(502).json({ error: "anam upstream failed" });
  }
}
