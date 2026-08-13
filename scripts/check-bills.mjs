import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envText = fs.readFileSync(path.join(__dirname, "..", ".env"), "utf8");
const env = Object.fromEntries(
  envText
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1).replace(/^"|"$/g, "")];
    }),
);

const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;
const fid = "11111111-1111-4111-8111-111111111111";

const res = await fetch(
  `${url}/rest/v1/bills?facility_id=eq.${fid}&select=id,status,electricity_kwh,billing_month,file_name,created_at&order=created_at.desc&limit=20`,
  { headers: { apikey: key, Authorization: `Bearer ${key}` } },
);
const rows = await res.json();
console.log("total fetched:", rows.length);
const verified = rows.filter((r) => r.status === "verified");
console.log("verified:", verified.length);
console.log(
  "verified with kwh:",
  verified.filter((r) => r.electricity_kwh != null).length,
);
console.log("sample verified:", JSON.stringify(verified.slice(0, 3), null, 2));
