import { HiOutlineBookmark, HiOutlineHeart } from "react-icons/hi2";
import { FaBookmark, FaEye, FaHeart, FaRegComment } from "react-icons/fa6";
import { Link } from "react-router-dom";
import type { Post } from "../../ui/types";

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
    <div className="bg-white rounded-2xl shadow overflow-hidden mb-4 transition hover:shadow-lg w-11/12 mx-auto">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-56 object-cover"
        />
      )}

      <div className="p-5">
        <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
          <img
            src={post.author.avatar}
            className="w-8 h-8 rounded-full object-cover"
            alt={post.author.fullName?.split(" ")[1]}
          />
          <span>{post.author.fullName?.split(" ")[1]}</span>
          <span className="text-gray-400">•</span>
          <span>5 days ago</span>
          <span className="text-gray-400">•</span>
          <span className="flex items-center gap-1">
            {post.comment?.length} <FaRegComment />
          </span>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 leading-snug mb-2">
          {post.title}
        </h2>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {post.content.slice(0, 180)}...
        </p>

        <div className="flex justify-between items-center text-gray-600 text-sm">
          <div className="flex gap-5 items-center">
            <span className="flex items-center gap-1">
              {isLiked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <HiOutlineHeart />
              )}
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
            className="text-blue-600 hover:underline font-medium"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
