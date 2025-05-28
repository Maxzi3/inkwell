// import type { Post } from "../ui/types";

// interface BookmarksDisplayProps {
//   bookmarks: Post[];
// }

const BookmarksPage = () => {
  
  return (
    <div className="space-y-4">
      {bookmarks.map((post) => (
        <div key={post.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{post.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">by {post.author}</p>
          {post.excerpt && <p className="text-sm mt-1">{post.excerpt}</p>}
        </div>
      ))}
    </div>
  );
};

export default BookmarksPage;
