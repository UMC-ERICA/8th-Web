import { NavLink} from "react-router-dom";

const LINKS = [
    { to: '/', label: 'home'},
    { to: '/movies/popular', label: 'Popular'},
    { to: '/movies/now_playing', label: 'Now Playing'},
    { to: '/movies/upcoming', label: 'Upcoming'},
    { to: '/movies/top_rated', label: 'Top Rated'},
]

export const Navbar = () => {
    return (
        <div className='flex gap-5 p-4'>
            {LINKS.map(({to, label}) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({isActive}) =>{
                        return isActive ? 'text-[#b2dab1]' : 'text-gray-500';
                    }}
                >
                    {label}
                </NavLink>
            ))}
        </div>
    );
};

