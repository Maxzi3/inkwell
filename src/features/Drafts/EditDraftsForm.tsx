import { useForm } from "react-hook-form";
type Props = {
  onCloseModal?: () => void;
  draft:string;
};
function EditDraftForm({ onCloseModal, draft }: Props) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: draft.title,
      content: draft.content,
    },
  });

  const onSubmit = (data) => {
    console.log("Updated Draft", data);
    onCloseModal(); // close modal after save
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("title")} className="input" />
      <textarea {...register("content")} className="textarea" />
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCloseModal} className="btn">
          Cancel
        </button>
        <button type="submit" className="btn bg-blue-600 text-white">
          Save
        </button>
      </div>
    </form>
  );
}

export default EditDraftForm;
