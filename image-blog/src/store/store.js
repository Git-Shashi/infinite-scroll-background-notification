import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './slices/imageSlice';
import notificationReducer from './slices/notificationSlice';
import uploadReducer from './slices/uploadSlice';

export const store = configureStore({
  reducer: {
    images: imageReducer,
    notifications: notificationReducer,
    upload: uploadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['upload/setSelectedFiles'],
        ignoredActionPaths: ['payload.files'],
        ignoredPaths: ['upload.selectedFiles'],
      },
    }),
});
