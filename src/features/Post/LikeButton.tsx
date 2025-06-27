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
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    if (user && post.likes) {
      setIsLiked(post.likes.includes(user._id));
      setLikesCount(post.likes.length);
    }
  }, [user, post.likes]);

  const handleToggleLike = () => {
    if (!user) return;

    const optimisticCount = isLiked ? likesCount - 1 : likesCount + 1;
    const optimisticLike = !isLiked;

    setLikesCount(optimisticCount);
    setIsLiked(optimisticLike);

    const mutation = isLiked ? unlike : like;

    mutation.mutate(post._id, {
      onError: () => {
        // Revert
        setLikesCount(likesCount);
        setIsLiked(isLiked);
      },
    });
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
