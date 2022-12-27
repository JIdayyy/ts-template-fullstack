import books from "./books/routes";
import files from "./files/routes";

import { Router } from "express";

const router = Router();

router.use("/books", books);
router.use("/files", files);

export default router;
