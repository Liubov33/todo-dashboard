import React from 'react';
import Header from '../../components/Header';
import TaskList from '../../components/TaskList';
import Chart from '../../components/Chart';
import NewListPanel from '../../components/NewListPanel';
import useLocalStorage from '../../hooks/useLocalStorage';
import './styles.scss';

const LOCAL_STORAGE_KEY = 'tasks';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage(LOCAL_STORAGE_KEY, []);

  const handleAddTasks = (lines: string[]) => {
    const groupId = Date.now().toString();
    const newTasks = lines.map((line, index) => ({
      id: `${groupId}-${index}`,
      groupId,
      content: line,
      completed: false,
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

  return (
    <div className="dashboard">
      <Header />
      <div className="dasboard-content">
        <NewListPanel onAddList={handleAddTasks} />
        <TaskList
          tasks={tasks}
          onToggle={handleToggleTask}
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
