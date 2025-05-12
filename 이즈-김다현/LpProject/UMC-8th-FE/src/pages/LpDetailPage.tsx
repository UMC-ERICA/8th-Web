import { useParams } from "react-router-dom"
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart } from "lucide-react"
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";

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
        <h1>{lp?.data.title}</h1>
        <img src={lp?.data.thumbnail} alt={lp?.data.title} />
        <p>{lp?.data.content}</p>

        <button onClick={isLiked ? handleDislikeLp : handleLikeLp}>
            <Heart 
            color={isLiked ? "red" : "black"}
            fill={isLiked ? "red" : "transparent"}/>
        </button>
    </div>
  )
  
}

export default LpDetailPage