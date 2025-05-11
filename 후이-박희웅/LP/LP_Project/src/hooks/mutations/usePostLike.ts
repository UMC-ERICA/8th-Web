import { useMutation } from '@tanstack/react-query';
import { postLike } from '../../apis/lp';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';
import { ResponseLikeLpDto, RequestLpDto, Likes } from '../../types/lp';
import { ResponseMyInfoDto } from '../../types/auth';

function usePostLike() {
  return useMutation({
    mutationFn: postLike,
    //on Mutate -> API 요청 전에 호출되는 친구
         // UI 바로 변경을 보여주기 위해 Cache 업데이트
         onMutate: async (lp : RequestLpDto) => {
          // 1. 이 게시글에 관련된 쿼리를 취소 (캐쉬된 데이터를 새로 불러오는 요청)
          await queryClient.cancelQueries({ 
            queryKey: [QUERY_KEY.lps, lp.lpid],
          });
    
          // 2. 현재 게시글의 데이터를 캐시에서 가져오기.
          const previousLpPost : (ResponseLikeLpDto & { data: { likes: Likes[] } }) | undefined = queryClient.getQueryData([QUERY_KEY.lps, lp.lpid]); 
    
          // 게시글 데이터를 복사해서 NewLpPost라는 새로운 객체를 만들거암
          // 복사하는 가장 큰 이유는 나중에 오류가 났을 때 이전 상태로 돌리기 위해
          const newLpPost = {...previousLpPost};
    
          // 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 종아요 위치를 찾아야함.
          const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myinfo]);
          const userId = Number(me?.data.id);
    
          const likedIndex = previousLpPost?.data.likes.findIndex((like : Likes) => like.userId === userId) ?? -1;
    
          if (likedIndex >= 0) {
            previousLpPost?.data.likes.splice(likedIndex, 1);
          } else {
            // 임시로 id, name, email 등 필드를 채워 타입 오류 해결
            const newLike: Likes = {
              id: Date.now(), // 임시 id
              name: "",       // placeholder
              email: "",      // placeholder
              userId,         // 실제 사용자 ID
              lpId: lp.lpid,  // 현재 LP ID
            };
            previousLpPost?.data.likes.push(newLike);
          }
    
          // 업데이트된 게시글 데이터를 캐시에 저장
          // 이렇게하면 UI가 바로 업데이트됨. 사용자가 변화 확인 가능
          queryClient.setQueryData([QUERY_KEY.lps, lp.lpid], newLpPost);
          return { previousLpPost , newLpPost}; 
         },
         onError: (err : Error , newLp : RequestLpDto , context) => {
           console.log(err , newLp);
           queryClient.setQueryData([QUERY_KEY.lps, newLp.lpid], context?.previousLpPost);
         },
         // onSettled -> API 요청이 성공하든 실패하든 호출되는 친구
         onSettled: async (data: ResponseLikeLpDto | undefined) => {
           if (data) {
             await queryClient.invalidateQueries({ 
               queryKey: [QUERY_KEY.lps, data.data.lpId],
             });
           }
         }
  });
}

export default usePostLike;