
import React, { useState, useEffect, FormEvent } from 'react';
import { InventoryItem } from '../types';
import DashboardCard from '../components/DashboardCard';
import ArchiveIcon from '../components/icons/ArchiveIcon';
import TrashIcon from '../components/icons/TrashIcon';
import FireIcon from '../components/icons/FireIcon';

const InventoryManager: React.FC = () => {
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Seeds');
    const [quantity, setQuantity] = useState('');
    const [reorderLevel, setReorderLevel] = useState('');

    useEffect(() => {
        const storedInventory = localStorage.getItem('agriSmartInventory');
        if (storedInventory) {
            setInventory(JSON.parse(storedInventory));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('agriSmartInventory', JSON.stringify(inventory));
    }, [inventory]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !quantity || !reorderLevel || Number(quantity) < 0 || Number(reorderLevel) < 0) {
            alert('Please fill in all fields with valid values.');
            return;
        }
        const newItem: InventoryItem = {
            id: Date.now().toString(),
            name: name.trim(),
            category,
            quantity: Number(quantity),
            reorderLevel: Number(reorderLevel)
        };
        setInventory(prev => [...prev, newItem].sort((a,b) => a.name.localeCompare(b.name)));
        setName('');
        setQuantity('');
        setReorderLevel('');
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            setInventory(inventory.filter(item => item.id !== id));
        }
    };
    
    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Inventory Management</h2>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <DashboardCard title="Add Inventory Item" icon={<ArchiveIcon className="w-6 h-6"/>}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Item Name (e.g., Urea Fertilizer)" className="input-field" required/>
                        <select value={category} onChange={e => setCategory(e.target.value)} className="input-field">
                            <option>Seeds</option>
                            <option>Fertilizers</option>
                            <option>Pesticides</option>
                            <option>Equipment</option>
                            <option>Other</option>
                        </select>
                        <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="Current Quantity (units)" className="input-field" required/>
                        <input type="number" value={reorderLevel} onChange={e => setReorderLevel(e.target.value)} placeholder="Reorder Level (units)" className="input-field" required/>

                        <button type="submit" className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">Add Item</button>
                    </form>
                </DashboardCard>
                <div className="lg:col-span-2">
                     <DashboardCard title="Current Stock" icon={<ArchiveIcon className="w-6 h-6"/>}>
                        <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                            {inventory.length > 0 ? inventory.map(item => {
                                const needsReorder = item.quantity <= item.reorderLevel;
                                return (
                                <div key={item.id} className={`flex items-center p-3 rounded-lg ${needsReorder ? 'bg-red-50 border-l-4 border-red-500' : 'bg-gray-50'}`}>
                                    <div className="flex-grow">
                                        <div className="flex items-center">
                                            {needsReorder && <FireIcon className="h-5 w-5 mr-2 text-red-500" />}
                                            <p className="font-medium text-text-primary">{item.name}</p>
                                        </div>
                                        <p className="text-sm text-text-secondary">{item.category}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-bold text-lg ${needsReorder ? 'text-red-600' : 'text-text-primary'}`}>
                                            {item.quantity} units
                                        </p>
                                         <p className="text-xs text-text-secondary">Reorder at {item.reorderLevel}</p>
                                    </div>
                                    <button onClick={() => handleDelete(item.id)} className="ml-4 text-gray-400 hover:text-red-500"><TrashIcon className="h-5 w-5"/></button>
                                </div>
                                );
                            }) : <p className="text-center text-text-secondary py-4">Your inventory is empty.</p>}
                        </div>
                    </DashboardCard>
                </div>
            </div>
            <style>{`.input-field { display: block; width: 100%; border-radius: 0.375rem; border: 1px solid #d1d5db; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); padding: 0.5rem 0.75rem; } .input-field:focus { outline: 2px solid transparent; outline-offset: 2px; border-color: #0ea5e9; box-shadow: 0 0 0 2px #0ea5e9; }`}</style>
        </div>
    );
};

export default InventoryManager;
