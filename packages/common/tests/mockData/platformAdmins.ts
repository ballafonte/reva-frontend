import type { User } from '../../src/types';
import {
  johnDoe,
  janeSmith,
  bobJohnson,
  aliceWilliams,
  charlieBrown,
} from './users';

export const johnDoePlatformAdmin = {
  ...johnDoe,
  platformAdminStatus: {
    id: 'fsse-44twbtw-4wbertwb-r4bw',
    userId: 'frfe3-bfewgq4-fwbfsb-4grsfd',
    isSuperAdmin: false,
    createdAt: '2025-01-15T00:00:00.000Z',
    updatedAt: '2025-12-31T00:00:00.000Z',
  },
} as const satisfies User;

export const janeSmithPlatformAdmin = {
  ...janeSmith,
  platformAdminStatus: {
    id: 'xyz99-abc88-def77-ghi66',
    userId: 'abc12-def34-ghi56-jkl78',
    isSuperAdmin: true,
    createdAt: '2025-02-20T00:00:00.000Z',
    updatedAt: '2025-12-30T00:00:00.000Z',
  },
} as const satisfies User;

export const bobJohnsonPlatformAdmin = {
  ...bobJohnson,
  platformAdminStatus: {
    id: 'yza11-bcd22-efg33-hij44',
    userId: 'mno90-pqr12-stu34-vwx56',
    isSuperAdmin: false,
    createdAt: '2025-03-10T00:00:00.000Z',
    updatedAt: '2025-12-29T00:00:00.000Z',
  },
} as const satisfies User;

export const aliceWilliamsPlatformAdmin = {
  ...aliceWilliams,
  platformAdminStatus: {
    id: 'klm55-nop66-qrs77-tuv88',
    userId: 'qrs56-tuv78-wxy90-zab12',
    isSuperAdmin: false,
    createdAt: '2025-04-05T00:00:00.000Z',
    updatedAt: '2025-12-28T00:00:00.000Z',
  },
} as const satisfies User;

export const charlieBrownPlatformAdmin = {
  ...charlieBrown,
  platformAdminStatus: {
    id: 'wxy44-zab55-cde66-efg77',
    userId: 'cde34-fgh56-ijk78-lmn90',
    isSuperAdmin: true,
    createdAt: '2025-05-12T00:00:00.000Z',
    updatedAt: '2025-12-27T00:00:00.000Z',
  },
} as const satisfies User;

export const mockPlatformAdmins = [
  johnDoePlatformAdmin,
  janeSmithPlatformAdmin,
  bobJohnsonPlatformAdmin,
  aliceWilliamsPlatformAdmin,
  charlieBrownPlatformAdmin,
] as const satisfies User[];
