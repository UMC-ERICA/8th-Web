import { Comment as CommentType} from "../../types/lp";

interface CommentsProps{
    comment : CommentType;
}

const Comment =({comment}:CommentsProps)=>{
    return (
        <div className="border-b border-gray-200 py-4">
            <div className="flex items-center mb-2">
                <span className="font-semibold">{comment.author[0]?.name ||'익명'}</span>
                <span className="text-gray-500 text-sm ml-2">
                    {new Date(comment.createdAt).toLocaleDateString()}
                </span>

            </div>
            <p className="text-gray-700 flex ml-5">{comment.content}</p>
        </div>
        // console.log(data)
    );
}

export default Comment;