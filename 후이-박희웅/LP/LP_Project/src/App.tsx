import './App.css';
import { createBrowserRouter, RouteObject, RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import HomeLayout from './pages/layouts/HomeLayout';
import SignupPage from './pages/SignupPage';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';
import MyPage from './pages/MyPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './pages/layouts/ProtectedLayout';


const publicRoutes : RouteObject[] = [
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <HomePage />},
      {path: 'login', element: <LoginPage />},
      {path: 'signup', element: <SignupPage />},
      {path: '/v1/auth/google/callback', element: <GoogleLoginRedirectPage />}, // 구글 로그인
    ],
  }
];

const privateRoutes : RouteObject[] = [
  { 
    path: '/my', 
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '', // ✅ 이게 핵심! /my로 접근 시 MyPage 렌더링됨
        element: <MyPage />,
      },
    ]
  }, 
];

const router = createBrowserRouter([
  ...publicRoutes,
  ...privateRoutes,
])

function App() {
  return (
    <AuthProvider>
      <RouterProvider router = {router} />
    </AuthProvider>
  );
}
export default App;