import { useNavigate, useParams } from 'react-router-dom'
import { useGetPostBySlug } from './useGetPostBySlug'
import { formatTimeAgo } from '../../ui/helpers'
import { FaArrowLeftLong } from 'react-icons/fa6'


const PostDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1); // go back
  };
  

  const { data: post, isPending, isError } = useGetPostBySlug(slug!)


  if (isPending) return <p>Loading post...</p>
  if (isError || !post) return <p>Post not found.</p>

  return (
    <>
      <div className="md:p-4 pb-20 space-y-4 ">
        <button className="flex items-center gap-2 hover:text-blue-600 cursor-pointer" onClick={handleClick}>
          <FaArrowLeftLong />
          Back
        </button>
      </div>
      <div className="max-w-3xl mx-auto p-4">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

        {/* Author Info */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <img
            src={post.author.avatar}
            alt={post.author.fullName}
            className="w-8 h-8 rounded-full"
          />
          <span>{post.author.fullName}</span> •{" "}
          <span>{formatTimeAgo(post.createdAt)}</span>
        </div>

        {/* Image */}
        {post.thumbnail && (
          <img
            src={post.image}
            alt={post.title}
            className="rounded-lg mb-4 w-full object-cover max-h-[400px]"
          />
        )}

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>{post.content}</p>
        </div>

        {/* Stats */}
        <div className="mt-6 flex gap-6 text-sm text-gray-600 dark:text-gray-300">
          <span>{post.likes.length} Likes</span>
          <span>{post.bookmarks.length} Bookmarks</span>
          <span>{post.commentsCount} Comments</span>
        </div>

        {/* Actions (Like, Bookmark) */}
        {/* <div className="mt-4 flex gap-4">
        <button className={`text-blue-500 ${post.isLikedByMe ? 'font-bold' : ''}`}>
          {post.isLikedByMe ? 'Liked' : 'Like'}
        </button>
        <button className={`text-purple-500 ${post.isBookmarkedByMe ? 'font-bold' : ''}`}>
          {post.isBookmarkedByMe ? 'Bookmarked' : 'Bookmark'}
        </button>
      </div> */}
      </div>
    </>
  );
}

export default PostDetail
