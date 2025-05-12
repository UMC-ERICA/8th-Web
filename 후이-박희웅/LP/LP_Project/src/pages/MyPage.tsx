import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

type LocalLp = {
  id: number;
  title: string;
  content: string;
  tag: string;
  image: string;
};

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto | null>(null); // data를 null로 초기화
  const [showModal, setShowModal] = useState(false);
  const [lpTitle, setLpTitle] = useState("");
  const [lpContent, setLpContent] = useState("");
  const [lpTag, setLpTag] = useState("");
  const [lpTags, setLpTags] = useState<string[]>([]);
  // 태그 추가 핸들러
  const handleAddTag = () => {
    const trimmed = lpTag.trim();
    if (trimmed && !lpTags.includes(trimmed)) {
      setLpTags([...lpTags, trimmed]);
    }
    setLpTag("");
  };
  const [lpList, setLpList] = useState<LocalLp[]>([]);
  const [lpIdCounter, setLpIdCounter] = useState(1);
  const [lpImage, setLpImage] = useState<string | null>(null);
  const navigate = useNavigate(); // 페이지 이동용
  const { removeItem: removeAccessToken } = useLocalStorage("ACCESS_TOKEN");
  const { removeItem: removeRefreshToken } = useLocalStorage("REFRESH_TOKEN");

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      setData(response);  // 데이터 업데이트
    };
    getData();
  }, []);

  const handleLogout = () => {
    console.log("로그아웃 클릭됨");
    localStorage.clear(); // 로컬 스토리지 초기화
    // 1. 토큰 삭제
    removeAccessToken();
    removeRefreshToken();
    // 2. 로그인 페이지로 이동
    navigate("/login");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLpImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="flex flex-row items-start justify-center gap-6 p-6">
        <img
          
          alt="프로필 이미지"
          className="w-32 h-32 rounded-full object-cover border"
        />
        <div className="flex flex-col gap-2 text-left">
          <p className="text-xl font-semibold">{data?.data.name}</p>
          <p className="text-gray-500">{data?.data.email}</p>
          <button
            onClick={handleLogout}
            className="w-fit bg-red-500 text-white p-2 rounded hover:bg-red-600 hover:scale-105 transition-transform"
          >
            로그아웃
          </button>
        </div>
      </div>

      <div className="px-6 pt-6">
        <h2 className="text-xl font-semibold mb-4">내 LP 목록</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {lpList.map((lp) => (
            <div key={lp.id} className="bg-white p-4 rounded shadow relative">
              <button
                onClick={() => setLpList(lpList.filter((item) => item.id !== lp.id))}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-sm"
                aria-label="삭제"
              >
                ✕
              </button>
              {lp.image && (
                <img
                  src={lp.image}
                  alt="LP 이미지"
                  className="w-full h-48 object-cover rounded mb-2"
                />
              )}
              <h3 className="font-bold text-lg">{lp.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{lp.content}</p>
              <p className="text-xs text-pink-600 mt-2">#{lp.tag}</p>
            </div>
          ))}
        </div>
      </div>

      {/* + 버튼 */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-12 right-6 w-14 h-14 rounded-full bg-pink-500 text-white text-2xl shadow-lg hover:bg-pink-600"
      >
        +
      </button>

      {/* 모달 */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-opacity-80 z-40 pointer-events-none" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg w-96 space-y-4 shadow-xl">
              <h2 className="text-lg font-bold">LP 생성</h2>
              <input
                type="text"
                placeholder="LP 이름"
                value={lpTitle}
                onChange={(e) => setLpTitle(e.target.value)}
                className="bg-gray-800 border border-gray-300 text-white p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                placeholder="LP 내용"
                value={lpContent}
                onChange={(e) => setLpContent(e.target.value)}
                className="bg-gray-800 border border-gray-300 text-white p-2 w-full rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="태그 (예: 음악, 독서)"
                  value={lpTag}
                  onChange={(e) => setLpTag(e.target.value)}
                  className="bg-gray-800 border border-gray-300 text-white p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-pink-500 text-white px-4 py-2 text-sm rounded hover:bg-pink-600 min-w-fit whitespace-nowrap"
                >
                  추가
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {lpTags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-pink-100 text-pink-600 px-2 py-1 text-xs rounded-full flex items-center gap-1"
                  >
                    #{tag}
                    <button
                      onClick={() => setLpTags(lpTags.filter((t) => t !== tag))}
                      className="text-pink-400 hover:text-pink-600"
                      aria-label="태그 삭제"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border border-gray-300 p-2 w-full rounded bg-gray-800 text-white"
              />
              {lpImage && (
                <img src={lpImage} alt="미리보기" className="w-full h-48 object-cover rounded" />
              )}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    const newLp: LocalLp = {
                      id: lpIdCounter,
                      title: lpTitle,
                      content: lpContent,
                      tag: lpTags.join(", "),
                      image: lpImage || "",
                    };
                    setLpList([...lpList, newLp]);
                    setLpIdCounter(lpIdCounter + 1);
                    setLpTitle("");
                    setLpContent("");
                    setLpTag("");
                    setLpTags([]);
                    setLpImage(null);
                    setShowModal(false);
                  }}
                  className="px-4 py-2 text-sm bg-pink-500 text-white rounded hover:bg-pink-600"
                >
                  등록
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyPage;