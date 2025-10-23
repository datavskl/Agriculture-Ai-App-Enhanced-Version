
import React, { useState, FormEvent } from 'react';
import { getPestPrediction } from '../services/geminiService';
import DashboardCard from '../components/DashboardCard';
import BugIcon from '../components/icons/BugIcon';
import Loader from '../components/Loader';
import { MOCK_WEATHER, MOCK_FARMER } from '../constants';

const PestPrediction: React.FC = () => {
    const [cropType, setCropType] = useState(MOCK_FARMER.primaryCrops.split(',')[0].trim());
    const [prediction, setPrediction] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setPrediction('');
        
        const result = await getPestPrediction(MOCK_WEATHER, cropType);
        if (result.includes('error') || result.includes('network') || result.includes('API key')) {
            setError(result);
        } else {
            setPrediction(result);
        }
        setIsLoading(false);
    };
    
    const renderPrediction = () => {
        return prediction.split('\n').map((line, index) => {
            if (line.match(/Risk Level:/)) {
                let color = 'text-gray-600';
                if (line.includes('High')) color = 'text-red-600';
                if (line.includes('Medium')) color = 'text-yellow-600';
                if (line.includes('Low')) color = 'text-green-600';
                return <p key={index} className={`font-bold ${color}`}>{line}</p>;
            }
            if (line.match(/^\d\./) || line.toLowerCase().includes('reasons:') || line.toLowerCase().includes('actions:')) {
                return <h4 key={index} className="font-bold text-text-primary mt-3 mb-1">{line}</h4>;
            }
             if (line.startsWith('*') || line.startsWith('-')) {
                return <li key={index} className="mb-1 ml-4">{line.substring(1).trim()}</li>;
            }
            return <p key={index}>{line}</p>;
        });
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">AI Pest & Disease Prediction</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DashboardCard title="Select Crop for Analysis" icon={<BugIcon className="w-6 h-6"/>}>
                    <p className="text-sm mb-4">The AI will analyze the current weather and 5-day forecast to predict potential pest/disease risks for your selected crop.</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="cropType" className="block text-sm font-medium text-text-secondary">Crop Type</label>
                            <select id="cropType" value={cropType} onChange={(e) => setCropType(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm">
                                <option>Wheat</option>
                                <option>Rice</option>
                                <option>Cotton</option>
                                <option>Sugarcane</option>
                                <option>Corn</option>
                                <option>Tomatoes</option>
                            </select>
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors disabled:bg-gray-400">
                            {isLoading ? 'Analyzing Risk...' : 'Predict Pest Risk'}
                        </button>
                    </form>
                </DashboardCard>

                 <DashboardCard title="Prediction Report" icon={<BugIcon className="w-6 h-6"/>}>
                    {isLoading && <Loader text="Generating prediction..." />}
                    {error && <p className="text-red-500 text-center p-4">{error}</p>}
                    {!isLoading && !prediction && !error && <p className="text-center">Select a crop and click "Predict" to see your risk report.</p>}
                    {prediction && (
                        <div className="prose prose-sm max-w-none space-y-2">
                           {renderPrediction()}
                        </div>
                    )}
                </DashboardCard>
            </div>
        </div>
    );
};

export default PestPrediction;