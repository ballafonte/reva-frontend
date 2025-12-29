import type { State } from '../types';
import { mockStates } from '../mocks/states';

export const getStates = async (): Promise<State[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockStates;
};

