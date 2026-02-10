import React, { useState } from 'react';
import type { ChatInputProps } from '../../interface/foundation';
import './ChatInput.css';

export const ChatInput: React.FC<ChatInputProps> = ({
  placeholder = 'Message #general',
  disabled = false,
  onSend,
}) => {
  const [message, setMessage] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSend();
    }
  };

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
    }
  };

  const handleAttach = () => {
    // Placeholder for file attachment functionality
    console.log('Attach file');
  };

  return (
    <div className="chat-input-container">
      <div className="input-wrapper">
        <button
          className="action-btn"
          onClick={handleAttach}
          disabled={disabled}
          title="Attach file"
        >
          +
        </button>

        <textarea
          className="chat-input"
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
        />

        <button
          className="emoji-btn"
          disabled={disabled}
          title="Add emoji"
        >
          😊
        </button>

        <button
          className="send-btn"
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          title="Send message (Ctrl+Enter)"
        >
          ⬆️
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
