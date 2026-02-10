import type { SidebarProps } from '../../interface/sidebar';
import './Sidebar.css';

export const Sidebar = ({
  servers,
  categories,
  onServerSelect,
  onChannelSelect,
  onToggleCategory,
  user,
  isDarkMode = true,
}: SidebarProps) => {
  return (
    <aside className={`sidebar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="sidebar-header">
        <h2>Servers</h2>
      </div>

      <div className="servers-list">
        {servers.map((server) => (
          <div
            key={server.id}
            className={`server-item ${server.isActive ? 'active' : ''}`}
            onClick={() => onServerSelect(server.id)}
            title={server.name}
          >
            <img src={server.icon} alt={server.name} className="server-icon" />
          </div>
        ))}
      </div>

      <div className="channels-section">
        {categories.map((category) => (
          <div key={category.id} className="category">
            <div
              className="category-header"
              onClick={() => onToggleCategory(category.id)}
            >
              <span className={`chevron ${category.isCollapsed ? 'collapsed' : ''}`}>
                ▼
              </span>
              <span className="category-name">{category.name}</span>
            </div>

            {!category.isCollapsed && (
              <div className="channels-list">
                {category.channels.map((channel) => (
                  <div
                    key={channel.id}
                    className={`channel-item ${channel.isActive ? 'active' : ''}`}
                    onClick={() => onChannelSelect(channel.id)}
                  >
                    <span className="channel-icon">
                      {channel.type === 'voice' ? '🔊' : '#'}
                    </span>
                    <span className="channel-name">{channel.name}</span>
                    {channel.unreadCount && channel.unreadCount > 0 && (
                      <span className="unread-badge">{channel.unreadCount}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {user && (
        <div className="sidebar-user">
          <img src={user.avatar} alt={user.username} className="user-avatar" />
          <div className="user-info">
            <span className="username">{user.username}</span>
            <span className={`status ${user.status}`}>{user.status}</span>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
