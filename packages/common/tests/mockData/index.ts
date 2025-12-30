import type { Jurisdiction } from '../../src/types';

const now = new Date().toISOString();

export const CA: Jurisdiction = {
  id: '1',
  name: 'California',
  nameAbbreviation: 'CA',
  createdAt: now,
  updatedAt: now,
};

export const NY: Jurisdiction = {
  id: '2',
  name: 'New York',
  nameAbbreviation: 'NY',
  createdAt: now,
  updatedAt: now,
};

export const TX: Jurisdiction = {
  id: '3',
  name: 'Texas',
  nameAbbreviation: 'TX',
  createdAt: now,
  updatedAt: now,
};

export const FL: Jurisdiction = {
  id: '4',
  name: 'Florida',
  nameAbbreviation: 'FL',
  createdAt: now,
  updatedAt: now,
};

export const IL: Jurisdiction = {
  id: '5',
  name: 'Illinois',
  nameAbbreviation: 'IL',
  createdAt: now,
  updatedAt: now,
};

export const PA: Jurisdiction = {
  id: '6',
  name: 'Pennsylvania',
  nameAbbreviation: 'PA',
  createdAt: now,
  updatedAt: now,
};

export const OH: Jurisdiction = {
  id: '7',
  name: 'Ohio',
  nameAbbreviation: 'OH',
  createdAt: now,
  updatedAt: now,
};

export const GA: Jurisdiction = {
  id: '8',
  name: 'Georgia',
  nameAbbreviation: 'GA',
  createdAt: now,
  updatedAt: now,
};

export const NC: Jurisdiction = {
  id: '9',
  name: 'North Carolina',
  nameAbbreviation: 'NC',
  createdAt: now,
  updatedAt: now,
};

export const MI: Jurisdiction = {
  id: '10',
  name: 'Michigan',
  nameAbbreviation: 'MI',
  createdAt: now,
  updatedAt: now,
};

export const mockJurisdictions: Jurisdiction[] = [
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
];
