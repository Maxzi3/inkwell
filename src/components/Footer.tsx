import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlinePlus,
  HiOutlineBell,
} from "react-icons/hi2";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineBookmark } from "react-icons/hi";
import { useAuth } from "../contexts/AuthContext";
import { useNotifications } from "../features/Notification/useGetNotifications";
import type { Notification } from "../ui/types";

const Footer = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { data } = useNotifications();
  const notifications: Notification[] = data || [];
  const unreadCount = notifications?.filter((n) => !n.isRead).length || 0;

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-secondary" : "text-gray-400 hover:text-blue-600";
  if (isLoading || isAuthenticated === undefined) return null;
  return (
    <div className="fixed bottom-0 left-0 shadow-t-md w-full py-2 border-t border-gray-300 opacity-95 backdrop-blur-md">
      <ul className="md:hidden  flex justify-between items-center px-5 py-2 text-2xl">
        {isAuthenticated ? (
          <>
            <NavLink to="/" className={getLinkClass}>
              <HiOutlineHome />
            </NavLink>
            <NavLink to="/bookmarks" className={getLinkClass}>
              <HiOutlineBookmark />
            </NavLink>
            <NavLink to="/createpost" className={getLinkClass}>
              <HiOutlinePlus className="text-3xl" />
            </NavLink>
            <NavLink to="/notification" className={` relative ${getLinkClass}`}>
              <HiOutlineBell />
              {unreadCount > 0 && (
                <span className="absolute bottom-4 left-3 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </NavLink>
            <NavLink to="/profile/userposts" className={getLinkClass}>
              <HiOutlineUser />
            </NavLink>
          </>
        ) : (
          <div className="flex justify-between flex-1 gap-3">
            <Link
              to="/login"
              className="bg-secondary text-primary hover:text-secondary hover:bg-input flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em]"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-secondary text-primary hover:text-secondary hover:bg-input  flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em]"
            >
              Sign Up
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Footer;
