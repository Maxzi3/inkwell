import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import type { Comment } from "../../ui/types";
import CommentCard from "./CommentCard";
import { useCreateReply } from "./useCreateReply";

import { useComments } from "./useGetComments";
import Pagination from "../../components/Pagination";

interface CommentListProps {
  postId: string;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const { data, isLoading, error } = useComments(postId, page, 5);
  const { mutate: replyToComment, isPending: isReplying } = useCreateReply();
  const comments: Comment[] = data?.data || [];
 

  const totalPages = data?.totalPages || 1;
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReply = (replyContent: string, parentId: string) => {
    replyToComment({
      postId,
      parent: parentId,
      content: replyContent,
    });
  };

  if (isLoading)
    return (
      <div className="px-4 py-8 flex justify-center">
        <Spinner />
      </div>
    );
  if (error) return <div>Error loading comments: {error.message}</div>;
  if (!comments || comments.length === 0) return <div>No comments yet.</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Comments</h1>
      {comments.map((comment) => (
        <CommentCard
          key={comment._id}
          comment={comment}
          onReply={handleReply}
          isReplying={isReplying}
        />
      ))}
      {totalPages > 1 && (
        <div className="mb-20 flex md:justify-start justify-end">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default CommentList;
