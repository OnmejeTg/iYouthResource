import Pdf from "../models/PdfModel.js";
import { uploadImage } from "../utils/cloudinary.js";

export const UploadPdf = async (req, res) => {
  const { title } = req.body;
  if (!title || !req.files) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }
  try {
    const pdfFile = req.files["pdfFile"] ? req.files["pdfFile"][0] : null;
    const coverImage = req.files["coverImage"]
      ? req.files["coverImage"][0]
      : null;

    if (!pdfFile) {
      return res.status(400).send({ message: "No PDF file uploaded" });
    }

    if (!coverImage) {
      return res.status(400).send({ message: "No cover image uploaded" });
    }
    const pdfBuffer = pdfFile.buffer;
    const coverImageBuffer = coverImage.buffer;
    let pdf = "";
    let image = "";

    const folder = "IYR/pdf/";
    pdf = await uploadImage(pdfBuffer, folder);
    image = await uploadImage(coverImageBuffer, folder);
    const newPdf = new Pdf({ title, coverImage: image, pdfFile: pdf });
    await newPdf.save();
    res.status(200).send({ message: "Files uploaded successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error uploading files", error });
  }
};

export const GetAllPdfs = async (req, res) => {
  try {
    const pdfs = await Pdf.find();
    res.status(200).send(pdfs);
  } catch (error) {
    res.status(500).send({ message: "Error fetching pdfs", error });
  }
};
