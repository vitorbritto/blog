# Vitor Britto Blog

Blog pessoal sobre tecnologia, desenvolvimento de software e carreira. O projeto é
construído com Next.js, React, TypeScript, Tailwind CSS e conteúdo em MDX com suporte a
inglês e português do Brasil.

## Stack

- Next.js 15 com App Router
- React 19
- TypeScript
- Tailwind CSS com `@tailwindcss/typography`
- MDX via `next-mdx-remote`
- Zustand para persistência do idioma
- Radix Tooltip, Lucide React e Sonner para UI
- Prism/Shiki/Rehype/Remark para conteúdo técnico e blocos de código

## Como Rodar

Use `pnpm`, já que o repositório possui `pnpm-lock.yaml`.

```bash
pnpm install
pnpm dev
```

O servidor local sobe com Turbopack. Para build de produção:

```bash
pnpm build
pnpm start
```

Outros comandos declarados:

```bash
pnpm lint
pnpm new-article "Article title"
pnpm generate-metadata
pnpm download-images
```

## Estrutura

- `app/`: rotas do App Router, layout global, home e páginas de artigo.
- `components/`: componentes de UI, layout, header, sidebars, cards, renderização MDX e seletor de idioma.
- `content/articles/en/`: versões em inglês dos artigos em MDX.
- `content/articles/pt-BR/`: versões em português dos artigos em MDX.
- `content/metadata/articles/`: metadata compartilhada dos artigos, separada das traduções.
- `content/categories/`: categorias disponíveis na navegação e filtros.
- `content/tracks/`: trilhas/series de leitura.
- `lib/content.ts`: camada de leitura dos arquivos de conteúdo.
- `lib/translations/`: textos de interface por idioma.
- `config/socialLinks.ts`: links sociais exibidos no header.
- `public/`: imagens, logo, favicon, preview social e capas.
- `scripts/`: scripts auxiliares para metadata, categorização, datas e imagens.

## Modelo de Conteúdo

Cada artigo é identificado por um `slug`. Para aparecer corretamente, ele deve ter:

1. Um arquivo MDX em `content/articles/en/{slug}.mdx`.
2. Um arquivo MDX em `content/articles/pt-BR/{slug}.mdx`.
3. Um arquivo JSON em `content/metadata/articles/{slug}.json`.

Os MDX carregam os campos traduzidos:

```mdx
---
title: Article title
excerpt: Short description
---

Article content...
```

O JSON guarda os dados compartilhados entre idiomas:

```json
{
  "slug": "function-composition-in-react-applications",
  "date": "2023-12-08",
  "categories": ["front-end"],
  "tracks": [],
  "tags": [],
  "readTime": 5,
  "featured": false
}
```

`getArticleBySlug` carrega a metadata, procura as duas traduções e usa uma tradução como
fallback caso a outra não exista. A listagem da home é ordenada por `date`, do artigo mais
recente para o mais antigo.

## Idiomas

O idioma atual é controlado por `useLanguage` e persistido no storage local com a chave
`language-storage`. O `LanguageProvider` atualiza o atributo `lang` do documento, e os
componentes usam `getTranslatedArticle` para selecionar `en` ou `pt-BR`.

Textos fixos da interface ficam em:

- `lib/translations/en.json`
- `lib/translations/pt-BR.json`

## Home e Filtros

A home busca artigos, categorias, tags e trilhas no servidor e passa tudo para
`HomeContent`. Os filtros de categoria, tag e busca são aplicados no cliente. A busca
consulta título e excerpt nos dois idiomas.

Layout principal da home:

- sidebar esquerda para categorias, tags e arquivo;
- coluna central com o feed de artigos;
- sidebar direita com busca e descoberta.

## Artigos

As páginas em `app/articles/[slug]/page.tsx` são geradas estaticamente com
`generateStaticParams`. O conteúdo MDX é serializado no cliente por `ArticleMDX`, com:

- `remark-gfm`;
- `remarkReferencesAccordion`;
- componente customizado para blocos de código;
- componente `ReferencesAccordion` disponível dentro do MDX.

## Scripts

- `pnpm new-article "Article title"`: cria o scaffold de um artigo com MDX em `en`,
  MDX em `pt-BR` e metadata compartilhada. Use `pnpm new-article --help` para ver
  todas as opções.
- `pnpm generate-metadata`: gera arquivos em `content/metadata/articles` a partir dos
  frontmatters dos MDX.
- `node scripts/categorize-articles.js`: aplica categorias por regras baseadas no slug.
- `node scripts/distribute-article-dates.js`: redistribui datas nos metadados.
- `pnpm download-images`: usa Puppeteer para baixar imagens de artigos do Medium.

Observações:

- `download-images` pode depender de `MEDIUM_SID_COOKIE` em `.env`.
- `generate-metadata`, `categorize-articles` e `distribute-article-dates` sobrescrevem
  JSONs de metadata. Revise o diff antes de commitar.
- O `package.json` declara `html-to-mdx`, mas não há `scripts/html-to-mdx.js` no
  repositório atualmente.

## Convenções

- Imports internos usam alias `@/*`.
- Código TypeScript roda com `strict: true`.
- Estilo segue `.prettierrc`: aspas simples, sem ponto e vírgula, `printWidth` 90.
- Componentes de interface vivem em `components/`; dados e helpers compartilhados vivem em
  `lib/`.
- Categorias, tags e trilhas devem referenciar slugs existentes para manter filtros e
  descoberta consistentes.

## Analytics e SEO

O layout global define metadata base, Open Graph, Twitter card, favicon e imagem de
preview. Google Analytics está configurado em `components/GoogleAnalytics.tsx` com o ID
`G-TVYDZHTT4D`.

## Checklist Para Adicionar Artigo

1. Rodar `pnpm new-article "Article title"`.
2. Revisar `content/articles/en/{slug}.mdx`.
3. Revisar `content/articles/pt-BR/{slug}.mdx`.
4. Revisar `content/metadata/articles/{slug}.json`.
5. Adicionar imagem em `public/blog/` se o artigo usar capa.
6. Associar `categories`, `tracks` e `tags` quando fizer sentido.
7. Rodar `pnpm build` antes de publicar.
