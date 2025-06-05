import { useState } from "react";
import type { Comment } from "../../ui/types";
import SpinnerMini from "../../ui/SpinnerMini";

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
 

  const handleReply = () => {
    if (!replyContent.trim()) return;
    onReply(replyContent, comment._id);
    setReplyContent("");
    setShowReplyForm(false);
    setShowReplies(true); // expand replies when user replies
  };

  return (
    <div className="p-4 border rounded-md ">
      <div className="flex items-start gap-3">
        <img
          src={comment.user.avatar}
          alt={comment.user.fullName}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1">
          <div className="font-medium">{comment.user.fullName}</div>
          <div className="text-sm ">{comment.content}</div>

          <div className="flex gap-3 mt-1 text-sm text-blue-500">
            <button onClick={() => setShowReplyForm((prev) => !prev)}>
              {showReplyForm ? "Cancel" : "Reply"}
            </button>

            {comment.replies?.length > 0 && (
              <button onClick={() => setShowReplies((prev) => !prev)}>
                {showReplies
                  ? ` Hide replies (${comment.replies.length})`
                  : `View replies (${comment.replies.length})`}
              </button>
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
