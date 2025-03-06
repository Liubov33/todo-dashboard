import React from 'react';
import TaskItem from '../TaskItem';
import { TaskGroup } from '../../interfaces/interfaces';
import './styles.scss';

interface TaskListProps {
  groups: TaskGroup[];
  onToggle: (id: string) => void;
  onUpdateTags: (id: string, tag: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  groups,
  onToggle,
  onUpdateTags,
}) => {
  return (
    <div className="task-list">
      {groups.map((group) => (
        <div key={group.groupId} className="task-group">
          {group.tasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              content={task.content}
              completed={task.completed}
              tags={task.tags}
              onToggle={onToggle}
              onUpdateTags={onUpdateTags}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
