import React from 'react';
import DashboardCard from '../components/DashboardCard';
import CogIcon from '../components/icons/CogIcon';

const AdminPanel: React.FC = () => {
    
    const envVariables = [
        { name: 'Database Link', value: '********************.mongodb.net' },
        { name: 'Database Name', value: 'agri-smart-db' },
        { name: 'Database ID', value: 'agri-admin' },
        { name: 'Database Password', value: '••••••••••••••••' },
        { name: 'Port', value: '27017' },
        { name: 'Gemini API Key', value: 'AIzaSy*******************' },
        { name: 'GPT Model', value: 'gpt-4o' },
        { name: 'GPT API Key', value: 'sk-******************************' },
        { name: 'Twilio API Key', value: 'AC******************************' },
        { name: 'Weather API Key', value: '******************************' },
        { name: 'Firebase API Key', value: 'AIzaSy*******************' },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Admin Panel</h2>
            <DashboardCard title="Environment Variables" icon={<CogIcon className="w-6 h-6"/>}>
                <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 mb-6 rounded-md">
                    <p className="font-bold">Security Notice</p>
                    <p>These values are sourced from your environment variables. They are masked for security and are for display purposes only.</p>
                </div>

                <div className="space-y-4">
                    {envVariables.map((env) => (
                        <div key={env.name}>
                            <label className="block text-sm font-medium text-text-secondary">{env.name}</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <input
                                    type="text"
                                    readOnly
                                    value={env.value}
                                    className="block w-full rounded-md border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed focus:ring-0 sm:text-sm"
                                    aria-label={env.name}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </DashboardCard>
        </div>
    );
};

export default AdminPanel;