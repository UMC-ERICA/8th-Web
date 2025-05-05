import {useEffect, useState} from 'react';
import useGetInfiniteLpList from '../hooks/queries/useGetInfiniteLpList';
import { PAGINATION_ORDER } from '../enums/common';
import {useInView} from 'react-intersection-observer';
import LpCard from '../components/LpCard/LpCard';
import LpCardSkeletonList from '../components/LpCard/LpCardSkeletonList';


const HomePage = () => {

    const [search, setSearch] = useState('');

    const {data: lps, isFetching, hasNextPage, isPending, fetchNextPage, isError}
    = useGetInfiniteLpList(3, search, PAGINATION_ORDER.desc);
    const {ref, inView} = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView){
            !isFetching && hasNextPage && fetchNextPage()
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    if (isPending){
        return <div className={'mt-20'}>Loading...</div>;
    }

    if (isError) {
        return <div className={'mt-20'}>Error...</div>;
    }

    console.log(lps);
    console.log('Pages:', lps?.pages);
    console.log('Flattened Data:', lps?.pages?.map((page) => page.data.data)?.flat());

    return (
        <main className="min-h-screen bg-black text-white">
          <div className="container mx-auto px-4 py-6 pb-20">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4 w-full p-2 rounded bg-white text-black"
            />
      
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {lps?.pages?.map((page) => page.data.data)?.flat()?.map((lp) => (
                <LpCard key={lp.id} lp={lp} />
              ))}
      
              {isFetching && <LpCardSkeletonList count={20} />}
            </div>
      
            <div ref={ref} className="h-2" />
          </div>
        </main>
      );
}


export default HomePage;