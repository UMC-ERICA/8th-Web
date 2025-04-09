import { NavLink } from "react-router-dom";

const LINKS = [
    { to: "/", label: "홈" },
    { to: "/movies/popular", label: "인기 영화" },
    { to: "/movies/now-playing", label: "상영 중" },
    { to: "/movies/top-rated", label: "평점 높은" },
    { to: "/movies/upcoming", label: "개봉 예정" },
];

export const Navbar = (): Element => {
    return (
      <div className='flex gap-3 p-4'>
        {LINKS.map(({ to, label }): Element => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }): 'text-[#b2dab1] font-bold' |
            'text-gray-5...' => {
              return isActive? 'text-[#b2dab1] font-bold': 'text-gray-500';
            }}
          >
            {label}
          </NavLink>
        ))}
      </div>
    );
  };
  
  