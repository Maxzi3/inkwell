import DarkmodeToggle from "../ui/DarkModeToggle";
import { HiOutlineUser } from "react-icons/hi2";
import Search from "./Search";
import HeaderWithSettings from "./HeaderWithSettings";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useGetMe } from "../features/User/useGetMe";
import { useAuth } from "../contexts/AuthContext";

const AccountHeader = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { data: user } = useGetMe();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  if (isLoading || isAuthenticated === undefined) return null;
  return (
    <header className="px-12 py-3 border-b-2 border-gray-200  flex items-center justify-between">
      <Logo />
      {isHomePage && <Search />}
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <div className="flex items-center pr-5">
            <HiOutlineUser className="text-3xl" />
            <span>{user?.fullName?.split(" ")[1]}</span>
          </div>
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
        <DarkmodeToggle />
        {isAuthenticated && <HeaderWithSettings />}
      </div>
    </header>
  );
};

export default AccountHeader;
