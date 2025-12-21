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
router.get("/roast", (req, res) => {
  res.send("Roast API is alive. Use POST, not GET 😈");
});


export default router;
