import { defineNitroPreset } from 'nitropack'

export const nodeWs = defineNitroPreset({
  extends: 'node-server',
  entry: '#nuxt/websocket/entry'
})
