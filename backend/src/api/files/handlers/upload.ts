/* eslint-disable no-console */
import { Request, Response } from "express";
import { PassThrough } from "stream";
import minioClient from "../../../services/minio";

const uploadToS3 = (stream: PassThrough, name: string) =>
  new Promise((resolve, reject) => {
    minioClient.putObject(
      process.env.MINIO_BUCKET || "bucket",
      name,
      stream,

      function (err: any, etag: unknown) {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log("File uploaded successfully.");
        return resolve(etag);
      }
    );
  });

const uploadVideo = async (req: Request, res: Response) => {
  const { name } = req.query;

  try {
    const stream = new PassThrough();

    req.pipe(stream);

    await uploadToS3(stream, name as string);

    return res.status(200).send("ok");
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ error: "Unexpected error during file upload" });
  }
};

export default uploadVideo;
