import clsx from "clsx";
import { useTheme } from "./context/ThemeProvider";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Navbar(): Element{
    const {theme, toggleTheme} = useTheme();
    
    const isLightMode = theme === THEME.LIGHT;
    return (
    <nav className= {clsx(
        'p-4 w-full flex justify-end',
        isLightMode ? 'bg-white': 'bg-gray-800'
    )}>
        <ThemeToggleButton/>
    </nav>
    );
}