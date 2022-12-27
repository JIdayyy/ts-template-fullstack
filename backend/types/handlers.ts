/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from "express";
import { ResponseError } from "./types";

type TIdParam = {
  id: string;
};

type TCreateBody<T> = Omit<T, "id" | "createdAt" | "updatedAt">;
type TUpdateBody<T> = Partial<TCreateBody<T>>;

export interface Controller<T> {
  getAll: RequestHandler<null, T[] | ResponseError, null, Record<any, string>>;
  getOne: RequestHandler<
    TIdParam,
    T | ResponseError,
    null,
    Record<any, string>
  >;
  create: RequestHandler<null, T | ResponseError, T, Record<any, string>>;
  update: RequestHandler<TIdParam, T | ResponseError, TUpdateBody<T>>;
  delete: RequestHandler<
    TIdParam,
    T | ResponseError,
    null,
    Record<any, string>
  >;
}
