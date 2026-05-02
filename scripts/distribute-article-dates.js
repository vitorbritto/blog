import fs from "node:fs";
import path from "node:path";

const metadataDir = path.join(process.cwd(), "content", "metadata", "articles");
const start = new Date(Date.UTC(2023, 2, 1)); // March 2023
const end = new Date(Date.UTC(2025, 6, 31)); // July 2025
const totalDays = Math.floor((end - start) / 86400000);

const files = fs.readdirSync(metadataDir).filter(f => f.endsWith(".json")).sort();
const n = files.length;

files.forEach((file, i) => {
  const dayOffset = Math.round((i / Math.max(n - 1, 1)) * totalDays);
  const date = new Date(start.getTime() + dayOffset * 86400000);
  const iso = date.toISOString().split("T")[0];

  const filePath = path.join(metadataDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  data.date = iso;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  console.log(`${iso}  ${data.slug}`);
});

console.log(
  `\nDistributed ${n} articles from ${start.toISOString().split("T")[0]} to ${
    end.toISOString().split("T")[0]
  }`
);
