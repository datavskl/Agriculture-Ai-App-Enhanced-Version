
import React from 'react';
import DashboardCard from '../components/DashboardCard';
import MapIcon from '../components/icons/MapIcon';

const FarmMap: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Interactive Farm Map</h2>
            <DashboardCard title="Your Farm Layout" icon={<MapIcon className="w-6 h-6"/>}>
                <div className="text-center">
                    <img 
                        src="https://i.imgur.com/8yVfT54.png" 
                        alt="A placeholder map of a farm with different plots"
                        className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                    />
                    <div className="p-4 mt-6 bg-blue-100 border-l-4 border-primary text-blue-800 rounded-md text-left">
                        <h4 className="font-bold">Feature Coming Soon!</h4>
                        <p>This will be an interactive map of your farm. You'll be able to:</p>
                        <ul className="list-disc list-inside mt-2">
                            <li>Draw and label your different crop plots.</li>
                            <li>View plot-specific data like soil type and current tasks.</li>
                            <li>Get hyper-local weather alerts for different areas of your farm.</li>
                            <li>Visualize crop health and resource needs directly on the map.</li>
                        </ul>
                    </div>
                </div>
            </DashboardCard>
        </div>
    );
};

export default FarmMap;
