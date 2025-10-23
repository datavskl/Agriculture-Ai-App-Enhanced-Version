
export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  forecast: { day: string; temp: number; condition: string }[];
}

export interface SoilReport {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  moisture: number;
  recommendations: string[];
}

export interface DiseaseReport {
  diseaseName: string;
  confidence: number;
  description: string;
  treatment: {
    organic: string[];
    chemical: string[];
  };
}

export interface MarketData {
    name: string;
    price: number;
}

export interface Task {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  completed: boolean;
  isHighPriority: boolean;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    image?: string; // For multimodal chat
}

export interface Transaction {
    id: string;
    date: string;
    description: string;
    type: 'Income' | 'Expense';
    amount: number;
}

export interface InventoryItem {
    id: string;
    name: string;
    category: string;
    quantity: number;
    reorderLevel: number;
}

export interface CommunityPost {
    id: string;
    title: string;
    author: string;
    content: string;
    timestamp: number;
}

// New Types for added features

export interface Equipment {
    id: string;
    name: string;
    type: string;
    purchaseDate: string;
    lastServiceDate: string;
    nextServiceDate: string;
}

export interface MarketplaceListing {
    id: string;
    title: string;
    description: string;
    author: string;
    price: number;
    type: 'For Sale' | 'For Rent';
    timestamp: number;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    unlocked: boolean;
}