import fs from "node:fs";
import path from "node:path";

const metadataDir = path.join(process.cwd(), "content", "metadata", "articles");
const categoriesDir = path.join(process.cwd(), "content", "categories");
const categoryFiles = fs.readdirSync(categoriesDir).filter(f => f.endsWith(".json"));
const validCategories = new Set(
  categoryFiles.map(file => {
    const filePath = path.join(categoriesDir, file);
    return JSON.parse(fs.readFileSync(filePath, "utf8")).slug;
  })
);

// Each rule: keywords (regex) → categories. Order matters: first matching wins
// for the *primary* slot, then we apply additional category rules cumulatively.
const rules = [
  { test: /architectural-patterns|monolithic|microservices|css-architecture|system-design|package-by-feature|solid-principles|introduction-to-design-patterns|design-patterns-with-vanilla-js|elevating-creational|crafting-code-foundations|react-design-patterns/, cat: "architecture" },
  { test: /authentication|web-security/, cat: "security" },
  { test: /databases/, cat: "databases" },
  { test: /aws|ci-cd|version-control-systems|application-strategy|cloud-development-kit|monorepo/, cat: "devops" },
  { test: /code-splitting|debounce|throttle|server-side-rendering|build-tools|performance/, cat: "performance" },
  { test: /graphql|the-back-end-roadmap|^api-/, cat: "back-end" },
  { test: /react|css|html|javascript|ecmascript|dom|the-front-end-roadmap|web-frameworks|progressive-web-apps|static-site-generators|virtual-dom|short-circuit|cascading-style|journey-of-css|pre-processors|kickstart-to-dom|the-webs-wizardry|how-does-internet-works|the-right-introduction-to-javascript|mastering-date-and-time|the-ecmascript-journey|function-composition|functional-programming|error-boundaries|pure-components|syntheticevent|feature-flags|odyssey-of-mobile|offline-first|type-checkers|software-testing|world-of-programming-languages|package-managers|mastering-http|deep-dive-into-dns/, cat: "front-end" },
];

