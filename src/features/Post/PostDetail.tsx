import { useNavigate, useParams } from "react-router-dom";
import { useGetPostBySlug } from "./useGetPostBySlug";
import { formatTimeAgo } from "../../ui/helpers";
import { FaArrowLeftLong, FaEye, FaRegComment } from "react-icons/fa6";
import type { JSX } from "react";
import BookmarkButton from "../Bookmarks/BookmarkButton";
import LikeButton from "./LikeButton";
import Spinner from "../../ui/Spinner";
import CommentList from "../Comments/CommentList";
import CommentForm from "../Comments/CommentForm";

const IconWithCount = ({
  icon,
  count,
}: {
  icon: JSX.Element;
  count: number;
}) => (
  <span className="flex items-center gap-1 ">
    {icon}
    {count}
  </span>
);

const PostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: post, isPending, isError } = useGetPostBySlug(slug!);
  console.log(post)
 

  const handleGoBack = () => navigate('/');

  if (isPending)
    return (
      <div className="px-4 py-8 flex justify-center">
        <Spinner />
      </div>
    );
  if (isError || !post)
    return <p className="text-center text-red-500">Post not found.</p>;

  return (
    <div className="px-4 lg:px-20 pb-20 md:w-[800px] space-y-4 lg:py-4 py-22">
      {/* Back Button */}
      <button
        onClick={handleGoBack}
        className="flex items-center gap-2 hover:text-blue-600 hover:underline my-6"
      >
        <FaArrowLeftLong />
        Back
      </button>

      {/* Author Info */}
      <div className="flex gap-4 items-center mb-6">
        <img
          src={post.author.avatar || "/default-avatar.png"}
          alt={post.author.fullName}
          className="min-h-32 w-32 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-semibold capitalize ">
            {post.author.fullName}
          </p>
          <p className="text-sm text-gray-500">
            {formatTimeAgo(post.createdAt)}
          </p>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4 capitalize underline underline-offset-8">
        {post.title}
      </h1>
      {/* Content */}
      <div className="text-base leading-relaxed  mb-6 px-1">
        {post.content.split("*").map((paragraph: string, index: number) => (
          <span key={index} className="block mb-2">
            {paragraph.trim()}
          </span>
        ))}
      </div>

      {/* Thumbnail */}
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-lg mb-6 max-h-[300px] object-contain"
        />
      )}

      {/* Post Stats */}
      <div className="flex justify-around text-lg py-4 border-t border-b border-gray-200">
        <LikeButton post={post} />
        <IconWithCount
          icon={<FaRegComment />}
          count={post.comments?.length}
        />
        <BookmarkButton post={post} />
        <IconWithCount icon={<FaEye />} count={post.views || 0} />
      </div>
      <CommentForm postId={post._id} />
      <CommentList postId={post._id} />
    </div>
  );
};

export default PostDetail;
