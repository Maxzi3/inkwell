// import { Post } from "../types";

// interface UserPostsDisplayProps {
//   posts: Post[];
//   onView?: (id: string) => void;
//   onEdit?: (id: string) => void;
// }

const UserPostsDisplay = () => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex gap-4"
        >
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-20 h-20 object-cover rounded-md"
            />
          )}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              {post.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Published on {new Date(post.createdAt).toLocaleDateString()}
            </p>
            {post.excerpt && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {post.excerpt}
              </p>
            )}
            <div className="mt-2 flex gap-2">
              {onView && (
                <button
                  onClick={() => onView(post.id)}
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  View
                </button>
              )}
              {onEdit && (
                <button
                  onClick={() => onEdit(post.id)}
                  className="text-sm text-green-600 hover:underline dark:text-green-400"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPostsDisplay;
