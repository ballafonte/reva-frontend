import type { Session } from '../../src/types';

export const session1 = {
  id: 'session-1-uuid-1234-5678-90ab',
  ipAddress: '192.168.1.100',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  lastActivity: '2025-01-15T12:30:00.000Z',
  createdAt: '2025-01-15T10:00:00.000Z',
  isCurrent: true,
} as const satisfies Session;

export const session2 = {
  id: 'session-2-uuid-1234-5678-90cd',
  ipAddress: '192.168.1.101',
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  lastActivity: '2025-01-15T11:00:00.000Z',
  createdAt: '2025-01-14T09:00:00.000Z',
  isCurrent: false,
} as const satisfies Session;

export const session3 = {
  id: 'session-3-uuid-1234-5678-90ef',
  ipAddress: null,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
  lastActivity: '2025-01-14T15:00:00.000Z',
  createdAt: '2025-01-13T08:00:00.000Z',
  isCurrent: false,
} as const satisfies Session;

export const mockSessions = [
  session1,
  session2,
  session3,
] as const satisfies Session[];
