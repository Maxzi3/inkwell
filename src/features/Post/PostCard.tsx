// import { formatTimeAgo } from "../../ui/helpers";
import { HiOutlineBookmark, HiOutlineHeart } from "react-icons/hi2";
import type { Post } from "../../ui/types";
import { Link } from "react-router-dom";
import { FaBookmark, FaEye, FaHeart, FaRegComment } from "react-icons/fa6";

const PostCard = ({
  post,
  currentUserId,
}: {
  post: Post;
  currentUserId: string;
}) => {
  
  const isLiked = post.likes.includes(currentUserId);
  const isBookmarked = post.bookmarks.includes(currentUserId);

  return (
    <div className=" rounded-lg p-4 mb-6">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}

      <h2 className="text-xl font-semibold">{post.title}</h2>

      <p className=" mt-2 line-clamp-3">{post.content.slice(0, 120)}...</p>

      <div className="flex items-center gap-2 mt-4 text-sm ">
        <img
          src={post.author.avatar}
          className="w-6 h-6 rounded-full"
          alt={post.author.fullName?.split(" ")[1]}
        />
        <span>{post.author.fullName?.split(" ")[1]}</span>
        <span>•</span>
        {/* <span>{formatTimeAgo(post?.createdAt)}</span> */}
        <span>5 days ago</span>
        <span>•</span>
        <span className="flex items-center gap-1">
          {post.comment?.length} <FaRegComment />
        </span>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-4 text-base">
          <span className="flex items-center gap-1">
            {isLiked ? <FaHeart /> : <HiOutlineHeart />}
            {post.likes.length}
          </span>
          <span className="flex items-center gap-1">
            {isBookmarked ? (
              <FaBookmark className="text-blue-600" />
            ) : (
              <HiOutlineBookmark />
            )}
            {post.bookmarks.length}
          </span>
          <span className="flex items-center gap-1">
            <FaEye />
            {post.views}
          </span>
        </div>

        <Link
          to={`/posts/${post.slug}`}
          className="text-blue-600 hover:underline text-sm"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
