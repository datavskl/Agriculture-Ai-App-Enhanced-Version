import { pestRisks, resourceUtilization, yieldProjections } from './analytics.data.js';
import { PestRisk, ResourceUtilization, YieldProjection } from './analytics.types.js';

export const getYieldProjections = (): YieldProjection[] => yieldProjections;

export const getPestRisks = (): PestRisk[] => pestRisks;

export const getResourceUtilization = (): ResourceUtilization[] => resourceUtilization;
