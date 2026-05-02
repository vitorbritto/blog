# Spec: Tradução dos Artigos para PT-BR

**Date:** 2026-05-01
**Status:** Approved
**Scope:** `content/articles/pt-BR/*.mdx`

---

## Contexto

Auditoria do conteúdo em 2026-05-01 mostrou que apenas **4 dos 72 artigos** estão efetivamente traduzidos para PT-BR. Os outros 68 estão em um destes estados:

- **60 placeholders** com `🚧 A tradução deste artigo está em andamento.`
- **7 stubs** apenas com frontmatter (sem corpo, sem marcador, título ainda em inglês)
- **1 cópia em inglês** (`react-the-virtual-dom.mdx` — corpo idêntico ao EN)

Total: 68 artigos a traduzir.

---

## Anomalias estruturais

### Órfão sem par em EN

`pt-BR/react-overview-about-synthetic-event.mdx` (placeholder) **não tem contraparte em EN**. A versão EN vive em `react-an-overview-about-syntheticevent.mdx` (slug diferente).

**Decisão:** traduzir `react-an-overview-about-syntheticevent.mdx` no slug correto (mantendo paridade com EN). Deletar o órfão `react-overview-about-synthetic-event.mdx` como follow-up.

### Stubs com frontmatter em inglês

Os 7 arquivos stub (`solid-principles-for-software-wizards`, `the-front-end-roadmap`, `the-journey-of-css`, `the-odyssey-of-mobile-applications`, `the-package-by-feature-approach`, `the-path-to-ci-cd-mastery`, `the-ecmascript-journey`) têm `title` e `excerpt` em inglês. Serão sobrescritos com o conteúdo traduzido completo.

### `react-the-virtual-dom.mdx`

Está com corpo em inglês no `pt-BR/`. Será sobrescrito.

---

## Regras de tradução

### Frontmatter

- **Traduzir:** `title`, `excerpt`
- **Não tocar:** todos os outros campos (esses ficam em `content/metadata/articles/{slug}.json`, não em frontmatter de PT)

Se o stub atual tiver campos extras no frontmatter (`coverImage`, `date`, `categories`, etc.), **remover** — frontmatter de pt-BR só carrega `title` e `excerpt` (padrão da arquitetura, ver `CLAUDE.md`).

### Corpo MDX

**Traduzir:**
- Toda a prosa
- Headings (`##`, `###`, etc.)
- Texto descritivo em listas e tabelas
- Comentários dentro de code blocks (`// ...`, `# ...`, `<!-- ... -->`)
- Strings de UI/output que aparecem como exemplos contextuais
- Captions de imagens, alt text quando descritivo
- Texto em `<ReferencesAccordion>` e seções `## References` → `## Referências`

**NÃO traduzir:**
- Nomes de variáveis, funções, classes, tipos
- Identificadores de código (keywords da linguagem, APIs)
- Valores literais que reproduzem APIs/protocolos (HTTP headers, status codes, etc.)
- URLs, paths, nomes de arquivos
- Trechos de saída de console que precisam bater com o real
- Termos técnicos consagrados em inglês na comunidade dev BR

### Termos técnicos — manter em inglês

Seguir o padrão dos 4 já traduzidos (`a-comprehensive-guide-to-html`, `a-deep-dive-into-dns`, `offline-first`, `react-diving-into-pure-components`):

- **Manter EN:** Virtual DOM, Pure Component, Higher-Order Component, render props, Provider, Hook, useState, useEffect, props, state, refs, callback, closure, scope, hoisting, prototype, async/await, Promise, fetch, Event Loop, DOM, CSS-in-JS, microservices, monorepo, deploy, build, bundle, runtime, server-side rendering (SSR), client-side, Pull Request, code review, lint, TypeScript, JavaScript, etc.
- **Traduzir:** "function" → função, "object" → objeto, "array" → array (manter), "method" → método, "property" → propriedade, "argument" → argumento, "parameter" → parâmetro, "type" → tipo, "value" → valor, "variable" → variável.
- **Frases-padrão:** "In this article, we'll explore..." → "Neste artigo, vamos explorar...", "Let's see..." → "Vamos ver...", "First of all" → "Antes de mais nada".

### Headings comuns

- `## Conclusion` → `## Conclusão`
- `## Introduction` → `## Introdução`
- `## Overview` → `## Visão geral`
- `## References` → `## Referências`
- `## Getting Started` → `## Primeiros passos`
- `## Final Thoughts` → `## Considerações finais`
- `## Wrapping Up` → `## Encerrando`
- `## Summary` → `## Resumo`

### Tom e voz

- Manter o tom do autor: didático, direto, primeira pessoa do plural ("vamos", "veremos") quando o EN usa "we'll".
- **PT-BR**, não PT-PT (usar "tela" não "ecrã", "arquivo" não "ficheiro", "time" não "equipa").
- Evitar gerundismo desnecessário ("vamos estar fazendo" → "vamos fazer").
- Manter formalidade casual — informal mas técnica.

### Code blocks

- Linguagem do fence (` ```javascript `) **não muda**.
- Comentários **traduzidos**.
- Strings que são UI ou output de exemplo: traduzir se contextual ("Hello World" pode virar "Olá Mundo" se for ilustrativo, mas manter "Hello World" se for exemplo canônico).
- Nomes de variáveis/funções: **nunca** traduzir.

### Marcador `🚧`

Remover. Substituir pelo conteúdo traduzido completo.

---

## Estrutura de execução em lotes

Total: **68 artigos**, ~440KB de MDX.

| Lote | Faixa de tamanho | Qtd | Bytes aprox |
|---|---|---|---|
| 1 | Stubs + ≤ 3KB | 13 | ~25KB |
| 2 | 3–5KB | 16 | ~65KB |
| 3 | 5–7KB | 9 | ~55KB |
| 4 | 7–10KB | 11 | ~95KB |
| 5 | 10–13KB | 6 | ~70KB |
| 6 | 13–18KB | 5 | ~85KB |
| 7 | 18–22KB | 4 | ~80KB |
| 8 | > 22KB | 1 (the-right-introduction-to-javascript ~30KB) | ~30KB |

Ver `docs/tasks/2026-05-01-pt-br-translations.md` para a lista detalhada por lote.

**Pausa entre lotes:** ao final de cada lote, parar e aguardar revisão do usuário antes de seguir.

---

## Validação por lote

A cada lote concluído:

1. Confirmar que `🚧` foi removido em todos os arquivos do lote (`grep -l "🚧" pt-BR/*.mdx`).
2. Confirmar que nenhum arquivo do lote é byte-idêntico ao EN (`cmp`).
3. Listar arquivos modificados para o usuário revisar.
4. `pnpm build` apenas após o último lote (não a cada um — o sistema de conteúdo é estático e mudanças em MDX não quebram tipos).

---

## Out of scope

- Não traduzir os 4 artigos já traduzidos.
- Não regenerar JSON em `content/metadata/articles/` (esses não dependem da tradução).
- Não criar novos artigos.
- Não mexer no fluxo `pnpm generate-metadata`.
- Deletar o órfão `react-overview-about-synthetic-event.mdx` é follow-up separado, não faz parte deste escopo.
