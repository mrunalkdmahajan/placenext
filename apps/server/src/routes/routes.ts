import { Router } from "express";

const appRoutes = Router();

appRoutes.get("/", (req, res) => {
  return res.send("hello world");
});

export default appRoutes;
