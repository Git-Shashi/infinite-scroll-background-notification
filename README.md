# Infinite Scroll Image Blog with Background Notifications

A Pinterest-style image blog application built with Next.js that features infinite scrolling, background notifications, and modern UI design.

## 🚀 Live Demo

[Your Deployed URL Here]

## 📋 Features

- **Multiple Image Upload**: Upload multiple images simultaneously with drag-and-drop support
- **Pinterest-Style Masonry Layout**: Responsive column-based grid that adjusts from 1-5 columns based on screen width
- **Infinite Scroll**: Seamless loading of more images as you scroll using TanStack Query
- **Background Notifications**: Simulated notifications appear every 15-30 seconds using setTimeout
- **Dark Mode**: Full dark mode support with theme persistence
- **Image Compression**: Client-side image compression before storing
- **localStorage Persistence**: Images are stored locally and persist across sessions
- **Delete Functionality**: Remove uploaded images with optimistic updates
- **Responsive Design**: Mobile-first design that works on all screen sizes

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **State Management**: Redux Toolkit
- **Data Fetching**: TanStack Query (React Query)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (lightweight, copies code into project)
- **Icons**: Lucide React
- **Theme**: next-themes for dark mode
- **Notifications**: Sonner for toast notifications
- **Image Processing**: browser-image-compression

## 📁 Project Structure

```
image-blog/
├── src/
│   ├── apis/
│   │   └── images.js                 # Mock API layer (fetch, upload, delete)
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── ImageCard/           # Individual image card component
│   │   │   └── UploadButton/        # Upload trigger button
│   │   ├── molecules/
│   │   │   ├── ImageUploader/       # Upload modal with drag-drop
│   │   │   ├── MasonryGrid/         # Pinterest-style column layout
│   │   │   ├── NotificationBell/    # Notification dropdown
│   │   │   └── ThemeToggle/         # Dark mode toggle
│   │   ├── organisms/
│   │   │   └── ImageFeed/           # Main feed with infinite scroll
│   │   └── ui/                      # shadcn/ui components
│   ├── context/
│   │   └── ThemeContext.jsx         # Theme provider
│   ├── hooks/
│   │   ├── apis/
│   │   │   ├── mutation/
│   │   │   │   ├── useDeleteImage.js
│   │   │   │   └── useUploadImages.js
│   │   │   └── query/
│   │   │       └── useInfiniteImages.js
│   │   ├── context/
│   │   │   └── useTheme.js
│   │   ├── useBackgroundNotifications.js
│   │   └── useIntersectionObserver.js
│   ├── store/
│   │   ├── store.js                 # Redux store configuration
│   │   └── slices/
│   │       ├── imageSlice.js        # Image CRUD operations
│   │       ├── notificationSlice.js # Notification queue
│   │       └── uploadSlice.js       # Upload UI state
│   ├── utils/
│   │   ├── imageUtils.js            # Image validation, compression
│   │   └── mockData.js              # Mock post generator
│   └── pages/
       └── Home/                     # Main home page
```

## 🎯 Assignment Requirements Met

### ✅ Core Requirements

1. **Multiple Image Upload**
   - Implemented with drag-and-drop interface
   - Preview before upload
   - Progress indicator
   - Client-side compression to reduce storage size

2. **Masonry Layout (Pinterest-style)**
   - True column-based masonry grid
   - Images maintain natural aspect ratios
   - Responsive columns (1-5 based on screen size)
   - Smooth hover effects with scale animation

3. **Infinite Scroll**
   - Implemented using TanStack Query's `useInfiniteQuery`
   - Intersection Observer API for scroll detection
   - Loads 20 posts per page
   - Smooth loading states with skeleton UI

4. **Background Notifications**
   - Uses `setTimeout` with recursive calls (15-30 second intervals)
   - Displays both toast notifications and persistent bell dropdown
   - Notification history stored in Redux
   - Proper cleanup on component unmount

5. **Data Persistence**
   - localStorage for uploaded images
   - Stores images as compressed base64
   - Auto-cleanup of old images when approaching storage limit
   - Theme preference persistence

### 🔧 Technical Implementation Highlights

#### Infinite Scroll Architecture
```javascript
// useInfiniteQuery configuration
useInfiniteQuery({
  queryKey: ['images'],
  queryFn: fetchImages,
  initialPageParam: 0,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
  staleTime: 5 * 60 * 1000,
  refetchOnWindowFocus: false
})
```

#### Background Notifications Logic
```javascript
// Recursive setTimeout pattern
const scheduleNextNotification = () => {
  const delay = Math.random() * (30000 - 15000) + 15000;
  timeoutRef.current = setTimeout(() => {
    // Dispatch notification
    dispatch(addNotification(notification));
    toast.success(message);
    // Schedule next
    scheduleNextNotification();
  }, delay);
};
```

#### Storage Management
- Images compressed to 800px width, 80% quality
- Base64 encoding for localStorage
- Monitors storage size (5-10MB limit)
- Keeps most recent 50 images

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Git-Shashi/infinite-scroll-background-notification.git

# Navigate to project directory
cd infinite-scroll-background-notification/image-blog

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🎨 Key Features Explained

### 1. Masonry Grid Layout
The layout uses a column-based approach where images are distributed across columns based on index, creating a natural Pinterest-style waterfall effect. Each column is a flex container that stacks images vertically.

### 2. Image Upload Flow
1. User selects/drops images
2. Client-side validation (type, size)
3. Compression to 800px width
4. Convert to base64
5. Store in localStorage
6. Update Redux state
7. Optimistic UI update

### 3. Infinite Scroll Mechanism
- Sentinel div placed at bottom of feed
- Intersection Observer watches sentinel
- When visible, triggers `fetchNextPage()`
- TanStack Query handles pagination state
- New posts appended to existing data

### 4. Background Notification System
- Simulates real-time events using `setTimeout`
- Random delay between 15-30 seconds
- Generates contextual messages
- Stores in Redux for history
- Visual toast + persistent bell indicator

## 🧪 Testing the Application

1. **Upload Images**: Click "Upload Images" button or drag-drop files
2. **Scroll**: Scroll down to trigger infinite loading
3. **Notifications**: Wait 15-30 seconds for background notifications
4. **Dark Mode**: Toggle theme using sun/moon icon
5. **Delete**: Hover over uploaded images and click trash icon
6. **Responsive**: Resize browser to see column adjustments

## 📊 Performance Optimizations

- Image lazy loading with `loading="lazy"`
- Intersection Observer for efficient scroll detection
- Image compression reduces storage and bandwidth
- Optimistic updates for instant UI feedback
- Debounced resize handler for column calculations
- TanStack Query caching reduces unnecessary fetches

## 🎓 Learning Outcomes

This project demonstrates:
- Advanced React patterns (custom hooks, context)
- Async operation handling with TanStack Query
- State management with Redux Toolkit
- localStorage API usage and limitations
- Intersection Observer API
- File handling and image compression
- CSS Grid and Flexbox mastery
- Responsive design principles
- Dark mode implementation

## 🤝 Contributing

This is a assignment project for TradeGospel Frontend Developer position.

## 👨‍💻 Author

**Shashi Kumar**
- GitHub: [@Git-Shashi](https://github.com/Git-Shashi)

## 📝 License

This project is open source and available under the MIT License.

---

**Note**: This application uses mock data from Picsum Photos API and localStorage for demonstration purposes. In a production environment, you would connect to a real backend API with proper image storage solutions like AWS S3 or Cloudinary.
