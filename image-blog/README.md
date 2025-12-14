# Image Blog - Infinite Scroll with Background Notifications

A modern, responsive image blog application built with Next.js, featuring infinite scroll, background notifications, and dark mode support.

## 🚀 Features

- **Image Upload**: Upload multiple images with drag-and-drop support
- **Masonry Layout**: Pinterest-style responsive grid layout
- **Infinite Scroll**: Automatically loads more posts using TanStack Query
- **Background Notifications**: Simulated server notifications every 15-30 seconds
- **Dark Mode**: System-aware theme toggle
- **Image Compression**: Automatic client-side compression before storage
- **localStorage Persistence**: Uploaded images persist across sessions
- **Notification History**: Bell icon with dropdown showing last 50 notifications

## 🛠️ Tech Stack

- **Next.js 16** with App Router
- **Redux Toolkit** for state management
- **TanStack Query** for infinite scroll & data fetching
- **shadcn/ui** for UI components
- **Tailwind CSS** for styling
- **Sonner** for toast notifications
- **next-themes** for dark mode

## 🚦 Getting Started

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📖 Usage

1. **Upload Images**: Click "Upload Images" button, drag-drop or select files
2. **Infinite Scroll**: Scroll down to automatically load more posts
3. **Dark Mode**: Click sun/moon icon in header
4. **Notifications**: Click bell icon to view notification history

## 🎯 Key Implementation

### Infinite Scroll
Uses TanStack Query's `useInfiniteQuery` with Intersection Observer. Automatically fetches next page when user scrolls near bottom.

### Background Notifications
Simulated using `setTimeout` with random 15-30 second intervals. Dispatches to Redux and shows toast notifications with proper cleanup.

### Image Storage
Compresses images to 800px width at 80% quality, converts to base64, stores in localStorage. Auto-deletes oldest posts when approaching 5-10MB limit.

### State Management
Redux Toolkit with 3 slices: images, notifications, upload. TanStack Query handles server state with caching and optimistic updates.

## 📁 Project Structure

```
src/
├── apis/              # Mock API layer
├── components/        # Atomic design (atoms/molecules/organisms)
├── hooks/             # Custom hooks (TanStack Query, Intersection Observer)
├── store/             # Redux slices
├── utils/             # Helper functions
└── pages/             # Route pages
```

## 🚀 Future Improvements

- Real backend API with database
- WebSocket for real-time notifications
- Virtual scrolling for 1000+ images
- Image editing (crop, filters)
- Search and tagging functionality
- PWA with offline support

---

**Built for TradeGospel Frontend Developer Assignment**
