# Spec: Organização e Refatoração dos Artigos

## Objetivo

Garantir que todos os artigos em `content/articles/{en,pt-BR}/` sigam um formato consistente: frontmatter mínimo e válido + corpo em Markdown limpo e legível.

## Formato-alvo

Todo arquivo `.mdx` deve seguir este padrão:

```mdx
---
title: 'Título do artigo'
excerpt: 'Uma frase descritiva distinta do título, com 1–2 linhas.'
---

Primeiro parágrafo introdutório...

## Seção 1
...
```

**Regras:**
- `title` — string entre aspas simples ou duplas. Obrigatório usar aspas quando o valor contiver `:` ou `'`.
- `excerpt` — string **diferente do título**, descritiva, sem repetir as palavras do título mecanicamente.
- Nenhum outro campo no frontmatter (os demais metadados vivem em `content/metadata/articles/{slug}.json`).
- Nenhum artefato de importação no corpo do artigo.

## Problemas identificados

### Problema 1 — Slugs divergentes entre `en/` e `pt-BR/` (16 arquivos)

O sistema lê artigos pelo slug do JSON de metadados. Os arquivos `en/` abaixo tinham nomes que não batiam com nenhum JSON de metadados — nunca eram servidos em produção.

| Arquivo antigo em `en/` | Slug canônico |
|---|---|
| `amazon-web-services-the-developer-associative-journey.mdx` | deletado (duplicata idêntica de `aws-developer-associate-journey.mdx`) |
| `exploring-the-aws-cloud-development-kit-cdk.mdx` | `exploring-the-aws-cloud-development-kit.mdx` |
| `introducing-graphql.mdx` | `introduction-graphql.mdx` |
| `introduction-to-functional-programming-in-javascript.mdx` | `introduction-to-functional-programming.mdx` |
| `mastering-date-an-time-in-javascript.mdx` | `mastering-date-and-time-in-javascript.mdx` |
| `react-design-patterns-compound-component-pattern.mdx` | `react-design-patterns-compound-component.mdx` |
| `react-design-patterns-conditional-rendering-pattern.mdx` | `react-design-patterns-conditional-rendering.mdx` |
| `react-design-patterns-controlled-uncontrolled-component-pattern.mdx` | `react-design-patterns-controlled-uncontrolled-component.mdx` |
| `react-design-patterns-custom-hooks-pattern.mdx` | `react-design-patterns-custom-hooks.mdx` |
| `react-design-patterns-higher-order-components-pattern.mdx` | `react-design-patterns-higher-order-components.mdx` |
| `react-design-patterns-layout-components-pattern.mdx` | `react-design-patterns-layout-components.mdx` |
| `react-design-patterns-provider-pattern.mdx` | `react-design-patterns-provider.mdx` |
| `react-design-patterns-render-props-pattern.mdx` | `react-design-patterns-render-props.mdx` |
| `react-design-patterns-the-container-presentational-pattern.mdx` | `react-design-patterns-container-presentational.mdx` |
| `react-design-patterns-the-foundational-pattern.mdx` | `react-design-patterns-foundational.mdx` |
| `the-web-s-wizardry.mdx` | `the-webs-wizardry.mdx` |

### Problema 2 — Artefatos de importação do Medium (12 artigos EN)

Artigos importados do Medium carregavam lixo na primeira linha do corpo:
- Subtítulo duplicado (ex.: `"Building Trust and enhancing SecurityBuilding Trust and enhancing Security"`)
- Crédito de foto inline (`Photo by[Nome](url)on[Unsplash](url)`)

Arquivos afetados: `design-patterns-with-vanilla-js`, `introducing-graphql`, `introduction-to-functional-programming-in-javascript`, `javascript-what-is-a-function`, `mastering-date-an-time-in-javascript`, `mastering-feature-flags`, `react-design-patterns-compound-component-pattern`, `react-design-patterns-higher-order-components-pattern`, `react-design-patterns-layout-components-pattern`, `react-design-patterns-provider-pattern`, `the-authentication-strategies`, `the-package-by-feature-approach`.

### Problema 3 — `excerpt` igual ao `title` (11 artigos EN)

Arquivos afetados: `design-patterns-with-vanilla-js`, `introducing-graphql`, `introduction-to-functional-programming-in-javascript`, `introduction-to-progressive-web-apps`, `mastering-date-an-time-in-javascript`, `mastering-http`, `react-design-patterns-compound-component-pattern`, `react-design-patterns-higher-order-components-pattern`, `react-design-patterns-layout-components-pattern`, `the-authentication-strategies`, `understanding-css-architecture`.

### Problema 4 — Traduções pt-BR pendentes (61 de 73 artigos)

61 arquivos em `pt-BR/` contêm apenas o placeholder `🚧 A tradução deste artigo está em andamento.`. Não são erros técnicos — são trabalho em aberto tratado como escopo separado.

## Fora do escopo desta spec

- Tradução dos artigos pt-BR pendentes (Problema 4)
- Revisão do conteúdo textual dos artigos
- Alterações em metadados JSON
