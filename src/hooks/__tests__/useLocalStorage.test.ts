import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../useLocalStorage';
import { Task } from '../../interfaces/interfaces';

const LOCAL_STORAGE_KEY = 'tasks';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('returns default value if no localStorage value exists', () => {
    const defaultValue: Task[] = [];
    const { result } = renderHook(() =>
      useLocalStorage(LOCAL_STORAGE_KEY, defaultValue),
    );

    expect(result.current[0]).toEqual(defaultValue);
  });

  test('returns stored value from localStorage if present', () => {
    const storedTasks: Task[] = [
      {
        id: '1',
        groupId: 'group-1',
        content: 'Stored task',
        completed: false,
        groupColor: '#fff',
      },
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedTasks));

    const { result } = renderHook(() => useLocalStorage(LOCAL_STORAGE_KEY, []));
    expect(result.current[0]).toEqual(storedTasks);
  });

  test('updates localStorage when value changes', () => {
    const defaultValue: Task[] = [];
    const { result } = renderHook(() =>
      useLocalStorage(LOCAL_STORAGE_KEY, defaultValue),
    );

    const newTask: Task = {
      id: '2',
      groupId: 'group-2',
      content: 'New Task',
      completed: false,
      groupColor: '#000',
    };

    act(() => {
      result.current[1]((prev) => [...prev, newTask]);
    });

    // Retrieve the value from localStorage
    const storedValue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!);
    expect(storedValue).toEqual([newTask]);
  });

  test('updates localStorage when key changes', () => {
    const defaultValue: Task[] = [];
    const { result, rerender } = renderHook(
      ({ key }) => useLocalStorage(key, defaultValue),
      { initialProps: { key: LOCAL_STORAGE_KEY } },
    );

    const newTask: Task = {
      id: '3',
      groupId: 'group-3',
      content: 'Another Task',
      completed: false,
      groupColor: '#123456',
    };

    // Update state using the initial key.
    act(() => {
      result.current[1]((prev) => [...prev, newTask]);
    });

    let storedValue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!);
    expect(storedValue).toEqual([newTask]);

    // Re-render the hook with a new key.
    const NEW_KEY = 'new-tasks';
    rerender({ key: NEW_KEY });

    // Because the state is not re-initialized on key change,
    // we expect the current state to remain [newTask].
    expect(result.current[0]).toEqual([newTask]);

    // And localStorage should now have the updated state stored under the new key.
    const newStoredValue = JSON.parse(localStorage.getItem(NEW_KEY)!);
    expect(newStoredValue).toEqual([newTask]);
  });
});
