import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getCommentList } from "../../apis/comment";
import { PAGINATION_ORDER } from "../../enums/common";

function useGetInfiniteComments(
    limit: number,
    lpId:number,
    order:PAGINATION_ORDER){
    return useInfiniteQuery({
        
        queryFn:({pageParam})=> getCommentList({
            lpId,
            cursor : pageParam,
            limit,
            order
            
        }),
        queryKey:[QUERY_KEY.comments,lpId,order],
        initialPageParam:0,
        getNextPageParam:(LastPage)=>{
            return LastPage.data.hasNext ? LastPage.data.nextCursor : undefined;
        }
        
    })
}
export default useGetInfiniteComments;