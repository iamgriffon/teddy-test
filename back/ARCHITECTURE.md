# Arquitetura do Projeto Backend (NestJS)

## Introdução
Este documento descreve a arquitetura do módulo backend desenvolvido em NestJS, seguindo princípios de código limpo, separação de preocupações e facilidade de manutenção.

---

## Estrutura do Projeto
```
src/
├── application/    # Lógica de aplicação
│   ├── controllers/ # Controladores HTTP
│   ├── services/    # Serviços de negócio
│   └── modules/     # Módulos NestJS
├── core/            # Elementos centrais
│   ├── dtos/        # Data Transfer Objects
│   └── models/      # Modelos de domínio
├── db/              # Camada de persistência
│   ├── entities/    # Entidades TypeORM
│   └── repository/ # Repositórios customizados
└── test/            # Testes automatizados
```

---

## Camadas da Aplicação

### 1. Camada de Controllers (HTTP)
` src/application/controllers/`

- Responsabilidade: Lidar com requisições HTTP e respostas
- Tecnologia: Decorators do NestJS (`@Get`, `@Post`, etc)
- Justificativa: Separação clara entre protocolos HTTP e lógica de negócio

### 2. Camada de Serviços
`/src/application/services/`

- Responsabilidade: Implementar regras de negócio
- Princípios: Single Responsibility Principle (SRP)
- Vantagem: Reutilização entre diferentes contextos (HTTP, CLI, etc)

### 3. Camada de Persistência
`/src/db/repository/`

- Tecnologia: TypeORM + Repositórios Customizados
- Justificativa:
  - Isolamento da camada de persistência/negócio da camada de serviço
  - Facilita troca de provedores de banco de dados
  - Implementação de operações complexas de consulta

### 4. Modelos e DTOs
`/src/core/`

- DTOs (Data Transfer Objects): Validação de entrada/saída
- Entidades: Representação do modelo de domínio no banco
- Decisão: Separação clara entre modelos de persistência e modelos de transferência

---

## Tecnologias e Justificativas

| Tecnologia       | Justificativa                                                                 |
|------------------|-------------------------------------------------------------------------------|
| NestJS           | Arquitetura modular, suporte nativo a TypeScript, ecossistema maduro          |
| TypeORM          | ORM com suporte a TypeScript, migrations e múltiplos bancos de dados          |
| PostgreSQL       | Banco relacional robusto com recursos avançados (JSONB, Full-Text Search)    |
| Jest             | Suporte a testes unitários e de integração com ótimo desempenho               |
| Docker           | Containerização para ambiente consistente entre desenvolvimento e produção    |

---

## Convenções Adotadas

1. Injeção de Dependências
   - Uso do sistema de módulos do NestJS para gestão de dependências

2. Validação de Dados
   - Uso combinado de:
     - `class-validator` para validação de campos
     - DTOs especializados para cada operação

3. Tratamento de Erros
   - Exceções customizadas (ex: `NotFoundException`)
   - Formato padrão de respostas de erro

4. Testabilidade
   - Mocks automáticos com Jest
   - Configuração isolada de banco de dados para testes

---

## Considerações Finais

Esta arquitetura foi escolhida para garantir:

1. **Manutenibilidade**: Alterações em uma camada não afetam as outras
2. **Testabilidade**: Componentes isolados facilitam testes unitários
3. **Escalabilidade**: Adição fácil de novos recursos via módulos
4. **Performance**: Operações de I/O otimizadas através do TypeORM

A estrutura permite evolução para:
- Microserviços
- CQRS (Command Query Responsibility Segregation)
- Sistemas distribuídos com mensageria


