import { z } from 'zod';

const organizationStatusEnum = z.enum([
  'ACTIVE',
  'INACTIVE',
  'PENDING',
  'SUSPENDED',
  'DELETED',
]);

export const editOrganizationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  status: organizationStatusEnum.optional(),
});

export type EditOrganizationFormData = z.infer<typeof editOrganizationSchema>;

