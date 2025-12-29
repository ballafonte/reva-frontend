import { useQuery } from '@tanstack/react-query';
import type { State } from '../../types';
import { getStates } from '../../api/states.api';

export const useStatesQuery = () => {
  return useQuery<State[]>({
    queryKey: ['states'],
    queryFn: getStates,
  });
};

