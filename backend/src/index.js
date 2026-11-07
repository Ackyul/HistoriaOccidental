import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`API en http://localhost:${PORT}`);
});

