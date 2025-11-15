export type YieldProjection = {
  crop: string;
  expectedYield: number;
  unit: string;
  confidence: number;
};

export type PestRisk = {
  pest: string;
  riskLevel: 'low' | 'moderate' | 'high';
  recommendedAction: string;
};

export type ResourceUtilization = {
  resource: string;
  utilization: number;
  unit: string;
};
