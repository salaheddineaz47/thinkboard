import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectionDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/ratelimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// connectionDB();

// middleware

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectionDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
  });
});
