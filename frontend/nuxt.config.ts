import { defineNuxtConfig } from 'nuxt'
import eslintPlugin from 'vite-plugin-eslint'
import { nodeWs } from './websocket/preset'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  nitro: {
    preset: 'node-ws',
    alias: {
      '#nuxt': __dirname
    },
    presets: {
      'node-ws': nodeWs
    }
  },
  vite: {
    plugins: [
      eslintPlugin()
    ]
  },
  modules: [
    './modules/websocket-server'
  ],
  runtimeConfig: {
    baseUrl: 'http://localhost:8080',
    public: {
      cookieName: 'VOTERID',
      initialCity: 'tampere'
    }
  }
})
