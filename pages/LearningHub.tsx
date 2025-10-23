
import React from 'react';
import DashboardCard from '../components/DashboardCard';
import AcademicCapIcon from '../components/icons/AcademicCapIcon';
import { MOCK_FARMER } from '../constants';

const articles = [
    { title: 'Advanced Irrigation Techniques for Wheat Crops', source: 'AgriTech Today', readTime: '7 min read', relevantFor: 'Wheat' },
    { title: 'Identifying and Treating Powdery Mildew Organically', source: 'Farmer\'s Weekly', readTime: '5 min read', relevantFor: 'Pest Control' },
    { title: 'Maximizing Profitability with Crop Rotation', source: 'Sustainable Farms Journal', readTime: '10 min read', relevantFor: 'Planning' },
    { title: 'Understanding Your Soil Analysis Report', source: 'AgriSmart Guides', readTime: '6 min read', relevantFor: 'Soil' },
];

const LearningHub: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Personalized Learning Hub</h2>
            <DashboardCard title="Recommended For You" icon={<AcademicCapIcon className="w-6 h-6"/>}>
                <div className="p-4 mb-6 bg-blue-100 border-l-4 border-primary text-blue-800 rounded-md">
                    <p>Based on your farm profile (Primary Crop: <strong>{MOCK_FARMER.primaryCrops.split(',')[0]}</strong>) and recent activity, the AI has curated these learning resources for you.</p>
                </div>

                <div className="space-y-4">
                    {articles.map(article => (
                        <div key={article.title} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:shadow-md transition-shadow">
                            <div>
                                <h4 className="font-bold text-text-primary">{article.title}</h4>
                                <p className="text-xs text-text-secondary">{article.source} • {article.readTime}</p>
                            </div>
                            <button className="ml-4 flex-shrink-0 px-4 py-2 text-sm rounded-md bg-primary text-white hover:bg-primary-dark transition-colors">
                                Read Now
                            </button>
                        </div>
                    ))}
                </div>
            </DashboardCard>
        </div>
    );
};

export default LearningHub;
