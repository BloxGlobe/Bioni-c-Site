import React from 'react';
import type { User } from '../types';

interface MemberListProps {
  members: User[];
  isLoading: boolean;
}

const MemberList: React.FC<MemberListProps> = ({ members, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-64 bg-gray-800 border-l border-gray-700 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading members...</div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-gray-800 border-l border-gray-700 flex flex-col">
      {/* Header */}
      <div className="h-12 border-b border-gray-700 flex items-center px-4">
        <h3 className="font-bold text-white text-sm">Members • {members.length}</h3>
      </div>

      {/* Members List */}
      <div className="overflow-y-auto flex-1">
        {members.length === 0 ? (
          <div className="p-4 text-gray-400 text-sm text-center">No members</div>
        ) : (
          members.map((member) => (
            <div
              key={member.id}
              className="px-4 py-3 hover:bg-gray-700 transition-colors cursor-pointer flex items-center space-x-3"
            >
              <div className="relative shrink-0">
                <img
                  src={member.avatar || 'https://via.placeholder.com/32'}
                  alt={member.username}
                  className="w-8 h-8 rounded-full"
                />
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
                    member.status === 'online'
                      ? 'bg-green-500'
                      : member.status === 'idle'
                        ? 'bg-yellow-500'
                        : 'bg-gray-500'
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {member.username}
                </p>
                <p className="text-xs text-gray-400 capitalize">{member.status}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MemberList;
