import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import {MovieDetails, MovieCredits} from "../types/moviedetails"
import MovieText from "../components/MovieInformation";



export default function MovieDetailPage() {
    const [movieDetails,setMovieDetails] = useState<MovieDetails>();

    const[isPending,setIsPending] = useState(false);

    const[isError,setIsError] = useState(false);

    const [movieCredits, setMovieCredits] = useState<MovieCredits>();

    const {movieId} = useParams<{ category: string; movieId:string; }>();

    useEffect(() =>{
        const fetchMovies = async () =>{
            setIsPending(true);

            try{
                const {data} = await axios.get<MovieDetails>(
                    `${import.meta.env.VITE_BASE_URL}/${movieId}?language=ko-KR`,
                    
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                           
                        },
                    }
                );
                setMovieDetails(data);

                const creditsResp = await axios.get<MovieCredits>(
                    `${import.meta.env.VITE_BASE_URL}/${movieId}/credits?language=ko-KR`,
                    {
                      headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                      },
                    }
                  );
                  setMovieCredits(creditsResp.data);
            } catch(error){
                console.log(error);
                setIsError(true);
            } finally{
                setIsPending(false);
            }
        };    
            
        fetchMovies();
        
    },[movieId]);

    if (isError) {
        return <div>
            <span className='text-red-500 text-2xl'>에러가 발생했습니다</span>
        </div>
    }
    return (
            <>
            {isPending && (
                <div className=' flex items-center justify-center h-dvh'>
                <LoadingSpinner/></div>)}
            {!isPending && movieDetails && movieCredits &&(
                <div className='p-10 max-w-4xl mx-auto'>
                    <MovieText details = {movieDetails} credits={movieCredits} />
                </div>
            )}
            </>
            
        );
}