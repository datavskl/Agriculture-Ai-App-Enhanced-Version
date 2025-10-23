
import React, { useState, useEffect, FormEvent } from 'react';
import { Task } from '../types';
import DashboardCard from '../components/DashboardCard';
import ClipboardListIcon from '../components/icons/ClipboardListIcon';
import TaskItem from '../components/TaskItem';

const TaskManager: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskCategory, setNewTaskCategory] = useState('General');
    const [newTaskDueDate, setNewTaskDueDate] = useState('');
    const [newTaskIsHighPriority, setNewTaskIsHighPriority] = useState(false);

    // Load tasks from local storage on initial render
    useEffect(() => {
        const storedTasks = localStorage.getItem('agriSmartTasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    // Save tasks to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('agriSmartTasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = (e: FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim() || !newTaskDueDate) {
            alert('Please provide a title and due date for the task.');
            return;
        }
        const newTask: Task = {
            id: Date.now().toString(),
            title: newTaskTitle.trim(),
            category: newTaskCategory,
            dueDate: newTaskDueDate,
            completed: false,
            isHighPriority: newTaskIsHighPriority,
        };
        setTasks(prevTasks => [newTask, ...prevTasks].sort((a, b) => Number(b.isHighPriority) - Number(a.isHighPriority)));
        setNewTaskTitle('');
        setNewTaskCategory('General');
        setNewTaskDueDate('');
        setNewTaskIsHighPriority(false);
    };

    const toggleTaskCompletion = (taskId: string) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };
    
    const today = new Date().toISOString().split('T')[0];
    const upcomingTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Task Manager</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <DashboardCard title="Add New Task" icon={<ClipboardListIcon className="w-6 h-6"/>}>
                        <form onSubmit={handleAddTask} className="space-y-4">
                            <div>
                                <label htmlFor="taskTitle" className="block text-sm font-medium text-text-secondary">Task Title</label>
                                <input
                                    id="taskTitle"
                                    type="text"
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                    placeholder="e.g., Irrigate Plot A"
                                />
                            </div>
                            <div>
                                <label htmlFor="taskCategory" className="block text-sm font-medium text-text-secondary">Category</label>
                                <select 
                                    id="taskCategory" 
                                    value={newTaskCategory} 
                                    onChange={(e) => setNewTaskCategory(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                >
                                    <option>General</option>
                                    <option>Planting</option>
                                    <option>Irrigation</option>
                                    <option>Harvesting</option>
                                    <option>Pest Control</option>
                                    <option>Maintenance</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="taskDueDate" className="block text-sm font-medium text-text-secondary">Due Date</label>
                                <input
                                    id="taskDueDate"
                                    type="date"
                                    value={newTaskDueDate}
                                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                                    min={today}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                />
                            </div>
                             <div className="flex items-center">
                                <input
                                    id="highPriority"
                                    type="checkbox"
                                    checked={newTaskIsHighPriority}
                                    onChange={(e) => setNewTaskIsHighPriority(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label htmlFor="highPriority" className="ml-2 block text-sm font-medium text-text-secondary">Mark as High Priority</label>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                            >
                                Add Task
                            </button>
                        </form>
                    </DashboardCard>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <DashboardCard title="To-Do List" icon={<ClipboardListIcon className="w-6 h-6"/>}>
                        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                             {upcomingTasks.length > 0 ? (
                                upcomingTasks.map(task => (
                                    <TaskItem key={task.id} task={task} onToggleComplete={toggleTaskCompletion} onDelete={deleteTask} />
                                ))
                            ) : (
                                <p className="text-center text-text-secondary py-4">No pending tasks. Well done!</p>
                            )}
                        </div>
                    </DashboardCard>
                     <DashboardCard title="Completed Tasks" icon={<ClipboardListIcon className="w-6 h-6"/>}>
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                            {completedTasks.length > 0 ? (
                                completedTasks.map(task => (
                                    <TaskItem key={task.id} task={task} onToggleComplete={toggleTaskCompletion} onDelete={deleteTask} />
                                ))
                            ) : (
                                <p className="text-center text-text-secondary py-4">No completed tasks yet.</p>
                            )}
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
};

export default TaskManager;