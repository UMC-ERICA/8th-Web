import { useParams,useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import {Heart} from "lucide-react";
import useGetMyinfo from "../hooks/queries/useGetMyinfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import usePostComment from "../hooks/mutations/useGetComment";


const LpDetailPage = () => {
  const [searchParams] = useSearchParams();
  const orderParam = searchParams.get("order");

  const { lpid } = useParams<{ lpid: string }>();
  const {accessToken} = useAuth();
  const { 
    data : lp,
    isPending,
    isError 
  } = useGetLpDetail({ lpid: Number(lpid) });

  const {data : me} = useGetMyinfo(accessToken);
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();
  const { mutate: CommentMutate } = usePostComment();

  const isLiked = lp?.data.likes.map((like) => like.userId).includes(me?.data.id as number);

  const handleLikeLp = () => {
    likeMutate({ lpid: Number(lpid) });
  };

  const handleDislikeLp = () => {
    disLikeMutate({ lpid: Number(lpid) });
  };

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<
    { id: number; userId: number; nickname: string; profileImage: string; text: string; createdAt: Date }[]
  >([]);

  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  const sortedComments = [...comments].sort((a, b) =>
    sortOrder === "latest"
      ? b.createdAt.getTime() - a.createdAt.getTime()
      : a.createdAt.getTime() - b.createdAt.getTime()
  );

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now(), // 임시 ID
        userId: me?.data.id || 0,
        nickname: me?.data.name || "익명",
        profileImage: "/default-profile.png",
        text: comment.trim(),
        createdAt: new Date(),
      };


      setComments([...comments, newComment]);

      // 서버 요청
      CommentMutate(
        { lpid: Number(lpid), },
        {
          onError: () => {
            // 실패 시 UI에서 제거하거나 메시지 표시 가능
            setComments((prev) => prev.filter((c) => c.id !== newComment.id));
          },
        }
      );

      setComment("");
    }
  };
  
    const navigate = useNavigate();
    
  
    const handleSort = (order: "latest" | "oldest") => {
      const params = new URLSearchParams(searchParams);
      params.set("order", order);
      setSortOrder(order);
      navigate(`?${params.toString()}`);
    };

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>오류가 발생했습니다</p>;

  return (
    <div className="flex flex-col items-center">
      <img src = {lp?.data.thumbnail} alt={lp?.data.title} className="max-w-md h-auto mx-auto" />

      <div className="flex items-center justify-center gap-4 mt-2">
        <h1 className="text-2xl font-bold">{lp?.data.title}</h1>
        <button onClick={isLiked ? handleDislikeLp : handleLikeLp} className="flex items-center gap-1">
          <Heart 
            color={isLiked ? "red" : "white"}
            fill={isLiked ? "red" : "transparent"}
            className="w-6 h-6 text-red-500 cursor-point"
          />
          <span
            color={isLiked ? "red" : "white"}
            className="text-red-500"
          >
            좋아요
          </span>
        </button>
      </div>

      <p className="mt-4">{lp?.data.content}</p>

      <div className="w-full min-h-screen bg-black">
      <div className="flex justify-end px-4 pt-4 gap-2 mb-4">
        <button
          onClick={() => handleSort("latest")}
          className={`px-3 py-1 text-sm border rounded-l ${
            orderParam === "latest" ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => handleSort("oldest")}
          className={`px-3 py-1 text-sm border rounded-r ${
            orderParam !== "latest" ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          오래된순
        </button>
      </div>
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 입력하세요"
            className="flex-1 border border-gray-300 p-2 rounded"
          />
          <button
            onClick={handleAddComment}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            등록
          </button>
        </div>
        <ul className="space-y-4">
          {sortedComments.map((cmt, index) => (
            <li
              key={cmt.id ?? index}
              className="flex items-start gap-4 border-t pt-4"
            >
              <img
                src={cmt.profileImage}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold">{cmt.nickname}</p>
                <p className="text-sm text-white">{cmt.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LpDetailPage;