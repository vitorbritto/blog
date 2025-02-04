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

      const metadata = {
        slug,
        coverImage: frontmatter.coverImage,
        date: frontmatter.date,
        author: frontmatter.author,
        categories: frontmatter.categories || [],
        tracks: frontmatter.tracks || [],
        tags: frontmatter.tags || [],
        readTime: frontmatter.readTime || 5,
        featured: frontmatter.featured || false,
      };

      const outputPath = path.join(metadataDir, `${slug}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2), "utf8");
      console.log(`✅ Metadata gerado para ${slug}`);
    }
  }
}

generateArticlesMetadata().catch(console.error);
