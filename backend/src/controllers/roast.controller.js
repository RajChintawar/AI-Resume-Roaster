import { parseResume } from "../services/resumeParser.js";
// import { calculateATSScore } from "../utils/atsScorer.js";
import { generateRoast } from "../services/ai.service.js";
import { runATSAutopsy } from "../ats/ats.engine.js";


export const roastResume = async (req, res) => {
  try {
    const { jobRole, jobDesc } = req.body;
    const file = req.file;

    if (!file) {
  return res.status(400).json({
    error: "Resume file is required",
  });
}

const resumeText = await parseResume(file.path);


const atsAutopsyResult = runATSAutopsy({
  resumeText,
  targetRole: jobRole || "Frontend Developer"
});
     const aiResult = await generateRoast({
      resumeText,
      ats: atsAutopsyResult,
      jobRole,
    });

 res.json({
      message: "Resume diagnosis completed ☠️",
      ats: {
        score: atsAutopsyResult.atsScore,
        verdict: atsAutopsyResult.verdict,
        flags: atsAutopsyResult.flags,
      },
      roast: aiResult.roast,
      summary: aiResult.summary,
    });

  } catch (err) {
    console.error("ROAST CONTROLLER ERROR:", err);

    res.status(500).json({
      error: err.message,
    });
  }
};




