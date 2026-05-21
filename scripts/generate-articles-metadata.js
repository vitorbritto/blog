import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

async function generateArticlesMetadata() {
  const contentDir = path.join(process.cwd(), "content");
  const metadataDir = path.join(contentDir, "metadata", "articles");
  const articlesDir = path.join(contentDir, "articles");

  if (!fs.existsSync(metadataDir)) {
    fs.mkdirSync(metadataDir, { recursive: true });
  }

  const languages = ["en", "pt-BR"];

  for (const lang of languages) {
    const langDir = path.join(articlesDir, lang);
    if (!fs.existsSync(langDir)) continue;

    const mdxFiles = fs
      .readdirSync(langDir)
      .filter((file) => file.endsWith(".mdx"));

    for (const fileName of mdxFiles) {
      const slug = fileName.replace(/\.mdx$/, "");
      const filePath = path.join(langDir, fileName);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data: frontmatter } = matter(fileContent);

      const outputPath = path.join(metadataDir, `${slug}.json`);
      const existing = fs.existsSync(outputPath)
        ? JSON.parse(fs.readFileSync(outputPath, "utf8"))
        : {};

      const fallbackDate = fs.statSync(filePath).mtime.toISOString().split("T")[0];

      const metadata = {
        slug,
        coverImage: frontmatter.coverImage ?? existing.coverImage,
        date: frontmatter.date ?? existing.date ?? fallbackDate,
        author: frontmatter.author ?? existing.author,
        categories: frontmatter.categories ?? existing.categories ?? [],
        tracks: frontmatter.tracks ?? existing.tracks ?? [],
        tags: frontmatter.tags ?? existing.tags ?? [],
        readTime: frontmatter.readTime ?? existing.readTime ?? 5,
        featured: frontmatter.featured ?? existing.featured ?? false,
      };

      fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2), "utf8");
      console.log(`✅ Generated metadata for ${slug}`);
    }
  }
}

generateArticlesMetadata().catch(console.error);
