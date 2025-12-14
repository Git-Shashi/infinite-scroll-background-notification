import { generateMockPosts } from '@/utils/mockData';
import { compressImage, fileToBase64, clearOldImages, getStorageSize } from '@/utils/imageUtils';

const STORAGE_KEY = 'imageBlogPosts';
const PAGE_SIZE = 20;

/**
 * Fetches paginated images from localStorage + mock data
 * Simulates API call with network delay
 */
export const fetchImages = async ({ pageParam = 0 }) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    // Get stored images from localStorage
    const storedData = localStorage.getItem(STORAGE_KEY);
    const storedPosts = storedData ? JSON.parse(storedData) : [];

    // Calculate total available posts (stored + mock)
    const totalStoredPosts = storedPosts.length;
    const mockStartId = 1000; // Start mock IDs from 1000 to avoid conflicts
    
    // Calculate which posts to return for this page
    const startIndex = pageParam * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    let pagePosts = [];

    // First, serve stored posts if available
    if (startIndex < totalStoredPosts) {
      pagePosts = storedPosts.slice(startIndex, Math.min(endIndex, totalStoredPosts));
    }

    // If we need more posts to fill the page, add mock data
    if (pagePosts.length < PAGE_SIZE) {
      const remainingCount = PAGE_SIZE - pagePosts.length;
      const mockStartOffset = Math.max(0, startIndex - totalStoredPosts);
      const mockPosts = generateMockPosts(remainingCount, mockStartId + mockStartOffset);
      pagePosts = [...pagePosts, ...mockPosts];
    }

    // Determine if there are more pages
    const hasNextPage = endIndex < totalStoredPosts + 100; // Limit to 100 mock posts

    return {
      images: pagePosts,
      nextCursor: hasNextPage ? pageParam + 1 : undefined,
      totalCount: totalStoredPosts + Math.min(100, Math.max(0, 100 - totalStoredPosts)),
    };
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error('Failed to fetch images');
  }
};

/**
 * Uploads images to localStorage
 * Compresses and converts to base64
 */
export const uploadImages = async ({ files, onProgress }) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  try {
    const uploadedPosts = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Update progress
      if (onProgress) {
        onProgress(Math.round(((i + 1) / files.length) * 100));
      }

      // Compress image
      const compressedFile = await compressImage(file);
      
      // Convert to base64
      const base64 = await fileToBase64(compressedFile);

      // Create post object
      const post = {
        id: `upload-${Date.now()}-${i}`,
        imageUrl: base64,
        title: `Post #${i + 1}`,
        caption: file.name,
        timestamp: new Date().toISOString(),
        isUploaded: true,
      };

      uploadedPosts.push(post);
    }

    // Save to localStorage
    const storedData = localStorage.getItem(STORAGE_KEY);
    const existingPosts = storedData ? JSON.parse(storedData) : [];
    const updatedPosts = [...uploadedPosts, ...existingPosts];

    // Check storage size and clear old posts if needed
    const storageSize = parseFloat(getStorageSize());
    if (storageSize > 8) { // If over 8MB, clear old posts
      clearOldImages(30);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));

    return {
      success: true,
      posts: uploadedPosts,
      count: uploadedPosts.length,
    };
  } catch (error) {
    console.error('Error uploading images:', error);
    throw new Error('Failed to upload images');
  }
};

/**
 * Deletes image from localStorage
 */
export const deleteImage = async ({ id }) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) return { success: true };

    const posts = JSON.parse(storedData);
    const updatedPosts = posts.filter(post => post.id !== id);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));

    return { success: true, id };
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image');
  }
};

/**
 * Clears all images from localStorage
 */
export const clearAllImages = async () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return { success: true };
  } catch (error) {
    console.error('Error clearing images:', error);
    throw new Error('Failed to clear images');
  }
};
