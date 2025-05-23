import { useParams } from "react-router-dom"
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart } from "lucide-react"
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import { CommentSection } from "../component/Comments";

const LpDetailPage = () => {
    const { accessToken } = useAuth();
    const {lpId} = useParams();
    const { data:lp, isError, isPending } = useGetLpDetail({lpId: Number(lpId)});
    const { data:me } = useGetMyInfo(accessToken);
    const {mutate:likeMutate} = usePostLike();
    const {mutate:dislikeMutate} = useDeleteLike();

    const isLiked = lp?.data.likes.map((like) => like.userId).includes(me?.data.id as number);

    const handleLikeLp = () => {
        likeMutate({lpId:Number(lpId)});
    };
    const handleDislikeLp = () => {
        dislikeMutate({lpId: Number(lpId)});
    } 

    if(isPending && isError) {
        return<></>
    }

    return (
        <div className={"mt-12"}>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                {lp?.data.title}
            </h1>

            <div className="mb-8 flex justify-center">
                <img 
                    src={lp?.data.thumbnail} 
                    alt={lp?.data.title} 
                    className="rounded-lg shadow-lg max-h-[500px] object-contain"
                />
            </div>

            <div className="flex items-center gap-2 mb-8">
                <button 
                    onClick={isLiked ? handleDislikeLp : handleLikeLp}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <Heart 
                        size={24}
                        color={isLiked ? "red" : "black"}
                        fill={isLiked ? "red" : "transparent"}
                    />
                </button>
                <span className="text-gray-600">
                    좋아요 {lp?.data.likes.length || 0}개
                </span>
            </div>

            {lp?.data.tags && lp.data.tags.length > 0 && (
                <div className="mb-8 flex flex-wrap gap-2">
                    {lp.data.tags.map((tag) => (
                        <span 
                            key={tag.id} 
                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                        >
                            #{tag.name}
                        </span>
                    ))}
                </div>
            )}

            <div className="mb-8 prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {lp?.data.content}
                </p>
            </div>

            <div className="border-t border-gray-200 mb-8"></div>

            <CommentSection lpId={lpId} />
        </div>
    )
}

export default LpDetailPage;