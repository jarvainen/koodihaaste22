/* eslint-disable @typescript-eslint/no-empty-function */
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { setup, $fetch, fetch } from '@nuxt/test-utils-edge'
import { MockServer } from '~/test/mockBackend'

describe('server api', async () => {
  await setup({
    server: true
  })

  const mockServer = new MockServer()

  beforeAll(() => mockServer.startServer(8080))

  afterAll(() => mockServer.closeServer())

  describe('get restaurants', () => {
    it('should return 200', async () => {
      mockServer.mockStatus = 200
      mockServer.mockResponse = {}
      expect(await $fetch('/api/restaurants?city=tampere')).toEqual({})
    })

    it('should have Set-Header headers', async () => {
      const headerValue = 'VOTERID=123 Secure Path=/'
      mockServer.mockHeaders = { 'Set-Cookie': headerValue }
      const { headers } = await fetch('/api/restaurants?city=tampere')
      expect(headers.get('set-cookie')).toBe(headerValue)
    })

    it('should propagate request headers to backend', async () => {
      try {
        const testHeader = { cookie: 'TEST=COOKIE' }
        mockServer.responseHandler = ({ req }) => {
          expect(req.headers).toContain(testHeader)
        }
        await fetch('/api/restaurants?city=tampere', { headers: testHeader })
      } finally {
        mockServer.responseHandler = () => {}
      }
    })

    it('should return 400', async () => {
      mockServer.mockStatus = 400

      try {
        await $fetch('/api/restaurants?city=tampere')
      } catch (e) {
        expect(e.name).toBe('FetchError')
        expect(e.data.statusCode).toBe(400)
      }
      expect.assertions(2)
    })
  })

  describe('get results', () => {
    it('should return 200', async () => {
      mockServer.mockStatus = 200
      mockServer.mockResponse = {}
      expect(await $fetch('/api/results')).toEqual({})
    })

    it('should return 400', async () => {
      mockServer.mockStatus = 400

      try {
        await $fetch('/api/results')
      } catch (e) {
        expect(e.name).toBe('FetchError')
        expect(e.data.statusCode).toBe(400)
      }
      expect.assertions(2)
    })
  })

  describe('post vote', () => {
    const headers = {
      Cookie: 'VOTERID=123'
    }

    it('should fail without cookie header', async () => {
      mockServer.mockStatus = 200
      mockServer.mockResponse = {}
      try {
        await $fetch('/api/vote', { method: 'post' })
      } catch (e) {
        expect(e.name).toBe('FetchError')
        expect(e.data.statusCode).toBe(400)
      }
      expect.assertions(2)
    })

    it('should return 200', async () => {
      mockServer.mockStatus = 200
      mockServer.mockResponse = {}
      expect(await $fetch('/api/vote', { method: 'post', headers })).toEqual({})
    })

    it('should return 400', async () => {
      mockServer.mockStatus = 400
      mockServer.mockResponse = {}
      try {
        await $fetch('/api/vote', { method: 'post', headers })
      } catch (e) {
        expect(e.name).toBe('FetchError')
        expect(e.data.statusCode).toBe(400)
      }
      expect.assertions(2)
    })

    it('should sent vote id correctly', async () => {
      try {
        const id = '123'
        mockServer.mockStatus = 200
        mockServer.responseHandler = ({ req }) => {
          expect(req.url).toMatch(id)
        }
        await $fetch(`/api/vote?id=${id}`, { method: 'post', headers })
      } finally {
        mockServer.responseHandler = () => {}
      }
    })
  })
})
