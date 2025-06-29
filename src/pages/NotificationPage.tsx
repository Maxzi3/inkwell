import { useRef, useState } from "react";
import { useMarkAllRead } from "../features/Notification/useMarkAllRead";
import { useMarkOneRead } from "../features/Notification/useMarkOneRead ";
import { useNotifications } from "../features/Notification/useGetNotifications";
import NotificationItem from "../features/Notification/NotificationItem";
import type { Notification } from "../ui/types";
import Spinner from "../ui/Spinner";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { useOutsideClick } from "../hooks/useOutsideMouseClick";
import { useAuth } from "../contexts/AuthContext";

const NotificationPage = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useNotifications();
  const notifications: Notification[] = data || [];
  const unreadCount = notifications?.filter((n) => !n.isRead).length || 0;
  const { mutate: markAllRead } = useMarkAllRead();
  const { mutate: markOneRead } = useMarkOneRead();

  useOutsideClick(() => setIsOpen(false));

  return (
    <div
      className="relative lg:max-w-xl max-w-3xl overflow-auto scrollbar-hide mx-auto p-4 lg:p-5 pt-22"
      ref={dropdownRef}
    >
      {/* Header with dropdown toggle */}
      {isAuthenticated && (
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold relative">
              Notifications
              {unreadCount > 0 && (
                <span className="hidden  absolute -top-2 -right-10 bg-red-500 text-white text-xs rounded-full w-5 h-5 lg:flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </h2>
            <button onClick={() => setIsOpen((prev) => !prev)}>
              {isOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
            </button>
          </div>
          {notifications.length > 0 && (
            <button
              onClick={() => markAllRead()}
              className="text-sm text-blue-600 hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>
      )}

      {/* Dropdown panel with animation */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border rounded-md p-3 shadow-sm max-h-[60vh] md:max-h-[50vh] overflow-auto space-y-3 scrollbar-hide  ">
          {isLoading ? (
            <div className=" px-4 py-8">
              <Spinner />
            </div>
          ) : notifications.length === 0 ? (
            <p className=" text-center">No notifications.</p>
          ) : (
            notifications.map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
                onMarkRead={markOneRead}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
