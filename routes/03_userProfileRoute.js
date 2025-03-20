import express from "express";
import {
  getUserProfile,
  saveTranslation,
  updateTranslation,
  deleteTranslation,
} from "../controllers/03_userProfileController.js";

const router = express.Router();

router.get("/:userId", getUserProfile);
router.post("/translations", saveTranslation);
router.put("/translations/:translationId", updateTranslation);
router.delete("/delete/:translationId", deleteTranslation);

export default router;
