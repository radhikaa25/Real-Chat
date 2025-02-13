// config/server.ts

import { createServer } from 'http';
import WebSocket, { WebSocketServer } from 'ws';

export default ({ env }) => {
  const server = createServer();

  // WebSocket server setup
  const wss = new WebSocketServer({ server });

  // Handling WebSocket connections
  wss.on('connection', (ws) => {
    console.log('Client connected');

    // Handle incoming messages
    ws.on('message', (message) => {
      console.log(`Received: ${message}`);
      ws.send(`Echo: ${message}`); // Echo the message back to the client
    });

    // Handle disconnections
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
      keys: env.array('APP_KEYS'),
    },
    server,  // Pass custom server with WebSocket to Strapi
  };
};
