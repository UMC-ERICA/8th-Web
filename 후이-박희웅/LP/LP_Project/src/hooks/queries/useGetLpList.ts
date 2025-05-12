import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common.ts";
import {getLpList} from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";

function useGetLpList({cursor, search, order, limit} : PaginationDto) {
  return useQuery({
    queryKey:[QUERY_KEY],
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit
      }),
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 10, // 10분
  });
}

export default useGetLpList;