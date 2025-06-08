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
    <div className="border-b border-b-border px-5 py-2 mb-4 md:w-1/2 w-full md:px-10 transition">
      <div className="flex flex-col items-baseline">
        {/* Header */}
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-between items-center gap-3 text-sm mb-2">
            <img
              src={post.author.avatar}
              className="w-8 h-8 rounded-full object-cover"
              alt={post.author.fullName?.split(" ")[1]}
            />
            <span className="font-medium">
              {post.author.fullName}
            </span>
            <span>•</span>
            <span className="text-xs">{formatTimeAgo(post.createdAt)}</span>
          </div>
          {isOwnPost && <PostActions post={post} />}
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold mb-1 ">{post.title}</h2>

        {/* Snippet */}
        <p className="text-sm mb-3 line-clamp-3 text-left">
          {post.content.slice(0, 160)}...
        </p>

        {/* Image - shown after text if exists */}
        {post.image && (
          <img
            loading="lazy"
            src={post.image}
            alt={post.title}
            className="w-full max-h-60 object-contain rounded-md mb-3"
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
            {post.comment?.length ?? 0}
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
