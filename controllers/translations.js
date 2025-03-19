import "dotenv/config";
import express from "express";

const router = express.Router();

//translation route
app.post("/translate", async (req, res) => {
  const { text, targetLang } = req.body;
  try {
    const translation = await translate(text, { to: targetLang });
    res.json({ translation });
  } catch (error) {
    res.status(500).json({ error: "Translation failed" });
  }
});
