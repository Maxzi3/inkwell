import { useState } from "react";
import SpinnerMini from "../../ui/SpinnerMini";

interface EditCommentFormProps {
  initialContent: string;
  onSave: (newContent: string) => void;
  onCancel: () => void;
  isSaving: boolean;
}

const EditCommentForm: React.FC<EditCommentFormProps> = ({
  initialContent,
  onSave,
  onCancel,
  isSaving,
}) => {
  const [content, setContent] = useState(initialContent);

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSave(content.trim());
  };

  return (
    <div className="mt-2 space-y-2">
      <textarea
        className="w-full border rounded-md p-2 text-sm"
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isSaving ? <SpinnerMini /> : "Save"}
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditCommentForm;
