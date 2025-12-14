import { useEffect } from "react";
import { MasonryGrid } from "@/components/molecules/MasonryGrid/MasonryGrid";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteImage } from "@/hooks/apis/mutation/useDeleteImage";

/**
 * Image feed organism
 * Handles infinite scroll and displays masonry grid
 */
export function ImageFeed({ data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading }) {
  const { mutate: deleteImage } = useDeleteImage();

  // Flatten all pages into single array
  const allImages = data?.pages.flatMap(page => page.images) || [];

  // Intersection observer for infinite scroll
  const sentinelRef = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      deleteImage({ id });
    }
  };

  if (isLoading) {
    return (
      <div className="flex gap-4 p-4">
        {[...Array(4)].map((_, colIndex) => (
          <div key={colIndex} className="flex-1 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className={`w-full ${i % 2 === 0 ? 'h-64' : 'h-48'}`} />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <MasonryGrid images={allImages} onDelete={handleDelete} />

      {/* Infinite scroll trigger */}
      {hasNextPage && (
        <div ref={sentinelRef} className="py-8">
          {isFetchingNextPage && (
            <div className="flex gap-4 px-4">
              {[...Array(4)].map((_, colIndex) => (
                <div key={colIndex} className="flex-1 space-y-4">
                  <Skeleton className={`w-full ${colIndex % 2 === 0 ? 'h-56' : 'h-40'}`} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!hasNextPage && allImages.length > 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No more images to load</p>
        </div>
      )}
    </div>
  );
}
