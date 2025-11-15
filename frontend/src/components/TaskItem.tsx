
import React from 'react';
import { Task, TaskPriority, TaskStatus } from '../types';

interface TaskItemProps {
  task: Task;
  onUpdateStatus: (id: string, status: TaskStatus) => void;
}

const statusLabels: Record<TaskStatus, string> = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

const statusClasses: Record<TaskStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

const priorityClasses: Record<TaskPriority, string> = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-orange-100 text-orange-700',
  high: 'bg-red-100 text-red-700',
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdateStatus }) => {
  const isOverdue = task.status !== 'completed' && new Date(task.dueDate) < new Date(new Date().toDateString());
  const isDueToday = task.status !== 'completed' && task.dueDate === new Date().toISOString().split('T')[0];

  return (
    <div className={`p-4 rounded-lg border border-gray-100 bg-white shadow-sm transition-all ${isOverdue ? 'ring-1 ring-red-300' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-text-primary">{task.title}</p>
          <p className="text-sm text-text-secondary mt-1">{task.description}</p>
        </div>
        <span className={`text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded-full ${priorityClasses[task.priority]}`}>
          {task.priority} priority
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-text-secondary">
        <div className="space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full font-semibold ${statusClasses[task.status]}`}>
            {statusLabels[task.status]}
          </span>
          <span className={isOverdue ? 'font-semibold text-red-500' : 'font-semibold'}>
            Due: {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          {isDueToday && !isOverdue && <span className="font-bold text-orange-500">Due Today</span>}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor={`status-${task.id}`} className="font-semibold uppercase tracking-wide">
            Status
          </label>
          <select
            id={`status-${task.id}`}
            value={task.status}
            onChange={(event) => onUpdateStatus(task.id, event.target.value as TaskStatus)}
            className="rounded-md border-gray-300 text-xs font-medium focus:border-primary focus:ring-primary"
          >
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;