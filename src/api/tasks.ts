import type { Inputs } from "../components/ToDoForm";

export type ApiTask = Omit<Inputs, "date" | "image"> & {
  id: string;
  date: string;
  imageUrl: string | null;
  done: boolean;
  createdAt: string;
  updatedAt: string;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, { headers: { "Content-Type": "application/json", ...options?.headers }, ...options });
  if (!response.ok) {
    const body = await response.json().catch(() => ({ message: "Request failed." }));
    throw new Error(body.message ?? "Request failed.");
  }
  return response.status === 204 ? undefined as T : response.json() as Promise<T>;
}

export const tasksApi = {
  list: () => request<ApiTask[]>("/api/tasks"),
  create: (task: Omit<ApiTask, "id" | "createdAt" | "updatedAt">) => request<ApiTask>("/api/tasks", { method: "POST", body: JSON.stringify(task) }),
  update: (task: ApiTask) => request<ApiTask>(`/api/tasks/${task.id}`, { method: "PATCH", body: JSON.stringify(task) }),
  remove: (id: string) => request<void>(`/api/tasks/${id}`, { method: "DELETE" }),
};

export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("image", file);
  const response = await fetch("/api/uploads", { method: "POST", body: form });
  if (!response.ok) {
    const body = await response.json().catch(() => ({ message: "Image upload failed." }));
    throw new Error(body.message ?? "Image upload failed.");
  }
  const result = await response.json() as { imageUrl: string };
  return result.imageUrl;
}
