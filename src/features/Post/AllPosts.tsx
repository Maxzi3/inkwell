import { Post } from "../types";
import { Link } from "react-router-dom";

interface AllPostsListProps {
  posts: Post[];
}

const AllPosts = ({ posts }: AllPostsListProps) => {
  if (!posts.length)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        No posts available.
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link
          to={`/posts/${post.id}`}
          key={post.id}
          className="bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden transition hover:shadow-md"
        >
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-40 object-cover"
            />
          )}
          <div className="p-4 space-y-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {post.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              by {post.author} •{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            {post.excerpt && (
              <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                {post.excerpt}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllPosts;
