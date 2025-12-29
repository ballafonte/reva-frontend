import { useQuery } from '@tanstack/react-query';
import type { State } from '../../types';
import { getStates } from '../../api/mockStates';

export const useStatesQuery = () => {
  return useQuery<State[]>({
    queryKey: ['states'],
    queryFn: getStates,
  });
};

