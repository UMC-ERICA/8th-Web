import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <nav className="h-14 border-b">네비게이션</nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="h-14 border-t">푸터</footer>
    </div>
  );
};

export default HomeLayout;