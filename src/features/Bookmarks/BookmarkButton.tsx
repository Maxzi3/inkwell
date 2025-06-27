import { useEffect, useState } from "react";
import { useGetMe } from "../User/useGetMe";
import { useBookmarkPost } from "./useBookmarkPost";
import { FaBookmark } from "react-icons/fa6";
import { HiOutlineBookmark } from "react-icons/hi2";
import type { Post } from "../../ui/types";

const BookmarkButton = ({ post }: { post: Post }) => {
  const { data: user } = useGetMe();
  const { bookmark, unbookmark } = useBookmarkPost();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarksCount, setBookmarksCount] = useState(post.bookmarks.length);

  useEffect(() => {
    if (user && post.bookmarks) {
      setIsBookmarked(post.bookmarks.includes(user._id));
      setBookmarksCount(post.bookmarks.length);
    }
  }, [user, post.bookmarks]);

  const handleToggleBookmark = () => {
    if (!user) return;

    const prevState = isBookmarked;
    const prevCount = bookmarksCount;

    const optimisticState = !prevState;
    const optimisticCount = optimisticState ? prevCount + 1 : prevCount - 1;

    setIsBookmarked(optimisticState);
    setBookmarksCount(optimisticCount);

    const mutation = optimisticState ? bookmark : unbookmark;

    mutation.mutate(post._id, {
      onError: () => {
        setIsBookmarked(prevState);
        setBookmarksCount(prevCount);
      },
    });
  };

  return (
    <span
      onClick={handleToggleBookmark}
      className="flex items-center gap-1 cursor-pointer"
    >
      {isBookmarked ? (
        <FaBookmark className="text-blue-600" />
      ) : (
        <HiOutlineBookmark />
      )}
      {bookmarksCount}
    </span>
  );
};

export default BookmarkButton;
