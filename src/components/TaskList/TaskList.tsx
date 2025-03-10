import React from 'react';
import { Task } from '../../interfaces/interfaces';
import TaskGroupItem from './../TaskGroupItem';
import './styles.scss';

interface TaskListProps {
  tasks: Task[];
  onToggle: (taskId: string) => void;
  onUpdateTags: (tagId: string, tag: string) => void;
  onDeleteTask: (taskId: string) => void;
  onDeleteGroup: (groupId: string) => void;
  onUpdateContent: (taskId: string, newContent: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggle,
  onUpdateTags,
  onDeleteTask,
  onDeleteGroup,
  onUpdateContent,
}) => {
  const groupedTasks = tasks.reduce(
    (groups, task) => {
      if (!groups[task.groupId]) groups[task.groupId] = [];
      groups[task.groupId].push(task);
      return groups;
    },
    {} as { [key: string]: Task[] },
  );

  console.log('grouped', groupedTasks);

  return (
    <div className="task-list">
      {Object.values(groupedTasks).map((group) => (
        <TaskGroupItem
          key={group[0].groupId}
          group={group}
          onToggle={onToggle}
          onUpdateTags={onUpdateTags}
          onDeleteTask={onDeleteTask}
          onDeleteGroup={onDeleteGroup}
          onUpdateContent={onUpdateContent}
        />
      ))}
    </div>
  );
};

export default TaskList;
