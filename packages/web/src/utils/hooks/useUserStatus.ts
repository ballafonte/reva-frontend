import { useMemo } from 'react';

type UserStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'SUSPENDED' | 'DELETED';

type ChipColor = 'success' | 'default' | 'warning';

interface UseUserStatusResult {
  color: ChipColor;
  label: string;
}

/**
 * Hook to get user status color and formatted label
 * @param status The user status string
 * @returns Object with color and formatted label
 */
export const useUserStatus = (
  status?: string | null
): UseUserStatusResult => {
  return useMemo(() => {
    const normalizedStatus = status?.toUpperCase() as UserStatus | undefined;

    switch (normalizedStatus) {
      case 'ACTIVE':
        return { color: 'success' as ChipColor, label: 'Active' };
      case 'INACTIVE':
        return { color: 'default' as ChipColor, label: 'Inactive' };
      case 'PENDING':
        return { color: 'warning' as ChipColor, label: 'Pending' };
      case 'SUSPENDED':
        return { color: 'default' as ChipColor, label: 'Suspended' };
      case 'DELETED':
        return { color: 'default' as ChipColor, label: 'Deleted' };
      default:
        return { color: 'default' as ChipColor, label: 'Unknown' };
    }
  }, [status]);
};
