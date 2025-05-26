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
    ? "flex items-center gap-3 font-medium text-base px-6 py-3 rounded-md transition-all bg-gray-100 text-gray-800"
    : "flex items-center gap-3 font-medium text-base px-6 py-3 rounded-md transition-all hover:bg-gray-100 hover:text-gray-800";

const AccountNav = () => {
  return (
    <ul className="flex flex-col gap-2">
      <NavLink to="/account/profile" className={getLinkClass}>
        <HiOutlineUser />
        Profile
      </NavLink>

      <NavLink to="/account/reviews" className={getLinkClass}>
        <MdOutlineRateReview />
        Create Post
      </NavLink>

      <NavLink to="/account/drafts" className={getLinkClass}>
        <MdOutlineRateReview />
        Drafts
      </NavLink>

      <NavLink to="/account/bookmarks" className={getLinkClass}>
        <HiOutlineClipboardDocumentList />
        Bookmarks
      </NavLink>

      <NavLink to="/account/likes" className={getLinkClass}>
        <HiOutlineUserCircle />
        Likes
      </NavLink>
    </ul>
  );
};

export default AccountNav;
