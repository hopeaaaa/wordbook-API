import gttsModule from "node-gtts";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const gTTS = gttsModule("fr");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const audioDir = path.join(__dirname, "../public/audio");

//check for existing audio file or create it
if (fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

export const getPronunciation = (req, res) => {
  console.log("pronunciation request receieved:", req.query);
  const { text } = req.query;

  if (!text) {
    return res
      .status(400)
      .json({ error: "No text provided, please enter a word" });
  }

  const safeText = text.trim().replace(/[^a-zA-Z0-9]/g, "_");
  const fileName = `pronunciation_${safeText}.mp3`;
  const filePath = path.join(audioDir, fileName);

  // check for duplication
  if (fs.existsSync(filePath)) {
    return res.json({ audioUrl: `http://localhost:5000/audio/${fileName}` });
  }

  // generate and save pronunciation file
  gTTS.save(filePath, text, (error) => {
    if (error) {
      console.error("Error generating pronunciation:", error);
      return res
        .status(500)
        .json({ error: "Error generating pronunciation audio" });
    }
    console.log(`Pronunciation successfully saved: ${fileName}`);
    res.json({ audioUrl: `http://localhost:5000/audio/${fileName}` });
  });
};
