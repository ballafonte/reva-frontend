import type { State } from '../types';
import { mockStates } from '../../tests/mockData';

export const getStates = async (): Promise<State[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockStates;
};

