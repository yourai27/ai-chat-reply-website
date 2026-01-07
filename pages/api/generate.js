import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const { chat, useCase, tone } = req.body;

  const prompt = `
You are an expert conversation assistant.

Chat:
${chat}

Use case: ${useCase}
Tone: ${tone}

Generate 3 natural, human-like replies that help continue the conversation.
Avoid generic responses.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const text = completion.choices[0].message.content;
  const replies = text.split("\n").filter(Boolean);

  res.status(200).json({ replies });
}
