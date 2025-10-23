
import React from 'react';
import { Task } from '../types';
import TrashIcon from './icons/TrashIcon';
import FireIcon from './icons/FireIcon';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  const isOverdue = !task.completed && new Date(task.dueDate) < new Date(new Date().toDateString());
  const todayStr = new Date().toISOString().split('T')[0];
  const isDueToday = !task.completed && task.dueDate === todayStr;

  const categoryColors: { [key: string]: string } = {
    'Planting': 'bg-green-100 text-green-800',
    'Irrigation': 'bg-blue-100 text-blue-800',
    'Harvesting': 'bg-yellow-100 text-yellow-800',
    'Pest Control': 'bg-red-100 text-red-800',
    'Maintenance': 'bg-purple-100 text-purple-800',
    'General': 'bg-gray-100 text-gray-800',
  };

  return (
    <div className={`flex items-center p-3 rounded-lg transition-colors ${task.completed ? 'bg-gray-50 opacity-70' : 'bg-white shadow-sm'} ${task.isHighPriority && !task.completed ? 'border-l-4 border-red-500' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
      />
      <div className="ml-4 flex-grow">
        <div className="flex items-center">
            {task.isHighPriority && !task.completed && <FireIcon className="h-5 w-5 mr-2 text-red-500" />}
            <p className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-text-primary'}`}>
            {task.title}
            </p>
        </div>
        <div className="flex items-center text-xs mt-1 space-x-2">
            <span className={`px-2 py-0.5 rounded-full font-semibold ${categoryColors[task.category] || categoryColors['General']}`}>
                {task.category}
            </span>
             <span className={`font-semibold ${isOverdue ? 'text-red-500' : 'text-text-secondary'}`}>
                Due: {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric'})}
            </span>
            {isDueToday && !isOverdue && <span className="font-bold text-orange-500 animate-pulse">Due Today!</span>}
        </div>
      </div>
      <button 
        onClick={() => onDelete(task.id)} 
        className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
        aria-label={`Delete task: ${task.title}`}
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default TaskItem;