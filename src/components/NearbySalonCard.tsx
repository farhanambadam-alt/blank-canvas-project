import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Salon } from '@/types/salon';

interface NearbySalonCardProps {
  salon: Salon;
}

const NearbySalonCard = ({ salon }: NearbySalonCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/salon/${salon.id}`)}
      className="flex-shrink-0 w-52 bg-card rounded-2xl overflow-hidden card-shadow transition-all duration-200 active:scale-[0.97] cursor-pointer"
    >
      <div className="relative h-32">
        <img src={salon.image} alt={salon.name} className="w-full h-full object-cover" loading="lazy" />
        <span className={`absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
          salon.isOpen ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'
        }`}>
          {salon.isOpen ? 'Open' : 'Closed'}
        </span>
      </div>
      <div className="p-3">
        <h4 className="font-heading font-semibold text-sm text-foreground truncate">{salon.name}</h4>
        <div className="flex items-center gap-1 mt-1">
          <Star size={12} className="text-accent fill-accent" />
          <span className="text-xs font-body text-foreground">{salon.rating}</span>
          <span className="text-xs text-muted-foreground">• {salon.distance}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground font-body">From ₹{salon.startingPrice}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/salon/${salon.id}`);
            }}
            className="text-[11px] font-heading font-semibold text-primary bg-primary/10 px-3 py-1 rounded-lg active:scale-95 transition-transform"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default NearbySalonCard;
