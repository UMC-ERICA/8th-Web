import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/UseCustomFetch";
import { MovieDetailResponse } from "../types/movies";

const MovieDetailPage=()=>{
    const params = useParams();
    const url = `https://api.themoviedb.org/3/movie/${params.movieId}`
    const {isPending, isError, data:movie} = useCustomFetch<MovieDetailResponse>(url,'ko-KR');

    if(isPending){
        return <div>로딩중...</div>;
    }
    if(isError){
        return(
            <div>
                <span className="text-red-500 text-2xl">에러 발생</span>
            </div>
        );
    }

    return (
        <div>
            MovieDetailPage{params.movieId}
            {movie?.id}
            {movie?.production_companies.map((company)=>company.name)}
            {movie?.overview}
        </div>
    )
}
export default MovieDetailPage; 