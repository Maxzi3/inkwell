import NotificationPage from "../../pages/NotificationPage";
import Spinner from "../../ui/Spinner";
import type { Post } from "../../ui/types";
import PostCard from "./PostCard";
import { useGetPosts } from "./useGetPosts";

const AllPosts = () => {
  const { data: postsData, isPending, isError } = useGetPosts();

  const posts: Post[] = postsData?.data || [];

  if (isPending) {
    return (
      <div className="px-4 py-8 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 font-medium">
        Failed to load posts.
      </p>
    );
  }

  if (posts.length === 0) {
    return (
      <p className="text-center text-gray-600 col-span-full">No posts found.</p>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 mt-5 mb-10 md:border-none border-t border-t-border">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      <div className="md:block fixed hidden right-3 top-20">
        <NotificationPage />
      </div>
    </div>
  );
};

export default AllPosts;
