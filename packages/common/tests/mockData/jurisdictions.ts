import type { Jurisdiction } from '../../src/types';

const now = new Date().toISOString();

export const CA = {
  id: '1',
  name: 'California',
  nameAbbreviation: 'CA',
  createdAt: now,
  updatedAt: now,
} as const satisfies Jurisdiction;

export const NY = {
  id: '2',
  name: 'New York',
  nameAbbreviation: 'NY',
  createdAt: now,
  updatedAt: now,
} as const satisfies Jurisdiction;

export const TX = {
  id: '3',
  name: 'Texas',
  nameAbbreviation: 'TX',
  createdAt: now,
  updatedAt: now,
} as const satisfies Jurisdiction;

export const FL = {
  id: '4',
  name: 'Florida',
  nameAbbreviation: 'FL',
  createdAt: now,
  updatedAt: now,
} as const satisfies Jurisdiction;

export const IL = {
  id: '5',
  name: 'Illinois',
  nameAbbreviation: 'IL',
  createdAt: now,
  updatedAt: now,
} as const satisfies Jurisdiction;

export const PA = {
  id: '6',
  name: 'Pennsylvania',
  nameAbbreviation: 'PA',
  createdAt: now,
  updatedAt: now,
} as const satisfies Jurisdiction;

export const OH = {
  id: '7',
  name: 'Ohio',
  nameAbbreviation: 'OH',
  createdAt: now,
  updatedAt: now,
} as const satisfies Jurisdiction;

export const GA = {
  id: '8',
  name: 'Georgia',
  nameAbbreviation: 'GA',
  createdAt: now,
  updatedAt: now,
} as const satisfies Jurisdiction;

export const NC = {
  id: '9',
  name: 'North Carolina',
  nameAbbreviation: 'NC',
  createdAt: now,
  updatedAt: now,
} as const satisfies Jurisdiction;

export const MI = {
  id: '10',
  name: 'Michigan',
  nameAbbreviation: 'MI',
  createdAt: now,
  updatedAt: now,
} as const satisfies Jurisdiction;

export const mockJurisdictions = [
  CA,
  NY,
  TX,
  FL,
  IL,
  PA,
  OH,
  GA,
  NC,
  MI,
] as const satisfies Jurisdiction[];
