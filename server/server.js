// server/index.js
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    }
  });
  

io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');

  socket.on('disconnect', () => {
    console.log('Utilisateur déconnecté');
  });

  socket.on('message', (msg) => {
    console.log('Message reçu:', msg);
    io.emit('message', msg);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
