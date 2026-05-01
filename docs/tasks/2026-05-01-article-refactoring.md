# Tasks: Organização e Refatoração dos Artigos

Spec de referência: `docs/specs/article-refactoring.md`

---

## T1 — Renomear arquivos EN com slug incorreto

**Status:** ✅ Concluído

**O que foi feito:**
- Deletado `amazon-web-services-the-developer-associative-journey.mdx` (duplicata idêntica de `aws-developer-associate-journey.mdx`)
- 15 arquivos renomeados para os slugs canônicos (ver tabela na spec)
- Verificação: zero arquivos EN sem par em `content/metadata/articles/`

---

## T2 — Remover artefatos Medium

**Status:** ✅ Concluído

**O que foi feito:**
- Removida a linha de subtítulo duplicado + crédito Unsplash (`Photo by[...](...)on[Unsplash](...)`) nos 12 artigos afetados
- Corrigido typo no title de `mastering-date-and-time-in-javascript.mdx`: `"Mastering Date an time"` → `"Mastering Date and Time"`

---

## T3 — Corrigir excerpts iguais ao título

**Status:** ✅ Concluído

**O que foi feito:**
- 11 excerpts reescritos com descrições reais e distintas do título
- 10 titles e 1 excerpt com `:` sem aspas corrigidos (YAML inválido)
- 2 casos de non-breaking space (`U+00A0`) detectados e removidos nos campos `excerpt`

| Artigo | Excerpt anterior | Excerpt novo |
|---|---|---|
| `mastering-feature-flags` | título repetido | How feature toggles let you ship code safely, run experiments, and roll back instantly without redeploying. |
| `the-authentication-strategies` | título repetido | A practical comparison of authentication methods — from Basic Auth to OAuth and JWT — and how to choose the right one. |
| `design-patterns-with-vanilla-js` | título repetido | A series exploring classic design patterns implemented in plain JavaScript, from Creational to Behavioral. |
| `introduction-graphql` | título repetido | A kickstart guide to GraphQL — what it is, how it differs from REST, and why developers are adopting it. |
| `introduction-to-functional-programming` | título repetido | A friendly guide to pure functions, immutability, and higher-order functions in JavaScript. |
| `introduction-to-progressive-web-apps` | título repetido | What PWAs are, how service workers and the Web App Manifest work together, and when to build one. |
| `mastering-date-and-time-in-javascript` | título repetido | Tips and tricks for handling dates, timezones, and formatting reliably in modern JavaScript. |
| `mastering-http` | título repetido | Everything you need to know about HTTP — methods, headers, status codes, caching, and the evolution from 1.1 to HTTP/3. |
| `react-design-patterns-compound-component` | título repetido | How to share implicit state between related components without prop drilling, using the Compound Component pattern. |
| `react-design-patterns-higher-order-components` | título repetido | How to extend component behaviour by wrapping it in a Higher-Order Component, and when to prefer hooks instead. |
| `react-design-patterns-layout-components` | título repetido | How Layout Components separate structure from logic so your UI stays consistent and easy to maintain. |
| `understanding-css-architecture` | título repetido | A deep dive into CSS methodologies — BEM, SMACSS, ITCSS — and how each one solves scalability in large codebases. |
| `react-design-patterns-provider` | título repetido | A structured way of managing and passing data through your component tree with the Provider Pattern. |

---

## T4 — Auditoria final

**Status:** ✅ Concluído

**O que foi feito:**
- `pnpm generate-metadata` executado com sucesso: 145 arquivos processados (73 EN + 72 pt-BR), zero erros
- Zero arquivos EN sem par em `content/metadata/articles/`
- Zero artefatos Medium restantes

---

## Pendente (fora desta refatoração)

- [ ] Traduzir os 61 artigos pt-BR que ainda têm o placeholder `🚧 A tradução deste artigo está em andamento.`
