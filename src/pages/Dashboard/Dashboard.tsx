import React, { useState } from 'react';
import Header from '../../components/Header';
import TaskList from '../../components/TaskList';
import Chart from '../../components/Chart';
import NewListPanel from '../../components/NewListPanel';
import { TaskGroup } from '../../interfaces/interfaces';

const Dashboard: React.FC = () => {
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([]);

  const handleAddGroup = (lines: string[]) => {
    const groupId = Date.now().toString();
    const newGroup: TaskGroup = {
      groupId,
      tasks: lines.map((line, index) => ({
        id: `${groupId}-${index}`,
        content: line,
        completed: false,
        tags: [],
      })),
    };
    setTaskGroups((prev) => [...prev, newGroup]);
  };

  const handleToggleTask = (taskId: string) => {
    setTaskGroups((prev) =>
      prev.map((group) => ({
        ...group,
        tasks: group.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task,
        ),
      })),
    );
  };

  const handleUpdateTags = (taskId: string, tag: string) => {
    setTaskGroups((prev) =>
      prev.map((group) => ({
        ...group,
        tasks: group.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                tags: task.tags.includes(tag)
                  ? task.tags.filter((t) => t !== tag)
                  : [...task.tags, tag],
              }
            : task,
        ),
      })),
    );
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="dasboard-content">
        <NewListPanel onAddList={handleAddGroup} />
        <TaskList
          groups={taskGroups}
          onToggle={handleToggleTask}
          onUpdateTags={handleUpdateTags}
        />
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
