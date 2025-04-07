import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import {MovieDetails} from "../types/moviedetails"

export default function MovieDetailPage() {
    const [movieDetails,setMovieDetails] = useState<MovieDetails>();

    const[isPending,setIsPending] = useState(false);

    const[isError,setIsError] = useState(false);


    const params = useParams<{
        category: string; id:string; }>();



    useEffect(():void=>{
        const fetchMovies = async () : Promise<void> =>{
            setIsPending(true);

            try{
                const {data} = await axios.get<MovieDetails>(
                    `https://api.themoviedb.org/3/movie/${params.id}?language=ko-KR`,
                    
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                           
                        },
                    }
                );
                setMovieDetails(data);
            } catch{
                setIsError(true);
            } finally{
                setIsPending(false);
            }
        };    
            
        fetchMovies();
        
    },[params.id]);

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
            {!isPending &&(
                <div className=''></div>
            )}
            </>
            
        );
}