import { request } from './client';
import { PaginatedResponse, Task, TaskPriority, TaskStatus } from '@/types';

export type ListTasksParams = {
  status?: TaskStatus;
  page?: number;
  pageSize?: number;
};

export const fetchTasks = (params: ListTasksParams = {}) => {
  const searchParams = new URLSearchParams();

  if (params.status) {
    searchParams.set('status', params.status);
  }
  if (params.page) {
    searchParams.set('page', String(params.page));
  }
  if (params.pageSize) {
    searchParams.set('pageSize', String(params.pageSize));
  }

  const query = searchParams.toString();
  const path = query ? `/tasks?${query}` : '/tasks';
  return request<PaginatedResponse<Task>>(path);
};

export const createTask = (payload: {
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
}) =>
  request<Task>('/tasks', {
    method: 'POST',
    body: payload,
  });

export const updateTaskStatus = (id: string, status: TaskStatus) =>
  request<Task>(`/tasks/${id}/status`, {
    method: 'PATCH',
    body: { status },
  });
