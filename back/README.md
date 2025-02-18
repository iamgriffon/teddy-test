# Backend NestJS

Este é o módulo backend do projeto fullstack, construído com NestJS, TypeORM e PostgreSQL. Segue princípios de arquitetura limpa e escalável.

## Tecnologias Utilizadas

- **Framework:** [NestJS](https://nestjs.com/)
- **ORM:** [TypeORM](https://typeorm.io/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
- **Testes:** [Jest](https://jestjs.io/)
- **Documentação:** [Swagger](https://swagger.io/)

## Como Começar?

### Pré-requisitos

- Node.js 18+
- PostgreSQL 15+
- pnpm 8+

### Instalação

```bash
cd back
pnpm install
```

### Configuração do Ambiente

Crie um arquivo `.env` baseado no `.env.example` e configure as variáveis de ambiente e instale as dependências.

```bash
  cp .env.example .env
  pnpm install
```

### Execução

```bash
# Modo desenvolvimento
pnpm run start:dev

# Modo produção
pnpm run build
pnpm run start:prod
```

## Populando o banco de dados

```bash
curl -X POST http://localhost/api/clients/seed/50
```
Isso irá criar 50 clientes aleatórios no banco de dados.

## Testes

```bash
# Testes unitários
pnpm run test

# Testes e2e
pnpm run test:e2e

# Cobertura de testes
pnpm run test:cov
```

## Documentação da API

Acesse a documentação Swagger em [http://localhost:3000/api/docs](http://localhost:3000/api/docs) após iniciar a aplicação.

## Estrutura do Projeto

Consulte o [ARCHITECTURE.md](ARCHITECTURE.md) para detalhes sobre a arquitetura e organização do código.

## Licença

Este projeto está licenciado sob a [Licença Apache 2.0](LICENSE).
