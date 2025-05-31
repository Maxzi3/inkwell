import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useEditDraft } from "./useEditDrafts";
import type { EditDraftPayload } from "../../services/apiPosts";
import type { Draft } from "../../ui/types";

interface EditDraftFormProps {
  draft: Draft;
  onCloseModal?: () => void;
}

const EditDraftsForm = ({ draft, onCloseModal }: EditDraftFormProps) => {
  const { register, handleSubmit, reset } = useForm<EditDraftPayload>({
    defaultValues: {
      title: draft.title,
      content: draft.content,
      image: draft.image,
    },
  });

  const { mutate: editDraft, isPending } = useEditDraft();

  
  useEffect(() => {
    reset({
      title: draft.title,
      content: draft.content,
      image: draft.image,
    });
  }, [draft, reset]);

  const onSubmit = (data: EditDraftPayload) => {
    editDraft(
      { draftId: draft._id, payload: data },
      {
        onSuccess: onCloseModal,
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
      <div>
        <label>Title</label>
        <input {...register("title")} className="w-full border p-2 rounded" />
      </div>

      <div>
        <label>Content</label>
        <textarea
          {...register("content")}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label>Thumbnail URL</label>
        <input {...register("image")} className="w-full border p-2 rounded" />
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
          {isPending ? "Updating..." : "Update Draft"}
        </button>
      </div>
    </form>
  );
};

export default EditDraftsForm;
