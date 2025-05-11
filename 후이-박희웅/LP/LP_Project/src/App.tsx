import './App.css';
import { createBrowserRouter, RouteObject, RouterProvider} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import HomeLayout from './pages/layouts/HomeLayout';
import SignupPage from './pages/SignupPage';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';
import MyPage from './pages/MyPage';
import LpDetailPage from './pages/LpDetailPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './pages/layouts/ProtectedLayout';


const publicRoutes : RouteObject[] = [
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <HomePage />},
      {path: 'home', element: <HomePage />},
      {path: 'mypage', element: <MyPage />},
      {path: 'login', element: <LoginPage />},
      {path: 'signup', element: <SignupPage />},
      {path: '/v1/auth/google/callback', element: <GoogleLoginRedirectPage />}, // 구글 로그인
      { path: 'lp/:lpid', element: <LpDetailPage /> },
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

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router = {router} />
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}
export default App;