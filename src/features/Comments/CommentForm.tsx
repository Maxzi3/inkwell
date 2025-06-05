import { useState } from "react";
import { useCreateComment } from "./useCreateComment";


interface CommentFormProps {
  postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const [content, setContent] = useState("");
  const { mutate: createComment, isPending } = useCreateComment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    createComment(
      { postId, content },
      {
        onSuccess: () => setContent(""),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment..."
        className="w-full p-2 border rounded-md text-text-primary bg-primary"
        disabled={isPending}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        disabled={isPending || !content.trim()}
      >
        {isPending ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default CommentForm;
