import {MovieInfo} from "../types/movieInfo";
import {MovieCredit} from "../types/movieCredit";

interface MovieContentProps {
    movie: MovieInfo;
    credits: MovieCredit;
}

export default function MovieContent({movie, credits}: MovieContentProps) {
    return (
        <div className='max-w-screen-xl mx-auto'>
            <div className='relative'>
                <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={`${movie.title} 영화의 이미지`}
                    className='rounded-2xl shadow-lg w-full h-auto object-cover'
                />
            </div>
            
            <div className='mt-4 px-4'>
                <h1 className='text-4xl font-extrabold text-gray-900'>{movie.title}</h1>
                <p className='text-lg text-gray-600 mt-2'>{movie.release_date}</p>
                <p className='text-gray-800 text-base mt-3'>{movie.overview}</p>
            </div>

            <div className='mt-8'>
                <h2 className='text-2xl font-bold text-gray-900 ml-4'>Director/Cast</h2>
                <div className='grid grid-cols-4 gap-4 mt-4'>
                    <div className='ml-6'>
                        <h3 className='text-xl font-bold'>Director</h3>
                        <p className='text-gray-600'>
                            {credits?.crew?.find(crew => crew.job === "Director")?.name || "Unknown"}
                        </p>
                    </div>
                    <div>
                        <h3 className='text-xl font-bold mb-2'>Cast</h3>
                        <ul className='list-none list-inside'>
                            {credits?.cast?.slice(0,5).map((cast) => (
                                <li key={cast.cast_id} className='text-gray-600 mb-2'>
                                    <div className='flex items-conter gap-4'>
                                        {cast.profile_path && (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w45${cast.profile_path}`}
                                                alt={cast.name}
                                                className='w-13 h-13 rounded-full'
                                            />
                                        )}
                                        <div>
                                            <span className='block'>{cast.name}</span>
                                            <span className='block text-sm text-gray-500'>character: {cast.character}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}