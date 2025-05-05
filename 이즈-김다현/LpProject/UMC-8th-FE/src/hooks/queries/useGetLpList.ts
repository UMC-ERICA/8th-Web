import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common.ts";
import { QUERY_KEY } from "../../constants/key";
import { getLpList } from "../../apis/lp";

function useGetLpList({cursor, search, order, limit}: PaginationDto) {
    return useQuery({
        queryKey: [QUERY_KEY.lps, search, order],
        queryFn: () =>
            getLpList({cursor, search, order, limit}),
        staleTime: 1000 * 60 * 5, //5m
        gcTime: 1000 * 60 * 10, //10m
    });
}

export default useGetLpList;
