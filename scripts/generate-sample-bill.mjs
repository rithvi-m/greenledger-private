import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const LINES = [
  "TAMIL NADU GENERATION AND DISTRIBUTION CORPORATION (TANGEDCO)",
  "HIGH TENSION ELECTRICITY CONSUMPTION BILL & INVOICE",
  "",
  "Consumer Service No: HT-4290-004984",
  "Tariff: HT Industry Category IA",
  "Consumer: Coimbatore Industrial Exporters Unit 4",
  "Billing Month: March 2026",
  "",
  "CONSUMPTION DETAILS",
  "Previous Reading: 1,240,500 kWh",
  "Current Reading:  1,283,000 kWh",
  "Recorded Units:   42,500 kWh",
  "",
  "Energy Charges:   Rs. 2,33,750.00",
  "Taxes & Duty:     Rs. 11,250.00",
  "TOTAL PAYABLE:    Rs. 2,45,000.00",
  "Due Date: 15-APR-2026",
];

function esc(text) {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function buildPdf(lines) {
  let y = 760;
  const stream = lines
    .map((line) => {
      const cmd = `BT /F1 11 Tf 48 ${y} Td (${esc(line)}) Tj ET\n`;
      y -= 18;
      return cmd;
    })
    .join("");

  const streamLen = Buffer.byteLength(stream, "utf8");

  const objects = [
    "1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj",
    "2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj",
    "3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj",
    `4 0 obj<</Length ${streamLen}>>stream\n${stream}endstream\nendobj`,
    "5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj",
  ];

  let body = "%PDF-1.4\n";
  const offsets = [0];
  for (const obj of objects) {
    offsets.push(Buffer.byteLength(body, "utf8"));
    body += obj + "\n";
  }

  const xrefStart = Buffer.byteLength(body, "utf8");
  body += "xref\n0 " + (objects.length + 1) + "\n";
  body += "0000000000 65535 f \n";
  for (let i = 1; i <= objects.length; i++) {
    body += String(offsets[i]).padStart(10, "0") + " 00000 n \n";
  }
  body += "trailer<</Size " + (objects.length + 1) + "/Root 1 0 R>>\n";
  body += "startxref\n" + xrefStart + "\n%%EOF\n";
  return body;
}

const out = path.join(__dirname, "../public/sample-tangedco-bill.pdf");
fs.writeFileSync(out, buildPdf(LINES), "utf8");
console.log("Wrote", out, fs.statSync(out).size, "bytes");
