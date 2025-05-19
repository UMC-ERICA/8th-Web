import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { Likes, ResponseLpDto } from "../../types/lp";
import { ResponseMyInfoDto } from "../../types/auth";

function usePostLike() {
    return useMutation({
        mutationFn: postLike, 
        // onMute -> API 요청 이전에 호출되는 친구
        onMutate: async (lp) => {
            // 1. 게시글에 관련된 쿼리 취소
            await queryClient.cancelQueries({
                queryKey:[QUERY_KEY.lps, lp.lpId],
            });

            // 2. 현재 게시글의 데이터를 캐시에서 가져와야 됨
            const previousLpPost = queryClient.getQueryData<ResponseLpDto>([QUERY_KEY.lps, lp.lpId]);

            // 3. 게시글 데이터를 복사해서 뉴엘피포스트라는 새로운 객체 만듦, 복사하는 가장 큰 이유는 오류 발생 시 이전 상태로 되돌리기 위해서
            const newLpPost = {...previousLpPost};

            // 4. 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치를 찾기
            const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
            const userId = Number(me?.data.id)  

            const likeindex = previousLpPost?.data.likes.findIndex((like) => like.userId === userId) ?? -1;

            if(likeindex>=0) {
                previousLpPost?.data.likes.splice(likeindex, 1);
            } else {
                const newLike = {userId, lpId:lp.lpId} as Likes;
                previousLpPost?.data.likes.push(newLike);
            }

            // 업데이터된 게시글 데이터를 캐시에 저장
            queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);

            return {previousLpPost, newLpPost};
        },
        onError: (err, newLp, context) => {
            console.log(err, newLp);
            queryClient.setQueryData([QUERY_KEY.lps, newLp.lpId],
                context?.previousLpPost?.data.id,
            )
        },

        //onSettled는 api 요청이 끝난 후 성공하든 실패하든 실행
        onSettled: async (data, error, variables, context) => {
            await queryClient.invalidateQueries({
                queryKey:[QUERY_KEY.lps, variables.lpId],
            })
        }
    });
};

export default usePostLike;

// 이것처럼 닉네임 바꾸는 함수 만들고