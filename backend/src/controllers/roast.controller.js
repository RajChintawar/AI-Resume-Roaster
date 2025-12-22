import { parseResume } from "../services/resumeParser.js";
import { calculateATSScore } from "../utils/atsScorer.js";
import { generateRoast } from "../services/ai.service.js";


export const roastResume = async (req, res) => {
  try {
    const { jobRole, jobDesc } = req.body;
    const file = req.file;

    if (!file || !jobRole || !jobDesc) {
      return res.status(400).json({
        error: "Resume, job role, and job description are required",
      });
    }

    const resumeText = await parseResume(file.path);

    const atsResult = calculateATSScore(resumeText, jobDesc);

    const aiResult = await generateRoast({
  resumeText,
  ats: atsResult,
  jobRole,
});

res.json({
  message: "Resume roasted successfully 😈",
  ats: atsResult,
  roast: aiResult.roast,
  summary: aiResult.summary,
});


  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

