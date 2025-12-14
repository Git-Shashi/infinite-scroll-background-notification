import { Bell } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { markAsRead, markAllAsRead, clearAllNotifications } from "@/store/slices/notificationSlice";
import { formatTimestamp } from "@/utils/imageUtils";

/**
 * Notification bell with dropdown
 * Shows notification history
 */
export function NotificationBell() {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector(state => state.notifications);

  const handleMarkAsRead = (id) => {
    dispatch(markAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const handleClearAll = () => {
    dispatch(clearAllNotifications());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between p-2">
          <h3 className="font-semibold">Notifications</h3>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
              Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">
            No notifications yet
          </div>
        ) : (
          <>
            {notifications.slice(0, 10).map((notif) => (
              <DropdownMenuItem
                key={notif.id}
                className={`p-3 cursor-pointer ${!notif.read ? 'bg-blue-50 dark:bg-blue-950' : ''}`}
                onClick={() => handleMarkAsRead(notif.id)}
              >
                <div className="flex-1">
                  <p className="text-sm">{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTimestamp(notif.timestamp)}
                  </p>
                </div>
              </DropdownMenuItem>
            ))}
            
            {notifications.length > 10 && (
              <div className="p-2 text-center text-xs text-gray-500">
                Showing 10 of {notifications.length} notifications
              </div>
            )}
            
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleClearAll} className="justify-center text-red-600">
              Clear all
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
