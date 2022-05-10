import { Request, Response, NextFunction } from "express";
import OTU from "../lib/OTU";

const otu = new OTU(String(process.env.SECRET));

export const encrypt = (req: Request, res: Response, next: NextFunction) => {
  // Parse body data
  let { message, expires } = req.body;

  if (req.file) {
    console.log(req.file);
    message = req.file.filename;
  }

  const encrypted = otu.encrypt(message);

  return res.status(200).json({
    status: "success",
    encrypted,
    expires,
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
