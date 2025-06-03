import { useEffect, useState } from "react";
import { useGetMe } from "../User/useGetMe";
import { useLikePost } from "./useLikePost";
import { FaHeart } from "react-icons/fa6";
import { HiOutlineHeart } from "react-icons/hi2";
import type { Post } from "../../ui/types";

const LikeButton = ({ post }: { post: Post }) => {
  const { data: user } = useGetMe();
  const { like, unlike } = useLikePost();

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);

  // 🧠 Set initial states once user is loaded
  useEffect(() => {
    if (user) {
      setIsLiked(post.likes.includes(user._id));
    }
  }, [user, post.likes]);

  const handleToggleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((count) => count - 1);
      unlike.mutate(post._id, {
        onError: () => {
          setIsLiked(true);
          setLikesCount((count) => count + 1);
        },
      });
    } else {
      setIsLiked(true);
      setLikesCount((count) => count + 1);
      like.mutate(post._id, {
        onError: () => {
          setIsLiked(false);
          setLikesCount((count) => count - 1);
        },
      });
    }
  };
  return (
    <span
      onClick={handleToggleLike}
      className="flex items-center gap-1 cursor-pointer"
    >
      {isLiked ? <FaHeart className="text-red-500" /> : <HiOutlineHeart />}
      {likesCount}
    </span>
  );
};

export default LikeButton;
