import { useState, useMemo, useEffect } from 'react';

export type SortDirection = 'asc' | 'desc';

export interface SortOption {
  label: string;
  key: string;
}

interface UseListControlsOptions<T> {
  data: T[];
  searchKeys: (keyof T)[];
  pageSize?: number;
  defaultSort?: { key: keyof T; direction: SortDirection };
}

export default function useListControls<T>({
  data,
  searchKeys,
  pageSize = 10,
  defaultSort,
}: UseListControlsOptions<T>) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof T | null>(defaultSort?.key ?? null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(defaultSort?.direction ?? 'asc');
  const [page, setPage] = useState(1);

  // Reset page when search or data changes
  useEffect(() => {
    setPage(1);
  }, [search, data]);

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((item) =>
      searchKeys.some((key) => {
        const val = item[key];
        if (val == null) return false;
        return String(val).toLowerCase().includes(q);
      })
    );
  }, [data, search, searchKeys]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      let cmp: number;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        cmp = aVal - bVal;
      } else {
        cmp = String(aVal).localeCompare(String(bVal));
      }
      return sortDirection === 'desc' ? -cmp : cmp;
    });
  }, [filteredData, sortKey, sortDirection]);

  const totalItems = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const pageEnd = Math.min(pageStart + pageSize, totalItems);
  const paginatedData = sortedData.slice(pageStart, pageEnd);

  const setSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
    setPage(1);
  };

  return {
    search,
    setSearch,
    sortKey,
    sortDirection,
    setSort,
    page: safePage,
    setPage,
    totalPages,
    pageStart,
    pageEnd,
    totalItems,
    paginatedData,
    filteredData: sortedData,
  };
}
