// src/websocket.ts

import WebSocket from 'ws';

// Set up WebSocket server
const createWebSocketServer = (server: any) => {
  const wss = new WebSocket.Server({ server });

  // Listen for new connections
  wss.on('connection', (ws) => {
    console.log('New WebSocket client connected');

    // Handle incoming messages
    ws.on('message', (message: string) => {
      console.log(`Received message: ${message}`);
      ws.send(`Echo: ${message}`);  // Echo the message back
    });

    // Handle disconnections
    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });
};

export default createWebSocketServer;
