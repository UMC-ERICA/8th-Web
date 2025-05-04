import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList.ts";
import { PAGINATION_ORDER } from "../enums/common.ts";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import LpCard from "../components/LpCard";
import LpCardSkeleton from "../components/LpCardSkeleton";
import { useSearchParams, useNavigate } from "react-router-dom";

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
      <div className="flex justify-end px-4 pt-4 gap-2">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 pt-16">
        {data?.pages.map((page) =>
          page.data.data.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))
        )}
        {isFetching && (
          <>
            {Array.from({ length: 5 }).map((_, idx) => (
              <LpCardSkeleton key={`skeleton-${idx}`} />
            ))}
          </>
        )}
      </div>
      <div ref={ref} className="h-1" />
    </div>
  );
};

export default HomePage;