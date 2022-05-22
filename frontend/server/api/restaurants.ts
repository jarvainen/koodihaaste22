import { fetchRequestToH3Response } from '~/helpers/fetchRequestToH3Response'

export default defineEventHandler((event) => {
  const { baseUrl } = useRuntimeConfig()
  const { city = '' } = useQuery(event)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { headers }: { headers: Headers } = event.req
  const request = $fetch.raw(`${baseUrl}/api/v1/restaurants/${city}`, { headers })
  return fetchRequestToH3Response(request, event)
})
