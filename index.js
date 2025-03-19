import express from "express";
import cors from "cors";
import translate from "translate-google-api";
import gttsModule from "node-gtts";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

//set default language to french
const translationOptions = {
  tld: "com",
  to: "fr",
};

const gTTS = gttsModule("fr");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 5000;
const app = express();

//find public/audio
const audioDir = path.join(__dirname, "public/audio");
/* if (!fs.existsSync(path.join(__dirname, "public/audio"))) {
  fs.mkdirSync(path.join(__dirname, "public/audio"), { recursive: true }); */
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//translation route
app.post("/translate", async (req, res) => {
  const { text, targetLang } = req.body;
  try {
    const translation = await translate(text, {
      ...translationOptions,
      to: targetLang,
    });
    res.json({ translation });
  } catch (error) {
    res.status(500).json({ error: "Translation failed" });
  }
});

//pronunciation route
app.post("/get-pronunciation", (req, res) => {
  console.log("recieved request body:", req.body);
  const { text } = req.body;

  if (!text) {
    return res
      .status(400)
      .json({ error: "no text provided, please enter a word" });
  }

  /*   if (!req.body || typeof req.body.text !== "string") {
    console.error("Invalid text format:", req.body.text);
    return res.status(400).json({ error: "Invalid text format" });
  } */

  /*   const text = req.body.text.trim(); */

  //create a new unique filename for each text
  const trimmedText = text.trim();
  const safeText = trimmedText.replace(/[^a-zA-Z0-9]/g, "_");
  const fileName = `pronunciation_${safeText}.mp3`;
  const filePath = path.join(audioDir, fileName);

  //check if file already exists to avoid duplication
  if (fs.existsSync(filePath)) {
    return res.json({ audioUrl: `http://localhost:${port}/audio/${fileName}` });
  }

  //generate and save pronunciation file
  gTTS.save(filePath, text, (error, result) => {
    if (error) {
      console.error("❌ Error generating pronunciation:", error);
      return res
        .status(500)
        .json({ error: "error generating pronunciaiton audio" });
    }
    console.log(`✅ Pronunciation saved: ${fileName}`);
    res.json({ audioUrl: `http://localhost:${port}/audio/${fileName}` });
  });
});

app.listen(port, () => console.log(`Server running on port${port}`));
