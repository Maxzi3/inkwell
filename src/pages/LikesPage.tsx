import PostCard from "../features/Post/PostCard";
import { useGetLikes } from "../features/Post/useGetLikes";
import Spinner from "../ui/Spinner";
import type { Post } from "../ui/types";
import NotificationPage from "./NotificationPage";

const LikesPage = () => {
  const { data, isPending, isError } = useGetLikes();
  const likes: Post[] = data || [];

  if (isPending)
    return (
      <div className="px-4  flex justify-center">
        <Spinner />
      </div>
    );
  if (isError)
    return <p className="text-center text-red-500">Failed to load bookmark.</p>;
  if (!likes.length)
    return <p className="text-center text-gray-500">No bookmark yet.</p>;
  return (
    <div className="space-y-4 mt-5 mb-[4.5rem] ">
      {likes.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      <div className="md:block fixed hidden right-3 top-20">
        <NotificationPage />
      </div>
    </div>
  );
};

export default LikesPage;
