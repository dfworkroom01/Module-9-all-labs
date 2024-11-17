import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import './index.css';
import Chat from './components/chat';
import UsersList from './components/usersList';
import TypingIndicator from './components/typingIndicator';

const SOCKET_SERVER_URL = 'http://localhost:5000';  // Backend URL

const App = () => {
  const [socket, setSocket] = useState(null);
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);  // List of users
  const [isTyping, setIsTyping] = useState('');

  // Handle setting the nickname
  const handleSetNickname = () => {
    if (nickname.trim() !== '') {
      socket.emit('setNickname', nickname);  // Emit the nickname to the server
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    socket.emit('typing');  // Emit typing status whenever user types
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (message.trim() !== '') {
      socket.emit('chatMessage', message);  // Send the message
      setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
      setMessage('');
    }
  };

  useEffect(() => {
    const socketInstance = socketIOClient(SOCKET_SERVER_URL);
    setSocket(socketInstance);

    socketInstance.on('chatMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);  // Update messages
    });

    socketInstance.on('userList', (users) => {
      setUsers(users);  // Update the list of users
    });

    socketInstance.on('typing', (typingMessage) => {
      setIsTyping(typingMessage);  // Show typing indicator
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <div className="App">
      {!nickname ? (
        <div>
          <h2>Set your nickname:</h2>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Enter your nickname"
          />
          <button onClick={handleSetNickname}>Set Nickname</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {nickname}!</h2>
          <Chat
            messages={messages}
            message={message}
            handleMessageChange={handleMessageChange}
            handleSendMessage={handleSendMessage}
          />
          <TypingIndicator message={isTyping} />
          <UsersList users={users} />  {/* Render the updated list of users */}
        </div>
      )}
    </div>
  );
};

export default App;
