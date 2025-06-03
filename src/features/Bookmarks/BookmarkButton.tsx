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

  // 🧠 Set initial states once user is loaded
  useEffect(() => {
    if (user) {
      setIsBookmarked(post.bookmarks.includes(user._id));
    }
  }, [user, post.bookmarks]);

  const handleToggleBookmark = () => {
    if (isBookmarked) {
      setIsBookmarked(false);
      setBookmarksCount((count) => count - 1);
      unbookmark.mutate(post._id, {
        onError: () => {
          setIsBookmarked(true);
          setBookmarksCount((count) => count + 1);
        },
      });
    } else {
      setIsBookmarked(true);
      setBookmarksCount((count) => count + 1);
      bookmark.mutate(post._id, {
        onError: () => {
          setIsBookmarked(false);
          setBookmarksCount((count) => count - 1);
        },
      });
    }
  };
  return (
    <span onClick={handleToggleBookmark} className="flex items-center gap-1">
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
