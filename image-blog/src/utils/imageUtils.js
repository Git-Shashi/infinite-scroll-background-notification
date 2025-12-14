import imageCompression from 'browser-image-compression';

/**
 * Validates if file is an image and within size limit
 */
export const validateImage = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Only JPG, PNG, GIF, WEBP allowed' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File must be less than 10MB' };
  }

  return { valid: true, error: null };
};

/**
 * Compresses image to reduce file size
 */
export const compressImage = async (file) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 800,
    useWebWorker: true,
    quality: 0.8
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Compression error:', error);
    return file;
  }
};

/**
 * Converts file to base64 string
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Calculates localStorage usage in MB
 */
export const getStorageSize = () => {
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return (total / 1024 / 1024).toFixed(2);
};

/**
 * Clears oldest images if storage is full
 */
export const clearOldImages = (keepCount = 50) => {
  try {
    const stored = localStorage.getItem('imageBlogPosts');
    if (!stored) return;

    const posts = JSON.parse(stored);
    const sortedPosts = posts.sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    const recentPosts = sortedPosts.slice(0, keepCount);
    localStorage.setItem('imageBlogPosts', JSON.stringify(recentPosts));
    
    return recentPosts.length;
  } catch (error) {
    console.error('Error clearing old images:', error);
    return 0;
  }
};

/**
 * Format timestamp to readable format
 */
export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};
