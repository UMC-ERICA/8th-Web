import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../component/LpCard/LpCard";
import LpCardSkeletonList from "../component/LpCard/LpCardSkeletonList";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";

const HomePage = () => {
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState(PAGINATION_ORDER.desc);
    const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);

    const { data: lps, isFetching, hasNextPage, isPending, fetchNextPage, isError } =
        useGetInfiniteLpList(1, debouncedValue, order);

    const { ref, inView } = useInView({ threshold: 0 });

    useEffect(() => {
        if (inView) {
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    if (isPending) return <div className="mt-20">Loading...</div>;
    if (isError) return <div className="mt-20">Error!!</div>;

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-4">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border rounded-md"
                    placeholder="검색어를 입력하세요"
                />
                
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {lps?.pages
                    ?.map((page) => page.data.data)
                    ?.flat()
                    ?.map((lp) => <LpCard key={lp.id} lp={lp} />)}
                {isFetching && <LpCardSkeletonList count={20} />}
            </div>
            <div ref={ref} className="h-2" />
        </div>
    );
};

export default HomePage;