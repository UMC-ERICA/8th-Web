// @ts-ignore

import './App.css'
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage';

const router: Router = createBrowserRouter(routes; [
    {
        path: '/',
        element: <HomePage/>,
        errorElement: <NotFoundPage/>,
        children: [
            {
                path: 'movies/:category/',
                element: <MoviePage/>,
            },
            {
                path: 'movies/:movieId/',
                element: <MovieDetailPage/>,
            },
        ],
    },
]);

function App(){
    return <RouterProvider router={router}/>;
}

export default App
