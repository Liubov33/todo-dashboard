export interface Task {
  id: string;
  groupId: string;
  groupColor: string;
  content: string;
  completed: boolean;
}
export interface TaskGroup {
  groupId: string;
  tasks: Task[];
}
