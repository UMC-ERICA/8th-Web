import {useQuery} from '@tanstack/react-query';
import {PaginationDto} from '../../types/common';
import {getLPList} from '../../apis/lp';
import {QUERY_KEY} from '../../constants/key.ts';

function useGetLPList({cursor, search, limit, order}: PaginationDto) {
    return useQuery({
        queryKey: [QUERY_KEY.lps, search, order],
        queryFn: () => getLPList({cursor, search, limit, order}),

        // ms 단위로 총 5분 동안 캐시된 기존 데이터 그대로 활용해 네트워크 요청 줄임
        staleTime: 1000 * 60 * 5,
        // ms 단위로 10분동안 사용되지 않으면 캐시 데이터가 삭제됨
        // 즉, 10분동안 사용되지 않으면 다시 네트워크 요청을 보냄
        gcTime: 100 * 60 * 10,

        select: (data) => data.data.data,
    });
}

export default useGetLPList;