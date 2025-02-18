![reactjs-vite-tailwindcss](https://user-images.githubusercontent.com/16243531/217138979-b854309c-4742-4275-a705-f9fec5158217.jpg)

# Modelo React TailwindCSS construído com Vite

Este é um projeto construído com Vite, React 18, TypeScript, Playwright, TanStack Query, TailwindCSS, React Router, Zustand, Eslint e Prettier.

## O que está incluído?

Este projeto utiliza diversas ferramentas como:

- [Vite](https://vitejs.dev)
- [ReactJS](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Playwright](https://playwright.dev/)
- [Tailwindcss](https://tailwindcss.com)
- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)
- [React Router](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/react-native/overview)
- [Zustand](https://zustand.docs.pmnd.rs/)

## Como começar?

### Instalação e Configuração

Crie um arquivo `.env` baseado no `.env.example` e configure as variáveis de ambiente e instale as dependências.

```bash
  cp .env.example .env
  pnpm install
```

Acesse a aplicação através de <http://localhost:5173> ou <http://localhost/> (devido ao Nginx).

### Verificação de código

```bash
pnpm run lint
```

### Verificação de tipos

```bash
pnpm run typecheck
```

### Build

```bash
pnpm run build
```

### Testes

```bash
pnpm test
```

Visualize e interaja com seus testes via interface gráfica.

```bash
pnpm test:ui
```

## Licença

Este projeto está licenciado sob a Licença MIT.
