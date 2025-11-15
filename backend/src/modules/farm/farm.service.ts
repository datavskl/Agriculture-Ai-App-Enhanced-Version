import { z } from 'zod';
import { cropRotationPlans, farmerProfile, fields } from './farm.data.js';
import { CropRotationPlan, FarmerProfile, Field } from './farm.types.js';

const fieldFilterSchema = z.object({
  crop: z.string().optional(),
  soilHealth: z.enum(['excellent', 'good', 'moderate', 'poor']).optional(),
});

const rotationQuerySchema = z.object({
  fieldId: z.string(),
});

export const getFarmerProfile = (): FarmerProfile => farmerProfile;

export const getFields = (query: unknown): Field[] => {
  const filters = fieldFilterSchema.parse(query);
  return fields.filter((field) => {
    if (filters.crop && field.crop !== filters.crop) {
      return false;
    }
    if (filters.soilHealth && field.soilHealth !== filters.soilHealth) {
      return false;
    }
    return true;
  });
};

export const getRotationPlan = (query: unknown): CropRotationPlan => {
  const { fieldId } = rotationQuerySchema.parse(query);
  const plan = cropRotationPlans.find((entry) => entry.fieldId === fieldId);
  if (!plan) {
    const error = new Error(`No rotation plan found for field ${fieldId}`);
    (error as { status?: number }).status = 404;
    throw error;
  }
  return plan;
};
