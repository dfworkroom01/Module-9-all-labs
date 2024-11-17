const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let users = [];  // Track connected users

io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id);

  // Default nickname, can be set dynamically
  let nickname = 'James'; 'Diane';  // You can set this as 'Diane' for another user

  // Add new user to the users list
  users.push({ id: socket.id, nickname });

  // Emit the updated user list to everyone
  io.emit('userList', users.map(user => user.nickname));

  // Notify everyone when a new user joins
  io.emit('chatMessage', `${nickname} has joined the chat`);

  // Handle nickname change
  socket.on('setNickname', (newNickname) => {
    nickname = newNickname.trim() !== '' ? newNickname : 'James'; // Set default to James
    users = users.map(user => user.id === socket.id ? { ...user, nickname } : user);
    io.emit('userList', users.map(user => user.nickname)); // Emit the updated list to everyone
    socket.emit('chatMessage', `You are now known as ${nickname}`);
  });

  // Handle chat message
  socket.on('chatMessage', (message) => {
    const userMessage = `${nickname}: ${message}`;
    socket.broadcast.emit('chatMessage', userMessage); // Broadcast to others
    socket.emit('chatMessage', userMessage); // Send to the sender too
  });

  // Handle typing indicator
  socket.on('typing', () => {
    const typingMessage = `${nickname} is typing...`;
    socket.broadcast.emit('typing', typingMessage); // Notify others that this user is typing
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected: ' + socket.id);
    users = users.filter(user => user.id !== socket.id); // Remove user from the list
    io.emit('userList', users.map(user => user.nickname)); // Update everyone with the new list
    io.emit('chatMessage', `${nickname} has left the chat`);
  });
});

// Start the server
server.listen(process.env.PORT || 5000, () => {
  console.log('Server running on port 5000');
});
