import { parseResume } from "../services/resumeParser.js";
import { runATSAutopsy } from "../ats/ats.engine.js";

export const atsOnly = async (req, res) => {
  try {
    const { jobRole } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        error: "Resume file is required"
      });
    }

    // 1️⃣ Parse resume (slowest part here)
    const resumeText = await parseResume(file.path);

    // 2️⃣ Run ATS Autopsy (fast)
    const atsResult = runATSAutopsy({
      resumeText,
      targetRole: jobRole || "Frontend Developer"
    });

    // 3️⃣ Respond immediately
    res.json({
      message: "ATS Autopsy completed ☠️",
      ats: atsResult,
      resumeText // IMPORTANT: used later for AI roast
    });

  } catch (err) {
    console.error("ATS ONLY ERROR:", err);

    res.status(500).json({
      error: err.message
    });
  }
};
