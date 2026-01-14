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
ATS Score: ${ats.atsScore}
ATS Verdict: ${ats.verdict}

ATS Flags:
${
  ats.flags.length > 0
    ? ats.flags.map(f => `- ${f.code}: ${f.message}`).join("\n")
    : "No major ATS issues detected."
}
`
  : `
No ATS data provided.
Do a general resume evaluation instead.
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
${resumeText.slice(0, 1500)}
"""

Rules:
Act as an Indian recruiter for MNC's or startup.
Give a clear verdict what is fault or mistake in the resume which would your chances to get rejected.
If rejected, list the TOP 3 reason in breif and to the point.
Give advice for improvement check must be two or one page what is ideal and all.

- Output ONLY valid JSON in this format:

{
  "roast": [
    "Point 1",
    "Point 2",
    "Point 3"
        "Point 4"

  ],
  "summary": "One-line verdict"
}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

const raw = response.choices[0].message.content;

// 🧼 Remove markdown code fences if present
const cleaned = raw
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

return JSON.parse(cleaned);
};
