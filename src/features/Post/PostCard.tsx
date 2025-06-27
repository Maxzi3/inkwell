import { FaEye, FaRegComment } from "react-icons/fa6";
import { Link } from "react-router-dom";
import type { Post } from "../../ui/types";
import { formatTimeAgo } from "../../ui/helpers";
import BookmarkButton from "../Bookmarks/BookmarkButton";
import LikeButton from "./LikeButton";
import PostActions from "./PostActions";
import { useEffect, useState } from "react";
import { useGetMe } from "../User/useGetMe";

const PostCard = ({ post }: { post: Post }) => {
  const [isOwnPost, setIsOwnPost] = useState(false);
  const { data: user } = useGetMe();
  useEffect(() => {
    if (user && post?.author?._id) {
      setIsOwnPost(user._id === post?.author?._id);
    }
  }, [user, post?.author?._id]);

  return (
    <div className="relative border-b border-b-border px-5 py-2 mb-4 lg:w-1/2 w-full lg:px-10 transition">
      {isOwnPost && (
        <div className="absolute top-4 right-4">
          <PostActions post={post} />
        </div>
      )}
      <div className="flex flex-col items-baseline">
        {/* Header */}
        <div className="flex justify-between lg:gap-20 items-center ">
          <div className="flex items-start gap-2 text-sm mb-2 flex-wrap sm:flex-nowrap">
            <img
              src={post.author.avatar}
              className="w-8 h-8 rounded-full object-cover mt-0.5"
              alt={post.author.fullName?.split(" ")[1]}
            />
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className="font-medium">{post.author.fullName}</span>
              <span className="hidden sm:block">•</span>
              <span className="text-xs text-gray-500">
                {formatTimeAgo(post.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <Link
          to={`/posts/${post.slug}`}
          className="text-lg font-semibold mb-1 "
        >
          {post.title}
        </Link>

        {/* Snippet */}
        <p className="text-sm mb-3 line-clamp-3 text-left">
          {post.content.split("*")[0].trim().slice(0, 120) + "..."}
        </p>

        {/* Image - shown after text if exists */}
        {post.image && (
          <img
            loading="lazy"
            src={post.image}
            alt={post.title}
            className=" max-h-60 object-contain rounded-md mb-3"
          />
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-5">
          <LikeButton post={post} />
          <BookmarkButton post={post} />
          <span className="flex items-center gap-1">
            <FaRegComment />
            {post.commentCount || 0}
          </span>
          <span className="flex items-center gap-1">
            <FaEye />
            {post.views}
          </span>
        </div>

        <Link
          to={`/posts/${post.slug}`}
          className="text-blue-600 font-medium hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
