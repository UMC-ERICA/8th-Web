import { ThemeProvider } from "../context/ThemeProvider";
import Navbar from "./Navbar";
import ThemeContent from "./ThemeContent";

export default function ContextPage(){
    return (
        <ThemeProvider>
            <div className='flex flex-col items-center justify-center min-h-screen'>
            <Navbar />
            <main className="fles-1 w-full">
                <ThemeContent />
            </main>
            </div>
        </ThemeProvider>
    )
}