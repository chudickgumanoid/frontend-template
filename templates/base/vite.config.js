import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig((command, mode) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      tailwindcss(),
      vueDevTools(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: true,
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    server: {
      allowedHosts: true,
      host: true,
      port: env.VITE_DEV_PORT || null,
    },

    css: {
      preprocessorOptions: {
        css: {
          silenceDeprecations: ['legacy-js-api'],
          api: 'modern',
        },
      },
    },

    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
        ignoreTryCatch: false,
      },
      esbuild: {
        pure: ['console.log', 'debugger'],
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vueCore: ['vue'],
            pinia: ['pinia'],
            vueRouter: ['vue-router'],
            naiveUi: ['naive-ui'],
            dateUtils: ['dayjs', 'date-fns'],
            generalUtils: ['axios'],
            query: ['@tanstack/vue-query'],
            i18n: ['vue-i18n'],
            devTools:
              mode === 'development' ? ['vite-plugin-vue-devtools'] : [],
          },
        },
      },
    },

    preview: {
      port: env.VITE_DEV_PORT || null,
    },
  }
})
