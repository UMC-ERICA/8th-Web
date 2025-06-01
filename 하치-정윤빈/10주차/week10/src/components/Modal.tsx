import { Movie } from "../types/movie";

interface ModalProps {
    movie: Movie;
    onClose: () => void;
}

const Modal = ({ movie, onClose }: ModalProps) => {
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    const fallbackImage = "http://via.placeholder.com/640x480";

    return (
        <div className="fixed inset-0 backdrop-blur-md shadow-md flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">{movie.title}</h2>
                    <p className="text-gray-600 mr-95 mt-2">{movie.original_title}</p>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3">
                        <img
                            src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : fallbackImage}
                            alt={`${movie.title} 포스터`}
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>
                    
                    <div className="w-full md:w-2/3">
                        <div className="space-y-4">
                            <div>
                                
                                <p className="text-xl font-bold text-blue-600">{movie.vote_average.toFixed(1)} / 10</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">개요</h3>
                                <p className="text-gray-600">{movie.overview}</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700">개봉일</h3>
                                    <p className="text-gray-600">{movie.release_date}</p>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700">언어</h3>
                                    <p className="text-gray-600">{movie.original_language.toUpperCase()}</p>
                                </div>
                                <button className="container bg-blue-500 font-semibold text-white rounded-lg w-30 h-12 ">
                                    ImDB에서 검색
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;