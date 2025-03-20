import express from "express";
import { getPronunciation } from "../controllers/02_pronunciationController.js";

const router = express.Router();

router.get("/", getPronunciation);

export default router;
