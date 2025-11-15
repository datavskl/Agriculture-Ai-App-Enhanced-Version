
import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from './icons/HomeIcon';
import SunIcon from './icons/SunIcon';
import BeakerIcon from './icons/BeakerIcon';
import LeafIcon from './icons/LeafIcon';
import ChartBarIcon from './icons/ChartBarIcon';
import CogIcon from './icons/CogIcon';
import ChatBubbleIcon from './icons/ChatBubbleIcon';
import ClipboardListIcon from './icons/ClipboardListIcon';
import ChatAlt2Icon from './icons/ChatAlt2Icon';
import TrendingUpIcon from './icons/TrendingUpIcon';
import CalculatorIcon from './icons/CalculatorIcon';
import DocumentReportIcon from './icons/DocumentReportIcon';
import MapIcon from './icons/MapIcon';
import CashIcon from './icons/CashIcon';
import ArchiveIcon from './icons/ArchiveIcon';
import UsersIcon from './icons/UsersIcon';
import BugIcon from './icons/BugIcon';
import RefreshIcon from './icons/RefreshIcon';
import WrenchScrewdriverIcon from './icons/WrenchScrewdriverIcon';
import ShoppingBagIcon from './icons/ShoppingBagIcon';
import AcademicCapIcon from './icons/AcademicCapIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import SparklesIcon from './icons/SparklesIcon';


interface SidebarProps {
    onFeedbackClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onFeedbackClick }) => {
    const navLinkClasses = 'flex items-center px-4 py-3 text-gray-200 hover:bg-sky-500 transition-colors duration-200 rounded-md';
    const activeNavLinkClasses = 'bg-sky-600 font-bold';
    const buttonClasses = `${navLinkClasses} w-full text-left`;
    const sectionHeaderClasses = 'px-4 pt-4 pb-2 text-xs font-semibold text-sky-200 uppercase tracking-wider';

    return (
        <div className="hidden md:flex flex-col w-64 bg-sky-700 text-white">
            <div className="flex items-center justify-center h-20 border-b border-sky-600">
                <LeafIcon className="h-8 w-8 mr-2" />
                <h1 className="text-2xl font-bold">AgriSmart</h1>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                <NavLink to="/dashboard" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <HomeIcon className="h-6 w-6 mr-3" />
                    Dashboard
                </NavLink>

                <p className={sectionHeaderClasses}>Core Operations</p>
                <NavLink to="/task-manager" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <ClipboardListIcon className="h-6 w-6 mr-3" />
                    Task Manager
                </NavLink>
                <NavLink to="/inventory" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <ArchiveIcon className="h-6 w-6 mr-3" />
                    Inventory
                </NavLink>
                 <NavLink to="/equipment" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <WrenchScrewdriverIcon className="h-6 w-6 mr-3" />
                    Equipment Log
                </NavLink>
                <NavLink to="/financials" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <CashIcon className="h-6 w-6 mr-3" />
                    Financial Ledger
                </NavLink>
                 <NavLink to="/farm-map" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <MapIcon className="h-6 w-6 mr-3" />
                    Farm Map
                </NavLink>

                <p className={sectionHeaderClasses}>Advanced Intelligence</p>
                 <NavLink to="/chat" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <ChatAlt2Icon className="h-6 w-6 mr-3" />
                    Agri-Chat
                </NavLink>
                <NavLink to="/weather" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <SunIcon className="h-6 w-6 mr-3" />
                    Weather Center
                </NavLink>
                <NavLink to="/soil-analysis" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <BeakerIcon className="h-6 w-6 mr-3" />
                    Soil Analysis
                </NavLink>
                <NavLink to="/disease-detection" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <LeafIcon className="h-6 w-6 mr-3" />
                    Disease Detection
                </NavLink>
                <NavLink to="/pest-prediction" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <BugIcon className="h-6 w-6 mr-3" />
                    Pest Prediction
                </NavLink>
                <NavLink to="/market-intelligence" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <ChartBarIcon className="h-6 w-6 mr-3" />
                    Market Intelligence
                </NavLink>
                <NavLink to="/yield-prediction" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <TrendingUpIcon className="h-6 w-6 mr-3" />
                    Yield Prediction
                </NavLink>
                <NavLink to="/resource-optimization" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <CalculatorIcon className="h-6 w-6 mr-3" />
                    Resource Optimizer
                </NavLink>
                 <NavLink to="/crop-rotation" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <RefreshIcon className="h-6 w-6 mr-3" />
                    Crop Rotation Planner
                </NavLink>
                 <NavLink to="/reports" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <DocumentReportIcon className="h-6 w-6 mr-3" />
                    Farm Reports
                </NavLink>

                <p className={sectionHeaderClasses}>Collaboration</p>
                <NavLink to="/community" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <UsersIcon className="h-6 w-6 mr-3" />
                    Knowledge Hub
                </NavLink>
                 <NavLink to="/marketplace" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <ShoppingBagIcon className="h-6 w-6 mr-3" />
                    Marketplace
                </NavLink>
                 <NavLink to="/experts" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <ShieldCheckIcon className="h-6 w-6 mr-3" />
                    Expert Connect
                </NavLink>

                <p className={sectionHeaderClasses}>Personal</p>
                <NavLink to="/learning" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <AcademicCapIcon className="h-6 w-6 mr-3" />
                    Learning Hub
                </NavLink>
                <NavLink to="/achievements" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <SparklesIcon className="h-6 w-6 mr-3" />
                    Achievements
                </NavLink>


            </nav>
            <div className="px-4 py-4 border-t border-sky-600 space-y-2">
                 <button onClick={onFeedbackClick} className={buttonClasses}>
                    <ChatBubbleIcon className="h-6 w-6 mr-3" />
                    Feedback
                </button>
                 <NavLink to="/admin" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                    <CogIcon className="h-6 w-6 mr-3" />
                    Admin Panel
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;