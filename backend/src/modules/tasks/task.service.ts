import { randomUUID } from 'crypto';
import { z } from 'zod';
import { tasks } from './task.data.js';
import { Task } from './task.types.js';
import { PaginatedResponse } from '../../shared/types.js';

const listQuerySchema = z.object({
  status: z.enum(['pending', 'in-progress', 'completed']).optional(),
  page: z
    .string()
    .optional()
    .transform((value: string | undefined) => (value ? parseInt(value, 10) : 1))
    .refine((value: number) => value > 0, 'page must be positive'),
  pageSize: z
    .string()
    .optional()
    .transform((value: string | undefined) => (value ? parseInt(value, 10) : 10))
    .refine((value: number) => value > 0 && value <= 50, 'pageSize must be between 1 and 50'),
});

const createTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  dueDate: z
    .string()
    .refine((value: string) => !Number.isNaN(Date.parse(value)), 'dueDate must be a valid ISO date'),
  priority: z.enum(['low', 'medium', 'high']),
});

const updateTaskStatusSchema = z.object({
  status: z.enum(['pending', 'in-progress', 'completed']),
});

export const listTasks = (query: unknown): PaginatedResponse<Task> => {
  const { status, page, pageSize } = listQuerySchema.parse(query);
  const filtered = status ? tasks.filter((task) => task.status === status) : tasks;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    data: filtered.slice(start, end),
    page,
    pageSize,
    total: filtered.length,
  };
};

export const createTask = (body: unknown): Task => {
  const payload = createTaskSchema.parse(body);
  const newTask: Task = {
    id: randomUUID(),
    status: 'pending',
    ...payload,
  };
  tasks.unshift(newTask);
  return newTask;
};

export const updateTaskStatus = (id: string, body: unknown): Task => {
  const payload = updateTaskStatusSchema.parse(body);
  const task = tasks.find((entry) => entry.id === id);
  if (!task) {
    const error = new Error(`Task ${id} not found`);
    (error as { status?: number }).status = 404;
    throw error;
  }
  task.status = payload.status;
  return task;
};
