import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectionDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/ratelimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectionDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
  });
});
