import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";

interface Comment {
  id: string;
  user: { name: string };
  content: string;
  createdAt: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  image?: string;
  comments: Comment[];
}

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    // Replace this with your fetch logic
    setTimeout(() => {
      setPost({
        id: "1",
        title: "How to Learn TypeScript",
        content: "TypeScript makes JavaScript development more robust...",
        category: "Programming",
        image: "https://via.placeholder.com/600x300",
        comments: [
          {
            id: "1",
            user: { name: "Jane Doe" },
            content: "Great article!",
            createdAt: "2025-05-27",
          },
        ],
      });
      setLoading(false);
    }, 500);
  }, [slug]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: String(Date.now()),
      user: { name: "You" },
      content: commentText,
      createdAt: new Date().toISOString(),
    };

    setPost((prev) =>
      prev
        ? { ...prev, comments: [newComment, ...prev.comments] }
        : prev
    );
    setCommentText("");
  };

  if (loading || !post) return <Spinner />;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-text-primary">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-2">{post.category}</p>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-auto rounded-lg mb-6"
        />
      )}
      <p className="text-base leading-relaxed mb-10">{post.content}</p>

      {/* Comment Section */}
      <section className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <form
          onSubmit={handleCommentSubmit}
          className="mb-6 space-y-4"
        >
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Write your comment..."
            rows={3}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Post Comment
          </button>
        </form>

        <div className="space-y-4">
          {post.comments.map((comment) => (
            <div key={comment.id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {comment.user.name} •{" "}
                {new Date(comment.createdAt).toLocaleDateString()}
              </div>
              <p className="text-base mt-1">{comment.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PostDetail;
