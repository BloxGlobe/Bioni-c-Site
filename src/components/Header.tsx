import React from 'react';
import type { Channel, User } from '../types';

interface HeaderProps {
  channel: Channel | null;
  members: User[];
}

const Header: React.FC<HeaderProps> = ({ channel, members }) => {
  return (
    <div className="h-14 bg-gray-800 border-b border-gray-700 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-white"># {channel?.name || 'Loading...'}</h1>
        {channel?.description && (
          <p className="text-sm text-gray-400">{channel.description}</p>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-400 hover:text-white transition-colors">🔍</button>
        <button className="text-gray-400 hover:text-white transition-colors">👥 {members.length}</button>
        <button className="text-gray-400 hover:text-white transition-colors">⚙️</button>
      </div>
    </div>
  );
};

export default Header;
