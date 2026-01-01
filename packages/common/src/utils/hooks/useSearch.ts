import Fuse from 'fuse.js';
import { useMemo } from 'react';
import { sortByFirstCharAndLevenshteinDistance } from '../levenshtein';

const sortItems = <T>(items: T[] = [], key: string, searchText?: string) => {
  if (!searchText) return items;
  return items.sort((a, b) => {
    const aValue = a[key as keyof T];
    const bValue = b[key as keyof T];
    if (typeof aValue !== 'string' || typeof bValue !== 'string')
      console.warn(`Value at key "${String(key)}" is not a string`);
    return sortByFirstCharAndLevenshteinDistance(
      searchText,
      String(aValue),
      String(bValue)
    );
  });
};

export const useSearch = <T>(
  items: T[] = [],
  keys: string[] = [],
  searchText?: string
) => {
  const fuse = useMemo(() => {
    const sortedItems = sortItems(items, keys[0], searchText);
    return new Fuse(sortedItems, {
      keys,
      threshold: 0.5,
    });
  }, [items, keys, searchText]);

  if (!searchText) return items;

  return fuse.search(searchText).map((result) => result.item);
};
