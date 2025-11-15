import { CropRotationPlan, FarmerProfile, Field } from './farm.types.js';

export const farmerProfile: FarmerProfile = {
  id: 'farmer-1',
  name: 'Rajesh Kumar',
  farmName: 'Green Valley Farms',
  location: 'Punjab, India',
  farmSize: 50,
  landType: 'Alluvial',
  primaryCrops: ['Wheat', 'Rice', 'Cotton'],
  preferences: {
    language: 'English',
    units: 'Metric',
  },
};

export const fields: Field[] = [
  {
    id: 'field-1',
    name: 'Plot A',
    crop: 'Wheat',
    area: 20,
    soilHealth: 'good',
    lastInspection: '2024-06-25',
  },
  {
    id: 'field-2',
    name: 'Plot B',
    crop: 'Rice',
    area: 15,
    soilHealth: 'excellent',
    lastInspection: '2024-06-20',
  },
  {
    id: 'field-3',
    name: 'Plot C',
    crop: 'Cotton',
    area: 15,
    soilHealth: 'moderate',
    lastInspection: '2024-06-18',
  },
];

export const cropRotationPlans: CropRotationPlan[] = [
  { fieldId: 'field-1', year: 2024, sequence: ['Wheat', 'Legumes', 'Corn'] },
  { fieldId: 'field-2', year: 2024, sequence: ['Rice', 'Vegetables', 'Fallow'] },
  { fieldId: 'field-3', year: 2024, sequence: ['Cotton', 'Soybean', 'Wheat'] },
];
