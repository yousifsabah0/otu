import { Destination, Filter } from "./types";
import { Request, Express } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: Destination
  ): void => {
    cb(null, "./uploads/");
  },
  filename: (req: Request, file: Express.Multer.File, cb: Filter): void => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });
