import { Request, Response } from 'express';
import { createTask, listTasks, updateTaskStatus } from './task.service.js';

export const listTasksHandler = (req: Request, res: Response) => {
  const result = listTasks(req.query);
  return res.json(result);
};

export const createTaskHandler = (req: Request, res: Response) => {
  const task = createTask(req.body);
  return res.status(201).json(task);
};

export const updateTaskStatusHandler = (req: Request, res: Response) => {
  const task = updateTaskStatus(req.params.id, req.body);
  return res.json(task);
};
