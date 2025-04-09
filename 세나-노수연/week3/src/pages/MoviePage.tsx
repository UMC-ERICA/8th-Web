import {useEffect, useState} from 'react';
import {Movie, MovieResponse} from '../types/movie';
import MovieCard from '../component/MovieCard';
import axios from 'axios';
import { LoadingSpinner } from '../component/LoadingSpinner';
import { useParams } from 'react-router-dom';

export default function MoviesPage()  {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isPending, setIsPending] = useState(false); //로딩상태
    const [isError, setError] = useState(false); //에러상태
    const [page, setPage] = useState(1);

    const params = useParams<{category: string}>();

    useEffect(() => {
        const fetchMovies = async () => {
            setIsPending(true);
            // 응답에 대한 타입을 정의
            try {
            const { data } = await axios.get<MovieResponse>(
                `https://api.themoviedb.org/3/movie/${params.category}?language=en-US&page=${page}&api_key=${import.meta.env.VITE_TMDB_KEY}`,
            ); 
            setMovies(data.results);

            } catch {
                setError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetchMovies();
    }, [page, params.category]);

    if (isError) {
        return ( <div>
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
                {movies.map((movie) => ( 
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>
            )}
            </>
        );
    };
