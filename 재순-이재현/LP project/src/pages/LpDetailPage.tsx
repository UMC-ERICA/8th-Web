import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail.ts";
import { Likes, ResponseLpDto } from "../types/lp.ts";
import {Heart} from "lucide-react"
import { useAuth } from "../context/AuthContext.tsx";
import usePostLike from "../hooks/mutations/usePostLike.ts";
import useDeleteLike from "../hooks/mutations/useDeleteLike.ts";
import useGetMyInfo from "../hooks/queries/useGetMyInfo.ts";

export const LpDetailPage = () => {
  const lpId = useParams().lpId;
  const {accessToken} = useAuth();

  const {
    data: lp,
    isPending,
    isError,
  }: {
    data: ResponseLpDto | undefined;
    isPending: boolean;
    isError: boolean;
  } = useGetLpDetail({ lpId: Number(lpId) });

  const { data: me } = useGetMyInfo(accessToken);
 
const { mutate: likeMutate } = usePostLike();
const { mutate: disLikeMutate } = useDeleteLike();

const isLiked: boolean | undefined = lp?.data.likes.some(
    (like: Likes) => like.userId === me?.data.id
  );
  

  const handleLikeLp = async() => {
    likeMutate({lpId: Number(lpId)})
  }

const handleDislikeLp = async() => {
    disLikeMutate({lpId: Number(lpId)});
};


  if (isPending && isError) {
    return <></>;
  }

  return (
    <div className="mt-12">
      <h1>{lp?.data.title}</h1>
      <img src={lp?.data.thumbnail} alt={lp?.data.title} />
      <p>{lp?.data.content}</p>

      <button onClick={() => (isLiked ? handleDislikeLp() : handleLikeLp())}>
        <Heart color = {isLiked ? "red": "black"}
         fill={isLiked? "red": "transparent"}/>
      </button>
    </div>
  );
};

export default LpDetailPage;
