
import React, { useEffect, useMemo, useState } from 'react';
import { Achievement, Task } from '../types';
import DashboardCard from '../components/DashboardCard';
import SparklesIcon from '../components/icons/SparklesIcon';
import BeakerIcon from '../components/icons/BeakerIcon';
import ClipboardListIcon from '../components/icons/ClipboardListIcon';
import LeafIcon from '../components/icons/LeafIcon';
import UsersIcon from '../components/icons/UsersIcon';
import Loader from '../components/Loader';
import { fetchTasks } from '../services/api/tasks';

const Achievements: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetchTasks({ pageSize: 100 });
                setTasks(response.data);
            } catch (err) {
                console.error('Failed to load tasks for achievements', err);
                setError('Unable to load your task history from the backend.');
            } finally {
                setIsLoading(false);
            }
        };

        void load();
    }, []);

    const posts = useMemo(() => JSON.parse(localStorage.getItem('agriSmartPosts') || '[]'), []);

    const achievements: Achievement[] = useMemo(() => {
        const completedCount = tasks.filter(task => task.status === 'completed').length;
        const highPriorityCompleted = tasks.filter(task => task.status === 'completed' && task.priority === 'high').length;

        return [
            { id: 'task_starter', title: 'Task Starter', description: 'Complete your first task', icon: <ClipboardListIcon className="h-8 w-8"/>, unlocked: completedCount >= 1 },
            { id: 'task_master', title: 'Task Master', description: 'Complete 10 tasks', icon: <ClipboardListIcon className="h-8 w-8"/>, unlocked: completedCount >= 10 },
            { id: 'priority_pro', title: 'Priority Pro', description: 'Complete 5 high-priority tasks', icon: <SparklesIcon className="h-8 w-8"/>, unlocked: highPriorityCompleted >= 5 },
            { id: 'soil_scientist', title: 'Soil Scientist', description: 'Perform your first soil analysis', icon: <BeakerIcon className="h-8 w-8"/>, unlocked: false },
            { id: 'plant_doctor', title: 'Plant Doctor', description: 'Perform your first disease scan', icon: <LeafIcon className="h-8 w-8"/>, unlocked: false },
            { id: 'community_builder', title: 'Community Builder', description: 'Make your first post in the hub', icon: <UsersIcon className="h-8 w-8"/>, unlocked: posts.length > 0 },
        ];
    }, [posts.length, tasks]);

    const unlockedCount = achievements.filter(a => a.unlocked).length;

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">My Achievements</h2>
             <DashboardCard title="Your Progress" icon={<SparklesIcon className="w-6 h-6"/>}>
                {isLoading ? (
                    <Loader text="Loading your milestones..." />
                ) : error ? (
                    <p className="text-sm text-red-600">{error}</p>
                ) : (
                <div className="text-center">
                    <p className="text-lg">You've unlocked</p>
                    <p className="text-6xl font-bold text-primary my-2">{unlockedCount} / {achievements.length}</p>
                    <p className="text-text-secondary">achievements. Keep up the great work!</p>
                </div>
                )}
            </DashboardCard>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map(ach => (
                    <div key={ach.id} className={`p-6 rounded-lg text-center transition-all duration-300 ${ach.unlocked ? 'bg-card shadow-md' : 'bg-gray-100 opacity-60'}`}>
                        <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4 ${ach.unlocked ? 'bg-primary/10 text-primary' : 'bg-gray-300 text-gray-500'}`}>
                            {ach.icon}
                        </div>
                        <h3 className={`font-bold text-lg ${ach.unlocked ? 'text-text-primary' : 'text-gray-500'}`}>{ach.title}</h3>
                        <p className={`text-sm ${ach.unlocked ? 'text-text-secondary' : 'text-gray-400'}`}>{ach.description}</p>
                        {ach.unlocked && <div className="mt-3 text-xs font-bold text-green-500">UNLOCKED</div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Achievements;