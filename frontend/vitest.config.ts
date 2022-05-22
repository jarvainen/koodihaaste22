import { defineConfig } from 'vitest/config'
import { isWindows } from 'std-env'

export default defineConfig({
  resolve: {
    alias: {
      '~': __dirname
    }
  },
  esbuild: {
    tsconfigRaw: '{}'
  },
  test: {
    testTimeout: isWindows ? 60000 : 10000,
    deps: {
      inline: [/@nuxt\/test-utils-edge/]
    }
  }
})
