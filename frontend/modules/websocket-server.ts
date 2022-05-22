import WebSocket, { WebSocketServer } from 'ws'
import { isDevelopment } from 'std-env'

export default function (_inlineOptions, nuxt) {
  if (isDevelopment) {
    nuxt.hook('listen', (server) => {
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
    })
  }
}
