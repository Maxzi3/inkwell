import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";

interface EditFormProps<T> {
  initialData: T;
  onCloseModal?: () => void;
  onSubmitForm: (data: T) => void;
  isPending: boolean;
}

function EditPostForm<
  T extends { title: string; content: string; image?: string }
>({ initialData, onCloseModal, onSubmitForm, isPending }: EditFormProps<T>) {
  const { register, handleSubmit, reset, setValue } = useForm<T>({
    defaultValues: initialData,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(
    initialData.image || null
  );

  useEffect(() => {
    reset(initialData);
    setPreviewImage(initialData.image || null);
  }, [initialData, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewImage(result);
      setValue("image", result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setValue("image", "");
  };

  const onSubmit = (data: T) => {
    onSubmitForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input {...register("title")} className="w-full border p-2 rounded" />
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
              alt="Preview"
              className="w-40 h-28 object-cover rounded border"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-1 right-1 text-red-600 p-1 rounded-full hover:bg-red-100"
            >
              <FiX size={18} />
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        )}
      </div>

      <div className="flex justify-end gap-4 pt-2">
        <button
          type="button"
          onClick={onCloseModal}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isPending ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
}

export default EditPostForm;
