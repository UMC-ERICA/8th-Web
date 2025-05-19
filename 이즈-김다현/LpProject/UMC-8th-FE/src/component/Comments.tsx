import { useEffect, useState } from 'react';
import useGetInfiniteComments from '../hooks/queries/useGetInfiniteComments';
import { PAGINATION_ORDER } from '../enums/common';
import { useInView } from 'react-intersection-observer';
import { useCreateComment } from '../hooks/mutations/useCommentMutations';

interface CommentsProps {
    lpId: string | undefined;
}

export const CommentSection = ({ lpId }: CommentsProps) => {
  const [commentContent, setCommentContent] = useState('');
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useGetInfiniteComments(
    lpId ? parseInt(lpId) : 0,
    10,
    order,
  );

  const createCommentMutation = useCreateComment(lpId ? parseInt(lpId) : 0);

  useEffect(() => {
    if (inView) {
      !isFetchingNextPage && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);

  const handleSubmitComment = () => {
    if (!commentContent.trim() || !lpId) return;

    createCommentMutation.mutate(commentContent, {
      onSuccess: () => {
        setCommentContent('');
      },
    });
  };

  if (!lpId) return null;
  if (isLoading) return <div>로딩중...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">댓글</h3>
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => setOrder(PAGINATION_ORDER.asc)}
              className={`px-4 py-2 text-sm font-medium ${
                order === PAGINATION_ORDER.asc
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              오래된순
            </button>
            <button
              onClick={() => setOrder(PAGINATION_ORDER.desc)}
              className={`px-4 py-2 text-sm font-medium ${
                order === PAGINATION_ORDER.desc
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              최신순
            </button>
          </div>
        </div>

        <div className="mb-6">
          <textarea
            className="w-full p-3 border rounded-md resize-none min-h-[100px]"
            placeholder="댓글을 입력하세요..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <button 
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmitComment}
            disabled={createCommentMutation.isPending || !commentContent.trim()}
          >
            {createCommentMutation.isPending ? '작성 중...' : '작성'}
          </button>
        </div>

        <div className="space-y-4">
          {data?.pages.map((page, pageIndex) =>
            page.data.data.map((comment) => (
              <div
                key={`${pageIndex}-${comment.id}`}
                className="p-4 border rounded-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold">{comment.author.name}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))
          )}
        </div>
        <div ref={ref} className="h-10 mt-4">
          {isFetchingNextPage && (
            <div className="text-center text-gray-500">로딩중...</div>
          )}
        </div>
      </div>
    </div>
  );
};