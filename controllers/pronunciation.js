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

  //check if file already exists to avoid duplication
  if (fs.existsSync(filePath)) {
    return res.json({ audioUrl: `/${fileName}` });
  }

  //generate and save pronunciation file
  gTTS.save(filePath, text, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "no audio yo" });
    }

    res.json({ audioUrl: `/${fileName}` });
  });
});
