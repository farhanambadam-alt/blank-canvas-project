import { useState, useRef, useEffect, useCallback } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import type { Artist, Review } from '@/types/salon';

interface ReviewsSectionProps {
  artists: Artist[];
  reviews: Review[];
  selectedArtist: string | null;
  onSelectArtist: (id: string | null) => void;
}

const PILL_BG = '#F8F1E9';
const PILL_BORDER = '#E8DED6';
const MUTED_TAUPE = '#9C918C';
const MUTED_BRONZE = '#9A7B6D';
const EMPTY_STAR = '#E8DED6';

const ReviewsSection = ({ artists, reviews, selectedArtist, onSelectArtist }: ReviewsSectionProps) => {
  const [reviewFilter, setReviewFilter] = useState<string>('all');
  const [isJiggling, setIsJiggling] = useState(false);
  const [tabStyle, setTabStyle] = useState<{ left: number; width: number } | null>(null);

  const artistRowRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredReviews = reviews.filter((r) => {
    if (selectedArtist && r.artistId !== selectedArtist) return false;
    if (reviewFilter === 'all') return true;
    if (reviewFilter === '5') return r.rating === 5;
    if (reviewFilter === '4') return r.rating >= 4;
    if (reviewFilter === 'photos') return r.hasPhoto;
    return true;
  });

  const currentArtist = artists.find((a) => a.id === selectedArtist);
  const avgRating = filteredReviews.length > 0
    ? (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(1)
    : '0.0';

  const reviewPhotos = [
    'https://images.unsplash.com/photo-1585747860019-8e8e13c2e4f2?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1622288432450-277d0fef5ed6?w=300&h=300&fit=crop',
  ];

  const updateTabPosition = useCallback(() => {
    const key = selectedArtist ?? '_all';
    const btn = buttonRefs.current.get(key);
    const row = artistRowRef.current;
    if (!btn || !row) return;

    const rowRect = row.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    setTabStyle({
      left: btnRect.left - rowRect.left,
      width: btnRect.width,
    });
  }, [selectedArtist]);

  useEffect(() => {
    updateTabPosition();
    window.addEventListener('resize', updateTabPosition);
    return () => window.removeEventListener('resize', updateTabPosition);
  }, [updateTabPosition]);

  useEffect(() => {
    setIsJiggling(true);
    const timer = setTimeout(() => setIsJiggling(false), 700);
    return () => clearTimeout(timer);
  }, [selectedArtist]);

  const setButtonRef = (key: string) => (el: HTMLButtonElement | null) => {
    if (el) buttonRefs.current.set(key, el);
    else buttonRefs.current.delete(key);
  };

  return (
    <div className="animate-fade-in-up" style={{ animationDuration: '300ms' }}>
      {/* Our Stylists Header */}
      <div className="px-5 pt-5 pb-1">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="font-serif text-xl text-truffle italic">Our Stylists</h2>
          <button
            className="text-[11px] font-sans font-semibold uppercase tracking-widest"
            style={{ color: MUTED_TAUPE }}
          >
            View All
          </button>
        </div>

        {/* Artist Selector */}
        <div className="relative" ref={artistRowRef}>
          {/* Jelly Pill — z-index 1, behind avatars (z-2), below container (z-3) */}
          {tabStyle && (
            <div
              className="absolute pointer-events-none"
              style={{
                left: tabStyle.left - 12,
                width: tabStyle.width + 24,
                top: -8,
                bottom: -28,
                background: PILL_BG,
                borderRadius: '40px 40px 0 0',
                borderLeft: `1px solid ${PILL_BORDER}`,
                borderRight: `1px solid ${PILL_BORDER}`,
                borderTop: `1px solid ${PILL_BORDER}`,
                boxShadow: `0 4px 12px rgba(0,0,0,0.04)`,
                transition: 'left 0.7s cubic-bezier(0.2, 1, 0.3, 1), width 0.5s cubic-bezier(0.2, 1, 0.3, 1)',
                animation: isJiggling ? 'jelly 0.55s ease' : 'none',
                transformOrigin: 'bottom center',
                zIndex: 1,
              }}
            />
          )}

          {/* Artists Row — z-index 2, above pill */}
          <div
            className="flex overflow-x-auto scrollbar-hide pb-4 items-end justify-evenly relative"
            style={{ zIndex: 2 }}
          >
            <button
              ref={setButtonRef('_all')}
              onClick={() => onSelectArtist(null)}
              className="flex flex-col items-center gap-2 flex-shrink-0 min-w-[72px]"
            >
              <div
                className={`rounded-full flex items-center justify-center text-[11px] font-sans font-bold text-truffle border-2 transition-all duration-300 ease-out ${
                  !selectedArtist
                    ? 'w-16 h-16 border-bronze/40 shadow-md'
                    : 'w-12 h-12 border-transparent opacity-50'
                }`}
                style={{
                  background: PILL_BG,
                  ...((!selectedArtist && isJiggling) ? { animation: 'jelly 0.55s ease', transformOrigin: 'bottom center' } : {}),
                }}
              >
                ALL
              </div>
              <span
                className={`text-[9px] font-sans uppercase tracking-widest transition-all duration-200 ${
                  !selectedArtist ? 'font-bold text-truffle' : 'font-medium'
                }`}
                style={selectedArtist ? { color: MUTED_TAUPE } : undefined}
              >
                All Artists
              </span>
            </button>

            {artists.map((artist) => {
              const isSelected = selectedArtist === artist.id;
              return (
                <button
                  key={artist.id}
                  ref={setButtonRef(artist.id)}
                  onClick={() => onSelectArtist(isSelected ? null : artist.id)}
                  className="flex flex-col items-center gap-2 flex-shrink-0 min-w-[72px]"
                >
                  <div
                    className={`rounded-full overflow-hidden border-2 transition-all duration-300 ease-out ${
                      isSelected
                        ? 'w-16 h-16 border-bronze/40 shadow-md'
                        : 'w-12 h-12 border-transparent opacity-50'
                    }`}
                    style={isSelected && isJiggling ? { animation: 'jelly 0.55s ease', transformOrigin: 'bottom center' } : undefined}
                  >
                    <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover" />
                  </div>
                  <span
                    className={`text-[9px] font-sans uppercase tracking-widest whitespace-nowrap transition-all duration-200 ${
                      isSelected ? 'font-bold text-truffle' : 'font-medium'
                    }`}
                    style={!isSelected ? { color: MUTED_TAUPE } : undefined}
                  >
                    {artist.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews Container — z-index 3, negative margin overlaps pill seamlessly */}
      <div
        ref={containerRef}
        className="mx-3 relative"
        style={{
          marginTop: -20,
          zIndex: 3,
          background: PILL_BG,
          borderRadius: '1.25rem',
          padding: '2px',
          animation: isJiggling ? 'jelly-container 0.5s ease' : 'none',
          transformOrigin: 'top center',
        }}
      >
        {/* Reviews Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h3 className="font-serif text-[19px]">
            {currentArtist ? (
              <>
                <span className="text-truffle font-normal">{currentArtist.name}</span>{' '}
                <span className="italic" style={{ color: MUTED_BRONZE }}>Reviews</span>
              </>
            ) : (
              <>
                <span className="text-truffle font-normal">All</span>{' '}
                <span className="italic" style={{ color: MUTED_BRONZE }}>Reviews</span>
              </>
            )}
          </h3>
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
          >
            <Star size={13} className="text-bronze fill-bronze" />
            <span className="text-sm font-sans font-bold text-truffle">{avgRating}</span>
          </div>
        </div>

        {/* Review Cards */}
        <div className="space-y-3 px-2 pb-3">
          {filteredReviews.map((review, index) => (
            <div
              key={review.id}
              className="rounded-[28px] p-5"
              style={{
                background: '#FFFFFF',
                boxShadow: '0 8px 30px rgb(0 0 0 / 0.04)',
                animation: `fade-in-up 0.4s ease-out ${index * 80}ms both`,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: PILL_BG, border: `1px solid ${PILL_BORDER}` }}
                  >
                    <span className="font-serif text-base font-semibold text-truffle">
                      {review.userName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans font-semibold text-[13px] text-truffle">{review.userName}</span>
                      <CheckCircle2 size={13} style={{ color: MUTED_BRONZE }} className="fill-bronze/10" />
                    </div>
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          className={i < review.rating ? 'text-bronze fill-bronze' : ''}
                          style={i >= review.rating ? { color: EMPTY_STAR, fill: EMPTY_STAR } : undefined}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span
                  className="text-[9px] font-sans uppercase tracking-widest whitespace-nowrap pt-1"
                  style={{ color: MUTED_TAUPE }}
                >
                  {review.date}
                </span>
              </div>

              <div className="mb-3">
                <span
                  className="inline-block text-[9px] font-sans font-bold text-truffle uppercase tracking-widest px-3.5 py-1 rounded-full"
                  style={{ background: PILL_BG, border: `1px solid ${PILL_BORDER}` }}
                >
                  {review.service}
                </span>
              </div>

              <p className="text-[13px] font-sans text-truffle/75 leading-relaxed italic">
                "{review.text}"
              </p>

              {review.hasPhoto && (
                <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
                  {reviewPhotos.map((photo, i) => (
                    <div key={i} className="w-36 h-36 flex-shrink-0 rounded-2xl overflow-hidden">
                      <img src={photo} alt={`Review photo ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {filteredReviews.length === 0 && (
            <div className="text-center py-14">
              <p className="font-serif text-base italic" style={{ color: MUTED_BRONZE }}>
                No reviews yet for this stylist...
              </p>
              <p className="text-[10px] font-sans mt-2 tracking-wide" style={{ color: MUTED_TAUPE }}>
                Be the first to share your experience
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
