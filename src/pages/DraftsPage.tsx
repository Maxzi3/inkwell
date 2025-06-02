import { FaEdit, FaTrash, FaPaperPlane } from "react-icons/fa";
import { useGetDrafts } from "../features/Post/useGetDrafts";
import Modal from "../components/Modal";
import ConfirmAction from "../components/ConfirmAction";
import EditDraftForm from "../features/Drafts/EditDraftsForm";
import type { Draft } from "../ui/types";
import { useState } from "react";
import { usePublishDraft } from "../features/Drafts/usePublishDraft";
import { useDeleteDraft } from "../features/Drafts/useDeleteDraft";

const DraftsPage = () => {
  const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null);
  const { data, isPending, isError } = useGetDrafts();

  const { mutate: deleteDraft, isPending: isDeleting } = useDeleteDraft();
  const { mutate: publishDraft, isPending: isPublishing } = usePublishDraft();

  const drafts: Draft[] = data || [];

  if (isPending) return <p className="text-center">Loading drafts...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load drafts.</p>;
  if (!drafts.length)
    return <p className="text-center text-gray-500">No drafts yet.</p>;

  return (
    <Modal>
      <div className="max-w-5xl mx-auto p-6 space-y-6 md:w-10/12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Drafts</h2>

        {drafts.map((draft) => (
          <div
            key={draft._id}
            className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 flex flex-col md:flex-row justify-between gap-4 hover:shadow-md transition"
          >
            {/* Text content */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {draft.title || "Untitled Draft"}
              </h3>

              <p className="text-gray-600 text-sm line-clamp-3">
                {draft.content || "No content preview available."}
              </p>

              <div className="mt-4 flex gap-3">
                <Modal.Open
                  opens="editDraft"
                  beforeOpen={() => setSelectedDraft(draft)}
                >
                  <button
                    title="Edit"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    <FaEdit /> Edit
                  </button>
                </Modal.Open>

                <Modal.Open
                  opens="deleteDraft"
                  beforeOpen={() => setSelectedDraft(draft)}
                >
                  <button
                    title="Delete"
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    <FaTrash /> Delete
                  </button>
                </Modal.Open>

                <Modal.Open
                  opens="publishDraft"
                  beforeOpen={() => setSelectedDraft(draft)}
                >
                  <button
                    title="Publish"
                    className="flex items-center gap-1 text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    <FaPaperPlane /> Publish
                  </button>
                </Modal.Open>
              </div>
            </div>

            {/* Optional image */}
            {draft.image && (
              <div className="w-full md:w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src={draft.image}
                  alt={draft.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        ))}

        {/* ========= Modals (outside the loop) ========== */}
        {selectedDraft && (
          <>
            <Modal.Window name="editDraft">
              <EditDraftForm draft={selectedDraft} />
            </Modal.Window>

            <Modal.Window name="deleteDraft">
              <ConfirmAction
                title="Delete Draft"
                message="Are you sure you want to delete this draft?"
                onConfirm={() => deleteDraft(selectedDraft._id)}
                isPending={isDeleting}
              />
            </Modal.Window>

            <Modal.Window name="publishDraft">
              <ConfirmAction
                title="Publish Draft"
                message="Do you want to publish this draft?"
                onConfirm={() => publishDraft(selectedDraft._id)}
                isPending={isPublishing}
              />
            </Modal.Window>
          </>
        )}
      </div>
    </Modal>
  );
};

export default DraftsPage;
