import { useRef, useState, } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { HiPlus } from "react-icons/hi2";
import FormInput from "../ui/FormInput";
import { FiX } from "react-icons/fi";

// interface CreatePostFormProps {
//   onSubmitPost: (formData: FormData) => void;
// }

const categories = ["Technology", "Lifestyle", "Education", "Business"];

const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("title", title);
  //   formData.append("category", category);
  //   formData.append("content", content);
  //   if (imageFile) formData.append("image", imageFile);

  //   onSubmitPost(formData);

  //   //  clear form after submission
  //   setTitle("");
  //   setContent("");
  //   setCategory("");
  //   setImageFile(null);
  // };

  return (
    <form
      // onSubmit={handleSubmit}
      className="md:w-[600px] mx-auto flex flex-col justify-center p-8 rounded-lg space-y-6 text-sm md:border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-center  ">
        Create New Post
      </h2>

      <div>
        <label htmlFor="title" className="block text-sm font-medium ">
          Title
        </label>
        <FormInput
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium ">
          Category
        </label>
        <select
          className="w-full mt-1 p-2 border-none border-text-primary bg-input focus:ring-blue-500 transition-all duration-300 placeholder:text-text-primary flex  mx-auto overflow-hidden  focus:outline-0 focus:ring-0 h-full text-base font-normal leading-normal disabled:bg-gray-500 "
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
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
      </div>

      <div>
        <label className="block text-sm font-medium">
          Content
        </label>
        <textarea
          className="w-full mt-1 p-2 border-none border-text-primary bg-input focus:ring-blue-500 transition-all duration-300 placeholder:text-text-primary flex  mx-auto overflow-hidden  focus:outline-0 focus:ring-0 h-40 text-base font-normal leading-normal disabled:bg-gray-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="avatar">
          Upload Image
        </label>
        <FormInput
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          // disabled={isUpdating}
          className="w-full p-3 pr-10 border border-gray-300 rounded-md file:border-0 file:bg-black dark:file:bg-gray-800 file:text-white file:px-4 file:py-2 file:rounded-md file:cursor-pointer disabled:cursor-not-allowed"
        />
        {imageFile && (
          <button
            type="button"
            onClick={() => {
              setImageFile(null);
              fileInputRef.current.value = null;
            }}
            className="relative bottom-[2.8rem] left-[12rem] -translate-y-1/2  text-red-600 p-1 rounded-full hover:bg-red-100 transition-all"
            aria-label="Remove image"
          >
            <FiX size={18} />
          </button>
        )}

        {imageFile && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="h-40 rounded object-cover"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className=" w-[100px] flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        <HiPlus className="text-xl" />
        Post
      </button>
    </form>
  );
};

export default CreatePostForm;
