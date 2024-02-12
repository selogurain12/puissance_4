const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const moment = require('moment');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    }
});

let users = {};
let connectedUsers = 0;

io.on('connection', (socket) => {
  connectedUsers++;
  console.log('Un utilisateur est connecté');

  socket.on('username', (username) => {
    users[socket.id] = { id: socket.id, name: username };
    io.emit('users', Object.values(users));
  });

  socket.on('message', (msg) => {
    console.log('Message reçu:', msg);
    io.emit('message', msg);
  });

  socket.on('send', message => {
    const user = users[socket.id];
    if (user) {
      io.emit('message', { user: user, text: message, date: moment().toISOString() });
    }
  });

  socket.on('move', (move) => {
    console.log('Grille reçu:', move);
    io.emit('move', move);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
