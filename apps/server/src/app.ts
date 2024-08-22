import express from "express";
import appRoutes from "./routes/routes";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("hello world");
});

app.use("/api", appRoutes);

export default app;
