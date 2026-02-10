import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, disabled = false }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 border-t border-gray-700 p-4"
    >
      <div className="flex items-center space-x-4 bg-gray-800 rounded-lg px-4 py-3">
        <button
          type="button"
          className="text-gray-400 hover:text-white transition-colors shrink-0"
          disabled={disabled}
        >
          +
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={disabled || isLoading}
          className="bg-transparent text-white placeholder-gray-500 outline-none flex-1"
        />
        <button
          type="submit"
          disabled={disabled || isLoading || !input.trim()}
          className="text-indigo-500 hover:text-indigo-400 disabled:text-gray-600 transition-colors shrink-0"
        >
          {isLoading ? '⏳' : '➤'}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
