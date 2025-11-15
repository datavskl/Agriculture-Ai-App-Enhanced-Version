
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getWeatherInsights } from '../services/geminiService';
import { MOCK_WEATHER } from '../constants';
import DashboardCard from '../components/DashboardCard';
import SunIcon from '../components/icons/SunIcon';
import Loader from '../components/Loader';
import { useWeatherData } from '../hooks/useWeatherData';
import type { WeatherData } from '../types';

const SEVERE_CONDITIONS = ['Thunderstorms', 'Hail', 'Tornado', 'Hurricane'];

const Weather: React.FC = () => {
    const { weather, alerts, isLoading: isWeatherLoading, error: weatherError, refresh } = useWeatherData();
    const [insights, setInsights] = useState('');
    const [insightsError, setInsightsError] = useState<string | null>(null);
    const [isInsightsLoading, setInsightsLoading] = useState(true);
    const [isOffline, setIsOffline] = useState(false);
    const notificationSentRef = useRef(false);

    const weatherForAdvisory = useMemo<WeatherData>(() => weather ?? MOCK_WEATHER, [weather]);
    const severityStyles: Record<string, string> = useMemo(
        () => ({
            low: 'border-green-400',
            medium: 'border-yellow-400',
            high: 'border-red-500',
        }),
        [],
    );

    useEffect(() => {
        const fetchInsights = async () => {
            setInsightsError(null);
            setInsightsLoading(true);

            const cachedInsights = localStorage.getItem('weatherInsights');
            if (cachedInsights) {
                setInsights(cachedInsights);
                setIsOffline(true);
            }

            try {
                const result = await getWeatherInsights(weatherForAdvisory);
                if (result.includes('error') || result.includes('network') || result.includes('API key')) {
                    setInsightsError(result);
                    if (!cachedInsights) setInsights('');
                } else {
                    setInsights(result);
                    localStorage.setItem('weatherInsights', result);
                    setIsOffline(false);
                }
            } catch (err) {
                setInsightsError('A client-side error occurred. Please refresh the page.');
            } finally {
                setInsightsLoading(false);
            }
        };

        const checkSevereWeather = () => {
            if (Notification.permission === 'granted' && !notificationSentRef.current) {
                const severeDay = weatherForAdvisory.forecast.find(day => SEVERE_CONDITIONS.includes(day.condition));
                if (severeDay) {
                    const dayLabel = new Date(severeDay.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
                    new Notification('AgriSmart: Severe Weather Alert!', {
                        body: `Warning: ${severeDay.condition} forecast for ${dayLabel}. Take necessary precautions.`,
                        icon: '/vite.svg',
                    });
                    notificationSentRef.current = true;
                }
            }
        };

        fetchInsights();
        checkSevereWeather();
    }, [weatherForAdvisory]);

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
            <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-text-primary">Weather Center</h2>
                    <p className="text-text-secondary">Live data powered by the Agriculture AI backend.</p>
                </div>
                <button
                    onClick={() => void refresh()}
                    className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
                >
                    Refresh Data
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <DashboardCard title="Current Conditions" icon={<SunIcon className="w-6 h-6"/>}>
                        {isWeatherLoading && !weather && (
                            <Loader text="Loading current weather..." />
                        )}
                        {(weatherError && !weather) && (
                            <div className="p-3 mb-2 text-sm text-red-800 bg-red-100 rounded-md">
                                Unable to load live weather data. Showing fallback advisory instead.
                            </div>
                        )}
                        <p className="text-5xl font-bold text-text-primary">{weatherForAdvisory.temperature}°C</p>
                        <p className="text-text-secondary mt-1">{weatherForAdvisory.condition}</p>
                        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                            <p><strong>Humidity:</strong> {weatherForAdvisory.humidity}%</p>
                            <p><strong>Wind:</strong> {weatherForAdvisory.windSpeed} km/h</p>
                            <p><strong>Precipitation:</strong> {weatherForAdvisory.precipitation}%</p>
                        </div>
                    </DashboardCard>
                    <DashboardCard title="5-Day Forecast" icon={<SunIcon className="w-6 h-6"/>}>
                        <ul className="space-y-3">
                            {weatherForAdvisory.forecast.map(day => (
                                <li key={day.date} className="flex justify-between items-center text-sm">
                                    <span className="font-medium">{new Date(day.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                                    <span>{day.condition}</span>
                                    <span className="font-bold">{day.high}° / {day.low}°</span>
                                </li>
                            ))}
                        </ul>
                    </DashboardCard>
                    <DashboardCard title="Weather Alerts" icon={<SunIcon className="w-6 h-6"/>}>
                        {alerts.length === 0 ? (
                            <p className="text-sm text-text-secondary">No active alerts. You're all clear!</p>
                        ) : (
                            <ul className="space-y-3">
                                {alerts.map(alert => (
                                    <li
                                        key={alert.id}
                                        className={`border-l-4 pl-3 ${severityStyles[alert.severity] ?? 'border-blue-400'}`}
                                        data-severity={alert.severity}
                                    >
                                        <p className="text-sm font-semibold text-text-primary">{alert.title}</p>
                                        <p className="text-xs text-text-secondary mt-1">{alert.description}</p>
                                        <p className="text-xs text-gray-400 mt-1">Issued {new Date(alert.issuedAt).toLocaleString()}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </DashboardCard>
                </div>
                <div className="lg:col-span-2">
                    <DashboardCard title="AI-Powered Farming Advisory" icon={<SunIcon className="w-6 h-6"/>}>
                        {(insightsError || weatherError) && (
                             <div className="p-3 mb-4 text-sm text-red-800 bg-red-100 rounded-md">
                                <strong>Error:</strong> {insightsError || weatherError}
                            </div>
                        )}
                        {isOffline && !isInsightsLoading && !insightsError && (
                            <div className="p-2 mb-4 text-sm text-yellow-800 bg-yellow-100 rounded-md">
                                You are viewing cached insights. Connect to the internet for the latest advisory.
                            </div>
                        )}
                        {isInsightsLoading ? <Loader text="Generating weather advisory..."/> : (
                             insights ? <ul className="list-disc list-inside space-y-2">{renderInsights()}</ul> : !insightsError && <p>Could not load advisory.</p>
                        )}
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
};

export default Weather;
