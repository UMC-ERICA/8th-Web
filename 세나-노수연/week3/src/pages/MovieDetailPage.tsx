import {useEffect, useState} from 'react';
import axios from 'axios';
import { LoadingSpinner } from '../component/LoadingSpinner';
import { useParams } from 'react-router-dom';
import {MovieInfo} from '../types/movieInfo';
import MovieContent from '../component/MovieContent';
import {MovieCredit} from  '../types/movieCredit';


const MovieDetailPage = () => {
    const [movieInfo, setMovieInfo] = useState<MovieInfo | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [isError, setError] = useState(false);
    const [credits, setCredits] = useState<any | null>(null);
    const params = useParams<{category: string; movieId: string;}>();

    useEffect(() => {
        const fetchMovies = async () => {
            setIsPending(true);

            try {
                const {data} = await axios.get<MovieInfo>(
                    `https://api.themoviedb.org/3/movie/${params.movieId}?language=en-US&api_key=${import.meta.env.VITE_TMDB_KEY}`,
                );
                setMovieInfo(data);

                const creditData = await axios.get<MovieCredit>(
                    `https://api.themoviedb.org/3/movie/${params.movieId}/credits?language=en-US&api_key=${import.meta.env.VITE_TMDB_KEY}`,
                );
                setCredits(creditData.data);
            } catch {
                setError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetchMovies();
    }, [params.movieId]);

    if (isError){
        return (
            <div>
                <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span>
            </div>
        );
    }

    return (
        <>
        {isPending && (
            <div className='flex items-center justify-center h-screen'>
                <LoadingSpinner />
            </div>
        )}

        {!isPending && (
            <div className='p-10 grid gap-4'>
                {movieInfo && (<MovieContent movie={movieInfo} credits={credits} />)}
            </div>
        )}
        </>
    );
};


export default MovieDetailPage;