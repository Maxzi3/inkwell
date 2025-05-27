import { NavLink } from "react-router-dom";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineUserCircle,
  HiOutlineUser,
} from "react-icons/hi2";
import { MdOutlineRateReview } from "react-icons/md";

// Utility function that uses the isActive flag from NavLink
const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "flex items-center gap-3 font-medium text-base px-2 py-3 rounded-md transition-all bg-secondary  text-input"
    : "flex items-center gap-3 font-medium text-base px-2 py-3 rounded-md transition-all hover:bg-input hover:text-text-primary";

const AccountNav = () => {
  return (
    <ul className="flex flex-col gap-2">
      <NavLink to="/" className={getLinkClass}>
        <HiOutlineUser />
        Home
      </NavLink>
      <NavLink to="/profile" className={getLinkClass}>
        <HiOutlineUser />
        Profile
      </NavLink>

      <NavLink to="/createpost" className={getLinkClass}>
        <MdOutlineRateReview />
        Create Post 
      </NavLink>

      <NavLink to="/drafts" className={getLinkClass}>
        <MdOutlineRateReview />
        Drafts
      </NavLink>

      <NavLink to="/bookmarks" className={getLinkClass}>
        <HiOutlineClipboardDocumentList />
        Bookmarks
      </NavLink>

      <NavLink to="/likes" className={getLinkClass}>
        <HiOutlineUserCircle />
        Likes
      </NavLink>
    </ul>
  );
};

export default AccountNav;
