
import React, { useState, useEffect, useRef } from 'react';
import { getWeatherInsights } from '../services/geminiService';
import { MOCK_WEATHER } from '../constants';
import DashboardCard from '../components/DashboardCard';
import SunIcon from '../components/icons/SunIcon';
import Loader from '../components/Loader';

const SEVERE_CONDITIONS = ['Thunderstorms', 'Hail', 'Tornado', 'Hurricane'];

const Weather: React.FC = () => {
    const [insights, setInsights] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isOffline, setIsOffline] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const notificationSentRef = useRef(false);

    useEffect(() => {
        const fetchInsights = async () => {
            setError(null);
            setIsLoading(true);

            const cachedInsights = localStorage.getItem('weatherInsights');
            if (cachedInsights) {
                setInsights(cachedInsights);
                setIsOffline(true);
            }

            try {
                const result = await getWeatherInsights(MOCK_WEATHER);
                if (result.includes('error') || result.includes('network') || result.includes('API key')) {
                    setError(result);
                    if (!cachedInsights) setInsights('');
                } else {
                    setInsights(result);
                    localStorage.setItem('weatherInsights', result);
                    setIsOffline(false);
                }
            } catch (err) {
                setError("A client-side error occurred. Please refresh the page.");
            } finally {
                setIsLoading(false);
            }
        };

        const checkSevereWeather = () => {
            if (Notification.permission === 'granted' && !notificationSentRef.current) {
                const severeDay = MOCK_WEATHER.forecast.find(day => SEVERE_CONDITIONS.includes(day.condition));
                if (severeDay) {
                    new Notification('AgriSmart: Severe Weather Alert!', {
                        body: `Warning: ${severeDay.condition} forecast for ${severeDay.day}. Take necessary precautions.`,
                        icon: '/vite.svg',
                    });
                    notificationSentRef.current = true; // Prevent re-notifying in the same session
                }
            }
        };

        fetchInsights();
        checkSevereWeather();
    }, []);

    const renderInsights = () => {
        return insights.split('\n').map((line, index) => {
            if (line.startsWith('*')) {
                return <li key={index} className="mb-2">{line.substring(1).trim()}</li>;
            }
            return <p key={index}>{line}</p>;
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Weather Center</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <DashboardCard title="Current Conditions" icon={<SunIcon className="w-6 h-6"/>}>
                        <p className="text-5xl font-bold text-text-primary">{MOCK_WEATHER.temperature}°C</p>
                        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                            <p><strong>Humidity:</strong> {MOCK_WEATHER.humidity}%</p>
                            <p><strong>Wind:</strong> {MOCK_WEATHER.windSpeed} km/h</p>
                            <p><strong>Precipitation:</strong> {MOCK_WEATHER.precipitation}%</p>
                        </div>
                    </DashboardCard>
                    <DashboardCard title="5-Day Forecast" icon={<SunIcon className="w-6 h-6"/>}>
                        <ul className="space-y-3">
                            {MOCK_WEATHER.forecast.map(day => (
                                <li key={day.day} className="flex justify-between items-center">
                                    <span className="font-medium">{day.day}</span>
                                    <span>{day.condition}</span>
                                    <span className="font-bold">{day.temp}°C</span>
                                </li>
                            ))}
                        </ul>
                    </DashboardCard>
                </div>
                <div className="lg:col-span-2">
                    <DashboardCard title="AI-Powered Farming Advisory" icon={<SunIcon className="w-6 h-6"/>}>
                        {error && (
                             <div className="p-3 mb-4 text-sm text-red-800 bg-red-100 rounded-md">
                                <strong>Error:</strong> {error}
                            </div>
                        )}
                        {isOffline && !isLoading && !error && (
                            <div className="p-2 mb-4 text-sm text-yellow-800 bg-yellow-100 rounded-md">
                                You are viewing offline data. Connect to the internet for the latest advisory.
                            </div>
                        )}
                        {isLoading ? <Loader text="Generating weather advisory..."/> : (
                             insights ? <ul className="list-disc list-inside space-y-2">{renderInsights()}</ul> : !error && <p>Could not load advisory.</p>
                        )}
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
};

export default Weather;
