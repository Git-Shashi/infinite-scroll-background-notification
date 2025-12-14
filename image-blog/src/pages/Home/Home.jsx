import { useDispatch } from "react-redux";
import { ImageFeed } from "@/components/organisms/ImageFeed/ImageFeed";
import { ImageUploader } from "@/components/molecules/ImageUploader/ImageUploader";
import { UploadButton } from "@/components/atoms/UploadButton/UploadButton";
import { ThemeToggle } from "@/components/molecules/ThemeToggle/ThemeToggle";
import { NotificationBell } from "@/components/molecules/NotificationBell/NotificationBell";
import { setModalOpen } from "@/store/slices/uploadSlice";
import { useInfiniteImages } from "@/hooks/apis/query/useInfiniteImages";
import { useBackgroundNotifications } from "@/hooks/useBackgroundNotifications";
import { ImageIcon } from "lucide-react";

/**
 * Home page component
 * Main landing page with image feed and upload functionality
 */
export function Home() {
  const dispatch = useDispatch();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteImages();

  // Start background notifications
  useBackgroundNotifications();

  const handleUploadClick = () => {
    dispatch(setModalOpen(true));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header - Pinterest style */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
        <div className="max-w-[1920px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ImageIcon className="h-7 w-7 text-red-600" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                ImagePin
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <NotificationBell />
              <ThemeToggle />
              <UploadButton onClick={handleUploadClick} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Full width like Pinterest */}
      <main className="max-w-[1920px] mx-auto">
        <ImageFeed
          data={data}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoading}
        />
      </main>

      {/* Upload Modal */}
      <ImageUploader />
    </div>
  );
}
