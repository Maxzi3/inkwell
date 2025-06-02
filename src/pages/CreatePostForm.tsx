import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi2";
import { FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";

import FormInput from "../ui/FormInput";
import SpinnerMini from "../ui/SpinnerMini";
import { useCreatePost } from "../features/Post/useCreatePost";
import { useCreateDraft } from "../features/Drafts/useCreateDraft";

const categories = ["Technology", "Lifestyle", "Education", "Business"];

type FormValues = {
  title: string;
  category: string;
  content: string;
  image?: FileList;
};

const CreatePostForm = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { mutate: createPost, isPending: isCreating } = useCreatePost();
  const { mutate: createDraft, isPending: isDrafting } = useCreateDraft();

  const isBusy = isCreating || isDrafting;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();

  const handleImagePreview = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: FormValues, isDraft = false) => {
    if (!isDraft) {
      let hasError = false;

      if (!data.title) {
        setError("title", { message: "Title is required" });
        hasError = true;
      }

      if (!data.category) {
        setError("category", { message: "Category is required" });
        hasError = true;
      }

      if (!data.content || data.content.length < 20) {
        setError("content", {
          message: "Content must be at least 20 characters",
        });
        hasError = true;
      }

      if (hasError) return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("content", data.content);
    if (data.image?.[0]) formData.append("image", data.image[0]);

    if (isDraft) {
      createDraft(formData);
    } else {
      createPost(formData);
    }

    reset();
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (e.target.files) {
      setValue("image", e.target.files);
    }
    handleImagePreview(file);
  };

  const handleClearImage = () => {
    setValue("image", undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setPreview(null);
  };

  const handleDraftSave = () => {
    const values = getValues();
    onSubmit(values, true); // true = isDraft
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, false))}
      className="md:w-[600px] mx-auto flex flex-col justify-center p-8 rounded-lg space-y-6 text-sm md:border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-center">Create New Post</h2>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <FormInput
          id="title"
          type="text"
          disabled={isBusy}
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="text-red-600">{errors.title.message}</p>}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium">Category</label>
        <select
          {...register("category", { required: "Category is required" })}
          disabled={isBusy}
          className="w-full mt-1 p-2 bg-input border-none text-base disabled:bg-gray-500"
        >
          <option value="">Select a category</option>
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
          {...register("content", {
            required: "Content is required",
            minLength: {
              value: 20,
              message: "Content must be at least 20 characters",
            },
          })}
          disabled={isBusy}
          className="w-full mt-1 p-2 bg-input border-none h-40 text-base disabled:bg-gray-500"
        />
        {errors.content && (
          <p className="text-red-600">{errors.content.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <div className="relative">
        <label htmlFor="image" className="block text-sm font-medium mb-2">
          Upload Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
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

      {/* Submit Buttons */}
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
          onClick={handleDraftSave}
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
