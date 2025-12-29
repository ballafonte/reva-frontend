import type { State } from '../../src/types';

export const CA = { name: 'California', nameAbbr: 'CA' } as const satisfies State;
export const NY = { name: 'New York', nameAbbr: 'NY' } as const satisfies State;
export const TX = { name: 'Texas', nameAbbr: 'TX' } as const satisfies State;
export const FL = { name: 'Florida', nameAbbr: 'FL' } as const satisfies State;
export const IL = { name: 'Illinois', nameAbbr: 'IL' } as const satisfies State;
export const PA = { name: 'Pennsylvania', nameAbbr: 'PA' } as const satisfies State;
export const OH = { name: 'Ohio', nameAbbr: 'OH' } as const satisfies State;
export const GA = { name: 'Georgia', nameAbbr: 'GA' } as const satisfies State;
export const NC = { name: 'North Carolina', nameAbbr: 'NC' } as const satisfies State;
export const MI = { name: 'Michigan', nameAbbr: 'MI' } as const satisfies State;

export const mockStates: State[] = [CA, NY, TX, FL, IL, PA, OH, GA, NC, MI];

