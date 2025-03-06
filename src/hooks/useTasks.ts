// src/hooks/useTasks.ts
import { useState, useEffect } from 'react';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Fake data initialization, replace with real API calls if needed
    setTasks([
      { id: 1, title: 'Design wireframes', completed: false },
      { id: 2, title: 'Implement authentication', completed: true },
      { id: 3, title: 'Create API endpoints', completed: false },
    ]);
  }, []);

  return { tasks };
};

export default useTasks;
