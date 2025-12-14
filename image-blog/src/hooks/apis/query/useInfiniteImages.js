import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchImages } from '@/apis/images';

/**
 * TanStack Query hook for infinite scroll
 * Automatically handles pagination, caching, and refetching
 */
export const useInfiniteImages = () => {
  return useInfiniteQuery({
    queryKey: ['images'],
    queryFn: ({ pageParam = 0 }) => fetchImages({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
    refetchOnWindowFocus: false,
  });
};
