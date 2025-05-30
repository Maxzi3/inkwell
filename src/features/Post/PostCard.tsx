// import { formatTimeAgo } from "../../ui/helpers";
import type { Post } from "../../ui/types";
import { Link } from 'react-router-dom'

// currentUserId: string
// currentUserId
const PostCard = ({ post}: { post: Post;  }) => {
    
    // const isLiked = post.likes.includes(currentUserId)
    // const isBookmarked = post.bookmarks.includes(currentUserId)

    return (
        <div className=" rounded-lg p-4 mb-6">
            {post.image && (
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                />
            )}

            <h2 className="text-xl font-semibold">
                {post.title}
            </h2>

            <p className=" mt-2 line-clamp-3">
                {post.content.slice(0, 120)}...
            </p>

            <div className="flex items-center gap-2 mt-4 text-sm ">
                <img
                    src={post.author.avatar}
                    className="w-6 h-6 rounded-full"
                    alt={post.author.fullName?.split(" ")[1]}
                />
                <span>{post.author.fullName?.split(" ")[1]}</span>
                <span>•</span>
                 {/* <span>{formatTimeAgo(post?.createdAt)}</span> */}
                <span>•</span>
                <span>{post.comment?.length} comments</span>
            </div>

            <div className="flex items-center justify-between mt-4">
                {/* <div className="flex gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className={isLiked ? 'text-red-500' : ''}>💖 {post.likes.length}</span>
                    <span className={isBookmarked ? 'text-blue-500' : ''}>🔖 {post.bookmarks.length}</span>
                </div> */}

                <Link
                    to={`/posts/${post._id}`}
                className="text-blue-600 hover:underline text-sm"
        >
                Read More →
            </Link>
        </div>
    </div >
  )
}



export default PostCard

