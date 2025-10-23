
import React, { useState, FormEvent } from 'react';
import { getResourceOptimizationWithROI } from '../services/geminiService';
import DashboardCard from '../components/DashboardCard';
import CalculatorIcon from '../components/icons/CalculatorIcon';
import Loader from '../components/Loader';

const ResourceOptimization: React.FC = () => {
    const [cropType, setCropType] = useState('Wheat');
    const [growthStage, setGrowthStage] = useState('Vegetative');
    const [plotSize, setPlotSize] = useState(10);
    const [recommendations, setRecommendations] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setRecommendations('');
        
        const result = await getResourceOptimizationWithROI(cropType, growthStage, plotSize);
        if (result.includes('error') || result.includes('network') || result.includes('API key')) {
            setError(result);
        } else {
            setRecommendations(result);
        }
        setIsLoading(false);
    };

    const renderRecommendations = () => {
        return recommendations.split('\n').map((line, index) => {
            if (line.match(/Irrigation|Fertilizer|Pest Control|Financials/)) {
                return <h4 key={index} className="font-bold text-text-primary mt-3 mb-1">{line.replace(/\*\*/g, '')}</h4>;
            }
            if (line.startsWith('*') || line.startsWith('-')) {
                return <li key={index} className="mb-1 ml-4">{line.substring(1).trim()}</li>;
            }
            if (line.includes('ROI')) {
                return <p key={index} className="font-semibold text-green-600">{line}</p>
            }
             if (line.includes('Cost')) {
                return <p key={index} className="font-semibold text-red-600">{line}</p>
            }
            return <p key={index}>{line}</p>;
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">AI Resource Optimizer with ROI Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DashboardCard title="Enter Plot Details" icon={<CalculatorIcon className="w-6 h-6"/>}>
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
                            <label htmlFor="growthStage" className="block text-sm font-medium text-text-secondary">Growth Stage</label>
                            <select id="growthStage" value={growthStage} onChange={(e) => setGrowthStage(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm">
                                <option>Germination</option>
                                <option>Vegetative</option>
                                <option>Flowering</option>
                                <option>Fruiting</option>
                                <option>Harvest</option>
                            </select>
                        </div>
                         <div>
                            <label htmlFor="plotSize" className="block text-sm font-medium text-text-secondary">Plot Size (acres)</label>
                            <input type="number" id="plotSize" value={plotSize} onChange={(e) => setPlotSize(Number(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors disabled:bg-gray-400">
                            {isLoading ? 'Optimizing...' : 'Get Recommendations'}
                        </button>
                    </form>
                </DashboardCard>

                <DashboardCard title="Optimization & ROI Report" icon={<CalculatorIcon className="w-6 h-6"/>}>
                    {isLoading && <Loader text="Generating recommendations..." />}
                    {error && <p className="text-red-500 text-center p-4">{error}</p>}
                    {!isLoading && !recommendations && !error && <p className="text-center">Fill out the form to get your resource and financial plan.</p>}
                    {recommendations && (
                        <div className="prose prose-sm max-w-none space-y-2">
                           {renderRecommendations()}
                        </div>
                    )}
                </DashboardCard>
            </div>
        </div>
    );
};

export default ResourceOptimization;