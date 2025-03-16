const express = require("express");
const cors = require("cors");
const translate = require("translate-google");

const gTTS = require("node-gtts")("fr");
const fs = require("fs");
const path = require("path");

const port = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

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

//pronunciation route
app.post("/get-pronunciation", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res
      .status(400)
      .json({ error: "no text provided, please enter a word" });
  }

  //create a new unique filename for each text
  const safeText = text.replace(/[^a-zA-Z0-9]/g, "_");
  const fileName = `pronunciation_${safeText}.mp3`;
  const filePath = path.join(__dirname, "public", fileName);

  //checking if file already exists to avoid duplication
  if (fs.existsSync(filePath)) {
    return res.json({ audioUrl: `/${fileName}` });
  }

  //generates and saves pronunciation file
  gTTS.save(filePath, text, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "no audio yo" });
    }

    res.json({ audioUrl: `/${fileName}` });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
