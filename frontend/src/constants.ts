import { MarketData } from './types';

export const MOCK_WEATHER = {
  temperature: 28,
  humidity: 75,
  windSpeed: 12,
  precipitation: 5,
  condition: 'Sunny',
  forecast: [
    { date: '2024-07-01', high: 31, low: 24, condition: 'Sunny' },
    { date: '2024-07-02', high: 32, low: 25, condition: 'Partly Cloudy' },
    { date: '2024-07-03', high: 29, low: 23, condition: 'Showers' },
    { date: '2024-07-04', high: 30, low: 24, condition: 'Sunny' },
    { date: '2024-07-05', high: 28, low: 22, condition: 'Thunderstorms' },
  ],
};

export const MOCK_FARMER = {
  name: 'Rajesh Kumar',
  farmName: 'Green Valley Farms',
  location: 'Punjab, India',
  farmSize: 50, // in acres
  landType: 'Alluvial',
  primaryCrops: 'Wheat, Rice, Cotton',
  preferences: {
    language: 'English',
    units: 'Metric', // Can be 'Metric' or 'Imperial'
  },
};

export const MOCK_MARKET_DATA: MarketData[] = [
    { name: 'Jan', price: 2200 },
    { name: 'Feb', price: 2100 },
    { name: 'Mar', price: 2300 },
    { name: 'Apr', price: 2500 },
    { name: 'May', price: 2400 },
    { name: 'Jun', price: 2600 },
    { name: 'Jul', price: 2700 },
    { name: 'Aug', price: 2650 },
    { name: 'Sep', price: 2800 },
    { name: 'Oct', price: 2900 },
    { name: 'Nov', price: 3000 },
    { name: 'Dec', price: 2950 },
];