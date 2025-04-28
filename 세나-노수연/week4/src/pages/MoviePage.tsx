import {useState} from 'react';
import {MovieResponse} from '../types/movie';
import MovieCard from '../component/MovieCard';
import { LoadingSpinner } from '../component/LoadingSpinner';
import { useParams } from 'react-router-dom';
import useCustonFetch from '../hooks/useCustomFetch';

export default function MoviesPage()  {
    const [page, setPage] = useState(1);
    const params = useParams<{category: string}>();

    const url = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${params.category}?language=en-US&page=${page}&api_key=${import.meta.env.VITE_TMDB_KEY}`
 
    const{data: movies, isPending, isError} = useCustonFetch<MovieResponse>(url);

    if (isError) {
        return ( 
        <div>
            <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span>
        </div>
        )
    };
    
    return (
        <>
            <div className = 'flex items-center justify-center gap-4 mt-5'>
                <button
                className='bg-[#b2dab1] text-white rounded-lg px-4 py-3 shadow-md
                hover:bg-[#a1c0a2] transition-all duration-200 disabled:bg-gray-300
                cursor-pointer disabled:cursor-not-allowed'
                disabled={page == 1}
                onClick={() => setPage((prev) => prev - 1)}>
                    {'<'}</button>
                <span>{page} 페이지</span>
                <button 
                className='bg-[#b2dab1] text-white rounded-lg px-4 py-3 shadow-md
                hover:bg-[#a1c0a2] transition-all duration-200 disabled:bg-gray-300
                cursor-pointer'
                onClick={() => setPage((prev) => prev + 1)}>
                    {'>'}</button>
            </div>
            {isPending && (
                <div className = 'flex items-center justify-center h-screen'>
                    <LoadingSpinner />
                </div>)}
            
            {!isPending && (
                <div className='p-10 grid gap-4 grid-dols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gid-cols-6'>
                {movies?.results.map((movie) => ( 
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>
            )}
            </>
        );
    };
