## Sobre o documento:

- Este documento é um guia para contribuir com o projeto.
- Ele contém informações sobre o formato de mensagens de commit e outras diretrizes de contribuição.
- Ele é um documento de referência para os padrões de contribuição do projeto.
- Todas as seções desse documento com exceção desta estarão escritas em inglês.
- Para checar o progresso do projeto enquanto estava sendo desenvolvido, acesse:
  - As issues do projeto: `https://github.com/iamgriffon/teddy-test/issues?q=is%3Aissue%20state%3Aclosed`
  - As pull requests do projeto: `https://github.com/iamgriffon/teddy-test/pulls?q=is%3Apr+is%3Aclosed`

# Project Flags

## Project Name Flags

Use one of the following to indicate which project the commit is for:

- `[FRONT]` - For commits related to the frontend
- `[BACK]` - For commits related to the backend
- `[DEVOPS]` - For commits related to devops
- `[ALL]` - For commits related to all projects

## Commit Flags

Use one of the following flags to indicate the type of commit:

- `[FEATURE]` - For new features
- `[BUGFIX]` - For bug fixes
- `[REFAC]` - For refactoring existing code
- `[HOTFIX]` - For hotfixes (urgent bug fixes)
- `[DOCS]` - For documentation changes
- `[TEST]` - For code tests

## Issue Number

Include the issue number that the commit addresses. If the commit is not related to a specific issue, you can use `#0`.

### About issues

Issues are used to track the progress of the project. They are also used to track the progress of the project. They are tied to the project's repository. ()

## Commit Message Guidelines

We follow a specific commit message format to maintain a clear and organized commit history. Please adhere to the following pattern when creating your commits:

```
[COMMIT FLAG]#<issue number> - <commit description>
```

Provide a concise and descriptive summary of the changes made in the commit. Start with a verb in the imperative mood (e.g., "Add feature," "Fix bug," "Refactor code").

### Examples

- `[FEATURE]#123 - Add user authentication`
- `[BUGFIX]#456 - Fix issue with data validation`
- `[REFAC]#789 - Refactor database connection logic`
- `[HOTFIX]#999 - Fix critical security vulnerability`

## Branch Name Guidelines

We follow a specific branch name format to maintain a clear and organized branch history. Please adhere to the following pattern when creating your branches:

```
[PROJECT FLAG]/[COMMIT FLAG]#<issue number>
```

The commit and project flags follow the same pattern as the commit flags but without the `[` and `]` using lower case characters.

### Examples

- `back/feature#123`
- `front/bugfix#456`
- `devops/refac#789`
- `front/hotfix#999`
- `all/docs#4`

If the contributor needs an additional branch to work on, they can create a new branch with the following pattern:

```
[PROJECT FLAG]/[COMMIT FLAG]#<issue number>_(letter)
```

By convention, the index letter is the next letter in the alphabet starting from `b`.

Example:

- `back/feature#123_b`

## Pull Request Title Guidelines

We follow a specific pull request title format to maintain a clear and organized pull request history. Please adhere to the following pattern when creating your pull requests:

```
[PROJECT FLAG]/[COMMIT FLAG]#<issue number>
```

The project and commit flags follow the same pattern as the branch name flags but without the `[` and `]` using lower case characters.

### Examples

- `back/feature#123`
- `front/bugfix#456`
- `devops/refac#789`
- `front/hotfix#999`

If the contributor is working on a second branch, they can create a new branch with the following pattern:

```
[PROJECT FLAG]/[COMMIT FLAG]#<issue number>_(index letter)
```

Example:

- `back/feature#123_b`
- `front/bugfix#456_c`
- `devops/refac#789_d`
- `front/hotfix#999_e`
