import { HiArrowRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { useGetMe } from "../features/User/useGetMe";
import { formatDate } from "../ui/helpers";



const ProfilePageDesktop = () => {
  const { data: user, isPending, isError } = useGetMe();
  console.log(user, isPending, isError);
  const isLoading = false
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/updatedata");
  };


  if (isLoading) return (
    <div className="px-4 py-8 ">
      <Spinner />
    </div>
  );

  const emailStatusBadge = {
    pending: "bg-blue-100 text-blue-800",
    verified: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  const getValueOrNil = (value) => value || "N/A";


  return (
    <div className=" px-4 py-8 md:w-[600px] w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Profile</h1>

      {/* Profile Image */}
      <div className="flex justify-center mb-6 z-10">
        <img
          src=""
          alt="test"
          className="relative z-0 w-24 h-24 rounded-full  border-2 border-blue-500"
        />
      </div>

      {/* User Info */}
      <div className="space-y-4 text-sm sm:text-base">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium">Name:</span>
          <span>{getValueOrNil(user.fullName)}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium">Username:</span>
          <span>test1</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium">Bio:</span>
          <span>test1</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium">Email:</span>
          <span>test@gmail.com</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium">Phone:</span>
          <span>{user.phoneNumber}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium w-1/2 shrink-0">Address:</span>
          <span className="text-right max-w-[60%]">Lagos Nigeria</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium">Date Joined:</span>
          <span></span>
        </div>

        {/* Email Verification Status */}
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium">Email Verified:</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold capitalize  ||
              "bg-gray-100 text-gray-800"
              }`}
          >
            pending
          </span>
        </div>

        <button
          onClick={handleClick}
          className="flex items-center gap-3 bg-blue-600 text-white  md:w-auto px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Update Profile
          <HiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ProfilePageDesktop;
