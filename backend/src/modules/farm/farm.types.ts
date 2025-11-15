export type FarmerProfile = {
  id: string;
  name: string;
  farmName: string;
  location: string;
  farmSize: number;
  landType: string;
  primaryCrops: string[];
  preferences: {
    language: string;
    units: 'Metric' | 'Imperial';
  };
};

export type Field = {
  id: string;
  name: string;
  crop: string;
  area: number;
  soilHealth: 'excellent' | 'good' | 'moderate' | 'poor';
  lastInspection: string;
};

export type CropRotationPlan = {
  fieldId: string;
  year: number;
  sequence: string[];
};
