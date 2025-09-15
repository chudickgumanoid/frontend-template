# **APP_NAME**

### Paste your description

## Table of contents

- [**APP\_NAME**](#app_name)
    - [Paste your description](#paste-your-description)
  - [Table of contents](#table-of-contents)
  - [Used stack technologies:](#used-stack-technologies)
  - [Install](#install)
  - [Build for production](#build-for-production)
    - [Env variables](#env-variables)
  - [Commit convention](#commit-convention)
    - [Description recommendations](#description-recommendations)
    - [If there is a need for clarification](#if-there-is-a-need-for-clarification)
  - [ESLint и Prettier](#eslint-и-prettier)
    - [Installation and configuration](#installation-and-configuration)
    - [Recommendations for the team](#recommendations-for-the-team)

## Used stack technologies:

- Vue 3, Vite
- Tailwind v4, CSS
- UI библиотека: Naive UI
- Pinia
- Axios, TanstackQuery
- Docker, Nginx

## Install

1. Install dependencies (priority to used `pnpm`):

```bash
pnpm i
```

2. Start dev server:

```bash
npm dev
```

## Build for production

```bash
pnpm build && pnpm preview
```

---

### Env variables

All variables are taken from the .env file

| Name              | Description                                  | Example                         | Required? |
| ----------------- | -------------------------------------------- | ------------------------------- | --------- |
| VITE_BASE_API_URL | Mai API url for requests                     | http://192.168.0.2:10001/api/v1 | yes       |
| VITE_DEV_PORT     | Variable for start dev server on custom port | 10410                           | no        |
| VITE_IS_DEV       | For dev mode?                                |                                 | no        |

---

## Commit convention

Each commit message begins with a change type tag, which allows you to understand which task or change the commit has completed. The format of the commit message is as follows:

```
<type>: <brief description of the changes in English>
```

- **feat:** - Adding new functionality to the codebase.
  - _example:_ feat: add store for auth
- **fix:** - Correction of errors in the code.
  - _example:_ fix: clear state in pp deal
- **docs:** - Adding|Changing the documentation.
  - _example:_ docs: update doc for bb deal model
- **style:** - Changes related to the design of the code (indents, spaces, semicolons, etc.) that do not affect the execution of the code.
  - _example:_ style: change margin for all h1 tags
- **refactor:** - Changes to the code that do not affect its functionality, but improve its structure, readability, or performance.
  - _example:_ refactor: refactor LoginView.vue
- **test:** - Add or modify tests.
  - _example:_ test: create test for auth
- **ci:** - Add|Change the Continue Integration.
  - _example:_ ci: update name for pipeline

### Description recommendations

1. **Brevity:** The description of the changes should be short and accurate.
2. **Clarity:** Use clear terms and avoid abbreviations.

### If there is a need for clarification

If there is a need for an explanation, then you can write comments to the commit in the .md format.
We write the main commit with the type
Below in the "``" we write comments to the explanation

example:

```
feat: add deal pp
- docs: update main model pp
- style: mt-2 -> mt-4
```

## ESLint и Prettier

To maintain a uniform code style, the project uses **ESLint** and **Prettier**. Make sure that you have the necessary extensions and settings installed to work.

### Installation and configuration

1. Install extensions for VS Code:

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

2. Make sure that the following settings are enabled in the editor settings:

```setting.json
{
  "editor.formatOnSave": true
}
```

3. To run the code check manually, run:

```bash
pnpm lint
```

### Recommendations for the team

- Set up auto-formatting to avoid unnecessary changes to the code.
- Follow the established style to keep the code readable.
