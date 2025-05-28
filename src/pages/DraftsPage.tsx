// import { Post } from "../types";

// interface DraftsDisplayProps {
//   drafts: Post[];
//   onEditDraft?: (id: string) => void;
// }

const DraftsPage = () => {
  return (
    <div className="space-y-4">
      {drafts.map((draft) => (
        <div key={draft.id} className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-100">{draft.title}</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">Last saved: {new Date(draft.createdAt).toLocaleDateString()}</p>
            </div>
            {onEditDraft && (
              <button
                onClick={() => onEditDraft(draft.id)}
                className="text-sm text-blue-600 hover:underline dark:text-blue-300"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DraftsPage;
