import {Lp} from '../types/lp';
import { Link } from 'react-router-dom';

type LpCardProps = {
  lp : Lp;
};

const LpCard = ({ lp }: LpCardProps) => {
  return (
    <Link to={`/lp/${lp.id}`} key={lp.id}>
      <div className="relative aspect-square bg-gray-800 rounded overflow-hidden group transform transition-transform duration-300 hover:scale-105">
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute bottom-2 left-2 text-white text-sm space-y-1">
            <h2 className="font-semibold">{lp.title}</h2>
            <p>{lp.createdAt ? new Date(lp.createdAt).toLocaleDateString() : '날짜 없음'}</p>
          </div>
          <div className="absolute bottom-2 right-2 text-white text-sm">
            ❤️ {lp.likes?.length ?? 0}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LpCard;