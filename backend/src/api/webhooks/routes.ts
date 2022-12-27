/* eslint-disable no-console */
import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  console.log("Webhook received!");
  console.log(req.body);
  console.log(req.headers);
  res.status(200).send("ok");
});

export default router;
