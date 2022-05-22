import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const ws = new WebSocket('ws://localhost:3000')
  return {
    provide: {
      ws
    }
  }
})
