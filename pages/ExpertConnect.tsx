
import React, { useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import ShieldCheckIcon from '../components/icons/ShieldCheckIcon';

const experts = [
    { name: 'Dr. Anjali Sharma', specialization: 'Soil Science & Agronomy', experience: '15 years', image: 'https://i.pravatar.cc/150?u=expert1' },
    { name: 'Prof. Vikram Singh', specialization: 'Horticulture & Pest Management', experience: '22 years', image: 'https://i.pravatar.cc/150?u=expert2' },
    { name: 'Dr. Priya Desai', specialization: 'Agri-Tech & Precision Farming', experience: '12 years', image: 'https://i.pravatar.cc/150?u=expert3' },
];

const ExpertConnect: React.FC = () => {
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Connecting to expert with message:", message);
        setIsSubmitted(true);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Expert Connect Platform</h2>
            <p className="text-text-secondary mb-6 max-w-3xl">For complex issues that require a human touch, connect with one of our verified agricultural experts. The AI will provide them with a summary of your farm data to make your consultation as effective as possible.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {experts.map(expert => (
                    <DashboardCard key={expert.name} title={expert.name} icon={<ShieldCheckIcon className="w-6 h-6"/>}>
                        <div className="flex flex-col items-center text-center">
                            <img src={expert.image} alt={expert.name} className="w-24 h-24 rounded-full mb-4" />
                            <p className="font-semibold text-text-primary">{expert.specialization}</p>
                            <p className="text-sm text-text-secondary">{expert.experience} of experience</p>
                            <button className="mt-4 w-full bg-primary/10 text-primary font-bold py-2 px-4 rounded-lg hover:bg-primary/20 transition-colors">
                                Book Consultation
                            </button>
                        </div>
                    </DashboardCard>
                ))}
            </div>

            <DashboardCard title="Send a General Inquiry" icon={<ShieldCheckIcon className="w-6 h-6"/>}>
                {isSubmitted ? (
                    <div className="text-center p-8 bg-green-50 rounded-lg">
                        <h3 className="text-xl font-bold text-green-700">Thank You!</h3>
                        <p className="text-green-600">Your inquiry has been sent. An expert will get back to you within 24 hours.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Describe your problem or question in detail..." className="input-field h-32" required/>
                        <button type="submit" className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">Contact an Expert</button>
                    </form>
                )}
            </DashboardCard>
            <style>{`.input-field { display: block; width: 100%; border-radius: 0.375rem; border: 1px solid #d1d5db; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); padding: 0.5rem 0.75rem; } .input-field:focus { outline: 2px solid transparent; outline-offset: 2px; border-color: #0ea5e9; box-shadow: 0 0 0 2px #0ea5e9; }`}</style>
        </div>
    );
};

export default ExpertConnect;
