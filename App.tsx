
import React, { useState, FormEvent, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Weather from './pages/Weather';
import SoilAnalysis from './pages/SoilAnalysis';
import DiseaseDetection from './pages/DiseaseDetection';
import MarketIntelligence from './pages/MarketIntelligence';
import AdminPanel from './pages/AdminPanel';
import Modal from './components/Modal';
import Profile from './pages/Profile';
import TaskManager from './pages/TaskManager';
import AgriChat from './pages/AgriChat';
import YieldPrediction from './pages/YieldPrediction';
import ResourceOptimization from './pages/ResourceOptimization';
import FarmReports from './pages/FarmReports';
import FarmMap from './pages/FarmMap';
import FinancialLedger from './pages/FinancialLedger';
import InventoryManager from './pages/InventoryManager';
import CommunityHub from './pages/CommunityHub';
import { Task } from './types';

// Import new pages
import PestPrediction from './pages/PestPrediction';
import CropRotationPlanner from './pages/CropRotationPlanner';
import EquipmentLog from './pages/EquipmentLog';
import Marketplace from './pages/Marketplace';
import ExpertConnect from './pages/ExpertConnect';
import Achievements from './pages/Achievements';
import LearningHub from './pages/LearningHub';
import VoiceCommandModal from './components/VoiceCommandModal';


const App: React.FC = () => {
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [isVoiceModalOpen, setVoiceModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const handleFeedbackSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (feedbackText.trim() === '') {
        alert("Please enter your feedback before submitting.");
        return;
    }
    console.log("User Feedback Submitted:", feedbackText);
    alert("Thank you for your feedback!");
    setFeedbackText('');
    setFeedbackModalOpen(false);
  };

  // Request Notification Permission on App Load
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);


  // Advanced Notification System for Overdue Tasks
  useEffect(() => {
    const checkTasksAndNotify = () => {
        if (Notification.permission === 'granted') {
            const storedTasks = localStorage.getItem('agriSmartTasks');
            if (storedTasks) {
                const tasks: Task[] = JSON.parse(storedTasks);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Normalize to the start of the day

                const overdueHighPriorityTasks = tasks.filter(task => 
                    !task.completed && 
                    task.isHighPriority &&
                    new Date(task.dueDate) < today
                );

                if (overdueHighPriorityTasks.length > 0) {
                    const taskTitles = overdueHighPriorityTasks.map(t => t.title).join(', ');
                    const notification = new Notification('AgriSmart: Overdue Task Alert!', {
                        body: `High priority task(s) are overdue: ${taskTitles}`,
                        icon: '/vite.svg',
                    });
                }
            }
        }
    };
    
    // Check every hour
    const intervalId = setInterval(checkTasksAndNotify, 1000 * 60 * 60); 
    // Check on initial load
    checkTasksAndNotify();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <HashRouter>
      <div className="flex h-screen bg-gray-100 font-sans">
        <Sidebar onFeedbackClick={() => setFeedbackModalOpen(true)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onVoiceClick={() => setVoiceModalOpen(true)} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/soil-analysis" element={<SoilAnalysis />} />
              <Route path="/disease-detection" element={<DiseaseDetection />} />
              <Route path="/market-intelligence" element={<MarketIntelligence />} />
              <Route path="/task-manager" element={<TaskManager />} />
              <Route path="/inventory" element={<InventoryManager />} />
              <Route path="/financials" element={<FinancialLedger />} />
              <Route path="/farm-map" element={<FarmMap />} />
              <Route path="/chat" element={<AgriChat />} />
              <Route path="/yield-prediction" element={<YieldPrediction />} />
              <Route path="/resource-optimization" element={<ResourceOptimization />} />
              <Route path="/reports" element={<FarmReports />} />
              <Route path="/community" element={<CommunityHub />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/profile" element={<Profile />} />

              {/* New Routes */}
              <Route path="/pest-prediction" element={<PestPrediction />} />
              <Route path="/crop-rotation" element={<CropRotationPlanner />} />
              <Route path="/equipment" element={<EquipmentLog />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/experts" element={<ExpertConnect />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/learning" element={<LearningHub />} />

              <Route path="/" element={<Navigate replace to="/dashboard" />} />
            </Routes>
          </main>
        </div>
      </div>

      <Modal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setFeedbackModalOpen(false)}
        title="Share Your Feedback"
      >
        <form onSubmit={handleFeedbackSubmit}>
          <p className="text-text-secondary mb-4">We'd love to hear your thoughts! What's working well? What could be improved?</p>
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            className="w-full h-32 p-2 border rounded-md bg-background focus:ring-primary focus:border-primary"
            placeholder="Enter your comments here..."
            required
            aria-label="Feedback input"
          />
          <div className="flex justify-end mt-4 space-x-2">
            <button 
              type="button" 
              onClick={() => setFeedbackModalOpen(false)}
              className="px-4 py-2 rounded-md bg-gray-200 text-text-secondary hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </Modal>

      <VoiceCommandModal isOpen={isVoiceModalOpen} onClose={() => setVoiceModalOpen(false)} />
    </HashRouter>
  );
};

export default App;