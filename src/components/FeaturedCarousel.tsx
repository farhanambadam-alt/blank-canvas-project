import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Salon } from '@/types/salon';

interface FeaturedCarouselProps {
  salons: Salon[];
}

const FeaturedCarousel = ({ salons }: FeaturedCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % salons.length);
  }, [salons.length]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <div
      className="relative overflow-hidden rounded-2xl mx-4"
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {salons.map((salon) => (
          <div key={salon.id} className="w-full flex-shrink-0 relative aspect-[16/10]">
            <img
              src={salon.image}
              alt={salon.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

            {salon.offer && (
              <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-semibold font-heading px-3 py-1 rounded-full">
                {salon.offer}
              </span>
            )}

            <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground text-xs font-semibold px-2 py-1 rounded-lg flex items-center gap-1">
              ⭐ {salon.rating}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-heading font-semibold text-lg text-primary-foreground">{salon.name}</h3>
              <p className="text-primary-foreground/70 text-xs font-body italic">{salon.tagline}</p>
              {salon.bookingsThisWeek && (
                <p className="text-primary-foreground/60 text-[10px] font-body mt-1">
                  🔥 {salon.bookingsThisWeek} bookings this week
                </p>
              )}
              <button
                onClick={() => navigate(`/salon/${salon.id}`)}
                className="mt-2 bg-primary text-primary-foreground text-sm font-heading font-medium px-5 py-2 rounded-xl transition-transform duration-200 active:scale-95"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 right-4 flex gap-1.5">
        {salons.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-4 bg-primary-foreground' : 'w-1.5 bg-primary-foreground/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
