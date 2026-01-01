import { useEffect, useState } from 'react';

const getFirstPageIndex = (itemsLength: number) => (itemsLength > 0 ? 1 : 0);

export const usePagination = <T>(items: Array<T>, itemsPerPage: number) => {
  if (itemsPerPage < 1) {
    throw new Error('itemsPerPage must be greater than 0');
  }

  const [currentPage, setCurrentPage] = useState(
    getFirstPageIndex(items.length)
  );
  const maxPage = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const firstPage = () => {
    setCurrentPage(getFirstPageIndex(items.length));
  };

  const lastPage = () => {
    setCurrentPage(maxPage);
  };

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, maxPage));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    if (items.length > 0) {
      setCurrentPage(1);
    } else {
      setCurrentPage(0);
    }
  }, [items.length]);

  return {
    firstPage,
    lastPage,
    nextPage,
    prevPage,
    currentItems,
    currentPage,
    maxPage,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === maxPage,
  };
};
