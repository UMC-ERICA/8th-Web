import { useNavigate } from "react-router-dom";
import { Lp } from "../../types/lp"; 
import { useState } from "react";

interface LpCardProps{
    lp:Lp;
}


const LpCard = ({lp}:LpCardProps )=> {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    return (
        <div
        onClick={()=>navigate(`/lps/${lp.id}`)} 
        className="relative rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 hover:shadow-2xl duration-300 cursor-pointer"
        onMouseEnter={()=>setIsHovered(true)}
        onMouseLeave={()=>setIsHovered(false)}>
                    <img src={lp.thumbnail} alt={lp.title} className='object-cover w-full h-48'/>
                    {/* <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2">
                        <h3 className="text-white text-sm font-semibold">{lp.title}</h3>
                    </div> */}

                {isHovered &&(
                    <div className="absolute inset-0 bg-gradient-to-t from black/90 to-transparent backdrop-blur-md justify-center ">
                        <h2 className="text-lg font-bold text-white leading-snug  mt-15">{lp.content}<br/>-<br/>{lp.title}</h2>

                    </div>
                )}
        </div>
    );
};

export default LpCard;