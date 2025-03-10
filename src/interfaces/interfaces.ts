export interface Task {
  id: string;
  groupId: string;
  content: string;
  completed: boolean;
  tags: string[];
}
export interface TaskGroup {
  groupId: string;
  tasks: Task[];
}

export interface Tag {
  name: string;
}
