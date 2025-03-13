import React, { useState } from 'react';
import { Task } from '../../interfaces/interfaces';
import TaskItem from '../TaskItem';
import { ReactComponent as DeleteIcon } from '../../icons/trash.svg';
import { ReactComponent as PaletteIcon } from '../../icons/palette.svg';
import './styles.scss';
import ColorPicker from '../ColorPicker';

interface TaskGroupItemProps {
  group: Task[];
  onToggle: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onDeleteGroup: (groupId: string) => void;
  onUpdateContent: (taskId: string, newContent: string) => void;
  onChangeBackground: (groupId: string, color: string) => void;
}

const TaskGroupItem: React.FC<TaskGroupItemProps> = ({
  group,
  onToggle,
  onDeleteTask,
  onDeleteGroup,
  onUpdateContent,
  onChangeBackground,
}) => {
  const [hovered, setHovered] = useState(false);
  const [showPalette, setShowPalette] = useState(false);

  return (
    <div
      className="task-group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: group[0].groupColor || '#f9f9f9' }}
    >
      <div className="task-group-content">
        {group.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            content={task.content}
            completed={task.completed}
            onToggle={onToggle}
            onDeleteTask={onDeleteTask}
            onUpdateContent={onUpdateContent}
          />
        ))}
      </div>
      {hovered && (
        <div className="group-footer">
          {showPalette && (
            <ColorPicker
              selectedColor={group[0].groupColor}
              onSelectColor={(color) => {
                onChangeBackground(group[0].groupId, color);
                setShowPalette(false);
              }}
            />
          )}
          <PaletteIcon
            className="palette-icon"
            onClick={() => setShowPalette((prev) => !prev)}
          />
          <DeleteIcon
            className="delete-icon"
            onClick={() => onDeleteGroup(group[0].groupId)}
          />
        </div>
      )}
    </div>
  );
};

export default TaskGroupItem;
