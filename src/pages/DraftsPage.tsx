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
      <div className="w-9/12 mx-auto p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Your Drafts</h2>

        {drafts.map((draft) => (
          <div
            key={draft._id}
            className="p-4 rounded-lg border border-gray-200 shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{draft.title}</h3>
                <p className="text-sm mt-2 text-gray-700 line-clamp-2">
                  {draft.content || "No content preview."}
                </p>
              </div>

              <img
                src={draft.image}
                alt={draft.title}
                className="w-full rounded-lg mb-6 max-h-[400px] object-cover"
              />

              <div className="flex gap-3">
                <Modal.Open
                  opens="editDraft"
                  beforeOpen={() => setSelectedDraft(draft)}
                >
                  <button
                    title="Edit"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                </Modal.Open>
                <Modal.Open
                  opens="deleteDraft"
                  beforeOpen={() => setSelectedDraft(draft)}
                >
                  <button
                    title="Delete"
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </Modal.Open>
                <Modal.Open
                  opens="publishDraft"
                  beforeOpen={() => setSelectedDraft(draft)}
                >
                  <button
                    title="Publish"
                    className="text-green-500 hover:text-green-700"
                  >
                    <FaPaperPlane />
                  </button>
                </Modal.Open>
              </div>
            </div>
          </div>
        ))}

        {/* ========= Modals (outside the loop) ========== */}
        {selectedDraft && (
          <Modal.Window name="editDraft">
            <EditDraftForm draft={selectedDraft} />
          </Modal.Window>
        )}

        {selectedDraft && (
          <Modal.Window name="deleteDraft">
            <ConfirmAction
              title="Delete Draft"
              message="Are you sure you want to delete this draft?"
              onConfirm={() => {
                deleteDraft(selectedDraft._id);
              }}
              isPending={isDeleting}
            />
          </Modal.Window>
        )}

        {selectedDraft && (
          <Modal.Window name="publishDraft">
            <ConfirmAction
              title="Publish Draft"
              message="Do you want to publish this draft?"
              onConfirm={() => {
                publishDraft(selectedDraft._id);
              }}
              isPending={isPublishing}
            />
          </Modal.Window>
        )}
      </div>
    </Modal>
  );
};

export default DraftsPage;
