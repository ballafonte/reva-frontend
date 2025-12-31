import type { User } from '../../src/types';

export const johnDoe = {
  id: 'frfe3-bfewgq4-fwbfsb-4grsfd',
  email: 'john.doe@example.com',
  status: 'ACTIVE',
  updatedAt: '2025-12-31T00:00:00.000Z',
  createdAt: '2025-01-15T00:00:00.000Z',
} as const satisfies User;

export const janeSmith = {
  id: 'abc12-def34-ghi56-jkl78',
  email: 'jane.smith@example.com',
  status: 'ACTIVE',
  updatedAt: '2025-12-30T00:00:00.000Z',
  createdAt: '2025-02-20T00:00:00.000Z',
} as const satisfies User;

export const bobJohnson = {
  id: 'mno90-pqr12-stu34-vwx56',
  email: 'bob.johnson@example.com',
  status: 'ACTIVE',
  updatedAt: '2025-12-29T00:00:00.000Z',
  createdAt: '2025-03-10T00:00:00.000Z',
} as const satisfies User;

export const aliceWilliams = {
  id: 'qrs56-tuv78-wxy90-zab12',
  email: 'alice.williams@example.com',
  status: 'ACTIVE',
  updatedAt: '2025-12-28T00:00:00.000Z',
  createdAt: '2025-04-05T00:00:00.000Z',
} as const satisfies User;

export const charlieBrown = {
  id: 'cde34-fgh56-ijk78-lmn90',
  email: 'charlie.brown@example.com',
  status: 'ACTIVE',
  updatedAt: '2025-12-27T00:00:00.000Z',
  createdAt: '2025-05-12T00:00:00.000Z',
} as const satisfies User;

export const mockUsers = [
  johnDoe,
  janeSmith,
  bobJohnson,
  aliceWilliams,
  charlieBrown,
] as const satisfies User[];
