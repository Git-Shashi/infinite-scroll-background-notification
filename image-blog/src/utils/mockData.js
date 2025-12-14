/**
 * Generates mock image posts with varying dimensions (Pinterest-style)
 */
export const generateMockPosts = (count = 20, startId = 0) => {
  const posts = [];
  
  // Varying aspect ratios for Pinterest effect
  const dimensions = [
    { width: 400, height: 600 },  // Portrait
    { width: 400, height: 300 },  // Landscape
    { width: 400, height: 400 },  // Square
    { width: 400, height: 500 },  // Tall
    { width: 400, height: 700 },  // Very tall
    { width: 400, height: 350 },  // Wide
  ];
  
  const titles = [
    "Stunning Sunset View",
    "Urban Architecture",
    "Nature's Beauty",
    "Minimalist Design",
    "Travel Photography",
    "Abstract Art",
    "Street Photography",
    "Food Styling",
    "Interior Design",
    "Fashion Portrait",
    "Landscape Photography",
    "Wildlife Moment",
    "Coffee Culture",
    "Vintage Aesthetics",
    "Modern Lifestyle"
  ];
  
  for (let i = 0; i < count; i++) {
    const id = startId + i;
    const dim = dimensions[i % dimensions.length];
    const title = titles[i % titles.length];
    
    posts.push({
      id: `mock-${id}`,
      imageUrl: `https://picsum.photos/seed/${id}/${dim.width}/${dim.height}`,
      title: `${title} ${id + 1}`,
      caption: `Beautiful image #${id + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      isUploaded: false,
      width: dim.width,
      height: dim.height
    });
  }
  
  return posts;
};

/**
 * Notification messages for background simulation
 */
export const notificationMessages = [
  { message: "Image processing complete ✓", type: "success" },
  { message: "New upload ready", type: "info" },
  { message: "Storage optimized", type: "info" },
  { message: "3 new images available", type: "info" },
  { message: "Compression finished", type: "success" },
  { message: "Feed refreshed", type: "info" },
  { message: "Quality enhanced", type: "success" },
];

/**
 * Get random notification
 */
export const getRandomNotification = () => {
  return notificationMessages[
    Math.floor(Math.random() * notificationMessages.length)
  ];
};
