import { useState, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatArea from '../components/ChatArea';
import ChatInput from '../components/ChatInput';
import MemberList from '../components/MemberList';
import type { Server, Channel, Category, Message } from '../types/chat';
import type { User } from '../types/user';

// Sample data - created outside component to avoid re-initialization
const SAMPLE_SERVERS: Server[] = [
  { id: '1', name: 'Main' },
  { id: '2', name: 'Work' },
];

const SAMPLE_CATEGORIES: Category[] = [
  {
    id: 'cat1',
    name: 'General',
    serverId: '1',
    channels: [
      { id: 'ch1', name: 'general', categoryId: 'cat1' },
      { id: 'ch2', name: 'announcements', categoryId: 'cat1' },
    ],
  },
];

const SAMPLE_MEMBERS: User[] = [
  {
    id: 'user1',
    username: 'Alice',
    status: 'online',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
  },
  {
    id: 'user2',
    username: 'Bob',
    status: 'online',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
  },
  {
    id: 'user3',
    username: 'Charlie',
    status: 'idle',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
  },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    channelId: 'ch1',
    authorId: 'user1',
    authorName: 'Alice',
    content: 'Hey everyone! 👋',
    timestamp: '2024-02-10T10:00:00Z',
  },
  {
    id: '2',
    channelId: 'ch1',
    authorId: 'user2',
    authorName: 'Bob',
    content: 'Hi Alice! How are you?',
    timestamp: '2024-02-10T10:30:00Z',
  },
];

const CURRENT_USER: User = {
  id: 'current',
  username: 'You',
  status: 'online',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
};

const Dashboard = () => {
  // State Management
  const servers = useMemo(() => SAMPLE_SERVERS, []);
  const categories = useMemo(() => SAMPLE_CATEGORIES, []);
  const members = useMemo(() => SAMPLE_MEMBERS, []);
  const currentUser = useMemo(() => CURRENT_USER, []);

  const [selectedServer, setSelectedServer] = useState<Server | null>(() => servers[0] || null);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(() => {
    const firstChannel = categories[0]?.channels?.[0];
    return firstChannel || null;
  });
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  // Handle send message
  const handleSendMessage = (content: string) => {
    if (!selectedChannel) return;

    setIsLoadingChat(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: String(messages.length + 1),
        channelId: selectedChannel.id,
        authorId: currentUser.id,
        authorName: currentUser.username,
        avatar: currentUser.avatar || 'https://via.placeholder.com/32',
        content,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
      setIsLoadingChat(false);
    }, 300);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar
        servers={servers}
        categories={categories}
        selectedServer={selectedServer}
        selectedChannel={selectedChannel}
        currentUser={currentUser}
        onSelectServer={setSelectedServer}
        onSelectChannel={setSelectedChannel}
      />

      {/* Main Chat Area */}
      {selectedServer && selectedChannel ? (
        <div className="flex-1 flex flex-col">
          <Header
            channel={selectedChannel}
            members={members}
          />
          <ChatArea
            messages={messages.filter((m) => m.channelId === selectedChannel.id)}
            isLoading={isLoadingChat}
            currentUserId={currentUser.id}
          />
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoadingChat}
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <p>Select a server to get started</p>
          </div>
        </div>
      )}

      {/* Member List */}
      <MemberList
        members={members}
        isLoading={false}
      />
    </div>
  );
};

export default Dashboard;
