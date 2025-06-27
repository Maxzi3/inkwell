import { FaEdit, FaTrash, FaPaperPlane } from "react-icons/fa";
import Modal from "../components/Modal";
import ConfirmAction from "../components/ConfirmAction";
import EditDraftForm from "../features/Drafts/EditDraftsForm";
import type { Draft } from "../ui/types";
import { useState } from "react";
import { usePublishDraft } from "../features/Drafts/usePublishDraft";
import { useDeleteDraft } from "../features/Drafts/useDeleteDraft";
import { useGetDrafts } from "../features/Drafts/useGetDrafts";
import Spinner from "../ui/Spinner";

const DraftsPage = () => {
  const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null);
  const { data, isPending, isError } = useGetDrafts();

  const { mutate: deleteDraft, isPending: isDeleting } = useDeleteDraft();
  const { mutate: publishDraft, isPending: isPublishing } = usePublishDraft();

  const drafts: Draft[] = data || [];

  if (isPending) return (
    <div className="px-4  flex justify-center">
      <Spinner />
    </div>
  );
  if (isError)
    return <p className="text-center text-red-500">Failed to load drafts.</p>;
  if (!drafts.length)
    return <p className="text-center  py-4">No drafts yet.</p>;

  return (
    <Modal>
      <div className="max-w-5xl mt-5 mb-[4.5rem] lg:p-6 space-y-6 lg:w-10/12  mx-auto px-4 py-8 ">
        <h2 className="hidden lg:block text-3xl font-bold mb-4">Your Drafts</h2>
        {drafts.map((draft) => (
          <div
            key={draft._id}
            className=" rounded-lg shadow-sm border border-border p-5 lg:p-6 flex flex-col lg:flex-row gap-4 lg:items-start hover:shadow-md transition-shadow"
          >
            {/* Image Section */}
            {draft.image && (
              <div className="w-full lg:w-48 h-32 flex-shrink-0 overflow-hidden">
                <img
                  src={draft.image}
                  alt={draft.title}
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            {/* Content Section */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold line-clamp-1">
                  {draft.title || "Untitled Draft"}
                </h3>
                <span className="text-xs bg-input rounded-xl px-2 py-1  capitalize">
                  {draft.category || "Uncategorized"}
                </span>
              </div>

              <p className="text-sm  line-clamp-3">
                {draft.content || "No content."}
              </p>

              <div className="flex gap-4 mt-3 text-sm">
                <Modal.Open
                  opens="editDraft"
                  beforeOpen={() => setSelectedDraft(draft)}
                >
                  <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    <FaEdit /> Edit
                  </button>
                </Modal.Open>

                <Modal.Open
                  opens="deleteDraft"
                  beforeOpen={() => setSelectedDraft(draft)}
                >
                  <button className="text-red-600 hover:text-red-800 flex items-center gap-1">
                    <FaTrash /> Delete
                  </button>
                </Modal.Open>

                <Modal.Open
                  opens="publishDraft"
                  beforeOpen={() => setSelectedDraft(draft)}
                >
                  <button className="text-green-600 hover:text-green-800 flex items-center gap-1">
                    <FaPaperPlane /> Publish
                  </button>
                </Modal.Open>
              </div>
            </div>
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
