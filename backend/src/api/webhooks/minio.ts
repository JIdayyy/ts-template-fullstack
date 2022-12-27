/* eslint-disable no-console */
import { Request, Response } from "express";

const minioWebhook = async (req: Request, res: Response) => {
  console.log("Webhook received!");
  console.log(req.body);
  console.log(req.headers);
  res.status(200).send("ok");
};

export default minioWebhook;
