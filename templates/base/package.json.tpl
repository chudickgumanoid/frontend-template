{
  "name": "__APP_NAME__",
  "type": "module",
  "version": "0.0.0",
  "private": true,
  "aliases": {
    "@": "./src"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --host",
    "test:unit": "vitest",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write src/"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.1.11",
    "@tanstack/vue-query": "^5.64.2",
    "@tanstack/vue-query-devtools": "^5.64.2",
    "@vueuse/core": "^13.6.0",
    "@vueuse/head": "^2.0.0",
    "axios": "^1.7.9",
    "date-fns": "^4.1.0",
    "dayjs": "^1.11.13",
    "esm-module-alias": "^2.2.1",
    "imask": "^7.6.1",
    "maska": "^2.1.11",
    "naive-ui": "^2.41.0",
    "pinia": "^2.3.1",
    "tailwindcss": "^4.1.11",
    "vue": "^3.5.13",
    "vue-i18n": "^9.14.2",
    "vue-router": "^4.5.0"
  },
  "devDependencies": {
    "@antfu/eslint-config": "^4.17.0",
    "@chdck/prettier": "^1.1.2",
    "@types/node": "^22.10.9",
    "@vitejs/plugin-vue": "^4.6.2",
    "@vue/runtime-core": "^3.5.13",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.31.0",
    "eslint-plugin-prettier": "^5.5.1",
    "fast-glob": "^3.3.3",
    "jsdom": "^21.1.2",
    "postcss": "^8.5.1",
    "prettier": "^3.4.2",
    "unplugin-auto-import": "^19.3.0",
    "unplugin-vue-components": "^28.0.0",
    "vite": "^6.0.11",
    "vite-plugin-svg-icons": "^2.0.1",
    "vite-plugin-vue-devtools": "^7.7.7"
  }
}
