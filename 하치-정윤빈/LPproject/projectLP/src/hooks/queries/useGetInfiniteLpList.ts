import { useInfiniteQuery } from "@tanstack/react-query";
import { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";
import { getLPList } from "../../apis/lp"; 

function useGetInfiniteLpList( limit : number, search :string, order:PAGINATION_ORDER,
){
    return useInfiniteQuery({
        queryFn:({pageParam})=>
            getLPList({cursor:pageParam,limit, search, order}),
        queryKey:[QUERY_KEY.lps, search, order],
        initialPageParam:0,
        getNextPageParam:(lastPage,allPages)=>{
            //console.log(lastPage,allPages);
            return lastPage.data.hasNext?lastPage.data.nextCursor : undefined;
            

        }
    });
}

export default useGetInfiniteLpList;