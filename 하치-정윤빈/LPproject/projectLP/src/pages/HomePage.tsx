import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import {useInView} from "react-intersection-observer"; 
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";


const HomePage =()=>{
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
    const debouncedValue = useDebounce(search,SEARCH_DEBOUNCE_DELAY);

   

    //ref,inView
    //ref-> 특정한 HTML 요소를 감시할 수 있다
    //inVew-> 그 요소가 화면에 보이면 true, 아니면 false
    const {data:lps, isFetching, hasNextPage, isPending, fetchNextPage, isError} = useGetInfiniteLpList(3, debouncedValue,order)

    const{ref, inView} = useInView({
        threshold:0,
    });

    useEffect(()=>{
        if(inView){
            !isFetching && hasNextPage && fetchNextPage()
        }
    },[inView, isFetching, hasNextPage, fetchNextPage])

    const toggleOrder =()=>{
        setOrder(prev =>
            prev ===PAGINATION_ORDER.desc ? PAGINATION_ORDER.asc :PAGINATION_ORDER.desc
        );
    };

    if(isPending){
        return <div className={"mt-20"}>Loading...</div>;
    }
    if(isError){
        return <div className={"mt-20"}>Error...</div>
    }

    console.log(lps);
    console.log('Pages:', lps?.pages);
    console.log('Flattened Data:', lps?.pages?.map((page)=>page.data.data)?.flat());
    return(
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
            <input 
                className="border-2 border-gray-500 rounded-xl px-4 py-2"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}/>
            <button
                onClick={toggleOrder}
                className="bg-pink-500 hover:bg-pink-600 texth-white px-4 py-2 rounded transition-colors">
                    {order === PAGINATION_ORDER.desc ? '최신순' : '오래된순'}
                </button>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {lps?.pages?.map((page)=>page.data.data)
            ?.flat()
            ?.map((lp)=> <LpCard key = {lp.id} lp={lp}/>)}  

            {isFetching&& <LpCardSkeletonList count={20}/>}
            </div>
            <div ref ={ref} className="h-2"/>
        </div> 
    )
};
export default HomePage;