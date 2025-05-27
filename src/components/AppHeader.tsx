import DarkmodeToggle from "../ui/DarkModeToggle";
import { HiOutlineUser } from "react-icons/hi2";
import Search from "./Search";


const AccountHeader = () => {
 
  return (
    <header className="px-12 py-3 border-b-2 border-gray-200  flex items-center justify-between">
      <h1>InkWell</h1>
      <Search/>
      <div className="flex items-center gap-2">
      <HiOutlineUser className="w-10 h-10 text-gray-400" />
        <DarkmodeToggle />
        <p>Logout</p>
      </div>
    </header>
  );
};

export default AccountHeader;
