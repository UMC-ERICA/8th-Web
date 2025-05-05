import {Lp} from '../../types/lp.ts';
import {useNavigate} from 'react-router-dom';

interface LpCardProps{
    lp: Lp;
}

const LpCard = ({lp}:LpCardProps )=> {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/lps/${lp.id}`);
    };

    return (
        <div 
            onClick = {handleClick}
            className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer">
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-3">
            <h3 className="text-sm font-semibold truncate">{lp.title}</h3>
            <div className="flex justify-between text-xs mt-1">
              <span>{new Date(lp.createdAt).toLocaleDateString()}</span>
              <span>❤️ {lp.likes?.length ?? 0}</span>
            </div>
          </div>
        </div>
      );
};

export default LpCard;
