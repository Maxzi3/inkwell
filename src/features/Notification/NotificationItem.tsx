import { FaHeart, FaRegCommentDots } from "react-icons/fa6";
import { formatTimeAgo } from "../../ui/helpers";

type Props = {
  notification: {
    _id: string;
    type: "like" | "comment";
    isRead: boolean;
    sender: {
      fullName: string;
    };
    post?: {
      title: string;
    };
    createdAt: string;
  };
  onMarkRead: (id: string) => void;
};

const NotificationItem = ({ notification, onMarkRead }: Props) => {
  const { _id, type, isRead, sender, post, createdAt } = notification;

  return (
    <li
      onClick={() => onMarkRead(_id)}
      className={`p-3 rounded-lg border cursor-pointer hover:shadow-sm transition list-none ${
        isRead
          ? "bg-input border-gray-200"
          : "bg-btnbg border-blue-200 text-input"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-start gap-2 text-sm">
          {type === "like" ? (
            <FaHeart className="text-red-500 mt-1" />
          ) : (
            <FaRegCommentDots className="text-green-500 mt-1" />
          )}
          <span>
            <span className="font-medium ">{sender.fullName}</span>{" "}
            {type === "like" ? "liked" : "commented on"} your post{" "}
            <span className="font-semibold">{post?.title || "a post"}</span>
          </span>
        </div>
        {!isRead && (
          <span className="w-2 h-2 bg-blue-600 rounded-full shrink-0"></span>
        )}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {formatTimeAgo(createdAt)}
      </div>
    </li>
  );
};

export default NotificationItem;
