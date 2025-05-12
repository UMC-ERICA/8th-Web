import { useMutation } from '@tanstack/react-query';
import { getCommentList } from '../../apis/lp';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';
import { ResponseCommentDto } from '../../types/lp';


function usePostComment() {
  return useMutation({
    mutationFn: getCommentList,
    onSuccess: (data: ResponseCommentDto) => {
      queryClient.invalidateQueries({ 
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true, 
      });
    },
  });
}

export default usePostComment;