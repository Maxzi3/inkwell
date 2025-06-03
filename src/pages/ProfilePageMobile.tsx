import ProfileNav from "./ProfileNav";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderWithSettings from "../components/HeaderWithSettings";
import { useGetMe } from "../features/User/useGetMe";
import Spinner from "../ui/Spinner";

const ProfilePageMobile = () => {
  const { data: user, isPending } = useGetMe();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/updatedata");
  };
  const handleClick2 = () => {
    navigate("/createpost");
  };

  if (isPending) {
    return (
      <div className="px-4 py-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <HeaderWithSettings />
      <h1 className="text-center text-xl font-medium">Profile</h1>
      <div className="flex flex-col text-center">
        <div className="flex justify-center pt-6 pb-3 z-10">
          <img
            src={user.avatar}
            alt={user.fullName}
            className="relative z-0 w-24 h-24 rounded-full  border-2 border-blue-500"
          />
        </div>
        <h1 className="text-xl font-medium">{user.fullName}</h1>
        <p>@{user.username}</p>
        <p>{user.bio}</p>
        <div className="flex justify-center gap-3 p-2">
          <button
            onClick={handleClick}
            className="flex items-center bg-input text-text-primary px-7 rounded-lg font-medium hover:bg-text-primary hover:text-input transition py-2"
          >
            Edit Profile
          </button>
          <button
            onClick={handleClick2}
            className="flex items-center bg-btnbg text-btntxt px-7 rounded-lg font-medium hover:bg-input hover:text-btnbg transition py-2"
          >
            Create Post
          </button>
        </div>
        <ProfileNav />
        <main className="space-y-3 overflow-auto max-h-[calc(100vh-250px)] pr-2">
          <div className=" ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePageMobile;
