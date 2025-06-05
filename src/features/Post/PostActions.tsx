import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { HiEllipsisVertical } from "react-icons/hi2";

import Modal from "../../components/Modal";
import type { Post } from "../../ui/types";
import ConfirmAction from "../../components/ConfirmAction";
import EditPostForm from "./EditPostForm";
import { useDeletePost } from "./useDeletePost";

const PostActions = ({ post }: { post: Post }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  const { refs, floatingStyles, update } = useFloating({
    middleware: [offset(8), flip(), shift()],
    placement: "bottom-end",
  });

  const postRef = useRef<HTMLDivElement | null>(null);
  const [isPostVisible, setIsPostVisible] = useState(true);
  const closeMenuRef = useRef<(() => void) | null>(null);

  // Memoize the observer callback to prevent unnecessary re-renders
  const handleIntersection = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      setIsPostVisible(entry.isIntersecting);
      if (!entry.isIntersecting && closeMenuRef.current) {
        closeMenuRef.current();
      }
    },
    []
  );

  // Watch for scroll-away and close the menu
  useEffect(() => {
    if (!postRef.current) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0,
    });

    observer.observe(postRef.current);
    return () => observer.disconnect();
  }, [handleIntersection]);

  // Setup auto-update for floating position
  useEffect(() => {
    if (refs.reference.current && refs.floating.current) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [refs.reference, refs.floating, update]);

  return (
    <Modal>
      <div ref={postRef} className="relative inline-block text-left">
        <Menu>
          {({ open, close }) => {
            closeMenuRef.current = close;

            return (
              <div>
                <MenuButton
                  ref={refs.setReference}
                  className="p-2 rounded hover:bg-gray-100"
                  disabled={!isPostVisible}
                >
                  <HiEllipsisVertical className="w-5 h-5 text-gray-600" />
                </MenuButton>

                {open && isPostVisible && (
                  <MenuItems
                    as="div"
                    ref={refs.setFloating}
                    style={floatingStyles}
                    className="z-50 w-40 rounded-md shadow-md border ring-1 ring-black ring-opacity-5 py-1 text-sm text-text-primary bg-primary"
                  >
                    <MenuItem>
                      {({ focus }) => (
                        <Modal.Open
                          opens="editPost"
                          beforeOpen={() => {
                            setSelectedPost(post);
                            close();
                          }}
                        >
                          <button
                            className={`${
                              focus ? "bg-gray-100" : ""
                            } hover:bg-input hover:text-text-primary flex items-center w-full px-4 py-2 gap-2 text-left`}
                          >
                            <FaEdit className="text-blue-600" />
                            Edit
                          </button>
                        </Modal.Open>
                      )}
                    </MenuItem>

                    <MenuItem>
                      {({ focus }) => (
                        <Modal.Open
                          opens="deletePost"
                          beforeOpen={() => {
                            setSelectedPost(post);
                            close();
                          }}
                        >
                          <button
                            className={`${
                              focus ? "bg-red-100 text-red-600" : "text-red-500"
                            } hover:bg-input hover:text-text-red-600 flex items-center w-full px-4 py-2 gap-2 text-left`}
                          >
                            <FaTrash className="text-red-600" />
                            Delete
                          </button>
                        </Modal.Open>
                      )}
                    </MenuItem>
                  </MenuItems>
                )}
              </div>
            );
          }}
        </Menu>
      </div>

      {selectedPost && (
        <>
          <Modal.Window name="editPost">
            <EditPostForm post={selectedPost} />
          </Modal.Window>

          <Modal.Window name="deletePost">
            <ConfirmAction
              title="Delete Draft"
              message="Are you sure you want to delete this draft?"
              onConfirm={() => deletePost(selectedPost._id)}
              isPending={isDeleting}
            />
          </Modal.Window>
        </>
      )}
    </Modal>
  );
};

export default PostActions;
