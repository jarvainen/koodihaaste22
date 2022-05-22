import { CompatibilityEvent, createError, sendError } from 'h3'
import { FetchResponse } from 'ohmyfetch'
import httpError from 'http-errors'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchRequestToH3Response (request: Promise<FetchResponse<any>>, event: CompatibilityEvent): Promise<void> {
  try {
    const { headers = [], _data: data, status } = await request
    headers.forEach((value, header) => event.res.setHeader(header, value))
    event.res.statusCode = status
    return data
  } catch (e) {
    if (e.name === 'FetchError') {
      const error = createError({
        statusCode: e.response.status,
        statusMessage: e.response.statusText,
        data: e.data
      })
      return sendError(event, error)
    }

    throw new httpError.InternalServerError()
  }
}
