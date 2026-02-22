import { useState, useEffect, useCallback } from 'react';
import { Search, MapPin, Bell, SlidersHorizontal, ChevronDown, Mic, Map, TrendingUp } from 'lucide-react';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import CategoryChips from '@/components/CategoryChips';
import NearbySalonCard from '@/components/NearbySalonCard';
import { categories, featuredSalons, nearbySalons } from '@/data/mockData';

const searchSuggestions = ['Haircut near me', 'Bridal makeup', 'Hair coloring', 'Beard trim', 'Spa packages'];

const HomePage = () => {
  const [gender, setGender] = useState<'male' | 'female'>(() => {
    return (localStorage.getItem('preferred_gender') as 'male' | 'female') || 'male';
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
    return localStorage.getItem('preferred_category') || '1';
  });
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('preferred_gender', gender);
  }, [gender]);

  useEffect(() => {
    if (selectedCategory) localStorage.setItem('preferred_category', selectedCategory);
  }, [selectedCategory]);

  // Simulate loading
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  // Pull to refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);
    setTimeout(() => {
      setRefreshing(false);
      setIsLoading(false);
    }, 1500);
  }, []);

  const SkeletonCard = () => (
    <div className="flex-shrink-0 w-52 bg-card rounded-2xl overflow-hidden card-shadow">
      <div className="h-32 skeleton-shimmer rounded-t-2xl" />
      <div className="p-3 space-y-2">
        <div className="h-4 w-3/4 skeleton-shimmer rounded-full" />
        <div className="h-3 w-1/2 skeleton-shimmer rounded-full" />
        <div className="h-3 w-2/3 skeleton-shimmer rounded-full" />
      </div>
    </div>
  );

  const SkeletonCarousel = () => (
    <div className="mx-4 aspect-[16/10] skeleton-shimmer rounded-2xl" />
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-body">Hello,</p>
              <p className="font-heading font-semibold text-sm text-foreground">Aarav</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 bg-secondary px-3 py-1.5 rounded-full">
              <MapPin size={14} className="text-primary" />
              <span className="text-xs font-body font-medium text-foreground">Bangalore</span>
              <ChevronDown size={12} className="text-muted-foreground" />
            </button>
            <button className="relative p-2">
              <Bell size={20} className="text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Text */}
      <div className="px-4 pt-3 pb-1">
        <h1 className="font-heading font-bold text-2xl text-foreground leading-tight">
          Premium Salons,
        </h1>
        <p className="font-heading font-light text-lg text-muted-foreground italic">
          Handpicked for you.
        </p>
      </div>

      {/* Search */}
      <div className="px-4 py-3 relative">
        <div className={`flex items-center gap-2 bg-card border rounded-2xl px-4 py-3 transition-all duration-250 ${
          searchFocused ? 'border-primary shadow-md' : 'border-border card-shadow'
        }`}>
          <Search size={18} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search salon, service..."
            className="flex-1 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
          />
          <Mic size={18} className="text-muted-foreground flex-shrink-0 cursor-pointer active:text-primary transition-colors" />
          <SlidersHorizontal size={18} className="text-muted-foreground flex-shrink-0 cursor-pointer" />
        </div>

        {/* Search Suggestions */}
        {searchFocused && !searchQuery && (
          <div className="absolute left-4 right-4 top-full mt-1 bg-card border border-border rounded-2xl shadow-lg z-30 overflow-hidden animate-fade-in-up" style={{ animationDuration: '200ms' }}>
            <p className="text-[10px] font-heading font-semibold text-muted-foreground px-4 pt-3 pb-1">RECENT SEARCHES</p>
            {searchSuggestions.map((s) => (
              <button
                key={s}
                onMouseDown={() => setSearchQuery(s)}
                className="w-full text-left px-4 py-2.5 text-sm font-body text-foreground hover:bg-secondary/50 flex items-center gap-2 transition-colors"
              >
                <Search size={14} className="text-muted-foreground" />
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Gender Toggle */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-body text-muted-foreground mr-1">Select Gender</span>
          <div className="relative flex bg-secondary rounded-xl p-0.5">
            <div
              className="absolute top-0.5 bottom-0.5 rounded-lg bg-primary transition-transform duration-250 ease-out"
              style={{
                width: 'calc(50% - 2px)',
                transform: gender === 'male' ? 'translateX(2px)' : 'translateX(calc(100% + 2px))',
              }}
            />
            <button
              onClick={() => setGender('male')}
              className={`relative z-10 px-5 py-1.5 text-xs font-heading font-medium rounded-lg transition-colors duration-200 ${
                gender === 'male' ? 'text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              Male
            </button>
            <button
              onClick={() => setGender('female')}
              className={`relative z-10 px-5 py-1.5 text-xs font-heading font-medium rounded-lg transition-colors duration-200 ${
                gender === 'female' ? 'text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              Female
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <CategoryChips
        categories={categories}
        selected={selectedCategory}
        onSelect={(id) => setSelectedCategory(id === selectedCategory ? null : id)}
      />

      {/* Featured Section */}
      <div className="pt-4">
        <h2 className="font-heading font-semibold text-base text-foreground px-4 mb-3">
          Best Salons in Your City
        </h2>
        {isLoading ? <SkeletonCarousel /> : <FeaturedCarousel salons={featuredSalons} />}
      </div>

      {/* Top Rated / Trending */}
      <div className="pt-6">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="font-heading font-semibold text-base text-foreground flex items-center gap-1.5">
            <TrendingUp size={16} className="text-accent" /> Trending Now
          </h2>
          <button className="text-xs font-body font-medium text-primary">View All →</button>
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-4 scrollbar-hide">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            featuredSalons.map((salon) => (
              <NearbySalonCard key={salon.id} salon={salon} />
            ))
          )}
        </div>
      </div>

      {/* Nearby Salons */}
      <div className="pt-2">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="font-heading font-semibold text-base text-foreground">Nearby Salons</h2>
          <button className="text-xs font-body font-medium text-primary">View All →</button>
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-4 scrollbar-hide">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            nearbySalons.map((salon) => (
              <NearbySalonCard key={salon.id} salon={salon} />
            ))
          )}
        </div>
      </div>

      {/* Explore on Map */}
      <div className="px-4 pb-4">
        <button className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary font-heading font-semibold text-sm py-3 rounded-2xl active:scale-[0.98] transition-transform">
          <Map size={18} />
          Explore Salons on Map
        </button>
      </div>

      {/* Suggested For You */}
      <div className="pt-2 pb-4">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="font-heading font-semibold text-base text-foreground">Suggested for You</h2>
        </div>
        <div className="px-4 space-y-3">
          {isLoading ? (
            <div className="h-24 skeleton-shimmer rounded-2xl" />
          ) : (
            [...featuredSalons, ...nearbySalons].slice(0, 3).map((salon) => (
              <div key={salon.id} className="flex items-center gap-3 bg-card rounded-2xl p-3 card-shadow">
                <img src={salon.image} alt={salon.name} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-semibold text-sm text-foreground truncate">{salon.name}</h4>
                  <p className="text-[11px] font-body text-muted-foreground">{salon.address} • {salon.distance}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-accent">⭐ {salon.rating}</span>
                    <span className="text-[10px] text-muted-foreground">• From ₹{salon.startingPrice}</span>
                  </div>
                </div>
                <button className="text-[11px] font-heading font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-lg active:scale-95 transition-transform flex-shrink-0">
                  Book
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
