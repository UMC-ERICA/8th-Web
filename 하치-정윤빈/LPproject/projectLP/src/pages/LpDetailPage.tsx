import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import {Heart} from "lucide-react"
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import Comment from "../components/comment/Comment";
import useGetInfiniteComments from "../hooks/queries/useGetInfiniteComments";
import { PAGINATION_ORDER } from "../enums/common";

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
    const {data: comments,
        isFetching,
        hasNextPage,
        fetchNextPage,
    }= useGetInfiniteComments(
        10,
        Number(lpId),
        PAGINATION_ORDER.desc
    );
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

    console.log(Comment);

    return (
        <div className={"mt-6"}>
            <div className="flex items-center">
            
            <img
                className="h-100 w-100 object-cover ml-40" 
                src={lp.data.thumbnail} alt={lp.data.title}/>
            <div className="col-2 ml-5">
            <strong className="text-2xl">{lp.data.id} -  {lp.data.content}</strong>
            <h1>{lp.data.title}</h1>
            </div>

            {accessToken && me?.data && (
                <button 
                    className="ml-10"
                    onClick={isLiked? handleDislikeLp: handleLikeLp}>
                    <Heart color={isLiked?"red":"black"} fill ={isLiked? "red":"transparent"} />
                </button>
            )}
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">댓글</h2> 
                {comments?.pages.map((page, i)=>(
                    <div key= {i}>
                        {page.data.data.map((comment)=>(
                            <Comment key={comment.id} comment={comment} />
                        ))}
                        </div>
                ))}
                {hasNextPage &&(
                    <button
                        onClick={()=> fetchNextPage()}
                        className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        disabled={isFetching}>
                            {isFetching ? 'Loading...' : '더 보기'}
                        </button>
                )}
            </div>
        </div>
    );
};

export default LpDetailPage;