/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express";
import { Form } from "multiparty";
import minioClient from "./minio";

export function asyncFormParse(
  req: Request
): Promise<{ fields: any; files: any }> {
  return new Promise((resolve, reject) => {
    const form = new Form({
      uploadDir: "./uploads",
    });

    form.on("progress", (bytesReceived, bytesExpected) => {
      console.log(
        `Progress: ${Math.round((bytesReceived / bytesExpected) * 100)}%`
      );

      if (bytesReceived === bytesExpected) {
        console.log("Upload complete");
      }
    });

    form.on("part", (part) => {
      console.log("Part: ", part);
    });

    form.on("file", (name, file) => {
      console.log("File: ", name, file);
    });

    form.parse(req, async (err, fields, files) => {
      if (err) reject(err);

      resolve({ fields, files });
    });
  });
}

export function slugify(string: string) {
  return string.replace(/ /g, "-");
}

export const uploadToS3 = (stream: any, name: string) =>
  new Promise((resolve, reject) => {
    minioClient.putObject(
      process.env.MINIO_BUCKET || "bucket",
      name,
      stream,

      function (err, etag) {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log("File uploaded successfully.");
        return resolve(etag);
      }
    );
  });
