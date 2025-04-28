import './App.css'
import {createBrowserRouter, RouteObject, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import HomeLayout from "./layouts/HomeLayout.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import Mypage from "./pages/Mypage.tsx";
import { AuthProvider } from './context/AuthContext.tsx';
import ProtectedLayout from './layouts/ProtectedLayout.tsx';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage.tsx';


//1. 홈페이지
//2. 로그인 페이지
//3. 회원가입 페이지

// publicRoutes: 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "login", element: <LoginPage /> },
        { path: "signup", element: <SignupPage /> },
        { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage/>},
      ],
    },
  ];
  
const protectedRoutes: RouteObject[] = [
    {
        path: "/",
        element: <ProtectedLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
            path: "my",
            element: <Mypage />,
        }]
    }
]
const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    );
}

export default App;
