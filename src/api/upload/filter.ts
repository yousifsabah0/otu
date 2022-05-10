import { Filter } from "./types";
import { Request, Express } from "express";
import * as multer from "multer";

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: Filter
): void => {
  const acceptedMimeTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "text/plain",
  ];

  if (acceptedMimeTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  return cb(null, false);
};
