import React, { useState, useEffect } from 'react';
import { Task } from '../interfaces/interfaces';

export default function useLocalStorage(key: string, defaultValue: Task[]) {
  const [value, setValue] = useState<Task[]>(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return defaultValue;
  });

  useEffect(() => {
    if (value === undefined) return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [
    Task[],
    React.Dispatch<React.SetStateAction<Task[]>>,
  ];
}
