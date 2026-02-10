import React from 'react';
import type { MemberListProps } from '../../interface/foundation';
import './MemberList.css';

export const MemberList: React.FC<MemberListProps> = ({
  members,
  onMemberClick,
}) => {
  if (members.length === 0) {
    return (
      <aside className="member-list">
        <div className="member-list-header">
          <h3>Members</h3>
        </div>
        <div className="no-members">
          <p>No members to display</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="member-list">
      <div className="member-list-header">
        <h3>Members ({members.length})</h3>
      </div>

      <div className="members-container">
        {members.map((member) => (
          <div
            key={member.id}
            className="member-item"
            onClick={() => onMemberClick?.(member.id)}
          >
            <div className="member-avatar-container">
              <img
                src={member.avatar}
                alt={member.username}
                className="member-avatar"
              />
              <span className={`status-indicator ${member.status}`}></span>
            </div>

            <div className="member-info">
              <span className="member-name">{member.username}</span>
              <span className="member-status">{member.status}</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default MemberList;
