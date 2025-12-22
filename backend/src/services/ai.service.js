import OpenAI from "openai";

let openai;

const getClient = () => {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set");
    }

    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  return openai;
};

export const generateRoast = async ({ resumeText, ats, jobRole }) => {
  const client = getClient();

  const prompt = `
You are a brutally honest technical recruiter.

Job Role: ${jobRole}
ATS Score: ${ats.score}%

Missing Keywords: ${ats.missingKeywords.join(", ") || "None"}

Resume Content:
"""
${resumeText.slice(0, 3000)}
"""

Rules:
- Be harsh but constructive
- No personal insults
- Focus on skills, experience, and clarity
- Output ONLY valid JSON in this format:

{
  "roast": ["Point 1", "Point 2", "Point 3"],
  "summary": "One-line verdict"
}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });
console.log("ENV KEY PRESENT:", !!process.env.OPENAI_API_KEY);

  return JSON.parse(response.choices[0].message.content);
};
