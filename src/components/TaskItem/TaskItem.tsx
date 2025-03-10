import React, { useState } from 'react';
// import Tags from '../Tags';
import { ReactComponent as DeleteIcon } from '../../icons/cross.svg';
import './styles.scss';

interface TaskItemProps {
  id: string;
  content: string;
  completed: boolean;
  tags: string[];
  onToggle: (id: string) => void;
  onUpdateTags: (id: string, tag: string) => void;
  onUpdateContent: (id: string, newContent: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  content,
  completed,
  tags,
  onToggle,
  // onUpdateTags,
  onUpdateContent,
  onDeleteTask,
}) => {
  const [hovered, setHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);

  const handleTaskClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    onUpdateContent(id, editValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onUpdateContent(id, editValue);
      setIsEditing(false);
    }
  };

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
        {!isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <div
            className={`${completed ? 'task-item-text completed' : 'task-item-text'}`}
            onClick={handleTaskClick}
          >
            {content}
          </div>
        )}
        {hovered && !isEditing && (
          <DeleteIcon
            className="delete-icon"
            onClick={() => onDeleteTask(id)}
          />
        )}
      </div>
      {/*{hovered && (*/}
      {/*  <Tags*/}
      {/*    selectedTags={tags}*/}
      {/*    onTagChange={(tag) => onUpdateTags(id, tag)}*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  );
};

export default TaskItem;
