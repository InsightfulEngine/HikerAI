import React, { useState } from "react";

function Chatbot({ messages, onSendMessage }) {
  const [inputMessage, setInputMessage] = useState("");

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      onSendMessage(inputMessage.trim());
      setInputMessage("");
    }
  };

  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.isUser ? "user-message" : "bot-message"}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={handleInputChange}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
