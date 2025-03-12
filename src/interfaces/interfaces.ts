export interface Task {
  id: string;
  groupId: string;
  content: string;
  completed: boolean;
}
export interface TaskGroup {
  groupId: string;
  tasks: Task[];
}
