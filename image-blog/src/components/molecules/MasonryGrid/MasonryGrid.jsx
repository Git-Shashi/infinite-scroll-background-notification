import { ImageCard } from "@/components/atoms/ImageCard/ImageCard";
import { useEffect, useRef, useState } from "react";

/**
 * Pinterest-style masonry grid layout
 * Columns adjust based on screen size with varying image heights
 */
export function MasonryGrid({ images, onDelete }) {
  const [columnCount, setColumnCount] = useState(4);
  const containerRef = useRef(null);

  // Responsive column count
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumnCount(1);
      else if (width < 768) setColumnCount(2);
      else if (width < 1024) setColumnCount(3);
      else if (width < 1536) setColumnCount(4);
      else setColumnCount(5);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  if (!images || images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-6xl mb-4">📷</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          No images yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Upload your first image to get started
        </p>
      </div>
    );
  }

  // Distribute images across columns
  const columns = Array.from({ length: columnCount }, () => []);
  images.forEach((post, index) => {
    columns[index % columnCount].push(post);
  });

  return (
    <div 
      ref={containerRef}
      className="flex gap-4 p-4"
      style={{ width: '100%' }}
    >
      {columns.map((column, columnIndex) => (
        <div 
          key={columnIndex} 
          className="flex flex-col gap-4"
          style={{ flex: 1 }}
        >
          {column.map((post) => (
            <ImageCard key={post.id} post={post} onDelete={onDelete} />
          ))}
        </div>
      ))}
    </div>
  );
}
