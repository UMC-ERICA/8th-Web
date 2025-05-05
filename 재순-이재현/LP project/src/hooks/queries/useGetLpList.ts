import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common.ts";
import { getLpList as getLpList } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";
import { ResponseLpListDto } from "../../types/lp.ts";
// import { ResponseLpListDto } from "../../types/lp.ts";

//const initalLpListData: ResponseLpListDto = {
    //status: true,
    //statusCode: 200,
   // message: "",
   // data: {
   //     data:[]
   // },
   // nextCursor: 0,
   // hasNext: false
//};

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),
      // staletime: 데이터가 신선하다고 간주하는 시간.
      // 이시간 동안은 캐시된 데이터를 그대로 사용.
      // 5분 동안 기존 데이터를 그대로 활용해서 네트워크 요청을 줄임.
      staleTime: 1000 * 60 * 5, // -> 5분
      // 사용되지 않는... 비활성 상태인 쿼리 데이터가 캐시에 남아있는 시간.
      // statetime이 지나고 데이터가 신선하지 않더라도, 일정 시간동안 메모리에 보관.
      // 그 이후에 해당 쿼리가 전혀 사용되지 않으면 gctime이 지난 후에 제거한다.
      // ex) 10분 동안 사용되지 않으면 해당 캐시 데이터가 삭제되며, 다시 요청 시 새 데이터를 받아오게 된다.
      gcTime: 1000 * 60 * 10, // -> 10분

      // 조건에 따라 쿼리 실행 여부를 제어.
      // enabled: Boolean(search)
      // refetchInterval: 100*80,

      // retry: 쿼리 요청이 실패했을 때 자동으로 재시도할 횟수를 지정한다.
      // 기본값은 3회 정도, 네트워크 오류 등 임시적인 문제 보완 가능


      // initialData:// 쿼리 실행 전 미리 제공할 초기 데이터 설정
      // 컴포넌트가 렌더링될 때 빈 데이터의 구조를 미리 제공해서, 로딩 전에도 안전하게 UI를 구성할 수 있게 해준다.
      //initialData: initalLpListData
      select: (data :  ResponseLpListDto ) => data.data.data // 쿼리 결과에서 필요한 데이터만 추출하여 반환
    });
}

export default useGetLpList;
