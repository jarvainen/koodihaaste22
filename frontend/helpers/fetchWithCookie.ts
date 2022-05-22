import { useCookie } from '#app'
import { FetchOptions } from 'ohmyfetch'

export async function fetchWithCookie (url: string, cookieName: string, options: FetchOptions = {}): Promise<unknown> {
  /*
    FIXME: Bug in nuxt3-rc3 does not allow multiple useCookie hooks with different cookie options (or allow changing
           encoding options afterwards), now we have to use hack to set up cookie.
   */
  const cookie = useCookie(cookieName, { encode: (value: string): string => value })
  if (process.client) {
    options.credentials = 'include'
  } else if (process.server) {
    if (cookie.value) {
      const cookieHeader = `${cookieName}=${cookie.value}`
      options.headers = { cookie: cookieHeader }
    }
  }

  try {
    const { _data: data, headers } = await $fetch.raw(url, options)

    const setCookieHeader = headers.get('set-cookie')
    if (setCookieHeader) {
      // FIXME: Change to useCookie with parameters got from Set-Cookie header when possible
      cookie.value = setCookieHeader.replace(`${cookieName}=`, '')
    }

    return data
  } catch (e) {
    if (e.name === 'FetchError') {
      return []
    }

    throw e
  }
}
