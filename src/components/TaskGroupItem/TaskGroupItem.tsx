import React, { useState } from 'react';
import { Task } from '../../interfaces/interfaces';
import TaskItem from '../TaskItem';
import { ReactComponent as DeleteIcon } from '../../icons/trash.svg';
import './styles.scss';

interface TaskGroupItemProps {
  group: Task[];
  onToggle: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onDeleteGroup: (groupId: string) => void;
  onUpdateContent: (taskId: string, newContent: string) => void;
}

const TaskGroupItem: React.FC<TaskGroupItemProps> = ({
  group,
  onToggle,
  onDeleteTask,
  onDeleteGroup,
  onUpdateContent,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="task-group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
