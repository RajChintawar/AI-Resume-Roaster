import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import atsRoutes from "./routes/ats.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api", atsRoutes);

// health check
app.get("/", (req, res) => {
  res.send("Backend alive. Ready to roast resumes 🔥");
});


// 🔴 Multer / body parsing error handler
app.use((err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  next();
});


export default app;
