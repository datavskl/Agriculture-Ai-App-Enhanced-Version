
import React, { useState, useEffect, FormEvent } from 'react';
import { MarketplaceListing } from '../types';
import DashboardCard from '../components/DashboardCard';
import ShoppingBagIcon from '../components/icons/ShoppingBagIcon';
import { MOCK_FARMER } from '../constants';
import TrashIcon from '../components/icons/TrashIcon';

const Marketplace: React.FC = () => {
    const [listings, setListings] = useState<MarketplaceListing[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState<'For Sale' | 'For Rent'>('For Sale');

    useEffect(() => {
        const storedListings = localStorage.getItem('agriSmartMarketplace');
        if (storedListings) {
            setListings(JSON.parse(storedListings));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('agriSmartMarketplace', JSON.stringify(listings));
    }, [listings]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !description.trim() || !price || Number(price) < 0) {
            alert('Please fill in all fields with valid values.');
            return;
        }
        const newListing: MarketplaceListing = {
            id: Date.now().toString(),
            title: title.trim(),
            description: description.trim(),
            price: Number(price),
            type,
            author: MOCK_FARMER.name,
            timestamp: Date.now()
        };
        setListings(prev => [newListing, ...prev]);
        setTitle('');
        setDescription('');
        setPrice('');
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            setListings(listings.filter(l => l.id !== id));
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Farmer Marketplace</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <DashboardCard title="Create New Listing" icon={<ShoppingBagIcon className="w-6 h-6"/>}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Listing Title (e.g., Organic Wheat)" className="input-field" required />
                        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description..." className="input-field h-24" required />
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price (₹)" className="input-field" required />
                        <select value={type} onChange={e => setType(e.target.value as any)} className="input-field">
                            <option>For Sale</option>
                            <option>For Rent</option>
                        </select>
                        <button type="submit" className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">Post Listing</button>
                    </form>
                </DashboardCard>
                <div className="lg:col-span-2">
                    <DashboardCard title="Current Listings" icon={<ShoppingBagIcon className="w-6 h-6"/>}>
                        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                            {listings.length > 0 ? listings.map(listing => (
                                <div key={listing.id} className="p-4 bg-gray-50 rounded-lg relative group">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-text-primary">{listing.title}</h4>
                                            <p className="text-xs text-text-secondary">By {listing.author} on {new Date(listing.timestamp).toLocaleDateString()}</p>
                                        </div>
                                        <p className="font-bold text-lg text-primary">₹{listing.price}</p>
                                    </div>
                                    <p className="text-sm text-text-secondary mt-2">{listing.description}</p>
                                    <span className={`absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full ${listing.type === 'For Sale' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{listing.type}</span>
                                    
                                    {listing.author === MOCK_FARMER.name && (
                                        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => handleDelete(listing.id)}
                                                className="p-1 text-gray-400 hover:text-red-500 bg-gray-100 rounded-full"
                                                aria-label="Delete listing"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )) : <p className="text-center text-text-secondary py-4">The marketplace is empty. Create a listing!</p>}
                        </div>
                    </DashboardCard>
                </div>
            </div>
            <style>{`.input-field { display: block; width: 100%; border-radius: 0.375rem; border: 1px solid #d1d5db; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); padding: 0.5rem 0.75rem; } .input-field:focus { outline: 2px solid transparent; outline-offset: 2px; border-color: #0ea5e9; box-shadow: 0 0 0 2px #0ea5e9; }`}</style>
        </div>
    );
};

export default Marketplace;
