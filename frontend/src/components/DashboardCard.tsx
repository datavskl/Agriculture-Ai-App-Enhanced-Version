
import React from 'react';

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-card rounded-xl shadow-md p-6 ${className}`}>
      <div className="flex items-center mb-4">
        <div className="bg-primary/10 p-2 rounded-full mr-4 text-primary">
            {icon}
        </div>
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      </div>
      <div className="text-text-secondary">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
