import { useState, useRef, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi2";
import { FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";

import FormInput from "../ui/FormInput";
import SpinnerMini from "../ui/SpinnerMini";
import { useCreatePost } from "../features/Post/useCreatePost";
import { useCreateDraft } from "../features/Drafts/useCreateDraft";
import type { CreateDraftInput } from "../services/apiPosts";

const categories = ["Technology", "Lifestyle", "Education", "Business"];

type FormValues = Omit<CreateDraftInput, "image"> & {
  image?: FileList;
};

const CreatePostForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      content: "",
      category: "",
    },
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { mutate: createPost, isPending: isCreating } = useCreatePost();
  const { mutate: createDraft, isPending: isDrafting } = useCreateDraft();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      e.target.value = "";
      setValue("image", undefined); // clear form value
      setPreview(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size exceeds 5MB.");
      e.target.value = "";
      setValue("image", undefined);
      setPreview(null);
      return;
    }

    setValue("image", e.target.files); // update form value

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setValue("image", undefined);
    setPreview(null);
  };

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("content", data.content);
    if (data.image?.[0]) formData.append("image", data.image[0]);

    createPost(formData);
    reset();
    setPreview(null);
  };

  const onSaveDraft = (data: FormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("content", data.content);
    if (data.image?.[0]) formData.append("image", data.image[0]);

    createDraft(formData);
    reset();
    setPreview(null);
  };

  const isBusy = isSubmitting || isCreating || isDrafting;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:w-[600px] mx-auto flex flex-col justify-center p-8 rounded-lg space-y-6 text-sm md:border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-center">Create New Post</h2>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <FormInput
          type="text"
          id="title"
          disabled={isBusy}
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="text-red-600">{errors.title.message}</p>}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium">Category</label>
        <select
          className="w-full mt-1 p-2 bg-input border-none text-base disabled:bg-gray-500"
          {...register("category", { required: "Category is required" })}
          disabled={isBusy}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-600">{errors.category.message}</p>
        )}
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium">Content</label>
        <textarea
          className="w-full mt-1 p-2 bg-input border-none h-40 text-base disabled:bg-gray-500"
          {...register("content", { required: "Content is required" })}
          disabled={isBusy}
        />
        {errors.content && (
          <p className="text-red-600">{errors.content.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <div className="relative">
        <label className="block text-sm font-medium mb-2" htmlFor="image">
          Upload Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          {...register("image")}
          onChange={handleImageChange}
          ref={(e) => {
            fileInputRef.current = e;
            register("image").ref(e);
          }}
          disabled={isBusy}
          className="w-full p-3 pr-10 border border-gray-300 rounded-md file:border-0 disabled:bg-input hover:text-secondary hover:bg-input file:bg-secondary file:text-primary file:px-4 file:py-2 file:rounded-md file:cursor-pointer"
        />

        {preview && (
          <>
            <button
              type="button"
              onClick={handleClearImage}
              className="absolute right-2 top-[3.5rem] -translate-y-1/2 text-red-600 p-1 rounded-full hover:bg-red-100"
            >
              <FiX size={18} />
            </button>
            <div className="mt-2">
              <img
                src={preview}
                alt="Preview"
                className="h-40 rounded object-cover"
              />
            </div>
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between w-full">
        <button
          type="submit"
          className="w-[100px] flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          <HiPlus className="text-xl" />
          {isCreating ? <SpinnerMini /> : "Post"}
        </button>

        <button
          type="button"
          onClick={handleSubmit(onSaveDraft)}
          className="w-[150px] flex items-center justify-center gap-2 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
        >
          <HiPlus className="text-xl" />
          {isDrafting ? <SpinnerMini /> : "Save As Draft"}
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;
