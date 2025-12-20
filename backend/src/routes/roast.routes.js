import express from "express";
import upload from "../config/multer.js";
import { roastResume } from "../controllers/roast.controller.js";

const router = express.Router();

// POST /api/roast
router.post(
  "/roast",
  upload.single("resume"),
  roastResume
);

export default router;
