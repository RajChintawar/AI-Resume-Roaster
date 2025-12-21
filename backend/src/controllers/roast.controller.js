import { parseResume } from "../services/resumeParser.js";
import { calculateATSScore } from "../utils/atsScorer.js";

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

    res.json({
      message: "ATS analysis complete",
      ats: atsResult,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

