import { NavLink } from "react-router-dom";

const ProfileNav = () => {
    const getLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? "underline underline-offset-[25px] font-bold"
            : "";
    return (
        <div className="border-b-2 border-b-input p-2" >
            <ul className="flex flex-row gap-8 w-9/12 p-3">
                <NavLink to='/profile/userposts' className={getLinkClass}>Posts</NavLink>
                <NavLink to='/profile/likes' className={getLinkClass}>Likes</NavLink>
                <NavLink to='/profile/bookmarks' className={getLinkClass}>Bookmarks</NavLink>
                <NavLink to='/profile/drafts' className={getLinkClass}>Drafts</NavLink>
            </ul>
        </div>
    );
};

export default ProfileNav;
