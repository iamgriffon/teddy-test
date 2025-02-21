# Projeto Fullstack: ReactJS (Vite) + NestJS

Este projeto consiste em uma aplicação fullstack construída com ReactJS (utilizando Vite como bundler) no frontend e NestJS no backend.

## Visão Geral

- **Frontend:** Interface do usuário interativa e responsiva, desenvolvida com ReactJS e Vite.
- **Backend:** API robusta e escalável, construída com NestJS.
- **Web Server:** Nginx para servir o frontend e o backend.
- **Docker:** Containerização das aplicações.

## Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Configuração e Execução

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/iamgriffon/teddy-test.git
    cd teddy-test
    ```

2.  **Execute o projeto com Docker Compose:**

    Dentro da pasta `teddy-test` execute os seguintes comandos:

    ```bash
    docker-compose up --build
    ```

    Este comando irá construir as imagens do Docker e iniciar os containers para o frontend e o backend.

3.  **Execute o script de setup:**

    Você vai provavelmente encontrar um erro de DB do NestJS, mas não tem problema.

    Ainda com o container rodando, abra uma segunda aba do terminal (dentro da pasta raiz `teddy-test`, fora do docker) e execute os seguintes comandos:

    ```bash
    chmod +x setup.sh
    ./setup.sh
    ```

    Esse script fará:
    - Instalar as dependências (local e docker)
    - Instalar as variáveis de ambiente
    - Criar os banco de dados (teste e prod)
    - Reiniciar os projetos para aplicar as novas configurações

4.  **Acesse as aplicações:**

    - Frontend: `http://localhost/`
    - Backend: `http://localhost/api/`
    - Swagger: `http://localhost/api/docs`

EXTRA. **Caso você esteja tendo problemas com dependências**

Execute o seguinte comando caso você esteja com problemas com as dependências:

- No front

```bash
docker exec -it front sh -c "pnpm install"
```

- No back

```bash
docker exec -it back sh -c "pnpm install"
```

## Frameworks e Bibliotecas Utilizadas

### Frontend (ReactJS com Vite)

- **Framework:** [ReactJS](https://reactjs.org/)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Gerenciamento de Estado Global:** [Zustand](https://zustand.docs.pmnd.rs/)
- **Estilização:** [TailwindCSS](https://tailwindcss.com/)
- **Interface HTTP:** [Axios](https://axios-http.com/)
- **Gerenciamento de Requisições:** [Tanstack Query](https://tanstack.com/query/latest/docs/framework/react/react-native/overview)
- **Gerenciamento de Rotas:** [React Router](https://reactrouter.com/)
- **Testes:** [Playwright](https://playwright.dev/)
- **Formulários:** [React Hook Form](https://react-hook-form.com/)
- **Validação:** [Zod](https://zod.dev/)
- **Armazenamento Local:** [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

### Backend (NestJS)

- **Framework:** [NestJS](https://nestjs.com/)
- **ORM:** [TypeORM](https://typeorm.io/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
- **Testes:** [Jest](https://jestjs.io/)
- **Documentação:** [Swagger](https://swagger.io/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
- **Serviço de JWT** [NestJS JWT](https://github.com/nestjs/jwt)

## Testes

### Frontend

Dentro da pasta `teddy-test/front` execute o seguinte comando:

```bash
npx playwright test
```

### Backend

Dentro da pasta `teddy-test/back` execute o seguinte comando:

```bash
npm run test
```

## Código fonte

- [Código fonte do frontend](https://github.com/iamgriffon/teddy-test/tree/main/front)
- [Código fonte do backend](https://github.com/iamgriffon/teddy-test/tree/main/back)

## Contribuição

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto usa a licença de código aberto [Apache 2.0](LICENSE)
