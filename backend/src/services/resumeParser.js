import fs from "fs";
import path from "path";
import mammoth from "mammoth";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

export const parseResume = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();

  // PDF parsing
  if (ext === ".pdf") {
    const data = new Uint8Array(fs.readFileSync(filePath));
    const pdf = await pdfjs.getDocument({ data }).promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map(item => item.str).join(" ");
    }

    return text;
  }

  // DOC / DOCX parsing
  if (ext === ".doc" || ext === ".docx") {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }

  throw new Error("Unsupported file format");
};
