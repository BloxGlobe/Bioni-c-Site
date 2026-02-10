import React, { useState } from 'react';
import type { Server, Channel, Category } from '../types/chat';

interface SidebarProps {
  servers: Server[];
  categories: Category[];
  selectedServer: Server | null;
  selectedChannel: Channel | null;
  currentUser: { id: string; username: string; avatar?: string; status: string };
  onSelectServer: (server: Server) => void;
  onSelectChannel: (channel: Channel) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  servers,
  categories,
  selectedServer,
  selectedChannel,
  currentUser,
  onSelectServer,
  onSelectChannel,
}) => {
  const [expanded, setExpanded] = useState<string | null>(selectedServer?.id || null);

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Server List (Left) */}
      <div className="w-20 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-3 space-y-2">
        {servers.map((server) => (
          <button
            key={server.id}
            onClick={() => {
              onSelectServer(server);
              setExpanded(expanded === server.id ? null : server.id);
            }}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-all ${
              selectedServer?.id === server.id
                ? 'bg-indigo-600 rounded-xl'
                : 'bg-gray-700 hover:bg-gray-600 rounded-full hover:rounded-xl'
            }`}
            title={server.name}
          >
            {server.name.charAt(0).toUpperCase()}
          </button>
        ))}
        <button className="w-12 h-12 rounded-full bg-gray-700 hover:bg-green-600 flex items-center justify-center text-xl text-white transition-all">
          +
        </button>
      </div>

      {/* Channel List & Categories (Middle) */}
      {selectedServer && (
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          {/* Server Header */}
          <div className="h-12 border-b border-gray-700 flex items-center px-4">
            <h2 className="font-bold text-white flex-1">{selectedServer.name}</h2>
            <button className="text-gray-400 hover:text-white">⋮</button>
          </div>

          {/* Categories & Channels */}
          <div className="overflow-y-auto flex-1">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div key={category.id}>
                  <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase mt-4 flex items-center justify-between">
                    <span>{category.name}</span>
                    <button className="text-gray-400 hover:text-white">+</button>
                  </div>
                  {category.channels?.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => onSelectChannel(channel)}
                      className={`w-full text-left px-4 py-2 text-sm transition-all ${
                        selectedChannel?.id === channel.id
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      <span className="text-gray-400">#</span> {channel.name}
                    </button>
                  ))}
                </div>
              ))
            ) : (
              <div className="p-4 text-gray-400 text-sm">No categories yet</div>
            )}
          </div>

          {/* User Card */}
          <div className="h-14 bg-gray-700 border-t border-gray-700 px-4 flex items-center space-x-3">
            <img
              src={currentUser.avatar || 'https://via.placeholder.com/32'}
              alt={currentUser.username}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{currentUser.username}</p>
              <p className="text-xs text-gray-400">{currentUser.status}</p>
            </div>
            <button className="text-gray-400 hover:text-white">⚙️</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
