
import React, { useState, useEffect, FormEvent } from 'react';
import { Task, TaskPriority, TaskStatus } from '../types';
import DashboardCard from '../components/DashboardCard';
import ClipboardListIcon from '../components/icons/ClipboardListIcon';
import TaskItem from '../components/TaskItem';
import Loader from '../components/Loader';
import { createTask, fetchTasks, updateTaskStatus } from '../services/api/tasks';

const DEFAULT_PRIORITY: TaskPriority = 'medium';

const TaskManager: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: DEFAULT_PRIORITY as TaskPriority,
    });

    useEffect(() => {
        const loadTasks = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetchTasks({ pageSize: 25 });
                setTasks(response.data);
            } catch (err) {
                console.error('Failed to load tasks', err);
                setError('Unable to load tasks from the backend.');
            } finally {
                setIsLoading(false);
            }
        };

        void loadTasks();
    }, []);

    const handleAddTask = async (e: FormEvent) => {
        e.preventDefault();
        if (!form.title.trim() || !form.dueDate.trim() || !form.description.trim()) {
            alert('Please provide a title, description, and due date for the task.');
            return;
        }

        setIsSubmitting(true);
        setError(null);
        try {
            const newTask = await createTask({
                title: form.title.trim(),
                description: form.description.trim(),
                dueDate: form.dueDate,
                priority: form.priority,
            });
            setTasks(prev => [newTask, ...prev]);
            setForm({ title: '', description: '', dueDate: '', priority: DEFAULT_PRIORITY });
        } catch (err) {
            console.error('Failed to create task', err);
            setError('Creating the task failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStatusChange = async (taskId: string, status: TaskStatus) => {
        setError(null);
        try {
            const updated = await updateTaskStatus(taskId, status);
            setTasks(prev => prev.map(task => (task.id === updated.id ? updated : task)));
        } catch (err) {
            console.error('Failed to update task status', err);
            setError('Updating task status failed. Please retry.');
        }
    };

    const today = new Date().toISOString().split('T')[0];
    const activeTasks = tasks
        .filter(task => task.status !== 'completed')
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    const completedTasks = tasks
        .filter(task => task.status === 'completed')
        .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Task Manager</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <DashboardCard title="Create a Task" icon={<ClipboardListIcon className="w-6 h-6"/>}>
                        <form onSubmit={handleAddTask} className="space-y-4">
                            <div>
                                <label htmlFor="taskTitle" className="block text-sm font-medium text-text-secondary">Task Title</label>
                                <input
                                    id="taskTitle"
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                    placeholder="e.g., Irrigate Plot A"
                                />
                            </div>
                            <div>
                                <label htmlFor="taskDescription" className="block text-sm font-medium text-text-secondary">Description</label>
                                <textarea
                                    id="taskDescription"
                                    value={form.description}
                                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                    placeholder="Provide context or instructions for the task"
                                />
                            </div>
                            <div>
                                <label htmlFor="taskDueDate" className="block text-sm font-medium text-text-secondary">Due Date</label>
                                <input
                                    id="taskDueDate"
                                    type="date"
                                    value={form.dueDate}
                                    onChange={(e) => setForm(prev => ({ ...prev, dueDate: e.target.value }))}
                                    min={today}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="taskPriority" className="block text-sm font-medium text-text-secondary">Priority</label>
                                <select
                                    id="taskPriority"
                                    value={form.priority}
                                    onChange={(e) => setForm(prev => ({ ...prev, priority: e.target.value as TaskPriority }))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-70"
                            >
                                {isSubmitting ? 'Saving...' : 'Add Task'}
                            </button>
                        </form>
                    </DashboardCard>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    {error && (
                        <div className="p-3 text-sm text-red-800 bg-red-100 rounded-md">
                            {error}
                        </div>
                    )}
                    <DashboardCard title="Active Tasks" icon={<ClipboardListIcon className="w-6 h-6"/>}>
                        {isLoading ? (
                            <Loader text="Loading tasks..." />
                        ) : (
                            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                                {activeTasks.length > 0 ? (
                                    activeTasks.map(task => (
                                        <TaskItem key={task.id} task={task} onUpdateStatus={handleStatusChange} />
                                    ))
                                ) : (
                                    <p className="text-center text-text-secondary py-4">No active tasks. Great job staying ahead!</p>
                                )}
                            </div>
                        )}
                    </DashboardCard>
                    <DashboardCard title="Completed Tasks" icon={<ClipboardListIcon className="w-6 h-6"/>}>
                        {isLoading ? (
                            <Loader text="Loading tasks..." />
                        ) : (
                            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                                {completedTasks.length > 0 ? (
                                    completedTasks.map(task => (
                                        <TaskItem key={task.id} task={task} onUpdateStatus={handleStatusChange} />
                                    ))
                                ) : (
                                    <p className="text-center text-text-secondary py-4">No completed tasks yet.</p>
                                )}
                            </div>
                        )}
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
};

export default TaskManager;