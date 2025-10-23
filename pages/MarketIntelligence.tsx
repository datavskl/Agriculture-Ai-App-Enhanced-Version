import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getMarketAnalysis } from '../services/geminiService';
import { MOCK_MARKET_DATA } from '../constants';
import DashboardCard from '../components/DashboardCard';
import Loader from '../components/Loader';
import ChartBarIcon from '../components/icons/ChartBarIcon';

const MarketIntelligence: React.FC = () => {
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [crop, setCrop] = useState('Wheat');
    const [isOffline, setIsOffline] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnalysis = async () => {
            setError(null);
            setIsLoading(true);
            const cacheKey = `marketAnalysis_${crop}`;
            const cachedAnalysis = localStorage.getItem(cacheKey);

            if (cachedAnalysis) {
                setAnalysis(cachedAnalysis);
                setIsOffline(true);
            }

            try {
                const result = await getMarketAnalysis(MOCK_MARKET_DATA, crop);
                if (result.includes('error') || result.includes('network') || result.includes('API key')) {
                    setError(result);
                    if (!cachedAnalysis) setAnalysis('');
                } else {
                    setAnalysis(result);
                    localStorage.setItem(cacheKey, result);
                    setIsOffline(false);
                }
            } catch (err) {
                setError("A client-side error occurred. Please refresh the page.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchAnalysis();
    }, [crop]);

    const renderAnalysis = () => {
        return analysis.split('\n').map((line, index) => {
            if(line.match(/^\d\./) || line.toLowerCase().includes('summary:') || line.toLowerCase().includes('prediction:') || line.toLowerCase().includes('recommendations:')) {
                return <p key={index} className="font-bold text-text-primary mt-3 mb-1">{line}</p>
            }
            return <p key={index}>{line}</p>;
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary">Market Intelligence for {crop}</h2>
                {/* In a real app, this would change the data */}
                <select value={crop} onChange={(e) => setCrop(e.target.value)} className="p-2 border rounded-md">
                    <option>Wheat</option>
                    <option>Cotton</option>
                    <option>Rice</option>
                </select>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                    <DashboardCard title="Price Trend (Last 12 Months)" icon={<ChartBarIcon className="w-6 h-6"/>}>
                        <div style={{ width: '100%', height: 400 }}>
                            <ResponsiveContainer>
                                <LineChart data={MOCK_MARKET_DATA}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis domain={['dataMin - 100', 'dataMax + 100']} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="price" stroke="#0ea5e9" strokeWidth={2} activeDot={{ r: 8 }} name="Price (₹/quintal)" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </DashboardCard>
                </div>
                <div className="lg:col-span-2">
                    <DashboardCard title="AI Market Analysis" icon={<ChartBarIcon className="w-6 h-6"/>}>
                         {error && (
                             <div className="p-3 mb-4 text-sm text-red-800 bg-red-100 rounded-md">
                                <strong>Error:</strong> {error}
                            </div>
                        )}
                         {isOffline && !isLoading && !error && (
                            <div className="p-2 mb-4 text-sm text-yellow-800 bg-yellow-100 rounded-md">
                                You are viewing offline data. Connect to the internet for the latest analysis.
                            </div>
                        )}
                        {isLoading ? <Loader text={`Analyzing ${crop} market...`}/> : (
                            analysis ? <div className="prose prose-sm max-w-none">{renderAnalysis()}</div> : !error && <p>Could not load analysis.</p>
                        )}
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
};

export default MarketIntelligence;