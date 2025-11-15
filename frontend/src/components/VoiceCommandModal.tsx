
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import MicrophoneIcon from './icons/MicrophoneIcon';

interface VoiceCommandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceCommandModal: React.FC<VoiceCommandModalProps> = ({ isOpen, onClose }) => {
    const [permissionStatus, setPermissionStatus] = useState<PermissionState>('prompt');

    useEffect(() => {
        if (isOpen && navigator.permissions) {
            navigator.permissions.query({ name: 'microphone' as PermissionName }).then((permission) => {
                setPermissionStatus(permission.state);
                permission.onchange = () => setPermissionStatus(permission.state);
            });
        }
    }, [isOpen]);


  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Voice Commands (Coming Soon)"
    >
        <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
                <MicrophoneIcon className="h-6 w-6 text-primary" />
            </div>
            <p className="text-text-secondary mb-4">
                Soon, you'll be able to manage your farm hands-free! Just say "Hey AgriSmart" followed by a command.
            </p>

            <div className="text-left bg-background p-4 rounded-lg">
                <p className="font-semibold text-text-primary mb-2">Example Commands:</p>
                <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                    <li>"What's the weather like today?"</li>
                    <li>"Show me my high-priority tasks."</li>
                    <li>"Log a new expense: 1500 rupees for seeds."</li>
                    <li>"Scan this leaf for diseases."</li>
                </ul>
            </div>
            
             <div className="mt-4 text-sm">
                {permissionStatus === 'prompt' && <p className="text-yellow-600">To use this feature in the future, we'll need access to your microphone.</p>}
                {permissionStatus === 'denied' && <p className="text-red-600">Microphone access is denied. Please enable it in your browser settings to use voice commands.</p>}
                {permissionStatus === 'granted' && <p className="text-green-600">Microphone access is enabled. You're all set!</p>}
            </div>

             <div className="mt-6">
                <button 
                    type="button" 
                    onClick={onClose}
                    className="w-full px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors"
                >
                    Got It
                </button>
            </div>
        </div>
    </Modal>
  );
};

export default VoiceCommandModal;