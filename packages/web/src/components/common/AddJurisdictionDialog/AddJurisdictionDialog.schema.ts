import { z } from 'zod';

export const addJurisdictionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  nameAbbreviation: z.string().min(1, 'Name abbreviation is required'),
});

export type AddJurisdictionFormData = z.infer<typeof addJurisdictionSchema>;
