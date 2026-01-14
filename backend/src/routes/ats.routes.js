import express from "express";
import upload from "../config/multer.js";

import { atsOnly } from "../controllers/atsOnly.controller.js";

const router = express.Router();

/**
 * POST /api/ats-autopsy
 * Body:
 * {
 *   resumeText: string,
 *   targetRole: string
 * }
 */
// router.post("/ats-autopsy", atsAutopsy);
router.post("/ats-only", upload.single("resume"), atsOnly);


// sanity check (optional but useful)
router.get("/ats-autopsy", (req, res) => {
  res.send("ATS Autopsy is alive ☠️ Use POST, not GET.");
});

export default router;
