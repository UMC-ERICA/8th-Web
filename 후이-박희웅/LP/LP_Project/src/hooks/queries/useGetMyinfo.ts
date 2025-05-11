import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getMyInfo } from "../../apis/auth";

function useGetMyinfo(accessToken: string | null) {
  return useQuery({
    queryKey: [QUERY_KEY.myinfo],
    queryFn: getMyInfo,
    enabled: !!accessToken, // accessToken이 있을 때만 쿼리 실행
});
}

export default useGetMyinfo;
