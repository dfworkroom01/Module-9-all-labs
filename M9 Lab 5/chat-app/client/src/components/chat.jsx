import React from 'react';

const Chat = ({ messages, message, handleMessageChange, handleSendMessage }) => {
  return (
    <div className="chat-container">
      {/* Display messages */}
      {messages.map((msg, index) => (
        <div key={index} className={`chat-message ${msg.startsWith('You') ? 'you' : 'other'}`}>
          {msg}
        </div>
      ))}

      {/* Message input field */}
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}  // This will trigger `handleMessageChange` passed from `App.js`
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
