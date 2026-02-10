import React from 'react';
import type { MessageListProps } from '../../interface/foundation';
import './ChatArea.css';

export const ChatArea: React.FC<MessageListProps> = ({
  messages,
  isLoading = false,
  onLoadMore,
}) => {
  const handleLoadMore = React.useCallback(() => {
    if (onLoadMore && !isLoading) {
      onLoadMore();
    }
  }, [onLoadMore, isLoading]);

  return (
    <div className="chat-area">
      {isLoading && (
        <div className="loading-indicator">
          <span className="spinner"></span>
          Loading messages...
        </div>
      )}

      {messages.length === 0 && !isLoading && (
        <div className="empty-state">
          <span className="empty-icon">💬</span>
          <p>No messages yet. Start the conversation!</p>
        </div>
      )}

      <button
        className="load-more-btn"
        onClick={handleLoadMore}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Load More Messages'}
      </button>

      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className="message-group">
            <div className="message">
              <img
                src={message.author.avatar}
                alt={message.author.username}
                className="message-avatar"
              />

              <div className="message-content">
                <div className="message-header">
                  <span className="message-author">{message.author.username}</span>
                  <span className="message-timestamp">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                  {message.edited && (
                    <span className="message-edited">(edited)</span>
                  )}
                </div>

                <div className="message-text">{message.content}</div>

                {message.attachments && message.attachments.length > 0 && (
                  <div className="message-attachments">
                    {message.attachments.map((attachment) => (
                      <div key={attachment.id} className="attachment">
                        <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                          📎 {attachment.name}
                        </a>
                      </div>
                    ))}
                  </div>
                )}

                {message.reactions && message.reactions.length > 0 && (
                  <div className="message-reactions">
                    {message.reactions.map((reaction, idx) => (
                      <button
                        key={idx}
                        className={`reaction ${reaction.userReacted ? 'reacted' : ''}`}
                      >
                        {reaction.emoji} {reaction.count > 1 && reaction.count}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatArea;
