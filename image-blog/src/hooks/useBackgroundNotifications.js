import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '@/store/slices/notificationSlice';
import { getRandomNotification } from '@/utils/mockData';
import { toast } from 'sonner';

/**
 * Background notification hook
 * Simulates server notifications every 15-30 seconds
 */
export const useBackgroundNotifications = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getRandomInterval = () => Math.random() * 15000 + 15000; // 15-30 seconds

    let timeoutId;

    const scheduleNextNotification = () => {
      const delay = getRandomInterval();
      
      timeoutId = setTimeout(() => {
        const notification = getRandomNotification();
        
        // Add to Redux store
        dispatch(addNotification({
          message: notification.message,
          type: notification.type,
        }));
        
        // Show toast
        if (notification.type === 'success') {
          toast.success(notification.message);
        } else if (notification.type === 'warning') {
          toast.warning(notification.message);
        } else {
          toast.info(notification.message);
        }
        
        // Schedule next notification
        scheduleNextNotification();
      }, delay);
    };

    // Start the notification cycle
    scheduleNextNotification();

    // Cleanup on unmount
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [dispatch]);
};
