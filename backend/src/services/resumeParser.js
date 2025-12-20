import fs from "fs";
import mammoth from "mammoth";
import path from "path";
import { createRequire } from "module";

 const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");


export const parseResume = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
 
  if (ext === ".pdf") {
    const dataBuffer = fs.readFileSync(filePath);
const data = await pdfParse(dataBuffer);
    return data.text;
  }

  if (ext === ".doc" || ext === ".docx") {
    const result = await mammoth.extractRawText({
      path: filePath,
    });
    return result.value;
  }

  throw new Error("Unsupported file format");
};
