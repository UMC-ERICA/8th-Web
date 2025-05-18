import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList.ts";
import { PAGINATION_ORDER } from "../enums/common.ts";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import LpCard from "../components/LpCard";
import LpCardSkeleton from "../components/LpCardSkeleton";
import { useSearchParams, useNavigate } from "react-router-dom";
import useDebounce from "../hooks/queries/useDebounce";
import { FaSearch } from "react-icons/fa";

type LocalLp = {
  id: number;
  title: string;
  content: string;
  tag: string;
};

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderParam = searchParams.get("order");
  const currentOrder = orderParam === "latest" ? PAGINATION_ORDER.desc : PAGINATION_ORDER.asc;

  const handleSort = (order: "latest" | "oldest") => {
    const params = new URLSearchParams(searchParams);
    params.set("order", order);
    navigate(`?${params.toString()}`);
  };

  const { 
    data, 
    isFetching, 
    isPending,
    hasNextPage, 
    fetchNextPage, 
    isError, 
  } = useGetInfiniteLpList(6, "", currentOrder);

  const {ref, inView} = useInView({threshold:0,});

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  // Local LP list state and id counter
  const [lpList, setLpList] = useState<LocalLp[]>([]);
  const [lpIdCounter, setLpIdCounter] = useState(1);

  // 검색창 상태
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300); // 300ms 디바운스 적용

  // Example handlers and states for adding LP (assuming you have inputs elsewhere)
  // These states are placeholders; in your actual code, you should have input fields and modal state
  const [lpTitle, setLpTitle] = useState("");
  const [lpContent, setLpContent] = useState("");
  const [lpTag, setLpTag] = useState("");
  // Removed unused showModal state
 

  // Example registration button onClick handler (you should integrate with your UI)
  const handleRegisterLp = () => {
    const newLp: LocalLp = {
      id: lpIdCounter,
      title: lpTitle,
      content: lpContent,
      tag: lpTag,
    };
    setLpList([...lpList, newLp]);
    setLpIdCounter(lpIdCounter + 1);
    setLpTitle("");
    setLpContent("");
    setLpTag("");
    // Removed unused setShowModal call
  };

  if (isPending) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 pt-16">
        {Array.from({ length: 1 }).map((_, idx) => (
          <LpCardSkeleton key={idx} />
        ))}
      </div>
    );
  }
  if (isError) return <div>Error loading data.</div>;

  console.log("LP data: ", data);

  return (
    <div className="w-full min-h-screen bg-black">
      {/* 정렬 버튼과 검색창을 한 줄에 배치 */}
      <div className="flex flex-wrap items-center gap-4 px-4 pt-2">
        <div className="flex items-center border rounded px-2 bg-black">
          <FaSearch className="text-white mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색어 입력"
            className="px-2 py-1 bg-black text-white text-sm outline-none"
          />
        </div>
        <div className="flex gap-2">
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
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 pt-4">
        {data?.pages
          .flatMap((page) => page.data.data)
          .filter((lp) =>
            lp.title.toLowerCase().includes(debouncedQuery.toLowerCase())
          )
          .map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && (
          <>
            {Array.from({ length: 5 }).map((_, idx) => (
              <LpCardSkeleton key={`skeleton-${idx}`} />
            ))}
          </>
        )}
      </div>
      <div ref={ref} className="h-1" />
      {/* Render local LP list below in a grid */}
      <div className="flex justify-end px-4 pt-4">
        <span onClick={handleRegisterLp}></span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
        {lpList.map((lp) => (
          <div key={lp.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg">{lp.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{lp.content}</p>
            <p className="text-xs text-pink-600 mt-2">#{lp.tag}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;