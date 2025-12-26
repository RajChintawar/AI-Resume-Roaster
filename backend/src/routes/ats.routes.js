import express from "express";
import { atsAutopsy } from "../controllers/ats.controller.js";

const router = express.Router();

/**
 * POST /api/ats-autopsy
 * Body:
 * {
 *   resumeText: string,
 *   targetRole: string
 * }
 */
router.post("/ats-autopsy", atsAutopsy);

// sanity check (optional but useful)
router.get("/ats-autopsy", (req, res) => {
  res.send("ATS Autopsy is alive ☠️ Use POST, not GET.");
});

export default router;
