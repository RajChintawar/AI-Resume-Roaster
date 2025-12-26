import { runATSAutopsy } from "../ats/ats.engine.js";

export const atsAutopsy = (req, res) => {
  try {
    const { resumeText, targetRole } = req.body;

    // 1️⃣ Input validation (minimal, not dramatic)
    if (!resumeText || typeof resumeText !== "string") {
      return res.status(400).json({
        error: "resumeText is required and must be a string"
      });
    }

    if (!targetRole || typeof targetRole !== "string") {
      return res.status(400).json({
        error: "targetRole is required and must be a string"
      });
    }

    // 2️⃣ Run ATS Autopsy (the judge)
    const result = runATSAutopsy({
      resumeText,
      targetRole
    });

    // 3️⃣ Send response
    return res.json({
      message: "ATS Autopsy completed ☠️",
      ...result
    });

  } catch (err) {
    console.error("ATS AUTOPSY ERROR:", err);

    return res.status(500).json({
      error: "ATS engine failed. Resume survived longer than expected."
    });
  }
};
