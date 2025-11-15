import { Router } from 'express';
import {
  createTaskHandler,
  listTasksHandler,
  updateTaskStatusHandler,
} from './task.controller.js';

export const taskRouter = Router();

taskRouter.get('/', listTasksHandler);
taskRouter.post('/', createTaskHandler);
taskRouter.patch('/:id/status', updateTaskStatusHandler);
