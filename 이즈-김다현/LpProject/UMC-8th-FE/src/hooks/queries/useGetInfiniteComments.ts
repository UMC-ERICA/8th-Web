import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";
import { PAGINATION_ORDER } from "../../enums/common";

function useGetInfiniteComments(
    lpId: number,
    limit: number = 10,
    order: PAGINATION_ORDER = PAGINATION_ORDER.desc,
) {
    return useInfiniteQuery({
        queryFn: ({ pageParam = 0 }) =>
            getComments({ lpId, cursor: pageParam, limit, order }),
        queryKey: [QUERY_KEY.comments, lpId, order],
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
        },
    });
}

export default useGetInfiniteComments;