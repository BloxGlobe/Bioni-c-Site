import React, { useEffect, useRef } from 'react';
import type { Message } from '../types/chat';

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
  currentUserId: string;
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages, isLoading, currentUserId }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isLoading && messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-900">
        <div className="text-gray-400">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-900 p-6 space-y-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          <div className="text-center">
            <p className="text-xl">Welcome! 👋</p>
            <p className="text-sm">No messages yet. Start a conversation!</p>
          </div>
        </div>
      ) : (
        messages.map((message, idx) => {
          const showAuthor =
            idx === 0 || messages[idx - 1].authorId !== message.authorId;

          return (
            <div
              key={message.id}
              className={`flex space-x-4 ${showAuthor ? 'mt-4' : 'mt-0.5'}`}
            >
              {showAuthor && (
                <img
                  src={message.authorAvatar || 'https://via.placeholder.com/40'}
                  alt={message.authorName}
                  className="w-10 h-10 rounded-full shrink-0"
                />
              )}
              {!showAuthor && <div className="w-10 shrink-0" />}
              <div className="flex-1 min-w-0">
                {showAuthor && (
                  <div className="flex items-baseline space-x-2">
                    <span className="font-semibold text-white">
                      {message.authorName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                )}
                <p
                  className={`text-gray-100 break-normal ${
                    currentUserId === message.authorId ? 'text-blue-300' : ''
                  }`}
                >
                  {message.content}
                </p>
              </div>
            </div>
          );
        })
      )}
      <div ref={endRef} />
    </div>
  );
};

export default ChatArea;
