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

export const generateRoast = async ({
  resumeText,
  ats = null,
  jobRole = "",
  jobDesc = "",
}) => {
  const client = getClient();

  // 🧠 Context building (THIS IS THE SMART PART)
  const roleContext = jobRole
    ? `Target Job Role: ${jobRole}`
    : `No specific job role provided`;

  const atsContext = ats
    ? `
ATS Score: ${ats.score}%
Missing Keywords: ${
        ats.missingKeywords.length > 0
          ? ats.missingKeywords.join(", ")
          : "None"
      }
`
    : `
No ATS score provided.
Do a general resume evaluation instead of keyword matching.
`;

  const jdContext = jobDesc
    ? `Job Description was provided and used for analysis.`
    : `No job description provided.`;

  const prompt = `
You are a brutally honest technical recruiter.

${roleContext}
${jdContext}
${atsContext}

Resume Content:
"""
${resumeText.slice(0, 3000)}
"""

Rules:
- Be harsh but constructive
- No personal insults
- Do NOT assume missing skills unless clearly absent
- If no ATS context exists, focus on clarity, impact, and credibility
- Output ONLY valid JSON in this format:

{
  "roast": [
    "Point 1",
    "Point 2",
    "Point 3"
  ],
  "summary": "One-line verdict"
}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return JSON.parse(response.choices[0].message.content);
};
