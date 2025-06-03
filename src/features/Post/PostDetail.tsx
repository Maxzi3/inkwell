import { useNavigate, useParams } from "react-router-dom";
import { useGetPostBySlug } from "./useGetPostBySlug";
import { formatTimeAgo } from "../../ui/helpers";
import {
  FaArrowLeftLong,
  FaEye,
  FaRegComment,
} from "react-icons/fa6";
import type { JSX } from "react";
import BookmarkButton from "../Bookmarks/BookmarkButton";
import LikeButton from "./LikeButton";
import Spinner from "../../ui/Spinner";

const IconWithCount = ({
  icon,
  count,
}: {
  icon: JSX.Element;
  count: number;
}) => (
  <span className="flex items-center gap-1 text-gray-600">
    {icon}
    {count}
  </span>
);

const PostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: post, isPending, isError } = useGetPostBySlug(slug!);

  const handleGoBack = () => navigate(-1);

  if (isPending) return (
    <div className="px-4 py-8 flex justify-center">
      <Spinner />
    </div>
  );
  if (isError || !post)
    return <p className="text-center text-red-500">Post not found.</p>;


  return (
    <div className="px-4 pb-20 max-w-3xl mx-auto">
      {/* Back Button */}
      <button
        onClick={handleGoBack}
        className="flex items-center gap-2 hover:text-blue-600 hover:underline my-6"
      >
        <FaArrowLeftLong />
        Back
      </button>

      {/* Author Info */}
      <div className="flex gap-4 items-center mb-6">
        <img
          src={post.author.avatar || "/default-avatar.png"}
          alt={post.author.fullName}
          className="min-h-32 w-32 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-semibold capitalize ">
            {post.author.fullName}
          </p>
          <p className="text-sm text-gray-500">
            {formatTimeAgo(post.createdAt)}
          </p>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4 capitalize underline underline-offset-8">
        {post.title}
      </h1>

      {/* Thumbnail */}
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-lg mb-6 max-h-[400px] object-cover"
        />
      )}

      {/* Content */}
      <div className="text-base leading-relaxed  mb-6 px-1">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia
        deleniti, aperiam laboriosam quam nobis, sit saepe voluptates
        perspiciatis nisi at deserunt libero. Adipisci dolorum rerum alias
        repudiandae, earum corporis neque, eum beatae enim consequatur ea animi
        suscipit nesciunt iusto eaque reprehenderit dignissimos iure dolorem!
        Nihil aliquid distinctio quaerat nulla? Officiis cumque amet esse nisi,
        optio dolores placeat minima ipsum sapiente, voluptatem incidunt
        reiciendis nemo recusandae cum fuga maxime quis! Iste corporis
        repellendus mollitia voluptatum est, vero reprehenderit nemo beatae ea
        fugiat eos fugit officiis esse. Aliquid hic nesciunt aut, voluptatibus
        porro obcaecati dolore dolor sequi ut molestiae aliquam rerum maiores
        deleniti id sint rem ex! Fugiat, omnis! Doloremque tempore vitae
        recusandae itaque dolores, illo quia ratione vel voluptatum! Beatae
        maxime, omnis fuga veritatis tenetur praesentium id eos iure, laborum
        et, nulla exercitationem voluptates officia qui? Illum quisquam
        dignissimos possimus nulla recusandae quibusdam autem, cupiditate saepe
        iste excepturi quod distinctio deserunt dolores consequuntur,
        repellendus inventore numquam iusto, in id doloribus provident
        perferendis ullam voluptate maiores. Ipsam exercitationem repellat
        doloremque eligendi ex odit enim illo voluptatum harum qui placeat sit
        molestiae nam optio sint tempora aperiam alias, veniam et? Voluptatem
        velit modi, suscipit libero quidem esse ad adipisci eum eius culpa
        dolor.
        <p>{post.content || "No content provided."}</p>
      </div>

      {/* Post Stats */}
      <div className="flex justify-around text-lg py-4 border-t border-b border-gray-200">
        <LikeButton post={post} />
        <IconWithCount
          icon={<FaRegComment />}
          count={post.comment?.length || 0}
        />
        <BookmarkButton post={post} />
        <IconWithCount icon={<FaEye />} count={post.views || 0} />
      </div>
    </div>
  );
};

export default PostDetail;
