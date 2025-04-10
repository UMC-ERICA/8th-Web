import { MovieDetails, MovieCredits } from "../types/moviedetails";


interface MovieTextProps {
  details: MovieDetails;
  credits: MovieCredits;
}

export default function MovieText({details, credits}: MovieTextProps) {
  return (
    <div className="relative max-w-full h-140 object-top overflow-hidden ">
      <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
      alt = {details.title} 
      className="w-full h-full object-cover m-2 rounded-3xl"/>
      <div className="absolute inset-0 flex flex-col items-end justify-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  px-8">
        <h1 className="text-white text-5xl font-semibold">{details.title}</h1>
        <h2 className="text-white text-3xl">{details.original_title}</h2>
        <p className="text-white text-2xl">주연 배우 :{credits.cast[0].name},{credits.cast[1].name},{credits.cast[2].name}</p>
      </div>
      
    </div>
  );
}