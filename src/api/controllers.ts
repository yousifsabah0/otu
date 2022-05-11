import { Request, Response, NextFunction } from "express";
import { execute } from "./database/query";
import { v4 } from "uuid";
import OTU from "../lib/OTU";

const otu = new OTU(String(process.env.SECRET));

const date = new Date();
const EXPIRE_AFTER_ONE_DAY = date.setTime(
  date.getTime() + 1 * 24 * 60 * 60 * 1000
);

export const encrypt = (req: Request, res: Response, next: NextFunction) => {
  // Parse body data
  let { message } = req.body;
  let secretType: string;

  if (req.file) {
    message = req.file.filename;
    secretType = "image";
  }

  const encrypted = otu.encrypt(message);
  secretType = "message";

  execute(
    "INSERT INTO secrets (secret_type, secret_uuid, secret_expire, expired) VALUES (?, ?, ?, ?)",
    [secretType, v4(), EXPIRE_AFTER_ONE_DAY, false]
  );

  return res.status(200).json({
    status: "success",
    encrypted,
    info: "Please note that this message will be expire after 24 hours from now.",
  });
};

export const decrypt = (req: Request, res: Response, next: NextFunction) => {
  const { msg } = req.query;

  // If an image is found in uploads folder, then in frontend we'll display it.
  const message = otu.decrypt(msg);

  return res.status(200).json({
    status: "success",
    message,
  });
};
