import { FileFilterCallback } from "multer";

export type Destination = (error: Error | null, destination: string) => void;
export type Filter = (error: Error | null, filename: any) => void;
