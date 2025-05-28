// import { Post } from "../types";

// interface LikesDisplayProps {
//   likedPosts: Post[];
// }

const LikesPage = ({ likedPosts }: LikesDisplayProps) => {
  return (
    <div className="space-y-4">
      {likedPosts.map((post) => (
        <div key={post.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{post.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Liked on {new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default LikesPage;
