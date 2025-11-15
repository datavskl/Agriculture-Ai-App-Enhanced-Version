import { Task } from './task.types.js';

export const tasks: Task[] = [
  {
    id: 'task-1',
    title: 'Irrigation check for Plot B',
    description: 'Inspect drip irrigation lines and adjust schedule due to heat warning.',
    dueDate: '2024-07-02',
    status: 'pending',
    priority: 'high',
  },
  {
    id: 'task-2',
    title: 'Scout for aphids in cotton fields',
    description: 'Walk the northern section and note infestation levels.',
    dueDate: '2024-07-03',
    status: 'in-progress',
    priority: 'medium',
  },
  {
    id: 'task-3',
    title: 'Calibrate soil moisture sensors',
    description: 'Recalibrate sensors in Plots A and C before the next rain event.',
    dueDate: '2024-07-05',
    status: 'pending',
    priority: 'medium',
  },
];
