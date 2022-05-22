import { useCookie } from 'h3'
import httpError from 'http-errors'
import { fetchRequestToH3Response } from '~/helpers/fetchRequestToH3Response'

export default defineEventHandler((event) => {
  const { baseUrl, public: { cookieName } } = useRuntimeConfig()
  const { id = '' } = useQuery(event)
  const cookie = useCookie(event, cookieName)

  if (!cookie) {
    throw new httpError.BadRequest('Missing cookie')
  }

  const request = $fetch.raw(`${baseUrl}/api/v1/vote/${id}`, {
    method: 'post',
    headers: {
      cookie: `${cookieName}=${cookie}`
    }
  })

  return fetchRequestToH3Response(request, event)
})
