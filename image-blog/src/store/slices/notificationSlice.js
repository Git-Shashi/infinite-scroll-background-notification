import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    unreadCount: 0,
  },
  reducers: {
    addNotification: (state, action) => {
      const newNotification = {
        id: Date.now() + Math.random(),
        message: action.payload.message,
        type: action.payload.type || 'info',
        timestamp: new Date().toISOString(),
        read: false,
      };
      
      state.notifications = [newNotification, ...state.notifications].slice(0, 50);
      state.unreadCount += 1;
    },
    
    markAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    
    markAllAsRead: (state) => {
      state.notifications.forEach(n => n.read = true);
      state.unreadCount = 0;
    },
    
    clearAllNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  clearAllNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
