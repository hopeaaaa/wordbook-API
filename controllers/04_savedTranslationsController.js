/* import knexConfig from "../knexfile.js";
import knex from "knex";

const db = knex(knexConfig);

//Fetch saved translations
export const getSavedTranslations = async (req, res) => {
  const { userId } = req.params;

  try {
    const translations = await db("translations")
      .select("word", "translation", "pronunciation")
      .where("user_id", userId);

    res.status(200).json(translations);
  } catch (err) {
    console.error("Error fetching saved translations:", err);
    res.status(500).json({ error: "Failed to fetch saved translations" });
  }
};

//Edit a saved translation
export const updateSavedTranslations = async (req, res) => {
  const { translationId, newTranslation, newPronunciation } = req.body;

  try {
    const result = await db("translations").where("id", translationId).update({
      translation: newTranslation,
      pronunciation: newPronunciation,
    });

    if (result) {
      res.status(200).json({ message: "Translation updated successfully" });
    } else {
      res.status(404).json({ error: "Translation not found" });
    }
  } catch (err) {
    console.error("Error updating translation:", err);
    res.status(500).json({ error: "Failed to update translation" });
  }
};

// Delete a saved translation
export const deleteSavedTranslations = async (req, res) => {
  const { translationId } = req.params;

  try {
    const result = await db("translations").where("id", translationId).del();

    if (result) {
      res.status(200).json({ message: "Translation deleted successfully" });
    } else {
      res.status(404).json({ error: "Translation not found" });
    }
  } catch (err) {
    console.error("Error deleting translation:", err);
    res.status(500).json({ error: "Failed to delete translation" });
  }
};
 */
