import { useEffect, useState } from "react";
import type { Comment } from "../../ui/types";
import SpinnerMini from "../../ui/SpinnerMini";
import { useUpdateComment } from "./useUpdateComment";
import { useGetMe } from "../User/useGetMe";
import EditCommentForm from "./EditCommentForm";
import { useDeleteComment } from "./useDeleteComment";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

interface CommentCardProps {
  comment: Comment;
  onReply: (reply: string, parentId: string) => void;
  isReplying: boolean;
}

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  onReply,
  isReplying,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: editComment, isPending: isUpdating } = useUpdateComment();
  const { mutate: deleteComment, isPending: isdeleting } = useDeleteComment();

  const { data: user } = useGetMe();
  const [isOwnComment, setIsOwnComment] = useState(false);

  useEffect(() => {
    if (user && comment?.user?._id) {
      setIsOwnComment(user._id === comment.user._id);
    }
  }, [user, comment?.user?._id]);

  const handleReply = () => {
    if (!replyContent.trim()) return;
    onReply(replyContent, comment._id);
    setReplyContent("");
    setShowReplyForm(false);
    setShowReplies(true); // expand replies when user replies
  };

  const handleEditSave = (newContent: string) => {
    editComment(
      {
        postId: comment.post,
        commentId: comment._id,
        content: newContent,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  return (
    <div className="p-4 border-b border-b-border md:w-[380px] ">
      <div className="flex items-start gap-3">
        <img
          src={comment.user.avatar}
          alt={comment.user.fullName}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1">
          <div className="font-medium">{comment.user.fullName}</div>
          {isEditing ? (
            <EditCommentForm
              initialContent={comment.content}
              onSave={handleEditSave}
              onCancel={() => setIsEditing(false)}
              isSaving={isUpdating}
            />
          ) : (
            <div className="text-sm ">{comment.content}</div>
          )}

          <div className="flex gap-3 mt-1 text-sm text-blue-500 items-center justify-between">
            {/* Left side actions */}
            <div className="flex gap-3">
              {!isEditing && (
                <>
                  {comment.parent === null && (
                    <button onClick={() => setShowReplyForm((prev) => !prev)}>
                      {showReplyForm ? "Cancel" : "Reply"}
                    </button>
                  )}

                  {comment.replies?.length > 0 && (
                    <button onClick={() => setShowReplies((prev) => !prev)}>
                      {showReplies
                        ? `Hide replies (${comment.replies.length})`
                        : `View replies (${comment.replies.length})`}
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Right side actions (Edit & Delete) */}
            {!isEditing && isOwnComment && (
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() =>
                    deleteComment({
                      postId: comment.post,
                      commentId: comment._id,
                    })
                  }
                  className="text-red-600 hover:text-red-800"
                >
                  {isdeleting ? <SpinnerMini /> : <FaTrash />}
                </button>
              </div>
            )}
          </div>

          {showReplyForm && (
            <div className="mt-2 space-y-2">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="w-full border rounded-md p-2 text-sm"
                rows={2}
                placeholder="Write your reply..."
              />
              <button
                onClick={handleReply}
                disabled={isReplying}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {isReplying ? <SpinnerMini /> : "Post Reply"}
              </button>
            </div>
          )}

          {/* Replies (Dropdown style) */}
          {showReplies && (comment.replies || []).length > 0 && (
            <div className="mt-4 ml-6 space-y-4 border-l pl-4">
              {(comment.replies || []).map((reply) => (
                <CommentCard
                  key={reply._id}
                  comment={reply}
                  onReply={onReply}
                  isReplying={isReplying}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
