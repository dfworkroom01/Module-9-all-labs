const User = require('../models/user');

let users = []; // Store connected users

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle nickname setting
    socket.on('setNickname', (nickname) => {
      const user = { id: socket.id, nickname };
      users.push(user);
      io.emit('userList', users); // Broadcast updated user list to all clients
      socket.emit('chatMessage', `${nickname} has joined the chat`); // Send to the new user
    });

    // Handle receiving a chat message
    socket.on('chatMessage', (msg) => {
      const user = users.find(u => u.id === socket.id);
      if (user) {
        socket.broadcast.emit('chatMessage', `${user.nickname}: ${msg}`);
      }
    });

    // Handle typing indicator
    socket.on('typing', () => {
      const user = users.find(u => u.id === socket.id);
      if (user) {
        socket.broadcast.emit('typing', `${user.nickname} is typing...`);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      users = users.filter(u => u.id !== socket.id); // Remove user from array
      io.emit('userList', users); // Broadcast updated user list
      const user = users.find(u => u.id === socket.id);
      if (user) {
        io.emit('chatMessage', `${user.nickname} has left the chat`);
      }
    });
  });
};
