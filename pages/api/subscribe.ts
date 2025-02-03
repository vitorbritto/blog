import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  try {
    const FORM_ID = "seu_form_id";
    const API_KEY = process.env.CONVERTKIT_API_KEY;

    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) throw new Error();

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Error subscribing to newsletter" });
  }
}
