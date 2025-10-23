
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_FARMER } from '../constants';
import BellIcon from './icons/BellIcon';
import MicrophoneIcon from './icons/MicrophoneIcon';

interface HeaderProps {
    onVoiceClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onVoiceClick }) => {
    const [notificationStatus, setNotificationStatus] = useState(Notification.permission);

    // Listen for changes in notification permission
    useEffect(() => {
        const updateStatus = () => setNotificationStatus(Notification.permission);
        // A more robust way would be to use the Permissions API, but for simplicity, we'll just update on visibility change
        document.addEventListener("visibilitychange", updateStatus);
        return () => {
            document.removeEventListener("visibilitychange", updateStatus);
        };
    }, []);

    const handleNotificationClick = () => {
        if (Notification.permission === 'granted') {
            new Notification('AgriSmart Notifications', {
                body: 'Notifications are enabled and working!',
                icon: '/vite.svg',
            });
        } else if (Notification.permission === 'denied') {
            alert('Notifications are blocked. Please enable them in your browser or system settings to receive critical alerts.');
        } else {
            alert('Please grant permission to receive notifications. The app requested this when it first loaded.');
        }
    };


  return (
    <header className="flex items-center justify-between p-4 bg-card border-b">
      <h1 className="text-xl font-semibold text-text-primary">Welcome, {MOCK_FARMER.name}!</h1>
      <div className="flex items-center space-x-4">
        <button 
            onClick={onVoiceClick} 
            className="text-gray-500 hover:text-primary"
            aria-label="Activate voice commands"
        >
            <MicrophoneIcon className="h-6 w-6"/>
        </button>
        <button 
            onClick={handleNotificationClick} 
            className="relative text-gray-500 hover:text-primary"
            aria-label="Notification status"
        >
            <BellIcon className="h-6 w-6"/>
            {notificationStatus === 'granted' && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white"></span>}
            {notificationStatus === 'denied' && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>}
        </button>
        <Link to="/profile" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
            <div className="text-right">
                <p className="text-sm font-medium text-text-primary">{MOCK_FARMER.farmName}</p>
                <p className="text-xs text-text-secondary">{MOCK_FARMER.location}</p>
            </div>
            <img
            className="h-10 w-10 rounded-full object-cover"
            src={`https://i.pravatar.cc/150?u=${MOCK_FARMER.name}`}
            alt="Farmer profile"
            />
        </Link>
      </div>
    </header>
  );
};

export default Header;