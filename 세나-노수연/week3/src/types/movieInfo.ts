export interface MovieInfo {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: string;
    budget: number;
    genres: {
        id: number;
        name: string;
    }[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    populariy: number;
    production_companies: {
        id: number;
        logo_path: string;
        name: string;
        origin_country: string;
    }[];
    
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}