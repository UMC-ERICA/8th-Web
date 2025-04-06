import { NavLink } from "react-router-dom";

const LINK =[
  {to: '/', text: '홈'},
  {to: '/movies/popular', text: '인기영화'},
  {to: '/movies/top_rated', text: '평점높은영화'},
  {to: '/movies/upcoming', text: '개봉예정영화'},
]

export const Navbar = () => {
  return (
    <div className="flex gap-6 p-5">
      {LINK.map((link) => (
        <NavLink 
        key={link.to} 
        to={link.to}
        className={({isActive}) => 
          isActive ? 'text-[#dda5e3] font-bold' : 'text-gray-500'}
        >
          {link.text}
        </NavLink>
      ))}
    </div>
  )
}