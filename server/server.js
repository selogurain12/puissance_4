const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    }
});

io.on('connection', (socket) => {

  socket.on('message', (message) => {
    io.emit('message', message);
  });

  socket.on('move', (move) => {
    io.emit('move', move);
  });

  socket.on("winner", (data) => {
    io.emit("winner", data);
  });

  socket.on('updateGridSize', (gridSize) => {
    socket.broadcast.emit('gridSizeUpdated', gridSize);
  });
}); 

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});