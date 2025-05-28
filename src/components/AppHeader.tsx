import DarkmodeToggle from "../ui/DarkModeToggle";
import { HiOutlineUser } from "react-icons/hi2";
import Search from "./Search";
import HeaderWithSettings from "./HeaderWithSettings";
import { useLocation } from "react-router-dom";


const AccountHeader = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <header className="px-12 py-3 border-b-2 border-gray-200  flex items-center justify-between">
      <h1>InkWell</h1>
      {isHomePage && <Search />}
      <div className="flex items-center gap-2">
        <div className="flex items-center pr-5">
        <HiOutlineUser className="text-3xl" />
        <span>Maxwell</span>
      </div>
      <DarkmodeToggle />
      <HeaderWithSettings />
    </div>
    </header >
  );
};

export default AccountHeader;
