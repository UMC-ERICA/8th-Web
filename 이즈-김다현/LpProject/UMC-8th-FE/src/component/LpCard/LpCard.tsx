import { useNavigate } from "react-router-dom";
import { Lp } from "../../types/lp";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();
  const formattedDate = new Date(lp.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric", month: "2-digit", day: "2-digit",
  });

  return (
    <div onClick={() => navigate(`/lps/${lp.id}`)}
    className="relative rounded-lg overflow-hidden shadow-lg group transition-transform duration-300 hover:scale-105 cursor-pointer">
      <img src={lp.thumbnail} alt={lp.title} className="object-cover w-full h-48 group-hover:blur-xs transition duration-300"/>
      <div className="absolute bottom-0 left-0 right-0 bg-opacity-60 bg-gray-600 p-3 opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-white text-sm font-semibold">{lp.title}</h3>
        <p className="text-gray-300 text-xs mt-1">{formattedDate}</p>
      </div>
    </div>
  );
};

export default LpCard;