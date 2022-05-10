import { encrypt, decrypt } from "./controllers";
import { upload } from "./upload/storage";
import { Router } from "express";

const router = Router();

router.post("/encrypt", upload.single("image"), encrypt);

router.get("/decrypt", decrypt);

export default router;
