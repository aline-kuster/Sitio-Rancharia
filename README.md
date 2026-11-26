# Sítio Vale Rancharia

Landing page para apresentar o Sítio Vale Rancharia e facilitar reservas pelo WhatsApp.

🌐 **Site:** [lp-rancharia.vercel.app](https://lp-rancharia.vercel.app/)

## Tecnologias

- Vite, React e TypeScript com verificação estrita de tipos
- Tailwind CSS 4 e CSS organizado por responsabilidade
- Componentes de interface com Radix UI e Class Variance Authority

## Executar localmente

Use Node.js 20.19+ ou 22.12+ e npm. O Node.js 24 também é compatível.

```bash
cd lp-rancharia
npm ci
npm run dev
```

```bash
npm run build    # Verifica o TypeScript e gera dist/
npm run preview  # Serve a versão de produção localmente
```

## Organização

```text
lp-rancharia/
├── index.html                 # Metadados e ponto de montagem do React
├── public/                    # Arquivos públicos, favicon e robots.txt
└── src/
    ├── app/                   # Composição principal da aplicação
    ├── assets/images/         # Imagens processadas pelo Vite
    ├── components/
    │   ├── layout/            # Cabeçalho e rodapé compartilhados
    │   ├── ui/                # Componentes básicos reutilizáveis
    │   └── ReservationButton.tsx
    ├── config/                # Links de contato e navegação
    ├── data/                  # Dados dos alojamentos e áreas de lazer
    ├── features/photo-gallery/ # Modal, botões de acesso e coleção de fotos
    ├── hooks/                 # Comportamentos compartilhados
    ├── lib/                   # Utilitários de interface
    ├── pages/home/
    │   ├── HomePage.tsx        # Composição das seções da página
    │   └── sections/          # Hero, sobre, slider da estrutura e mapa
    ├── styles/
    │   ├── global.css         # Entrada do Tailwind e ordem dos estilos
    │   ├── tokens.css         # Cores, fontes, espaçamentos e tema do Tailwind
    │   ├── base.css           # Tipografia e acessibilidade
    │   ├── sections/          # Estilos específicos de cada seção
    │   └── …                  # Layout, botões, animações e responsividade
    └── main.tsx               # Inicialização do React
```

A separação acompanha as responsabilidades da interface: `app` compõe a aplicação, `pages` reúne o conteúdo de cada página e `components` contém os elementos compartilhados. Dados e comportamentos ficam separados da marcação. Esta landing page não precisa de camadas de domínio ou infraestrutura sem regras de negócio que as justifiquem.

## Manutenção

- **Fotos:** edite `src/features/photo-gallery/photos.ts`. A coleção reúne as fotos da estrutura e as demais imagens do sítio. O botão “Ver mais fotos”, os acessos de navegação e a foto central do slider abrem o mesmo modal, com setas, miniaturas, navegação pelo teclado e gesto de arrastar. Esc, o botão fechar e um clique no fundo fecham o modal.
- **Acomodações:** edite `src/data/accommodations.ts`. Os espaços com foto aparecem no slider com destaque central e laterais sobrepostas; os demais aparecem na lista complementar. A seção usa Tailwind em `AccommodationsSection.tsx`. Não há rolagem automática, e as transições respeitam a preferência por menos movimento.
- **Contato e menu:** edite `src/config/site.ts`.
- **Estilos:** ajuste as variáveis em `src/styles/tokens.css` e as regras de cada seção em `src/styles/sections/`. As regras responsivas são importadas por último para manter a precedência.
- **Imagens:** importe arquivos de `src/assets/images`; o Vite gera os endereços de produção. Use `public` para arquivos que precisam de endereço fixo.

O menu móvel, o cabeçalho ao rolar e as animações usam hooks com limpeza de eventos e observadores. O modal usa o elemento nativo `dialog` para manter o foco dentro dele e restaura o foco e a rolagem da página ao fechar.

## Créditos

Desenvolvido por [wemado.com](https://wemado.com).
