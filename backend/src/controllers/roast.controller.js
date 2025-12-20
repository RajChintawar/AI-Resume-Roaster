import { parseResume } from "../services/resumeParser.js";

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

    // TEMP: send back text length, not full text
    res.json({
      message: "Resume parsed successfully",
      charactersExtracted: resumeText.length,
      preview: resumeText.slice(0, 200),
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
