import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import {Heart} from "lucide-react"
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";

const LpDetailPage = ()=>{
    const {lpId} = useParams();
    const {accessToken} = useAuth();
    const {data:lp,
        isPending: isLpPending,
        isError: isLpError,
    } = useGetLpDetail({lpId:Number(lpId)});
    const {data:me,
        isPending: isMePending,
        isError: isMeError,
    } = useGetMyInfo(accessToken);
    //mutate -> 비동기요청을 실핼하고, 콜백 함수를 이용해 후속 작업 처리함
    //mutateAsync -> Promise를 반환해 await 사용 가능
    const {mutate:likeMutate} = usePostLike();
    const {mutate:disLikeMutate} = useDeleteLike();

    const isLiked = lp?.data?.likes?.some((like)=>like.userId === me?.data?.id) ?? false;

    const handleLikeLp = () =>{
        likeMutate({lpId:Number(lpId)});
    };

    const handleDislikeLp = () =>{
        disLikeMutate({lpId:Number(lpId)});
    };

    if(isLpPending || (accessToken && isMePending)){
        return <div>Loading...</div>;
    }

    if(isLpError || !lp?.data){
        return <div>Error loading LP details</div>;
    }

    if(accessToken && isMeError){
        return <div>Error loading user info</div>;
    }

    return (
        <div className={"mt-12"}>
            <h1>{lp.data.id}</h1>
            <h1>{lp.data.title}</h1>
            <img src={lp.data.thumbnail} alt={lp.data.title}/>
            <p>{lp.data.content}</p>

            {accessToken && me?.data && (
                <button onClick={isLiked? handleDislikeLp: handleLikeLp}>
                    <Heart color={isLiked?"red":"black"} fill ={isLiked? "red":"transparent"} />
                </button>
            )}
        </div>
    );
};

export default LpDetailPage;