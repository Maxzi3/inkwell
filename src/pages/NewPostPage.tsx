import CreatePostForm from "./CreatePostForm";

const NewPostPage = () => {
  // const handleCreate = (data: { title: string; content: string; category: string }) => {
  //     console.log("Post created:", data);
  // // You can send this to the backend via an API call here
  // // };
  return (
    <div className="md:py-1 pb-20 max-w-xl mx-auto md:mt-10">
      <CreatePostForm />
    </div>
  );
};

export default NewPostPage;
