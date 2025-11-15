import React, { useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import { MOCK_FARMER } from '../constants';
import UserIcon from '../components/icons/UserIcon';

const Profile: React.FC = () => {
    // In a real application, this state would be managed globally (e.g., Context, Redux)
    const [profile, setProfile] = useState(MOCK_FARMER);
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'language' || name === 'units') {
            setProfile(prev => ({
                ...prev,
                preferences: { ...prev.preferences, [name]: value }
            }));
        } else {
            setProfile(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        // Simulate an API call to save data to Firestore
        console.log("Saving profile data:", profile);
        setTimeout(() => {
            setIsSaving(false);
            alert("Profile updated successfully!");
        }, 1000);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">My Profile</h2>
            <DashboardCard title="Edit Your Information" icon={<UserIcon className="w-6 h-6"/>}>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-text-secondary">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="farmName" className="block text-sm font-medium text-text-secondary">Farm Name</label>
                            <input
                                type="text"
                                id="farmName"
                                name="farmName"
                                value={profile.farmName}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-text-secondary">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={profile.location}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="farmSize" className="block text-sm font-medium text-text-secondary">Farm Size (in acres)</label>
                            <input
                                type="number"
                                id="farmSize"
                                name="farmSize"
                                value={profile.farmSize}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            />
                        </div>
                         <div>
                            <label htmlFor="landType" className="block text-sm font-medium text-text-secondary">Land Type</label>
                            <select
                                id="landType"
                                name="landType"
                                value={profile.landType}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            >
                                <option>Alluvial</option>
                                <option>Clay</option>
                                <option>Sandy</option>
                                <option>Loam</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="primaryCrops" className="block text-sm font-medium text-text-secondary">Primary Crops (comma-separated)</label>
                            <input
                                type="text"
                                id="primaryCrops"
                                name="primaryCrops"
                                value={profile.primaryCrops}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            />
                        </div>
                         <div>
                            <label htmlFor="language" className="block text-sm font-medium text-text-secondary">Preferred Language</label>
                            <select
                                id="language"
                                name="language"
                                value={profile.preferences.language}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            >
                                <option>English</option>
                                <option>Hindi</option>
                                <option>Punjabi</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end">
                         <button
                            type="submit"
                            disabled={isSaving}
                            className="px-6 py-2 rounded-md bg-primary text-white font-semibold hover:bg-primary-dark transition-colors disabled:bg-gray-400"
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </DashboardCard>
        </div>
    );
};

export default Profile;