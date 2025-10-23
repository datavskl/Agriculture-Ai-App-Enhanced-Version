
import React, { useState, FormEvent } from 'react';
import { getCropRotationPlan } from '../services/geminiService';
import DashboardCard from '../components/DashboardCard';
import RefreshIcon from '../components/icons/RefreshIcon';
import Loader from '../components/Loader';
import { MOCK_FARMER } from '../constants';

const CropRotationPlanner: React.FC = () => {
    const [soilHistory, setSoilHistory] = useState('Good fertility, slight nitrogen depletion noted in last soil test.');
    const [pastCrops, setPastCrops] = useState('Wheat, Corn');
    const [farmSize, setFarmSize] = useState(MOCK_FARMER.farmSize);
    const [plan, setPlan] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setPlan('');
        
        const result = await getCropRotationPlan(soilHistory, pastCrops.split(',').map(c => c.trim()), farmSize);
        if (result.includes('error') || result.includes('network') || result.includes('API key')) {
            setError(result);
        } else {
            setPlan(result);
        }
        setIsLoading(false);
    };
    
    const renderPlan = () => {
        // Simple renderer, a real app might parse the table markdown more robustly
        return <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: plan.replace(/\|/g, ' | ').replace(/\n/g, '<br />') }} />;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">AI Crop Rotation Planner</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DashboardCard title="Enter Farm Data" icon={<RefreshIcon className="w-6 h-6"/>}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="soilHistory" className="block text-sm font-medium text-text-secondary">Brief Soil History</label>
                            <textarea id="soilHistory" value={soilHistory} onChange={(e) => setSoilHistory(e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="pastCrops" className="block text-sm font-medium text-text-secondary">Past Crops (comma-separated)</label>
                            <input type="text" id="pastCrops" value={pastCrops} onChange={(e) => setPastCrops(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="farmSize" className="block text-sm font-medium text-text-secondary">Farm Size (acres)</label>
                            <input type="number" id="farmSize" value={farmSize} onChange={(e) => setFarmSize(Number(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors disabled:bg-gray-400">
                            {isLoading ? 'Generating Plan...' : 'Generate 3-Year Plan'}
                        </button>
                    </form>
                </DashboardCard>

                 <DashboardCard title="Generated Rotation Plan" icon={<RefreshIcon className="w-6 h-6"/>}>
                    {isLoading && <Loader text="Developing strategy..." />}
                    {error && <p className="text-red-500 text-center p-4">{error}</p>}
                    {!isLoading && !plan && !error && <p className="text-center">Fill out the form to generate a sustainable crop rotation plan.</p>}
                    {plan && renderPlan()}
                </DashboardCard>
            </div>
        </div>
    );
};

export default CropRotationPlanner;