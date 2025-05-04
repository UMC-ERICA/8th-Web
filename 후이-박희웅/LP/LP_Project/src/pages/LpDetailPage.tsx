import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LpDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [comments, setComments] = useState<{ id: number; name: string; text: string; createdAt: Date }[]>([]);
  const [input, setInput] = useState("");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, []);

  const handleAddComment = () => {
    if (!input.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: `사용자 ${prev.length + 1}`,
        text: input,
        createdAt: new Date(),
      },
    ]);
    setInput("");
  };

  return (
    <div className="text-white p-6">
      <h1>LP 상세 페이지</h1>
      <p>선택한 LP ID: {id}</p>
      <div className="mt-10 border-t border-gray-700 pt-6">
        <h2 className="text-lg font-semibold mb-4">댓글</h2>
        <div className="mb-6 flex items-center justify-between">
          <input
            type="text"
            placeholder="댓글을 입력하세요..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 mr-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
          >
            등록
          </button>
        </div>
        <div className="mb-4 flex justify-end gap-2">
          <button
            onClick={() => setSortOrder("latest")}
            className={`px-3 py-1 text-sm border rounded-l ${
              sortOrder === "latest" ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => setSortOrder("oldest")}
            className={`px-3 py-1 text-sm border rounded-r ${
              sortOrder === "oldest" ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            오래된순
          </button>
        </div>
        <div className="space-y-4">
          {[...comments]
            .sort((a, b) =>
              sortOrder === "latest"
                ? b.createdAt.getTime() - a.createdAt.getTime()
                : a.createdAt.getTime() - b.createdAt.getTime()
            )
            .map((comment) => (
              <div key={comment.id} className="flex items-start gap-4 bg-gray-800 p-4 rounded">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-pink-400">{comment.name}</p>
                  <p className="text-sm text-gray-300">{comment.text}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;