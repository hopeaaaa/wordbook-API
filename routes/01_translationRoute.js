import express from "express";
import { getTranslatedText } from "../controllers/01_translationsController.js";

const router = express.Router();

router.get("/", getTranslatedText);

export default router;
