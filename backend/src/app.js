import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import roastRoutes from "./routes/roast.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api", roastRoutes);

// health check
app.get("/", (req, res) => {
  res.send("Backend alive. Ready to roast resumes 🔥");
});

export default app;
