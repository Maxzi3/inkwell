import type { Post } from "../../ui/types";
import { useGetMe } from "../User/useGetMe";
import PostCard from "./PostCard";
import { useGetPosts } from "./useGetUserPost";

const AllPosts = () => {
  const { data: postsData, isPending, isError } = useGetPosts();
  const { data: user } = useGetMe();

  const posts: Post[] = postsData?.data || [];

  if (isPending) {
    return <p className="text-center text-gray-500">Loading posts...</p>;
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 ">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} currentUserId={user?.id || ""} />
      ))}
    </div>
  );
};

export default AllPosts;
