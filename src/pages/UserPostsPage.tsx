import PostCard from "../features/Post/PostCard";
import { useUserPosts } from "../features/Post/useUserPost";
import Spinner from "../ui/Spinner";
import type { Post } from "../ui/types";
import NotificationPage from "./NotificationPage";

const UserPostsDisplay = () => {
  const { data, isLoading, isError } = useUserPosts();
  const posts: Post[] = data || [];


  if (isLoading)
    return (
      <div className="px-4 flex justify-center">
        <Spinner />
      </div>
    );
    if (isError)
      return <p className="text-center text-red-500">Failed to load posts.</p>;
    if (!posts.length)
      return <p className="text-center text-gray-500">No posts yet.</p>;
  return (
    <div className="space-y-4">
      {posts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      <div className="md:block fixed hidden right-3 top-20">
        <NotificationPage />
      </div>
    </div>
  );
};

export default UserPostsDisplay;
