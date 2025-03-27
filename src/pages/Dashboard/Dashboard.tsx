import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskList from '../../components/TaskList';
import NewListPanel from '../../components/NewListPanel';
import useLocalStorage from '../../hooks/useLocalStorage';
import './styles.scss';

const LOCAL_STORAGE_KEY = 'tasks';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage(LOCAL_STORAGE_KEY, []);

  const handleAddTasks = (lines: string[]) => {
    const groupId = uuidv4();
    const newTasks = lines.map((line) => ({
      id: uuidv4(),
      groupId,
      content: line,
      completed: false,
      groupColor: '#f9f9f9',
    }));
    setTasks((prev) => [...newTasks, ...prev]);
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

  const handleChangeBackground = (groupId: string, newColor: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.groupId === groupId ? { ...task, groupColor: newColor } : task,
      ),
    );
  };

  return (
    <div className="dashboard">
      <div className="dasboard-content">
        <NewListPanel onAddList={handleAddTasks} />
        <TaskList
          tasks={tasks}
          onToggle={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          onDeleteGroup={handleDeleteGroup}
          onUpdateContent={handleUpdateContent}
          onChangeBackground={handleChangeBackground}
        />
      </div>
    </div>
  );
};

export default Dashboard;
