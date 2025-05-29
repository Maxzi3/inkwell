import type { Post } from "../../ui/types";
import PostCard from './PostCard'
import { useGetPosts } from './useGetUserPost'

const AllPosts = () => {
  const { data, isPending, isError } = useGetPosts()
  const posts: Post[] = data?.data || []
  // currentUserId={user?.id || ''}

  if (isPending) return <p className="text-center">Loading posts...</p>
  if (isError) return <p className="text-center text-red-500">Failed to load posts.</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))
      ) : (
        <p className="text-center col-span-full">No posts found.</p>
      )}
    </div>
  )
}

export default AllPosts