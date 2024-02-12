const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const moment = require('moment'); // Assurez-vous d'avoir moment.js installé

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    }
});

// Initialisation de l'objet users pour suivre les utilisateurs connectés
let users = {};

io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');

  // Vous pouvez ajouter ici une gestion pour stocker l'utilisateur lors de la connexion
  socket.on('username', (username) => {
    users[socket.id] = { id: socket.id, name: username };
    // Informer tous les clients de la liste mise à jour des utilisateurs
    io.emit('users', Object.values(users));
  });

  socket.on('message', (msg) => {
    console.log('Message reçu:', msg);
    io.emit('message', msg);
  });

  socket.on('send', message => {
    // Assurez-vous que users[socket.id] existe avant de l'utiliser
    const user = users[socket.id];
    if (user) {
      io.emit('message', { user: user, text: message, date: moment().toISOString() });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected: ' + socket.id);
    // Supprimer l'utilisateur de l'objet users
    delete users[socket.id];
    // Informer tous les clients de la liste mise à jour des utilisateurs
    io.emit('users', Object.values(users));
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
