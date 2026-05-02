#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const languages = ["en", "pt-BR"];

function printHelp() {
  console.log(`
Create a new article scaffold.

Usage:
  pnpm new-article "Article title" [options]

Options:
  --slug <slug>             Custom article slug. Defaults to a slugified title.
  --title-pt <title>        Portuguese title. Defaults to the English title.
  --excerpt <text>          English excerpt.
  --excerpt-pt <text>       Portuguese excerpt. Defaults to the English excerpt.
  --category <slug>         Category slug. Can be repeated or comma-separated.
  --tag <tag>               Tag. Can be repeated or comma-separated.
  --track <slug>            Track slug. Can be repeated or comma-separated.
  --date <yyyy-mm-dd>       Publication date. Defaults to today.
  --read-time <minutes>     Estimated read time. Defaults to 5.
  --featured                Mark article as featured.
  --help                    Show this help message.

Examples:
  pnpm new-article "Understanding Event Loops"
  pnpm new-article "React State Machines" --category front-end --tag react --read-time 8
  pnpm new-article "Designing APIs" --slug designing-apis --title-pt "Desenhando APIs"
`);
}

function parseArgs(argv) {
  const options = {
    categories: [],
    tags: [],
    tracks: [],
    featured: false,
    readTime: 5,
    date: new Date().toISOString().split("T")[0],
  };
  const positional = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--") {
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    if (arg === "--featured") {
      options.featured = true;
      continue;
    }

    if (!arg.startsWith("--")) {
      positional.push(arg);
      continue;
    }

    const key = arg.slice(2);
    const value = argv[index + 1];

    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }

    index += 1;

    switch (key) {
      case "slug":
        options.slug = value;
        break;
      case "title-pt":
        options.titlePt = value;
        break;
      case "excerpt":
        options.excerpt = value;
        break;
      case "excerpt-pt":
        options.excerptPt = value;
        break;
      case "category":
        options.categories.push(...splitList(value));
        break;
      case "tag":
        options.tags.push(...splitList(value));
        break;
      case "track":
        options.tracks.push(...splitList(value));
        break;
      case "date":
        options.date = value;
        break;
      case "read-time":
        options.readTime = Number(value);
        break;
      default:
        throw new Error(`Unknown option --${key}`);
    }
  }

  options.title = positional.join(" ").trim();
  return options;
}

function splitList(value) {
  return value
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function unique(values) {
  return Array.from(new Set(values));
}

function validateOptions(options) {
  if (options.help) return;

  if (!options.title) {
    throw new Error("Article title is required.");
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(options.date)) {
    throw new Error("--date must use yyyy-mm-dd format.");
  }

  if (!Number.isInteger(options.readTime) || options.readTime < 1) {
    throw new Error("--read-time must be a positive integer.");
  }
}

function buildMdx({ title, excerpt, language }) {
  const intro =
    language === "pt-BR"
      ? "Escreva a ideia de abertura aqui. Comece pelo problema, contexto ou pergunta que este artigo responde."
      : "Write the opening idea here. Start with the problem, context, or question this article answers.";
  const mainIdea =
    language === "pt-BR"
      ? "Desenvolva o argumento ou explicacao central."
      : "Develop the central argument or explanation.";
  const example =
    language === "pt-BR"
      ? "Adicione um exemplo concreto, trecho de codigo, explicacao de diagrama ou cenario."
      : "Add a concrete example, code snippet, diagram explanation, or scenario.";
  const codeComment = language === "pt-BR" ? "Codigo de exemplo" : "Example code";
  const takeaways =
    language === "pt-BR"
      ? ["Primeiro aprendizado.", "Segundo aprendizado.", "Terceiro aprendizado."]
      : ["First takeaway.", "Second takeaway.", "Third takeaway."];
  const references =
    language === "pt-BR" ? "Adicione as referencias aqui." : "Add references here.";

  return `---
title: ${JSON.stringify(title)}
excerpt: ${JSON.stringify(excerpt)}
---

## ${language === "pt-BR" ? "Introducao" : "Introduction"}

${intro}

## ${language === "pt-BR" ? "Ideia principal" : "Main Idea"}

${mainIdea}

## ${language === "pt-BR" ? "Exemplo pratico" : "Practical Example"}

${example}

\`\`\`ts
// ${codeComment}
\`\`\`

## ${language === "pt-BR" ? "Principais aprendizados" : "Key Takeaways"}

${takeaways.map(item => `- ${item}`).join("\n")}

## ${language === "pt-BR" ? "Referencias" : "References"}

- ${references}
`;
}

function buildMetadata(options) {
  return {
    slug: options.slug,
    date: options.date,
    categories: unique(options.categories),
    tracks: unique(options.tracks),
    tags: unique(options.tags),
    readTime: options.readTime,
    featured: options.featured,
  };
}

function ensureSafeToWrite(paths) {
  const existing = paths.filter(filePath => fs.existsSync(filePath));

  if (existing.length > 0) {
    throw new Error(
      `Refusing to overwrite existing file(s):\n${existing
        .map(filePath => `- ${path.relative(process.cwd(), filePath)}`)
        .join("\n")}`
    );
  }
}

function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
    return;
  }

  validateOptions(options);

  options.slug = options.slug ? slugify(options.slug) : slugify(options.title);
  options.titlePt = options.titlePt || options.title;
  options.excerpt = options.excerpt || "A short description of the article.";
  options.excerptPt = options.excerptPt || options.excerpt;

  if (!options.slug) {
    throw new Error("Could not generate a valid slug.");
  }

  const rootDir = process.cwd();
  const articlePaths = Object.fromEntries(
    languages.map(language => [
      language,
      path.join(rootDir, "content", "articles", language, `${options.slug}.mdx`),
    ])
  );
  const metadataPath = path.join(
    rootDir,
    "content",
    "metadata",
    "articles",
    `${options.slug}.json`
  );

  ensureSafeToWrite([...Object.values(articlePaths), metadataPath]);

  for (const filePath of [...Object.values(articlePaths), metadataPath]) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  fs.writeFileSync(
    articlePaths.en,
    buildMdx({ title: options.title, excerpt: options.excerpt, language: "en" }),
    "utf8"
  );
  fs.writeFileSync(
    articlePaths["pt-BR"],
    buildMdx({ title: options.titlePt, excerpt: options.excerptPt, language: "pt-BR" }),
    "utf8"
  );
  fs.writeFileSync(metadataPath, `${JSON.stringify(buildMetadata(options), null, 2)}\n`, "utf8");

  console.log(`Created article scaffold: ${options.slug}`);
  console.log(`- ${path.relative(rootDir, articlePaths.en)}`);
  console.log(`- ${path.relative(rootDir, articlePaths["pt-BR"])}`);
  console.log(`- ${path.relative(rootDir, metadataPath)}`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  console.error('Run "pnpm new-article --help" for usage.');
  process.exit(1);
}