const tagRules = [
  { test: /react-design-patterns-compound-component/, tags: ["React", "Compound Components", "Design Patterns"] },
  { test: /react-design-patterns-conditional-rendering/, tags: ["React", "Conditional Rendering", "Design Patterns"] },
  { test: /react-design-patterns-container-presentational/, tags: ["React", "Container Components", "Design Patterns"] },
  { test: /react-design-patterns-controlled-uncontrolled-component/, tags: ["React", "Controlled Components", "Forms"] },
  { test: /react-design-patterns-custom-hooks/, tags: ["React", "Custom Hooks", "Design Patterns"] },
  { test: /react-design-patterns-foundational/, tags: ["React", "Foundational Patterns", "Design Patterns"] },
  { test: /react-design-patterns-higher-order-components/, tags: ["React", "HOC", "Design Patterns"] },
  { test: /react-design-patterns-layout-components/, tags: ["React", "Layout Components", "Design Patterns"] },
  { test: /react-design-patterns-provider/, tags: ["React", "Provider Pattern", "Context API"] },
  { test: /react-design-patterns-render-props/, tags: ["React", "Render Props", "Design Patterns"] },
  { test: /^react-design-patterns$/, tags: ["React", "Design Patterns", "Architecture"] },
  { test: /react.*virtual-dom|virtual-dom/, tags: ["React", "Virtual DOM", "JavaScript"] },
  { test: /synthetic-event|syntheticevent/, tags: ["React", "Synthetic Events", "JavaScript"] },
  { test: /pure-components/, tags: ["React", "Pure Components", "Performance"] },
  { test: /error-boundaries/, tags: ["React", "Error Boundaries", "Resilience"] },
  { test: /code-splitting/, tags: ["React", "Code Splitting", "Performance"] },
  { test: /javascript-what-is-a-function/, tags: ["JavaScript", "Functions", "Fundamentals"] },
  { test: /function-composition/, tags: ["JavaScript", "Function Composition", "Functional Programming"] },
  { test: /functional-programming/, tags: ["JavaScript", "Functional Programming", "Pure Functions"] },
  { test: /short-circuit/, tags: ["JavaScript", "Short Circuit", "Expressions"] },
  { test: /date-and-time/, tags: ["JavaScript", "Date", "Time"] },
  { test: /ecmascript/, tags: ["JavaScript", "ECMAScript", "Language Evolution"] },
  { test: /right-introduction-to-javascript/, tags: ["JavaScript", "Fundamentals", "Programming"] },
  { test: /dom-manipulation/, tags: ["DOM", "JavaScript", "Browser APIs"] },
  { test: /html/, tags: ["HTML", "Web Standards", "Front-end"] },
  { test: /css-architecture/, tags: ["CSS", "Architecture", "Maintainability"] },
  { test: /cascading-style-sheets|journey-of-css/, tags: ["CSS", "Stylesheets", "Front-end"] },
  { test: /pre-processors-and-post-processors/, tags: ["CSS", "Preprocessors", "PostCSS"] },
  { test: /web-frameworks/, tags: ["Web Frameworks", "Front-end", "Architecture"] },
  { test: /static-site-generators/, tags: ["Static Sites", "SSG", "Front-end"] },
  { test: /progressive-web-apps/, tags: ["PWA", "Web Apps", "Front-end"] },
  { test: /mobile-applications/, tags: ["Mobile", "React Native", "Apps"] },
  { test: /front-end-roadmap/, tags: ["Front-end", "Roadmap", "Learning Path"] },
  { test: /webs-wizardry|internet-works/, tags: ["Web", "Internet", "Networking"] },
  { test: /build-tools/, tags: ["Build Tools", "Tooling", "Automation"] },
  { test: /package-managers/, tags: ["Package Managers", "Dependencies", "Tooling"] },
  { test: /feature-flags/, tags: ["Feature Flags", "Release Strategy", "Product Engineering"] },
  { test: /debounce-and-throttle/, tags: ["JavaScript", "Debounce", "Throttle"] },
  { test: /type-checkers/, tags: ["Type Checking", "Code Quality", "Static Analysis"] },
  { test: /software-testing/, tags: ["Testing", "Quality", "Automation"] },
  { test: /programming-languages/, tags: ["Programming Languages", "Fundamentals", "Software Development"] },
  { test: /mastering-http/, tags: ["HTTP", "Web", "Networking"] },
  { test: /dns/, tags: ["DNS", "Networking", "Web"] },
  { test: /server-side-rendering/, tags: ["SSR", "Rendering", "Performance"] },
  { test: /offline-first/, tags: ["Offline First", "PWA", "Resilience"] },
  { test: /graphql/, tags: ["GraphQL", "APIs", "Back-end"] },
  { test: /back-end-roadmap/, tags: ["Back-end", "Roadmap", "Learning Path"] },
  { test: /databases/, tags: ["Databases", "Data Modeling", "Storage"] },
  { test: /authentication/, tags: ["Authentication", "Security", "Identity"] },
  { test: /web-security/, tags: ["Web Security", "Security", "OWASP"] },
  { test: /aws-developer-associate-journey-chapter-01/, tags: ["AWS", "Cloud", "Certification"] },
  { test: /aws-developer-associate-journey-chapter-02/, tags: ["AWS", "Cloud", "Developer Associate"] },
  { test: /aws-developer-associate-journey$/, tags: ["AWS", "Cloud", "Certification"] },
  { test: /cloud-development-kit/, tags: ["AWS CDK", "Infrastructure as Code", "Cloud"] },
  { test: /ci-cd/, tags: ["CI/CD", "GitHub Actions", "Automation"] },
  { test: /version-control-systems/, tags: ["Version Control", "Git", "Collaboration"] },
  { test: /application-strategy-deployment/, tags: ["Deployment", "DevOps", "Release Strategy"] },
  { test: /monorepo-the-right-way|building-a-monorepo/, tags: ["Monorepo", "Architecture", "Tooling"] },
  { test: /architectural-patterns-microservices/, tags: ["Microservices", "Architecture", "Distributed Systems"] },
  { test: /architectural-patterns-monolithic/, tags: ["Monolith", "Architecture", "System Design"] },
  { test: /system-design/, tags: ["System Design", "Scalability", "Architecture"] },
  { test: /package-by-feature/, tags: ["Package by Feature", "Architecture", "Modularity"] },
  { test: /solid-principles/, tags: ["SOLID", "Clean Code", "Design Principles"] },
  { test: /introduction-to-design-patterns/, tags: ["Design Patterns", "Architecture", "Fundamentals"] },
  { test: /design-patterns-with-vanilla-js/, tags: ["Design Patterns", "JavaScript", "Vanilla JS"] },
  { test: /elevating-creational-craftsmanship/, tags: ["Creational Patterns", "Design Patterns", "JavaScript"] },
  { test: /crafting-code-foundations/, tags: ["Clean Code", "Architecture", "Foundations"] },
];

const files = fs.readdirSync(metadataDir).filter(f => f.endsWith(".json"));
const articles = [];

for (const file of files) {
  const filePath = path.join(metadataDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const slug = data.slug;

  const cats = new Set((data.categories || []).filter(cat => validCategories.has(cat)));
  for (const rule of rules) {
    if (rule.test.test(slug)) cats.add(rule.cat);
  }

  data.categories = Array.from(cats);
  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    const tagRule = tagRules.find(rule => rule.test.test(slug));
    data.tags = tagRule ? tagRule.tags : data.categories.map(categoryToTag);
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  articles.push(data);
  console.log(`${slug.padEnd(60)} → ${data.categories.join(", ") || "(none)"}`);
}

const articlesByCategory = new Map([...validCategories].map(cat => [cat, []]));
for (const article of articles.sort((a, b) => new Date(b.date) - new Date(a.date))) {
  for (const category of article.categories || []) {
    articlesByCategory.get(category)?.push(article.slug);
  }
}

for (const file of categoryFiles) {
  const filePath = path.join(categoriesDir, file);
  const category = JSON.parse(fs.readFileSync(filePath, "utf8"));
  category.articles = articlesByCategory.get(category.slug) || [];
  fs.writeFileSync(filePath, JSON.stringify(category, null, 2), "utf8");
}

function categoryToTag(category) {
  return category
    .split("-")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join("-");
}
