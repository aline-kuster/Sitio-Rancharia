# Sítio Vale Rancharia — Landing Page

Site de uma página do **Sítio Vale Rancharia**: apresenta o lugar, mostra as fotos, a estrutura disponível, como chegar e leva o visitante a reservar pelo WhatsApp.

🌐 **Site no ar:** [lp-rancharia.vercel.app](https://lp-rancharia.vercel.app/)

Este documento explica **o que foi usado, como o projeto está organizado e como cada parte funciona**, para que qualquer pessoa consiga entender, rodar e alterar o site.

---

## Sumário

1. [Visão geral](#visão-geral)
2. [Tecnologias e por que foram escolhidas](#tecnologias-e-por-que-foram-escolhidas)
3. [Como rodar o projeto](#como-rodar-o-projeto)
4. [Estrutura de pastas](#estrutura-de-pastas)
5. [Como a página funciona](#como-a-página-funciona)
6. [Estilos (CSS)](#estilos-css)
7. [Imagens](#imagens)
8. [Acessibilidade, desempenho e SEO](#acessibilidade-desempenho-e-seo)
9. [Tarefas comuns](#tarefas-comuns)
10. [Publicação (deploy)](#publicação-deploy)
11. [Convenções do código](#convenções-do-código)

---

## Visão geral

A página tem estas seções, na ordem:

| Seção | O que mostra | `id` no HTML |
|---|---|---|
| Header | Logo, menu e botão "Fale no WhatsApp" | `site-header` |
| Hero | Foto em tela cheia, título e botões de reserva | `home` |
| Destaques | Piscina, Açude, Pesca e Trilhas | — |
| Sobre | Texto de apresentação e foto | `about` |
| Galeria | Carrossel infinito de fotos com setas | `photos` |
| Estrutura | 8 cards dos espaços do sítio | `acomodacoes` |
| Como chegar | Passo a passo e mapa do Google | `address` |
| Chamada final | Convite para reservar pelo WhatsApp | — |
| Rodapé | Navegação, contatos e créditos | — |

**Arquitetura em uma frase:** o conteúdo é **HTML estático** (rápido e bom para o Google), o comportamento fica em **módulos TypeScript pequenos**, e o **React é usado só numa "ilha"**: o botão do WhatsApp no header.

---

## Tecnologias e por que foram escolhidas

| Tecnologia | Versão | Para que serve aqui |
|---|---|---|
| [Vite](https://vite.dev) | 8 | Servidor de desenvolvimento e build. Otimiza imagens referenciadas no HTML, adiciona hash nos nomes (cache) e gera o site final em `dist/`. |
| [TypeScript](https://www.typescriptlang.org) | 6 | Scripts da página com checagem de tipos. O `npm run build` falha se houver erro de tipo. |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Reset de estilos (preflight), tokens de tema e classes utilitárias usadas pelo botão do shadcn. |
| CSS próprio | — | Todo o visual das seções está em `src/styles/global.css`, organizado por seção. |
| [React](https://react.dev) | 19 | Renderiza apenas o botão do WhatsApp do header. |
| [shadcn/ui](https://ui.shadcn.com) | — | Componente `Button` (com `class-variance-authority`, `clsx`, `tailwind-merge` e `@radix-ui/react-slot`). |
| Google Fonts | — | **Instrument Serif** (títulos) e **Geist** (textos). |

**Por que não fazer tudo em React?** Se as seções fossem componentes React, o conteúdo só apareceria depois do JavaScript carregar: a página demoraria mais para mostrar a foto principal e o Google veria um HTML quase vazio. Mantendo o HTML estático, o conteúdo aparece na hora e o JavaScript só adiciona interatividade.

---

## Como rodar o projeto

**Requisitos:** Node.js **20.19 ou superior** (exigido pelo Vite 8) e npm.

```bash
cd lp-rancharia
npm install        # instala as dependências
npm run dev        # abre o servidor de desenvolvimento (com recarregamento automático)
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor local para desenvolver. |
| `npm run build` | Checa os tipos (`tsc`) e gera o site final em `lp-rancharia/dist/`. |
| `npm run preview` | Serve a pasta `dist/` localmente para conferir o build antes de publicar. |

> Todos os comandos devem ser rodados **dentro de `lp-rancharia/`**. A raiz do repositório não tem `package.json`.

---

## Estrutura de pastas

```text
Rancharia/                         # raiz do repositório git
├── README.md                      # este arquivo
└── lp-rancharia/                  # projeto do site
    ├── index.html                 # TODO o conteúdo da página
    ├── public/                    # copiados sem alteração para o build
    │   ├── favicon.svg            # ícone da aba
    │   └── robots.txt             # libera a indexação pelo Google
    ├── src/
    │   ├── main.tsx               # ponto de entrada: carrega estilos, scripts e o React
    │   ├── assets/
    │   │   └── images/            # todas as fotos, em WebP otimizado
    │   ├── components/            # componentes React
    │   │   ├── ReservationButton.tsx   # botão "Fale no WhatsApp" do header
    │   │   └── ui/button.tsx           # Button do shadcn/ui
    │   ├── lib/
    │   │   └── utils.ts           # cn(): junta classes do Tailwind sem conflito
    │   ├── scripts/               # comportamento da página (um arquivo por função)
    │   │   ├── header.ts          # header fica sólido ao rolar
    │   │   ├── mobile-menu.ts     # menu do celular
    │   │   ├── gallery.ts         # carrossel infinito + setas
    │   │   └── reveal.ts          # animação de entrada das seções
    │   └── styles/
    │       └── global.css         # tema, estilos de cada seção e responsivo
    ├── components.json            # configuração do shadcn/ui
    ├── vite.config.ts             # plugins (React, Tailwind) e o atalho "@/" → src/
    ├── tsconfig.json              # configuração do TypeScript
    └── package.json               # dependências e scripts
```

O atalho **`@/`** aponta para `src/`. Por isso os imports são escritos como `@/scripts/gallery` em vez de `../../scripts/gallery`.

---

## Como a página funciona

### Fluxo de carregamento

```text
navegador abre index.html
   │  (o HTML já tem todo o conteúdo e as imagens com tamanhos certos)
   ▼
carrega src/main.tsx
   ├── importa src/styles/global.css
   ├── marca <html class="js">          → libera as animações de entrada
   ├── initHeader()                      → header sólido ao rolar
   ├── initMobileMenu()                  → menu do celular
   ├── initGallery()                     → carrossel infinito
   ├── initReveal()                      → animação de entrada das seções
   └── React renderiza <ReservationButton/> dentro de #reservation-button-root
```

Se o JavaScript falhar ou estiver desativado, **todo o conteúdo continua visível**: o CSS só esconde os elementos animados quando a classe `js` existe.

### Scripts (`src/scripts/`)

Cada arquivo exporta uma função `init…()` que procura os elementos pelo `id`. Se o elemento não existir, a função simplesmente não faz nada.

**`header.ts`:** quando a página rola mais de 24px, adiciona a classe `is-scrolled` no header, que troca o fundo transparente (sobre a foto) por um fundo creme com desfoque.

**`mobile-menu.ts`:** abaixo de 860px o menu vira um botão. Ao clicar, alterna a classe `menu-open` e atualiza `aria-expanded` e `aria-label` ("Abrir menu" / "Fechar menu"). Fecha ao clicar num link ou ao apertar **Esc**.

**`gallery.ts`:** o carrossel da galeria.
1. Cada "página" (`.gallery-page`) tem 4 fotos no formato grande / pequena / alta / pequena.
2. O script **duplica as páginas** e as coloca no fim da faixa. A animação CSS `gallery-scroll` move a faixa até a metade; como a segunda metade é igual à primeira, o recomeço do loop fica imperceptível. As cópias recebem `aria-hidden` e `inert`, para leitores de tela não lerem tudo duas vezes.
3. A duração é calculada em `20s × número de páginas`, então a velocidade é sempre a mesma, com 3 ou com 10 páginas.
4. **Setas:** no primeiro clique, o script lê a posição atual da animação, desliga o automático (`is-looping` → `is-manual`) e passa a mover a faixa uma página por vez com `transform`. O loop continua nos dois sentidos: depois da última vem a primeira.
5. Com o mouse em cima, o carrossel pausa (`animation-play-state: paused`).

**`reveal.ts`:** usa `IntersectionObserver` para adicionar `is-visible` aos elementos `.reveal` quando eles entram na tela; o CSS faz o "sobe e aparece".

### Componente React

`ReservationButton.tsx` usa o `Button` do shadcn com `asChild`, ou seja, o botão é renderizado como um link `<a>` para o WhatsApp, com o visual do componente. Abaixo de 480px ele é escondido no header (não cabe), e o WhatsApp fica disponível na hero e na chamada final.

---

## Estilos (CSS)

Tudo está em `src/styles/global.css`, nesta ordem:

1. **`@import "tailwindcss"`**: reset de estilos e utilitários.
2. **`@theme inline`**: expõe as cores do site como classes do Tailwind (`bg-primary`, `text-foreground`…), usadas pelo `Button` do shadcn.
3. **Tokens (`:root`)**: cores, medidas e curvas de animação. **Para mudar uma cor do site, mude aqui.**

   | Token | Cor | Uso |
   |---|---|---|
   | `--background` | `#f6f3ec` (creme) | fundo da página |
   | `--foreground` | `#1c261d` | textos |
   | `--primary` | `#9a4b26` (terracota) | botões, destaques, links |
   | `--forest` | `#1f3024` (verde-floresta) | seção Estrutura |
   | `--accent-soft` | `#e6ad83` | destaques sobre fundo escuro |

   Todas as combinações de cor de texto passam no contraste mínimo **WCAG AA (4,5:1)**.

4. **`@layer base`**: estilos gerais (fonte, foco do teclado, títulos, "reduzir movimento").
5. **`@layer components`**: um bloco comentado por seção (Header, Hero, Destaques, Sobre, Galeria, Estrutura, Como chegar, Chamada final, Rodapé).
6. **Responsivo**, no fim do arquivo, do maior para o menor:

   | Ponto de quebra | O que muda |
   |---|---|
   | `≤ 1024px` | Estrutura e rodapé passam a 2 colunas |
   | `≤ 860px` | Menu vira botão; Sobre e Como chegar ficam em 1 coluna; Destaques em 2×2 |
   | `≤ 700px` | Galeria em 2 colunas; cards da Estrutura viram rolagem lateral |
   | `≤ 480px` | Botão do header some; botões ocupam a largura toda; rodapé em 1 coluna |

A base é `1rem = 16px` e os tamanhos de texto usam `clamp()`, que cresce e diminui suavemente com a largura da tela.

---

## Imagens

Todas as fotos estão em `src/assets/images/`, em **WebP**, sem metadados e com tratamento de cor. O Vite adiciona um hash ao nome no build (`hero-acude-B1x9.webp`), então o navegador sempre pega a versão nova quando a foto muda.

**Padrão de nomes:** `<seção>-<descrição>[-<largura>].webp`, por exemplo `galeria-ponte-madeira.webp` ou `hero-acude-1280.webp`.

**Como as imagens são entregues:**
- **`srcset` + `sizes`:** o navegador escolhe o tamanho certo para cada tela (o celular não baixa a versão de desktop).
- **`<picture>` na hero:** uma foto horizontal para o desktop e outra vertical para o celular.
- **`loading="lazy"`** em tudo abaixo da hero (só carrega quando vai aparecer); a hero usa **`fetchpriority="high"`** para aparecer o quanto antes.
- A foto da hero foi **ampliada 2× com IA** (modelo de super-resolução EDSR, via OpenCV), mantendo as cores e a textura da original, para ficar nítida em telas grandes e retina.
- O GIF do balanço foi convertido em **WebP animado** (de 10,7 MB para cerca de 350 KB), com uma versão parada para quem ativou "reduzir movimento".

**Tamanhos usados:**

| Onde | Proporção | Largura |
|---|---|---|
| Hero (desktop) | 16:9 | 1280, 1920 e 2560 px |
| Hero (celular) | 4:5 | 1080 px |
| Sobre | 4:5 | 1000 px (+ 640 px) |
| Galeria: grande / pequena / alta | ~1,15:1 / 1:1 / 9:16 | 1000 / 800 / 600 px |
| Estrutura (cards) | 4:3 | 800 px |

**Limite de peso:** até ~300 KB por imagem. A hero pode passar um pouco disso, porque é a primeira coisa que o visitante vê.

---

## Acessibilidade, desempenho e SEO

**Acessibilidade**
- Link "Pular para o conteúdo" (aparece ao apertar Tab), `<main>`, um único `<h1>` e títulos em ordem.
- Todas as imagens têm `alt` descritivo; ícones decorativos usam `aria-hidden`.
- Foco do teclado sempre visível (contorno terracota).
- **"Reduzir movimento"**: quem ativa essa opção no sistema não vê animações nem o carrossel automático.
- Menu do celular com `aria-expanded` e fechamento pela tecla Esc.

**Desempenho**
- Conteúdo em HTML estático: nada depende de JavaScript para aparecer.
- Imagens em WebP no tamanho certo para cada tela, com carregamento sob demanda.
- Ícones em SVG dentro do HTML (sem requisições extras).

**SEO**
- `<title>`, `<meta name="description">`, `lang="pt-br"` e `theme-color`.
- `public/robots.txt` liberando a indexação e `public/favicon.svg`.

---

## Tarefas comuns

### Trocar textos
Todos os textos estão no `index.html`, separados por comentários (`<!-- Hero -->`, `<!-- Sobre -->`…).

### Trocar o número do WhatsApp
O número aparece em vários links `https://wa.me/55…`: no `index.html` (hero, chamada final, rodapé) e em `src/components/ReservationButton.tsx`. Use "Localizar e substituir" no editor para trocar todos de uma vez.

### Adicionar uma página de fotos na galeria
1. Prepare 4 fotos: **grande** (~1,15:1), **pequena** (1:1), **alta** (9:16) e **pequena** (1:1), e salve em `src/assets/images/`.
2. No `index.html`, copie um bloco `<div class="bento gallery-page">…</div>` inteiro, cole depois do último e troque `src`, `alt` e as legendas (`<figcaption>`).
3. Pronto: o loop e a velocidade se ajustam sozinhos.

### Colocar foto num card da Estrutura
Troque o bloco `<div class="stay-placeholder">…</div>` do card por:
```html
<img src="/src/assets/images/estrutura-nome.webp" alt="Descrição da foto" loading="lazy" decoding="async">
```
Use uma foto 4:3 com 800 × 600 px.

### Mudar as cores
Altere os tokens no `:root` de `src/styles/global.css`. Ao trocar cores de texto ou fundo, confira o contraste (mínimo 4,5:1).

---

## Publicação (deploy)

O site está publicado na **Vercel**: [lp-rancharia.vercel.app](https://lp-rancharia.vercel.app/).

O `npm run build` gera em `lp-rancharia/dist/` um **site 100% estático** (HTML, CSS, JS e imagens). Ele pode ser publicado em qualquer hospedagem de arquivos estáticos, como Vercel, Netlify, Cloudflare Pages ou GitHub Pages.

| Configuração | Valor |
|---|---|
| Pasta do projeto (root directory) | `lp-rancharia` |
| Comando de build | `npm run build` |
| Pasta publicada (output) | `dist` |

> **GitHub Pages:** se o site for servido num subcaminho (por exemplo `usuario.github.io/Sitio-Rancharia/`), adicione `base: "/Sitio-Rancharia/"` no `vite.config.ts`. Com domínio próprio, isso não é necessário.

---

## Convenções do código

- **Idioma:** textos do site, comentários e nomes de variáveis em português; nomes de arquivos e funções exportadas em inglês (`initGallery`, `mobile-menu.ts`), seguindo o padrão do ecossistema.
- **Um script por responsabilidade** em `src/scripts/`, cada um exportando uma função `init…()`.
- **CSS organizado por seção**, com os pontos de quebra no fim do arquivo.
- **Imports com `@/`** em vez de caminhos relativos longos.
- **Antes de enviar mudanças:** rode `npm run build`. Se der erro de tipo ou de build, ele aparece ali.

---

## Créditos

Desenvolvido por [wemado.com](https://wemado.com).
