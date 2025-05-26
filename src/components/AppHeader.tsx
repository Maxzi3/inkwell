import DarkmodeToggle from "../ui/DarkModeToggle";
import { HiOutlineUser } from "react-icons/hi2";


const AccountHeader = () => {
 
  return (
    <header className="bg-white  dark:bg-gray-900 text-black dark:text-white px-12 py-3 border-b border-gray-100 flex items-center justify-between">
      <h1>InkWell</h1>
      <div className="flex items-center gap-2">
      <HiOutlineUser className="w-10 h-10 text-gray-400" />
        <DarkmodeToggle />
        <p>Logout</p>
      </div>
    </header>
  );
};

export default AccountHeader;
