/* eslint-disable @typescript-eslint/no-empty-function, no-console */
import http from 'http'

export class MockServer {
  mockResponse: unknown = {}
  mockStatus = 200
  mockHeaders: Record<string, unknown> = {}
  responseHandler: (ServerResponse) => void = () => {}
  requestHandler: (IncomingMessage) => void = () => {}
  defaultHeaders = { 'Content-Type': 'application/json' }
  server: http.Server

  constructor () {
    this.server = http.createServer((req, res) => {
      res.writeHead(this.mockStatus, { ...this.defaultHeaders, ...this.mockHeaders })
      this.requestHandler(req)
      this.responseHandler(res)
      res.write(JSON.stringify(this.mockResponse))
      res.end()
    })
  }

  startServer (port: number) {
    // eslint-disable-next-line require-await
    (async () => {
      this.server.listen(port, () => console.log('Starting mock server'))
    })()
  }

  closeServer () {
    this.server.close()
  }
}
