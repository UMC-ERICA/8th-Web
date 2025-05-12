import './App.css';
import MoviePage from './pages/MoviePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/Homepage';
import MovieDetailPage from './pages/MovieDetailPage';
import { JSX } from 'react';
// BrowserRouter v5
// createVrowsedRouter v6

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
      path: '/movies/:category',
      element: <MoviePage />,
      },
      {
      path:"movies/:categoty/:movieId",
      element: <MovieDetailPage />,
    }
  ]
  },
]);

// movies/upcoming
// movies/popular
// movies/top_rated
// movies/now_playing
// movies/category{movie_id}
// movies?categoty=upcoming
// movies?category=popular
// movies/123


function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;