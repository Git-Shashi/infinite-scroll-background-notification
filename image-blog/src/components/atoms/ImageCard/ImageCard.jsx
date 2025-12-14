import { Card, CardContent } from "@/components/ui/card";
import { formatTimestamp } from "@/utils/imageUtils";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

/**
 * Pinterest-style image card with natural aspect ratio
 * Images maintain their original proportions
 */
export function ImageCard({ post, onDelete }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="overflow-hidden group relative hover:shadow-2xl transition-all duration-300 break-inside-avoid">
      <CardContent className="p-0">
        <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 min-h-[200px]">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
          )}
          
          {imageError ? (
            <div className="w-full h-64 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
              <p className="text-gray-500 dark:text-gray-400">Failed to load image</p>
            </div>
          ) : (
            <img
              src={post.imageUrl}
              alt={post.title}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          
          {onDelete && post.isUploaded && (
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              onClick={() => onDelete(post.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="p-3 bg-white dark:bg-gray-900">
          <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formatTimestamp(post.timestamp)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
