import {useAuth} from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {

  const { accessToken } = useAuth();

console.log("🟠 [ProtectedLayout] accessToken 상태:", accessToken);

if (!accessToken) {
  console.log("🔴 [ProtectedLayout] accessToken 없음, /login으로 리다이렉트");
  return <Navigate to={"/login"} replace />;
}

console.log("🟢 [ProtectedLayout] accessToken 있음, Outlet 렌더링");

  return (
    <div className="h-dvh flex flex-col bg-black text-white">
        <nav className="flex items-center justify-between px-6 py-4 bg-black shadow-md">
            <div className="text-pink-500 text-2xl font-bold">
                돌려돌려LP판
            </div>
        </nav>

        <main className="flex-1">
            <Outlet />
        </main>

        <footer className="text-center py-4 border-t border-gray-700 text-sm text-gray-400">
            this is the Footer
        </footer>
    </div>
  )
};

export default ProtectedLayout
