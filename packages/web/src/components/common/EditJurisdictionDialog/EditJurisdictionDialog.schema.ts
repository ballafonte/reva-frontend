import { z } from 'zod';

export const editJurisdictionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  nameAbbreviation: z.string().min(1, 'Name abbreviation is required'),
});

export type EditJurisdictionFormData = z.infer<typeof editJurisdictionSchema>;
