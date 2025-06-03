import { FaEdit, FaTrash, FaPaperPlane } from "react-icons/fa";
import { useGetDrafts } from "../features/Drafts/useGetDrafts";
import Modal from "../components/Modal";
import ConfirmAction from "../components/ConfirmAction";
import EditDraftForm from "../features/Drafts/EditPostForm";
import type { Draft } from "../ui/types";
import { useState } from "react";
import { usePublishDraft } from "../features/Drafts/usePublishDraft";
import { useDeleteDraft } from "../features/Drafts/useDeleteDraft";
import Spinner from "../ui/Spinner";
import NotificationPage from "./NotificationPage";
import EditPostForm from "../features/Drafts/EditPostForm";

const DraftsPage = () => {
  const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null);
  const { data, isPending, isError } = useGetDrafts();

  const { mutate: deleteDraft, isPending: isDeleting } = useDeleteDraft();
  const { mutate: publishDraft, isPending: isPublishing } = usePublishDraft();

  const drafts: Draft[] = data || [];

  if (isPending)
    return (
      <div className="px-4 py-8 flex justify-center">
        <Spinner />
      </div>
    );
  if (isError)
    return <p className="text-center text-red-500">Failed to load drafts.</p>;
  if (!drafts.length)
    return <p className="text-center text-gray-500">No drafts yet.</p>;

  return (
    <Modal>
      <div className=" px-5 pt-4 pb-8 mb-4 md:w-6/10 md:px-20 ">
        {drafts.map((draft) => (
          <div
            key={draft._id}
            className=" flex flex-col items-baseline  gap-3 text-sm mb-4 border-b border-b-border"
          >
            {/* Text content */}
            <div className="flex flex-col items-baseline">
              {/* Title */}
              <h2 className="text-lg font-semibold  mb-1">{draft.title}</h2>

              {/* Snippet */}
              <p className="text-sm mb-3 line-clamp-3 text-left">
                {draft.content.slice(0, 160)}...
              </p>

              {/* Image - shown after text if exists */}
              {draft.image && (
                <img
                  loading="lazy"
                  src={draft.image}
                  alt={draft.title}
                  className="w-full max-h-60 object-cover rounded-md mb-3"
                />
              )}
            </div>

            <div className="my-4 flex flex-row gap-3">
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
        ))}
        <div className="md:block fixed hidden right-3 top-20">
          <NotificationPage />
        </div>

        {/* ========= Modals (outside the loop) ========== */}
        {selectedDraft && (
          <>
            <EditPostForm
              initialData={draft}
              isPending={isDraftUpdating}
              onCloseModal={onCloseModal}
              onSubmitForm={(data) =>
                editDraft(
                  { draftId: draft._id, payload: data },
                  { onSuccess: onCloseModal }
                )
              }
            />

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
