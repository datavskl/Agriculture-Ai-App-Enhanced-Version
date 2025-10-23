
import React, { useState, FormEvent } from 'react';
import { getYieldPrediction } from '../services/geminiService';
import DashboardCard from '../components/DashboardCard';
import TrendingUpIcon from '../components/icons/TrendingUpIcon';
import Loader from '../components/Loader';
import { MOCK_FARMER } from '../constants';

const YieldPrediction: React.FC = () => {
    const [cropType, setCropType] = useState('Wheat');
    const [plantingDate, setPlantingDate] = useState('');
    const [farmSize, setFarmSize] = useState(MOCK_FARMER.farmSize);
    const [soilType, setSoilType] = useState(MOCK_FARMER.landType);
    const [prediction, setPrediction] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!plantingDate) {
            setError('Please select a planting date.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setPrediction('');
        
        const result = await getYieldPrediction(cropType, plantingDate, farmSize, soilType);
        if (result.includes('error') || result.includes('network') || result.includes('API key')) {
            setError(result);
        } else {
            setPrediction(result);
        }
        setIsLoading(false);
    };
    
    const renderPrediction = () => {
        return prediction.split('\n').map((line, index) => {
             if(line.match(/^\d\./) || line.toLowerCase().includes('prediction:') || line.toLowerCase().includes('factors:') || line.toLowerCase().includes('recommendations:')) {
                return <p key={index} className="font-bold text-text-primary mt-3 mb-1">{line}</p>
            }
             if (line.startsWith('*')) {
                return <li key={index} className="mb-1">{line.substring(1).trim()}</li>;
            }
            return <p key={index}>{line}</p>;
        });
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">AI Yield Prediction Modeling</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DashboardCard title="Enter Crop Details" icon={<TrendingUpIcon className="w-6 h-6"/>}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="cropType" className="block text-sm font-medium text-text-secondary">Crop Type</label>
                            <select id="cropType" value={cropType} onChange={(e) => setCropType(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm">
                                <option>Wheat</option>
                                <option>Rice</option>
                                <option>Cotton</option>
                                <option>Sugarcane</option>
                                <option>Corn</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="plantingDate" className="block text-sm font-medium text-text-secondary">Planting Date</label>
                            <input type="date" id="plantingDate" value={plantingDate} onChange={(e) => setPlantingDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="farmSize" className="block text-sm font-medium text-text-secondary">Farm Size (acres)</label>
                            <input type="number" id="farmSize" value={farmSize} onChange={(e) => setFarmSize(Number(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="soilType" className="block text-sm font-medium text-text-secondary">Soil Type</label>
                            <select id="soilType" value={soilType} onChange={(e) => setSoilType(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm">
                                <option>Alluvial</option>
                                <option>Clay</option>
                                <option>Sandy</option>
                                <option>Loam</option>
                            </select>
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors disabled:bg-gray-400">
                            {isLoading ? 'Calculating...' : 'Predict Yield'}
                        </button>
                    </form>
                </DashboardCard>

                 <DashboardCard title="Prediction Report" icon={<TrendingUpIcon className="w-6 h-6"/>}>
                    {isLoading && <Loader text="Generating prediction..." />}
                    {error && <p className="text-red-500 text-center p-4">{error}</p>}
                    {!isLoading && !prediction && !error && <p className="text-center">Fill out the form and click "Predict Yield" to see your report.</p>}
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

export default YieldPrediction;
