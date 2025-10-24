import { useState } from "react";
import type { User } from "../types/user";

interface TreeNodeProps {
  user: User;
}

function TreeNode({ user }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(user.isOpen ?? false);
  const hasChildren = user.children && user.children.length > 0;
  const initial = user.firstName[0] + user.lastName[0];

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div
        className="user-tree-node"
        style={{
          cursor: hasChildren ? "pointer" : "default",
        }}
        onClick={hasChildren ? toggleExpand : undefined}
      >
        <span className="tree-node-icon">{hasChildren ? "+" : "-"}</span>

        {user.photo ? (
          <img
            src={user.photo}
            alt={`${user.firstName} ${user.lastName}'s profile picture`}
            className="profile-pic"
          />
        ) : (
          <div className="profile-pic">{initial}</div>
        )}

        <div>
          {user.firstName} {user.lastName} {user.email}
        </div>
      </div>

      {isExpanded && hasChildren && (
        <div className="child-tree-node">
          {user.children!.map((child) => (
            <TreeNode key={child.id} user={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TreeNode;
