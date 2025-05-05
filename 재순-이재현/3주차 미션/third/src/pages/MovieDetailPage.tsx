import { JSX } from "react";
import { useParams } from "react-router-dom";

const MovieDetailPage = (): JSX.Element => {
    const params = useParams();
    
    console.log(params); // Log params to avoid unused variable error
    
    return <div>MovieDetailPage</div>;
};

export default MovieDetailPage;