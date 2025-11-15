
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import SunIcon from '../components/icons/SunIcon';
import BeakerIcon from '../components/icons/BeakerIcon';
import LeafIcon from '../components/icons/LeafIcon';
import ChartBarIcon from '../components/icons/ChartBarIcon';
import { MOCK_WEATHER } from '../constants';
import ArrowCircleUpIcon from '../components/icons/ArrowCircleUpIcon';
import ArrowCircleDownIcon from '../components/icons/ArrowCircleDownIcon';

const Dashboard: React.FC = () => {
    
    const [widgetOrder, setWidgetOrder] = useState<string[]>(() => {
        const savedOrder = localStorage.getItem('dashboardWidgetOrder');
        return savedOrder ? JSON.parse(savedOrder) : ['weather', 'soil', 'crop', 'market', 'actions'];
    });

    useEffect(() => {
        localStorage.setItem('dashboardWidgetOrder', JSON.stringify(widgetOrder));
    }, [widgetOrder]);
    
    const moveWidget = (key: string, direction: number) => {
        const index = widgetOrder.indexOf(key);
        if ((direction === -1 && index === 0) || (direction === 1 && index === widgetOrder.length - 1)) {
            return;
        }
        const newOrder = [...widgetOrder];
        const [movedItem] = newOrder.splice(index, 1);
        newOrder.splice(index + direction, 0, movedItem);
        setWidgetOrder(newOrder);
    };

    const ReorderableCard: React.FC<{ widgetKey: string, children: React.ReactNode }> = ({ widgetKey, children }) => {
        const index = widgetOrder.indexOf(widgetKey);
        return (
            <div className="relative group">
                {children}
                <div className="absolute top-4 right-4 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                        onClick={() => moveWidget(widgetKey, -1)} 
                        disabled={index === 0}
                        className="p-1 bg-white/50 rounded-full text-gray-600 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Move widget up"
                    >
                        <ArrowCircleUpIcon className="h-6 w-6" />
                    </button>
                    <button 
                        onClick={() => moveWidget(widgetKey, 1)} 
                        disabled={index === widgetOrder.length - 1}
                        className="p-1 bg-white/50 rounded-full text-gray-600 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Move widget down"
                    >
                        <ArrowCircleDownIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>
        );
    };
    
    const widgetMap: { [key: string]: React.ReactNode } = {
        weather: (
            <DashboardCard title="Current Weather" icon={<SunIcon className="h-6 w-6" />}>
                <div className="text-3xl font-bold text-text-primary">{MOCK_WEATHER.temperature}°C</div>
                <p className="text-text-secondary">Humidity: {MOCK_WEATHER.humidity}%</p>
                <Link to="/weather" className="text-primary hover:underline mt-4 block font-medium">View Full Forecast</Link>
            </DashboardCard>
        ),
        soil: (
            <DashboardCard title="Soil Health" icon={<BeakerIcon className="h-6 w-6" />}>
                <p>Last checked: 3 days ago</p>
                <p className="font-semibold text-sky-600">Status: Good</p>
                <Link to="/soil-analysis" className="text-primary hover:underline mt-4 block font-medium">Analyze New Sample</Link>
            </DashboardCard>
        ),
        crop: (
             <DashboardCard title="Crop Status" icon={<LeafIcon className="h-6 w-6" />}>
                <p>Active monitoring</p>
                <p className="font-semibold text-yellow-600">Alerts: 1 minor</p>
                 <Link to="/disease-detection" className="text-primary hover:underline mt-4 block font-medium">Scan for Diseases</Link>
            </DashboardCard>
        ),
        market: (
            <DashboardCard title="Market Prices" icon={<ChartBarIcon className="h-6 w-6" />}>
                <p>Wheat: <span className="font-semibold text-sky-600">▲ ₹2950/quintal</span></p>
                <p>Cotton: <span className="font-semibold text-red-600">▼ ₹6800/quintal</span></p>
                <Link to="/market-intelligence" className="text-primary hover:underline mt-4 block font-medium">View Market Trends</Link>
            </DashboardCard>
        ),
        actions: (
             <DashboardCard title="Today's Priority Actions" icon={<LeafIcon className="h-6 w-6" />}>
                <ul className="list-disc list-inside space-y-2">
                    <li>Check irrigation for Plot B due to high temperatures.</li>
                    <li>Scout for aphids in the cotton fields.</li>
                    <li>Prepare sprayer for fungicide application tomorrow.</li>
                </ul>
            </DashboardCard>
        )
    };


    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary">Farm Overview</h2>
                <p className="text-sm text-gray-500 hidden lg:block">Hint: Hover over a card to reorder your dashboard.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {widgetOrder.slice(0, 4).map(key => (
                     widgetMap[key] ? <ReorderableCard key={key} widgetKey={key}>{widgetMap[key]}</ReorderableCard> : null
                ))}
            </div>
            
            <div className="mt-8">
                 {widgetOrder.slice(4).map(key => (
                     widgetMap[key] ? <ReorderableCard key={key} widgetKey={key}>{widgetMap[key]}</ReorderableCard> : null
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
