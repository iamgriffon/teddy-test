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

Antes de rodar os testes, você precisa ter o projeto back em execução e voce precisa criar dois usuários no banco de dados (um com o email email@email2.com e outro com o email email@email5.com, que serão usados para testar o login e persistência de dados). Para isso, você pode usar o seguinte comando:

```bash
curl -X POST http://localhost/api/users/register -H "Content-Type: application/json" -d '{"name": "Test user", "email": "email@email2.com", "password": "12345678"}'

curl -X POST http://localhost/api/users/register -H "Content-Type: application/json" -d '{"name": "Outro user", "email": "email@email5.com", "password": "Dupin#123"}'
```

Você também precisa popular o banco de dados, para isso execute o seguinte comando:

```bash
curl -X POST http://localhost/api/clients/seed/50
```

Depois de criar o usuário e popular o banco de dados, você pode rodar os testes com o seguinte comando:

```bash
pnpm test
```

Visualize e interaja com seus testes via interface gráfica.

```bash
pnpm test:ui
```

## Licença

Este projeto está licenciado sob a Licença MIT.
