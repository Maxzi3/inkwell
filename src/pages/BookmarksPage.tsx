import { FaArrowLeftLong } from "react-icons/fa6";
import { useGetBookmarks } from "../features/Bookmarks/useGetBookmarks";
import PostCard from "../features/Post/PostCard";
import Spinner from "../ui/Spinner";
import type { Post } from "../ui/types";
import { useNavigate } from "react-router-dom";
import NotificationPage from "./NotificationPage";

const BookmarksPage = () => {
  const navigate = useNavigate();
  const { data, isPending, isError } = useGetBookmarks();
  const bookmarks: Post[] = data || [];
  const handleClick = () => {
    navigate("/");
  };

  if (isPending)
    return (
      <div className="px-4 py-8 flex justify-center">
        <Spinner />
      </div>
    );
  if (isError)
    return <p className="text-center text-red-500">Failed to load bookmark.</p>;
  if (!bookmarks.length)
    return <p className="text-center text-gray-500">No bookmark yet.</p>;

  return (
    <div className="space-y-4 mt-5 mb-[4.5rem] ">
      <div className="lg:hidden flex items-center p-4 md:p-5 justify-between w-full">
        <button onClick={handleClick}>
          <FaArrowLeftLong className="flex shrink-0 items-center" />
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-1">
          Bookmarks
        </h2>
      </div>
      {bookmarks.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      <div className="lg:block fixed hidden right-3 top-20">
        <NotificationPage />
      </div>
    </div>
  );
};

export default BookmarksPage;
