import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;

  if (!body) {
    return res.status(400).json({ error: 'No input provided' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Eres Liry, una musa poética y amable.' },
        { role: 'user', content: JSON.stringify(body) },
      ],
      temperature: 0.8,
    });

    res.status(200).json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar respuesta desde Liry' });
  }
}
