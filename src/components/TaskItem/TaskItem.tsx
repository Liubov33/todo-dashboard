import React, { useState } from 'react';
import Tags from '../Tags';
import './styles.scss';

interface TaskItemProps {
  id: string;
  content: string;
  completed: boolean;
  tags: string[];
  onToggle: (id: string) => void;
  onUpdateTags: (id: string, tag: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  content,
  completed,
  tags,
  onToggle,
  onUpdateTags,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="task-item-wrapper"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="task-item">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
        />
        <div
          className={`${completed ? 'task-item-text completed' : 'task-item-text'}`}
        >
          {content}
        </div>
      </div>
      {hovered && (
        <Tags
          selectedTags={tags}
          onTagChange={(tag) => onUpdateTags(id, tag)}
        />
      )}
    </div>
  );
};

export default TaskItem;
