import Spinner from "../../ui/Spinner";
import type { Comment } from "../../ui/types";
import CommentCard from "./CommentCard";
import { useCreateReply } from "./useCreateReply";

import { useComments } from "./useGetComments";

interface CommentListProps {
  postId: string;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const { data, isLoading, error } = useComments(postId);
  const { mutate: replyToComment, isPending: isReplying } = useCreateReply(); 
  const comments: Comment[] = data || [];

  const handleReply = (replyContent: string, parentId: string) => {
    replyToComment({
      postId,
      parent: parentId,
      content: replyContent,
    });
  };


  if (isLoading) return (
    <div className="px-4 py-8 flex justify-center">
      <Spinner />
    </div>
  );
  if (error) return <div>Error loading comments: {error.message}</div>;
  if (!comments || comments.length === 0) return <div>No comments yet.</div>;

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentCard
          key={comment._id}
          comment={comment}
          onReply={handleReply}
          isReplying={isReplying}
        />
      ))}
    </div>
  );
};

export default CommentList;
