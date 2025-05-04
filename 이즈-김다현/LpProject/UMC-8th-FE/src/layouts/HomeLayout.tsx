import { Outlet, useNavigate } from "react-router-dom";

const HomeLayout = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="h-dvh flex flex-col bg-black">
      <nav className="flex items-center justify-between p-4 text-blue-200 text-2xl">
        <span>로그인하면 해킹 당해요</span>

        <div className="flex gap-2">
          <button
            onClick={handleLoginClick}
            className="bg-black text-white py-1 px-3 rounded-md hover:bg-gray-800 text-base"
          >
            로그인
          </button>
          <button
            onClick={handleSignupClick}
            className="bg-pink-500 text-white py-1 px-3 rounded-md hover:bg-pink-600 text-base"
          >
            회원가입
          </button>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="text-center text-white p-4">하단바</footer>
    </div>
  );
};

export default HomeLayout;