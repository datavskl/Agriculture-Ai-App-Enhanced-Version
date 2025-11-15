import { PestRisk, ResourceUtilization, YieldProjection } from './analytics.types.js';

export const yieldProjections: YieldProjection[] = [
  { crop: 'Wheat', expectedYield: 3.2, unit: 'tonnes/acre', confidence: 0.82 },
  { crop: 'Rice', expectedYield: 2.8, unit: 'tonnes/acre', confidence: 0.78 },
  { crop: 'Cotton', expectedYield: 1.5, unit: 'tonnes/acre', confidence: 0.7 },
];

export const pestRisks: PestRisk[] = [
  {
    pest: 'Aphids',
    riskLevel: 'moderate',
    recommendedAction: 'Inspect cotton fields twice weekly and apply neem-based biopesticide if infestation increases.',
  },
  {
    pest: 'Stem borer',
    riskLevel: 'low',
    recommendedAction: 'Monitor pheromone traps and maintain field sanitation.',
  },
];

export const resourceUtilization: ResourceUtilization[] = [
  { resource: 'Water', utilization: 68, unit: '%' },
  { resource: 'Fertilizer', utilization: 54, unit: '%' },
  { resource: 'Labor', utilization: 72, unit: '%' },
];
