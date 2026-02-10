import React, { useState, useMemo } from 'react';
import Sidebar from './foundation/components/Sidebar';
import Header from './foundation/components/Header';
import ChatArea from './foundation/components/ChatArea';
import ChatInput from './foundation/components/ChatInput';
import MemberList from './foundation/components/MemberList';
import { useChat } from './foundation/hooks';
import type {
  Server,
  Channel,
  Category,
  SidebarUser,
} from './foundation/interface/sidebar';
import type { User } from './foundation/interface/foundation';
import './DashboardLayout.css';

const DashboardLayout: React.FC = () => {
  // Sample data - replace with actual API calls
  const [servers] = useState<Server[]>([
    {
      id: '1',
      name: 'Main Server',
      icon: 'https://via.placeholder.com/50',
      isActive: true,
    },
    {
      id: '2',
      name: 'Dev Server',
      icon: 'https://via.placeholder.com/50',
      isActive: false,
    },
  ]);

  const [categories] = useState<Category[]>([
    {
      id: 'cat-1',
      name: 'General',
      channels: [
        {
          id: 'ch-1',
          name: 'general',
          type: 'text',
          isActive: true,
          unreadCount: 0,
        },
        {
          id: 'ch-2',
          name: 'announcements',
          type: 'text',
          isActive: false,
          unreadCount: 2,
        },
      ],
      isCollapsed: false,
    },
    {
      id: 'cat-2',
      name: 'Voice',
      channels: [
        {
          id: 'ch-3',
          name: 'General Voice',
          type: 'voice',
          isActive: false,
          unreadCount: 0,
        },
      ],
      isCollapsed: false,
    },
  ]);

  const [members] = useState<User[]>([
    {
      id: '1',
      username: 'JohnDoe',
      avatar: 'https://via.placeholder.com/32',
      status: 'online',
    },
    {
      id: '2',
      username: 'JaneSmith',
      avatar: 'https://via.placeholder.com/32',
      status: 'idle',
    },
    {
      id: '3',
      username: 'BobJohnson',
      avatar: 'https://via.placeholder.com/32',
      status: 'offline',
    },
  ]);

  const [currentUser] = useState<SidebarUser>({
    id: 'current',
    username: 'CurrentUser',
    avatar: 'https://via.placeholder.com/32',
    status: 'online',
  });

  const initialChannel = useMemo<Channel | null>(() => {
    const firstCategory = categories && categories.length > 0 ? categories[0] : null;
    const firstChannel = firstCategory?.channels && firstCategory.channels.length > 0
      ? firstCategory.channels[0]
      : null;
    return firstChannel || null;
  }, [categories]);

  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(initialChannel);

  const { messages, isLoading, sendMessage } = useChat();

  const handleSendMessage = async (content: string) => {
    await sendMessage(content);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        servers={servers}
        categories={categories}
        onServerSelect={(serverId) => console.log('Server selected:', serverId)}
        onChannelSelect={(channelId) => {
          if (categories && categories.length > 0) {
            const channel = categories
              .flatMap((cat) => cat.channels)
              .find((ch) => ch.id === channelId);
            setSelectedChannel(channel || null);
          }
        }}
        onToggleCategory={(categoryId) => console.log('Toggle category:', categoryId)}
        user={currentUser}
        isDarkMode={true}
      />

      <div className="main-content">
        <Header
          channelName={selectedChannel?.name || 'general'}
          channelDescription={`Welcome to ${selectedChannel?.name || 'general'}`}
          memberCount={members.length}
        />

        <div className="content-area">
          <ChatArea
            messages={messages}
            isLoading={isLoading}
            onLoadMore={() => console.log('Load more')}
          />

          <ChatInput
            placeholder={`Message #${selectedChannel?.name || 'general'}`}
            disabled={false}
            onSend={handleSendMessage}
          />
        </div>
      </div>

      <MemberList members={members} onMemberClick={(userId) => console.log('Member clicked:', userId)} />
    </div>
  );
};

export default DashboardLayout;

