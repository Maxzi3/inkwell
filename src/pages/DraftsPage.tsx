import { formatTimeAgo } from "../ui/helpers";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPaperPlane } from "react-icons/fa";
import { useGetDrafts } from "../features/Post/useGetDrafts";
import Modal from "../components/Modal";

const DraftsPage = () => {
  const { data: drafts, isPending, isError } = useGetDrafts();
  console.log(drafts);
  const navigate = useNavigate();

  if (isPending) return <p className="text-center">Loading drafts...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load drafts.</p>;

  if (!drafts?.length)
    return <p className="text-center text-gray-500">No drafts yet.</p>;

  return (
    <Modal>
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Your Drafts</h2>

        {drafts.map((draft) => (
          <div
            key={draft.id}
            className="p-4 rounded-lg border border-gray-200 shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{draft.title}</h3>
                <p className="text-sm text-gray-500">
                  {formatTimeAgo(draft.updatedAt)}
                </p>
                <p className="text-sm mt-2 text-gray-700 line-clamp-2">
                  {draft.excerpt || "No content preview."}
                </p>
              </div>

              <div className="flex gap-3">
              <Modal.Open opens="editDraft">
                <button
                  title="Edit"
                  onClick={() => navigate(`/edit/${draft.slug}`)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                </Modal.Open>
                <Modal.Open opens="deleteDraft">
                <button
                  title="Delete"
                  onClick={() => console.log("Delete logic here")}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
                </Modal.Open>
                <Modal.Open opens="PublishDraft">
                <button
                  title="Publish"
                  onClick={() => console.log("Publish logic here")}
                  className="text-green-500 hover:text-green-700"
                >
                  <FaPaperPlane />
                </button>
                </Modal.Open>
              </div>
            </div>
          </div>

          {/* Edit Modal */}
          <Modal.Window name="editDraft">
          <EditDraftForm draft={draft} />
        </Modal.Window>

        {/* Delete Modal */}
        <Modal.Window name="deleteDraft">
          <ConfirmAction
            title="Delete Draft"
            message="Are you sure you want to delete this draft?"
            onConfirm={() => {
              // call delete mutation here
              console.log("Deleting", draft.id);
            }}
          />
        </Modal.Window>

        {/* Publish Modal */}
        <Modal.Window name='PublishDraft'>
          <ConfirmAction
            title="Publish Draft"
            message="Do you want to publish this draft?"
            onConfirm={() => {
              // call publish mutation here
              console.log("Publishing", draft.id);
            }}
          />
        </Modal.Window>
        ))}
      </div>
    </Modal>
  );
};

export default DraftsPage;
