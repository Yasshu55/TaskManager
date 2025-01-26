export interface TaskItem {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  isCompleted: boolean;
}
