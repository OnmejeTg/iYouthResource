import mongoose from "mongoose";

const PdfSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  pdfFile: {
    type: String,
    required: true,
  },
});

const PdfModel = mongoose.model("Pdf", PdfSchema);

export default PdfModel;
