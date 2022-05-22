import { fetchRequestToH3Response } from '~/helpers/fetchRequestToH3Response'

export default defineEventHandler((event) => {
  const { baseUrl } = useRuntimeConfig()
  const request = $fetch.raw(`${baseUrl}/api/v1/results`)
  return fetchRequestToH3Response(request, event)
})
