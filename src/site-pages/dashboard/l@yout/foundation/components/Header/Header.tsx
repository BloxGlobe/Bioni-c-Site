import React from 'react';
import type { HeaderProps } from '../../interface/foundation';
import './Header.css';

export const Header: React.FC<HeaderProps> = ({
  channelName,
  channelDescription,
  memberCount,
}) => {
  return (
    <header className="channel-header">
      <div className="header-left">
        <h1 className="channel-title">
          <span className="channel-icon">#</span>
          {channelName}
        </h1>
        {channelDescription && (
          <p className="channel-description">{channelDescription}</p>
        )}
      </div>

      <div className="header-right">
        {memberCount && (
          <div className="member-info">
            <span className="member-icon">👥</span>
            <span className="member-count">{memberCount}</span>
          </div>
        )}
        <button className="header-btn" title="Search">
          🔍
        </button>
        <button className="header-btn" title="Notifications">
          🔔
        </button>
        <button className="header-btn" title="Pin messages">
          📌
        </button>
        <button className="header-btn" title="Member list">
          👤
        </button>
      </div>
    </header>
  );
};

export default Header;
