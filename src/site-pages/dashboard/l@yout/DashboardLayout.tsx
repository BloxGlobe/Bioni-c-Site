import { useState, useMemo, useEffect, useCallback } from 'react';
import Sidebar from './foundation/components/Sidebar';
import Header from './foundation/components/Header';
import ChatArea from './foundation/components/ChatArea';
import ChatInput from './foundation/components/ChatInput';
import MemberList from './foundation/components/MemberList';
import { useChat } from './foundation/hooks';
import apiClient from '../../../lib/api/client';
import type {
  Server,
  Channel,
  Category,
  SidebarUser,
} from './foundation/interface/sidebar';
import type { User } from './foundation/interface/foundation';
import './DashboardLayout.css';

const DashboardLayout = () => {
  // Loading states
  const [isLoadingServers, setIsLoadingServers] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Server & Channel states
  const [servers, setServers] = useState<Server[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [members, setMembers] = useState<User[]>([]);

  // User state
  const [currentUser] = useState<SidebarUser>({
    id: 'current',
    username: 'CurrentUser',
    avatar: 'https://via.placeholder.com/32',
    status: 'online',
  });

  // Selected state
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const initialChannel = useMemo<Channel | null>(() => {
    const firstCategory = categories && categories.length > 0 ? categories[0] : null;
    const firstChannel = firstCategory?.channels && firstCategory.channels.length > 0
      ? firstCategory.channels[0]
      : null;
    return firstChannel || null;
  }, [categories]);

  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(initialChannel);

  const { messages, isLoading: isChatLoading, sendMessage } = useChat();

  // Fetch servers on mount
  useEffect(() => {
    const fetchServers = async () => {
      try {
        setIsLoadingServers(true);
        setError(null);
        const data = await apiClient.dashboard.getServers();
        setServers(data as Server[]);
        if (data && Array.isArray(data) && data.length > 0) {
          setSelectedServer(data[0]);
        }
      } catch (err) {
        console.error('Failed to fetch servers:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch servers');
        // Use fallback data
        const fallbackServers: Server[] = [
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
        ];
        setServers(fallbackServers);
        setSelectedServer(fallbackServers[0]);
      } finally {
        setIsLoadingServers(false);
      }
    };

    fetchServers();
  }, []);

  // Fetch categories when server changes
  useEffect(() => {
    const fetchCategories = async () => {
      if (!selectedServer) return;

      try {
        setIsLoadingCategories(true);
        setError(null);
        const data = await apiClient.dashboard.getCategories(selectedServer.id);
        setCategories(data as Category[]);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        // Use fallback data
        const fallbackCategories: Category[] = [
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
        ];
        setCategories(fallbackCategories);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [selectedServer]);

  // Fetch members when channel changes
  useEffect(() => {
    const fetchMembers = async () => {
      if (!selectedChannel) return;

      try {
        setIsLoadingMembers(true);
        setError(null);
        const data = await apiClient.chat.getUsers(selectedChannel.id);
        setMembers(data as User[]);
      } catch (err) {
        console.error('Failed to fetch members:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch members');
        // Use fallback data
        const fallbackMembers: User[] = [
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
        ];
        setMembers(fallbackMembers);
      } finally {
        setIsLoadingMembers(false);
      }
    };

    fetchMembers();
  }, [selectedChannel]);

  const handleSendMessage = useCallback(async (content: string) => {
    if (!selectedChannel) return;
    try {
      await sendMessage(content);
    } catch (err) {
      console.error('Failed to send message:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message');
    }
  }, [selectedChannel, sendMessage]);

  const handleServerSelect = useCallback((serverId: string) => {
    const server = servers.find((s) => s.id === serverId);
    if (server) {
      setSelectedServer(server);
    }
  }, [servers]);

  const handleChannelSelect = useCallback((channelId: string) => {
    if (categories && categories.length > 0) {
      const channel = categories
        .flatMap((cat: Category) => cat.channels)
        .find((ch: Channel) => ch.id === channelId);
      setSelectedChannel(channel || null);
    }
  }, [categories]);

  if (isLoadingServers) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error && servers.length === 0) {
    return (
      <div className="dashboard-error">
        <p>⚠️ {error}</p>
        <p className="error-hint">Using fallback data</p>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar
        servers={servers}
        categories={categories}
        onServerSelect={handleServerSelect}
        onChannelSelect={handleChannelSelect}
        onToggleCategory={(categoryId: string) => console.log('Toggle category:', categoryId)}
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
          {isLoadingCategories || isLoadingMembers ? (
            <div className="loading-indicator">
              <span className="spinner"></span>
              <p>Loading...</p>
            </div>
          ) : (
            <>
              <ChatArea
                messages={messages}
                isLoading={isChatLoading}
                onLoadMore={() => console.log('Load more')}
              />

              <ChatInput
                placeholder={`Message #${selectedChannel?.name || 'general'}`}
                disabled={false}
                onSend={handleSendMessage}
              />
            </>
          )}
        </div>
      </div>

      <MemberList
        members={members}
        onMemberClick={(userId: string) => console.log('Member clicked:', userId)}
      />
    </div>
  );
};

export default DashboardLayout;

