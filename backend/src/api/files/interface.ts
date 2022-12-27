import { ResponseError } from "./../../../types/types";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { File } from "@prisma/client";
import { RequestHandler } from "express";
import { Controller } from "../../../types/handlers";

interface FileController extends Controller<File> {
  upload: RequestHandler<any, File | ResponseError, any>;
}

export default FileController;
