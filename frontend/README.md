# Koodihaaste22 frontend

## Technologies

Most of the technologies are bleeding edge and are not ready for production!
- typescript
- vite
- nuxt3-rc3
- vitest
- websocket
- nitro
- eslint

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment) for more information.

# Development

## File structure

Nuxt3 directories:
- assets
  - font
- components
  - contains two components: restaurant list and result list
- composables
  - contains composable for global state alreadyVoted
- plugins
  - contains plugin for websocket client
- server
  - contains api gateway for the backend
- modules
  - contains websocket server for development environment using nuxt hooks

Usage for those can be found [here](https://v3.nuxtjs.org/guide/concepts/introduction)

- websocket

This directory contains nitro presets for generating node-server with websocket support. This model is currently only 
working on [my own fork of nitropack](https://github.com/jarvainen/nitro/tree/user_defined_presets)

- helpers

Contains list of functions not matching any specific category. Most of the code is here.

- typings

Contains server typings, generated with `swagger-typescript-api`. Can be regenerated with `npm run generate-api-types`.
Requires backend server up.

- tests

This directory has tests for api endpoints. Run with `npm run test`