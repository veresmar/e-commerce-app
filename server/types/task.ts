export const priorities = ["low", "medium", "high"] as const;
export const categories = ["work", "personal", "home"] as const;
export type Priority = (typeof priorities)[number];
export type Category = (typeof categories)[number];

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  category: Category;
  date: string;
  imageUrl: string | null;
  done: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TaskInput = Omit<Task, "id" | "createdAt" | "updatedAt">;
