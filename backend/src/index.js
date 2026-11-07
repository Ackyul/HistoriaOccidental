import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`API en http://localhost:${PORT}`);
});
