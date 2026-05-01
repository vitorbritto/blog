import fs from "node:fs";
import path from "node:path";

const metadataDir = path.join(process.cwd(), "content", "metadata", "articles");

// Each rule: keywords (regex) → categories. Order matters: first matching wins
// for the *primary* slot, then we apply additional category rules cumulatively.
const rules = [
  { test: /architectural-patterns|monolithic|microservices|css-architecture|system-design|package-by-feature|solid-principles|introduction-to-design-patterns|design-patterns-with-vanilla-js|elevating-creational|crafting-code-foundations|react-design-patterns/, cat: "architecture" },
  { test: /authentication|web-security/, cat: "security" },
  { test: /databases/, cat: "databases" },
  { test: /aws|ci-cd|version-control-systems|application-strategy|cloud-development-kit|monorepo/, cat: "devops" },
  { test: /code-splitting|debounce|throttle|server-side-rendering|build-tools|performance/, cat: "performance" },
  { test: /graphql|the-back-end-roadmap|^api-/, cat: "back-end" },
  { test: /react|css|html|javascript|ecmascript|dom|the-front-end-roadmap|web-frameworks|progressive-web-apps|static-site-generators|virtual-dom|short-circuit|cascading-style|journey-of-css|pre-processors|kickstart-to-dom|the-webs-wizardry|how-does-internet-works|the-right-introduction-to-javascript|mastering-date-and-time|the-ecmascript-journey|function-composition|error-boundaries|pure-components|syntheticevent|feature-flags|odyssey-of-mobile|offline-first|type-checkers|software-testing|world-of-programming-languages|package-managers|mastering-http|deep-dive-into-dns/, cat: "front-end" },
];

const files = fs.readdirSync(metadataDir).filter(f => f.endsWith(".json"));

for (const file of files) {
  const filePath = path.join(metadataDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const slug = data.slug;

  const cats = new Set(data.categories || []);
  for (const rule of rules) {
    if (rule.test.test(slug)) cats.add(rule.cat);
  }

  data.categories = Array.from(cats);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  console.log(`${slug.padEnd(60)} → ${data.categories.join(", ") || "(none)"}`);
}
