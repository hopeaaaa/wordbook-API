import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
import { fileURLToPath } from "url";
import translationRoute from "./routes/01_translationRoute.js";
import pronunciationRoute from "./routes/02_pronunciationRoute.js";
import userProfileRoute from "./routes/03_userProfileRoute.js";
/* import savedTranslationsRoute from "./routes/04_savedTranslationsRoute.js"; */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/translate", translationRoute);
app.use("/pronunciation", pronunciationRoute);
app.use("/:userId", userProfileRoute);
/* app.use("/saved-translations", savedTranslationsRoute); */

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "something went wrong..." });
});

app.get("/", (req, res) => {
  res.send("welcome to hope's api!");
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
