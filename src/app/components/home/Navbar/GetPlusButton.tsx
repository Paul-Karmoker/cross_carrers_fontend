import { Link, useNavigate } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";

interface Props {
  onClose?: () => void;
}

export default function GetPlusButton({ onClose }: Props) {
  const navigate = useNavigate();

  return (
    <div className="hidden sm:flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-700 text-white text-xs font-bold uppercase tracking-wider rounded-full pl-5 pr-2 py-1.5 shadow-md">
      <span>Get Plus</span>
    
      <button
        onClick={() => navigate("/priceing")}
        className="bg-white text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-50 transition"
      >
        Upgrade
      </button>

      {onClose && (
        <button
          onClick={onClose}
          className="p-1 text-white/70 hover:text-white"
        >
          <RiCloseLine size={18} />
        </button>
      )}
    </div>
  );
}
