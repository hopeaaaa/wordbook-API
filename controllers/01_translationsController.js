import translate from "translate-google-api";

//translation service configuration
//Top Level Domain, translate.google.com to the target language of francaise
const translationOptions = {
  tld: "com",
  to: "fr",
};

export const getTranslatedText = async (req, res) => {
  const { text, targetLang } = req.query;
  console.log("received text:", text, "target language:", targetLang);

  if (!text || !targetLang) {
    return res
      .status(400)
      .json({ error: "text and target language are required" });
  }

  try {
    const languageToTranslate = targetLang || "en";
    const translation = await translate(text, {
      ...translationOptions,
      to: languageToTranslate,
    });
    /* console.log(translation); */
    res.json({ translation });
  } catch (error) {
    /*     console.error("Translation error:", error); */
    res.status(500).json({ error: "Translation failed :(" });
  }
};
