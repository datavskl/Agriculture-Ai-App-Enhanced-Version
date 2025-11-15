
import React, { useState, useEffect, FormEvent } from 'react';
import { Equipment } from '../types';
import DashboardCard from '../components/DashboardCard';
import WrenchScrewdriverIcon from '../components/icons/WrenchScrewdriverIcon';
import TrashIcon from '../components/icons/TrashIcon';

const EquipmentLog: React.FC = () => {
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [name, setName] = useState('');
    const [type, setType] = useState('Tractor');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [lastServiceDate, setLastServiceDate] = useState('');

    useEffect(() => {
        const storedEquipment = localStorage.getItem('agriSmartEquipment');
        if (storedEquipment) {
            setEquipment(JSON.parse(storedEquipment));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('agriSmartEquipment', JSON.stringify(equipment));
    }, [equipment]);

    const calculateNextServiceDate = (date: string): string => {
        const d = new Date(date);
        d.setMonth(d.getMonth() + 6);
        return d.toISOString().split('T')[0];
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !purchaseDate || !lastServiceDate) {
            alert('Please fill in all required fields.');
            return;
        }
        const newItem: Equipment = {
            id: Date.now().toString(),
            name: name.trim(),
            type,
            purchaseDate,
            lastServiceDate,
            nextServiceDate: calculateNextServiceDate(lastServiceDate),
        };
        setEquipment(prev => [...prev, newItem].sort((a, b) => a.name.localeCompare(b.name)));
        setName('');
        setPurchaseDate('');
        setLastServiceDate('');
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this equipment entry?')) {
            setEquipment(equipment.filter(item => item.id !== id));
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Equipment Maintenance Log</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <DashboardCard title="Add New Equipment" icon={<WrenchScrewdriverIcon className="w-6 h-6"/>}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Equipment Name (e.g., John Deere 5050D)" className="input-field" required />
                        <select value={type} onChange={e => setType(e.target.value)} className="input-field">
                            <option>Tractor</option>
                            <option>Harvester</option>
                            <option>Sprayer</option>
                            <option>Pump</option>
                            <option>Other</option>
                        </select>
                        <div>
                            <label className="text-xs text-text-secondary">Purchase Date</label>
                            <input type="date" value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)} className="input-field" required />
                        </div>
                        <div>
                            <label className="text-xs text-text-secondary">Last Service Date</label>
                            <input type="date" value={lastServiceDate} onChange={e => setLastServiceDate(e.target.value)} className="input-field" required />
                        </div>
                        <button type="submit" className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">Add to Log</button>
                    </form>
                </DashboardCard>
                <div className="lg:col-span-2">
                    <DashboardCard title="Equipment Fleet" icon={<WrenchScrewdriverIcon className="w-6 h-6"/>}>
                        <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                            {equipment.length > 0 ? equipment.map(item => {
                                const isDue = new Date(item.nextServiceDate) <= new Date();
                                return (
                                    <div key={item.id} className={`flex items-start p-3 rounded-lg ${isDue ? 'bg-yellow-50 border-l-4 border-yellow-500' : 'bg-gray-50'}`}>
                                        <div className="flex-grow">
                                            <p className="font-medium text-text-primary">{item.name}</p>
                                            <p className="text-sm text-text-secondary">{item.type} | Purchased: {new Date(item.purchaseDate).toLocaleDateString()}</p>
                                            <p className={`text-sm mt-1 font-semibold ${isDue ? 'text-yellow-700' : 'text-green-700'}`}>
                                                Next Service Due: {new Date(item.nextServiceDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <button onClick={() => handleDelete(item.id)} className="ml-4 text-gray-400 hover:text-red-500"><TrashIcon className="h-5 w-5"/></button>
                                    </div>
                                );
                            }) : <p className="text-center text-text-secondary py-4">No equipment logged yet.</p>}
                        </div>
                    </DashboardCard>
                </div>
            </div>
            <style>{`.input-field { display: block; width: 100%; border-radius: 0.375rem; border: 1px solid #d1d5db; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); padding: 0.5rem 0.75rem; } .input-field:focus { outline: 2px solid transparent; outline-offset: 2px; border-color: #0ea5e9; box-shadow: 0 0 0 2px #0ea5e9; }`}</style>
        </div>
    );
};

export default EquipmentLog;
