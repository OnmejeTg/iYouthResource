import express from "express";
import { UploadPdf, GetAllPdfs } from "../controllers/PdfCtrl.js";
import { memoryupload } from "../utils/multer.js";

const pdfRouter = express.Router();

// pdfRouter.post("/", memoryupload.array("files"), UploadPdf);
pdfRouter.post(
  "/",
  memoryupload.fields([
    { name: "pdfFile", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  UploadPdf
);

pdfRouter.get("/", GetAllPdfs);

export default pdfRouter;
