import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import HomeLayout from './layouts/HomeLayout'
import ProtectedLayout from './layouts/ProtectedLayout'
import SignupPage from './pages/SignupPage'
import MyPage from './pages/MyPage'
import { AuthProvider } from './context/AuthContext'
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import LpDetailPage from './pages/LpDetailPage'
import ThrottlePage from './pages/ThrottlePage'

//publicRoutes
const publicRoutes:RouteObject[] =[
  {
    path:'/',
    element:<HomeLayout/>,
    errorElement:<NotFoundPage/>,
    children:[
      {index: true , element: <HomePage/>},
      {path: 'login', element: <LoginPage/>},
      {path: 'signup', element: <SignupPage/>},
      {path: 'v1/auth/google/callback', element:<GoogleLoginRedirectPage/>},
      {path: 'lps/:lpId', element:<LpDetailPage/>},
      {path: '/throttle', element:<ThrottlePage/>}
    ]
  }
];
//protectedRoutes
const protectedRoutes:RouteObject[]=[
  {
    path:'/mypage',
    element:<ProtectedLayout/>,
    errorElement:<NotFoundPage/>,
    children:[
      {
        index:true, element:<MyPage/>,
      }
    ]
  }
]
const router = createBrowserRouter([...publicRoutes,...protectedRoutes]);

export const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry:3,
    }
  }
});
function App() {

    return (
      <QueryClientProvider client ={queryClient}>
        <AuthProvider>
          <RouterProvider router = {router}/>
        </AuthProvider>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false}/>}
      </QueryClientProvider>
    )
}

export default App;
