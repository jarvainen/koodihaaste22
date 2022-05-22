/* eslint-disable no-console */
import '#internal/nitro/virtual/polyfill'
import { Server as HttpServer } from 'http'
import { Server as HttpsServer } from 'https'
import destr from 'destr'
import WebSocket, { WebSocketServer } from 'ws'
import { nitroApp } from '#internal/nitro/app'

const cert = process.env.NITRO_SSL_CERT
const key = process.env.NITRO_SSL_KEY

const server = cert && key ? new HttpsServer({ key, cert }, nitroApp.h3App.nodeHandler) : new HttpServer(nitroApp.h3App.nodeHandler)

const port = (destr(process.env.NITRO_PORT || process.env.PORT) || 3000) as number
const hostname = process.env.NITRO_HOST || process.env.HOST || '0.0.0.0'

const wss = new WebSocketServer({ noServer: true })

wss.on('connection', (ws) => {
  ws.on('message', (data, isBinary) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary })
      }
    })
  })
})

server.on('upgrade', function upgrade (request, socket, head) {
  wss.handleUpgrade(request, socket, head, (client, request) => {
    wss.emit('connection', client, request)
  })
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
server.listen(port, hostname, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  const httpProtocol = cert && key ? 'https' : 'http'
  const wsProtocol = cert && key ? 'wss' : 'ws'
  console.log(`Listening on ${httpProtocol}://${hostname}:${port}${useRuntimeConfig().app.baseURL}`)
  console.log(`Listening on ${wsProtocol}://${hostname}:${port}${useRuntimeConfig().app.baseURL}`)
})

if (process.env.DEBUG) {
  process.on('unhandledRejection', err => console.error('[nitro] [dev] [unhandledRejection]', err))
  process.on('uncaughtException', err => console.error('[nitro] [dev] [uncaughtException]', err))
} else {
  process.on('unhandledRejection', err => console.error('[nitro] [dev] [unhandledRejection] ' + err))
  process.on('uncaughtException', err => console.error('[nitro] [dev] [uncaughtException] ' + err))
}

export default {}
