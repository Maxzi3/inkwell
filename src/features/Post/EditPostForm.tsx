import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { PostUpdatePayload } from "../../services/apiPosts";
import type {  Post } from "../../ui/types";
import { FiX } from "react-icons/fi";
import { useUpdatePost } from "./useUpdatePost";
import SpinnerMini from "../../ui/SpinnerMini";

interface EditPostFormProps {
  post: Post;
  onCloseModal?: () => void;
}
const categories = ["technology", "lifestyle", "education", "business"];

const EditPostForm = ({ post, onCloseModal }: EditPostFormProps) => {
  const { register, handleSubmit, reset, setValue } =
    useForm<PostUpdatePayload>({
      defaultValues: {
        title: post.title,
        content: post.content,
        image: post.image,
        category: post.category,
      },
    });

  const { mutate: editPost, isPending } = useUpdatePost();
  const [previewImage, setPreviewImage] = useState<string | null>(
    post.image || null
  );

  useEffect(() => {
    reset({
      title: post.title,
      content: post.content,
      image: post.image,
      category: post.category,
    });
    setPreviewImage(post.image || null);
  }, [post, reset]);

  // Handle file input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
      setValue("image", reader.result as string); // store base64 string in form
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setValue("image", "");
  };

  const onSubmit = (data: PostUpdatePayload) => {
    editPost(
      { postId: post._id, payload: data },
      {
        onSuccess: onCloseModal,
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input {...register("title")} className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          {...register("category", { required: "Category is required" })}
          className="w-full mt-1 p-2 bg-input border-none text-base disabled:bg-gray-500"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Content</label>
        <textarea
          {...register("content")}
          className="w-full border p-2 rounded h-32 resize-y"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Image</label>

        {previewImage ? (
          <div className="relative group w-fit">
            <img
              src={previewImage}
              alt="Draft preview"
              className="w-40 h-28 object-cover rounded border"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-1 right-1  text-red-600 p-1 rounded-full hover:bg-red-100"
            >
              <FiX size={18} />
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-md file:border-0 disabled:bg-input hover:text-secondary hover:bg-input file:bg-secondary file:text-primary file:px-4 file:py-2 file:rounded-md file:cursor-pointer"
          />
        )}
      </div>

      <div className="flex justify-end gap-4 pt-2">
        <button
          type="button"
          onClick={onCloseModal}
          className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-200 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isPending ? (
            <div className="flex justify-center">
              <SpinnerMini />
            </div>
          ) : (
            "Update Post"
          )}
        </button>
      </div>
    </form>
  );
};

export default EditPostForm;
