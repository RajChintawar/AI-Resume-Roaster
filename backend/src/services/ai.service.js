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
You are an Indian technical recruiter with 8–12 years of experience
hiring for Indian MNCs, service-based companies, and mid-size startups.

You reject resumes quickly.
You do NOT give motivational feedback.
You do NOT give generic advice.
You explain rejection ONLY using concrete, observable problems from the resume.

=====================
STRICT RULES (NO ESCAPE)
=====================

1. DO NOT use vague phrases like:
   - "lacks depth"
   - "needs improvement"
   - "could be better"
   - "formatting is inconsistent"
   - "projects are weak"
   - "resume is cluttered"

2. Every problem you mention MUST clearly state:
   - WHAT exactly is wrong
   - WHERE it is wrong (section name)
   - WHAT evidence from the resume proves it
   - WHY this causes rejection in Indian hiring

3. If you mention FORMATTING:
   - You MUST specify the exact issue:
     font size mismatch, uneven spacing, dense text blocks,
     inconsistent bullet spacing, misaligned headings, or poor section separation.
   - You MUST name the affected section.

4. If you mention PROJECTS:
   - You MUST specify what is missing:
     tech stack, metrics, scale, outcome, or ownership.
   - Do NOT say "project lacks depth".

5. If you mention SKILLS:
   - You MUST say whether skills are:
     missing for the role, irrelevant, dumped excessively,
     or not supported by project evidence.

6. If you cannot find concrete evidence in the resume text,
   DO NOT invent a problem.

=====================
CONTEXT
=====================

Target Job Role:
${jobRole || "Not specified"}

ATS Verdict:
${ats?.verdict || "Not provided"}

ATS Score:
${ats?.atsScore ?? "N/A"}

ATS Flags:
${
  ats?.flags?.length > 0
    ? ats.flags.map(f => `- ${f.code}: ${f.message}`).join("\n")
    : "None"
}

=====================
RESUME TEXT
=====================

"""
${resumeText.slice(0, 3000)}
"""

=====================
TASK
=====================

Step 1:
Decide final verdict:
- SHORTLIST
- REJECT

Step 2:
If verdict is REJECT:
- List EXACTLY 3 problems.
- Each problem MUST follow this structure:

[SECTION NAME]
- Exact problem:
- Evidence from resume:
- Why this leads to rejection in Indian hiring:

Step 3:
If verdict is SHORTLIST:
- List EXACTLY 2 risks that may still cause rejection later.

=====================
OUTPUT RULES
=====================

- Output ONLY valid JSON.
- No markdown.
- No explanations outside JSON.
- No advice, no solutions, no sugarcoating.

=====================
OUTPUT FORMAT
=====================

{
  "verdict": "SHORTLIST" | "REJECT",
  "roast": [
    {
      "section": "string",
      "exact_problem": "string",
      "evidence": "string",
      "why_it_leads_to_rejection": "string"
    }
  ],
  "summary": "One-line recruiter verdict"
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
