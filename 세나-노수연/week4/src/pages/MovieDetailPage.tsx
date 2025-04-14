
import { useParams } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';
import { MovieDetailResponce, MovieCredit } from '../types/movie';
import {LoadingSpinner} from '../component/LoadingSpinner';
import MovieContent from '../component/MovieContent';


const MovieDetailPage = () => {
    const params = useParams<{movieId: string}>();

    const detailUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${params.movieId}?language=en-US&api_key=${import.meta.env.VITE_TMDB_KEY}`
    const creditsUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${params.movieId}/credits?language=en-US&api_key=${import.meta.env.VITE_TMDB_KEY}`

    const {data: movie, isPending: movieLoading, isError: movieError} = useCustomFetch<MovieDetailResponce>(detailUrl);
    const {data: credits, isPending: creditsLoading, isError: creditsError} = useCustomFetch<MovieCredit>(creditsUrl);
 
    const isPending = movieLoading || creditsLoading;
    const isError = movieError || creditsError;

    if (isPending || !movie || !credits){
        return (
            <div className = 'flex items-center justify-center h-screen'>
                <LoadingSpinner />
            </div>
        )
    }

    if (isError){
        return (
            <div className = 'flex items-center justify-center h-screen'>
                <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span>
            </div>
        );
    }

    return (
        <div className = 'p-10 grid gap-4'>
            <MovieContent movie = {movie} credits = {credits} />
        </div>

    );
};


export default MovieDetailPage;