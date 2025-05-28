// import type { Comment } from "../../ui/types";

// interface CommentsDisplayProps {
//     comments: Comment[];
// }

const Comments = () => {
    const comment = [
        {
            id: 234567,
            postId: 234567,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quas possimus animi earum quam reiciendis iste, dicta sint iusto culpa necessitatibus aperiam, a at, voluptatum atque! Voluptas pariatur dolores eaque!",
            author: "Maxwell",
            createdAt: "may 20th",
        },
        {
            id: 234567,
            postId: 234567,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quas possimus animi earum quam reiciendis iste, dicta sint iusto culpa necessitatibus aperiam, a at, voluptatum atque! Voluptas pariatur dolores eaque!",
            author: "Maxwell",
            createdAt: "may 20th",
        },

    ]
    return (
        <div className="space-y-4">
            {comment.map((com) => (
                <div key={com.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-semibold">{com.author}</span> commented:
                    </p>
                    <p className="mt-1 text-gray-800 dark:text-white">{com.content}</p>
                    <p className="text-xs text-gray-400 mt-2">{new Date(com.createdAt).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};

export default Comments;
