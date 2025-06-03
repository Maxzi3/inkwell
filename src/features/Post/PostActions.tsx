import { FaEdit, FaTrash } from "react-icons/fa";
import { Menus, Toggle, List, Button } from "../../components/Menus";
import { useState } from "react";
import Modal from "../../components/Modal";
import type { Post } from "../../ui/types";
import EditDraftsForm from "../Drafts/EditPostForm";
import ConfirmAction from "../../components/ConfirmAction";
import { useDeletePost } from "./useDeletePost";
import EditPostForm from "../Drafts/EditPostForm";

const PostActions = ({ post }: { post: Post }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  return (
    <Modal>
      <Menus>
        <Menus.Menu>
          <Toggle id={post._id} />
          <List id={post._id}>
            <Modal.Open
              opens="editPost"
              beforeOpen={() => setSelectedPost(post)}
            >
              <Button icon={<FaEdit className="text-blue-600" />}>Edit</Button>
            </Modal.Open>

            <Modal.Open
              opens="deletePost"
              beforeOpen={() => setSelectedPost(post)}
            >
              <Button icon={<FaTrash className="text-red-600" />}>
                Delete
              </Button>
            </Modal.Open>
          </List>
        </Menus.Menu>
      </Menus>

      {selectedPost && (
        <>
          <EditPostForm
            initialData={post}
            isPending={isPostUpdating}
            onCloseModal={onCloseModal}
            onSubmitForm={(data) =>
              editPost(
                { postId: post._id, payload: data },
                { onSuccess: onCloseModal }
              )
            }
          />

          <Modal.Window name="deletePost">
            <ConfirmAction
              title="Delete Post"
              message="Are you sure you want to delete this post?"
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
