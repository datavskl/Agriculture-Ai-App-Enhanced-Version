import { MarketData } from './types';

export const MOCK_WEATHER = {
  temperature: 28,
  humidity: 75,
  windSpeed: 12,
  precipitation: 5,
  forecast: [
    { day: 'Mon', temp: 29, condition: 'Sunny' },
    { day: 'Tue', temp: 30, condition: 'Partly Cloudy' },
    { day: 'Wed', temp: 27, condition: 'Showers' },
    { day: 'Thu', temp: 31, condition: 'Sunny' },
    { day: 'Fri', temp: 28, condition: 'Thunderstorms' },
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