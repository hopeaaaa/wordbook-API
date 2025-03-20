import knexConfig from "../knexfile.js";
import knex from "knex";
import "dotenv/config";

const db = knex(knexConfig);

//get user profile and saved words list
export const getUserProfile = async (req, res) => {
  const userId = req.params.userId;

  try {
    const results = await db("users")
      .select(
        "users.id",
        "users.username",
        "translations.word",
        "translations.translation",
        "translations.pronunciation"
      )
      .leftJoin("translations", "users.id", "translations.user_id")
      .where("users.id", userId);

    res.status(200).json(results);
  } catch (err) {
    console.error("error fetching user profile:", err);
  }
};

//get saved translations
export const saveTranslation = async (req, res) => {
  const { userId, word, translation, pronunciation } = req.body;

  if (!userId || !word || !translation || !pronunciation) {
    return res.status(400).json({ error: "all fields are required" });
  }

  const sql = `
    INSERT INTO translations (user_id, word, translation, pronunciation)
    VALUES (?, ?, ?, ?);
  `;

  db.query(sql, [userId, word, translation, pronunciation], (err, result) => {
    if (err) {
      console.error("Error saving translation:", err);
      return res.status(500).json({ error: "Failed to save translation" });
    }
    res.json({
      message: "Translation saved",
      id: result.insertId,
    });
  });
};

//changing saved translations
export const updateTranslation = async (req, res) => {
  const { translationId, newTranslation, newPronunciation } = req.body;

  try {
    const result = await db("translations").where("id", translationId).update({
      translation: newTranslation,
      pronunciation: newPronunciation,
    });
    if (result) {
      res.json({ error: "translation update successful" });
    } else {
      res.status(404).json({ error: "translation not found" });
    }
  } catch (err) {
    console.error("error updating translation:", err);
    res.status(500).json({ error: "failed to update translation, try again" });
  }
};

//deleting translations
export const deleteTranslation = async (req, res) => {
  const { translationId } = req.params;

  try {
    const result = await db("translations").where("id", translationId).del();

    if (result) {
      res.json({ message: "translation deleted successfully" });
    }
  } catch (err) {
    console.error("error deleting translation", err);
    res.status(500).json({ error: "failed to delete translation" });
  }
};
