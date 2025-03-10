import React, { useState } from 'react';
import Header from '../../components/Header';
import TaskList from '../../components/TaskList';
import Chart from '../../components/Chart';
import NewListPanel from '../../components/NewListPanel';
import { Task } from '../../interfaces/interfaces';
import './styles.scss';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTasks = (lines: string[]) => {
    const groupId = Date.now().toString();
    const newTasks = lines.map((line, index) => ({
      id: `${groupId}-${index}`,
      groupId,
      content: line,
      completed: false,
      tags: [],
    }));
    setTasks((prev) => [...prev, ...newTasks]);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleUpdateTags = (taskId: string, tag: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              tags: task.tags.includes(tag)
                ? task.tags.filter((t) => t !== tag)
                : [...task.tags, tag],
            }
          : task,
      ),
    );
  };

  const handleDeleteTask = (taskId: string) =>
    setTasks((prev) => prev.filter((task) => task.id !== taskId));

  const handleDeleteGroup = (groupId: string) =>
    setTasks((prev) => prev.filter((task) => task.groupId !== groupId));

  const handleUpdateContent = (taskId: string, newContent: string) => {
    setTasks((prev) =>
      newContent.trim() === ''
        ? prev.filter((task) => task.id !== taskId)
        : prev.map((task) =>
            task.id === taskId ? { ...task, content: newContent } : task,
          ),
    );
  };

  console.log('tasks', tasks);

  return (
    <div className="dashboard">
      <Header />
      <div className="dasboard-content">
        <NewListPanel onAddList={handleAddTasks} />
        <TaskList
          tasks={tasks}
          onToggle={handleToggleTask}
          onUpdateTags={handleUpdateTags}
          onDeleteTask={handleDeleteTask}
          onDeleteGroup={handleDeleteGroup}
          onUpdateContent={handleUpdateContent}
        />
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
