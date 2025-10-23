import React, { useState } from 'react';
import { generateFarmReport } from '../services/geminiService';
import DashboardCard from '../components/DashboardCard';
import DocumentReportIcon from '../components/icons/DocumentReportIcon';
import Loader from '../components/Loader';
import { MOCK_WEATHER, MOCK_MARKET_DATA } from '../constants';
import { Task } from '../types';

const FarmReports: React.FC = () => {
    const [report, setReport] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateReport = async () => {
        setIsLoading(true);
        setError(null);
        setReport('');

        const storedTasks = localStorage.getItem('agriSmartTasks');
        const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

        const result = await generateFarmReport(MOCK_WEATHER, MOCK_MARKET_DATA, tasks);
        if (result.includes('error') || result.includes('network') || result.includes('API key')) {
            setError(result);
        } else {
            setReport(result);
        }
        setIsLoading(false);
    };
    
     const renderReport = () => {
        return report.split('\n').map((line, index) => {
            if (line.startsWith('**') && line.endsWith('**')) {
                 // FIX: Use replace with a global regex instead of replaceAll for wider compatibility.
                 return <h4 key={index} className="font-bold text-lg text-text-primary mt-4 mb-2">{line.replace(/\*\*/g, '')}</h4>;
            }
             if (line.startsWith('*')) {
                return <li key={index} className="mb-1 ml-4">{line.substring(1).trim()}</li>;
            }
            return <p key={index}>{line}</p>;
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Automated Farm Reports</h2>
            <div className="text-center">
                 <button 
                    onClick={handleGenerateReport} 
                    disabled={isLoading}
                    className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors disabled:bg-gray-400"
                >
                    {isLoading ? 'Generating...' : 'Generate Weekly AI Summary'}
                </button>
            </div>
            
            <div className="mt-8">
                 <DashboardCard title="Farm Report" icon={<DocumentReportIcon className="w-6 h-6"/>}>
                    {isLoading && <Loader text="Analyzing farm data and generating report..." />}
                    {error && <p className="text-red-500 text-center p-4">{error}</p>}
                    {!isLoading && !report && !error && <p className="text-center">Click the button above to generate your AI-powered weekly farm report.</p>}
                    {report && (
                        <div className="prose prose-sm max-w-none space-y-2">
                           {renderReport()}
                        </div>
                    )}
                </DashboardCard>
            </div>
        </div>
    );
};

export default FarmReports;