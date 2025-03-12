import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as DeleteIcon } from '../../icons/cross.svg';
import './styles.scss';

interface TaskItemProps {
  id: string;
  content: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onUpdateContent: (id: string, newContent: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  content,
  completed,
  onToggle,
  onUpdateContent,
  onDeleteTask,
}) => {
  const [hovered, setHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue] = useState(content);
  const editableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing && editableRef.current) {
      editableRef.current.focus();
    }
  }, [isEditing]);

  const handleTaskClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    onUpdateContent(id, editValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
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
        {isEditing ? (
          <div
            className="task-item-editable-text"
            ref={editableRef}
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          >
            {editValue}
          </div>
        ) : (
          <div
            className={`${completed ? 'task-item-text completed' : 'task-item-text'}`}
            onClick={handleTaskClick}
          >
            {content}
          </div>
        )}
        {hovered && (
          <DeleteIcon
            className="delete-icon"
            onClick={() => onDeleteTask(id)}
          />
        )}
      </div>
    </div>
  );
};

export default TaskItem;
