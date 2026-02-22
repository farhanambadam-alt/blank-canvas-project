import { Tag, Clock, Sparkles, Gift } from 'lucide-react';

const offers = [
  { title: 'First Visit Special', desc: 'Get 40% off on your first booking', badge: 'New User', color: 'bg-primary/10 text-primary', icon: Sparkles },
  { title: 'Weekend Glow Up', desc: 'Flat ₹200 off on weekends', badge: 'Weekend', color: 'bg-accent/20 text-accent-foreground', icon: Gift },
  { title: 'Festival Special', desc: 'Buy 2 services, get 1 free', badge: 'Limited', color: 'bg-success/10 text-success', icon: Tag },
];

const OffersPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="px-4 pt-6 pb-4">
        <h1 className="font-heading font-bold text-xl text-foreground">Offers & Deals</h1>
        <p className="text-xs font-body text-muted-foreground mt-1">Exclusive offers just for you</p>
      </header>

      <div className="px-4 space-y-3">
        {offers.map((offer, i) => (
          <div
            key={i}
            className="bg-card rounded-2xl p-4 card-shadow animate-fade-in-up"
            style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${offer.color}`}>
                <offer.icon size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-semibold text-sm text-foreground">{offer.title}</h3>
                  <span className={`text-[9px] font-heading font-semibold px-2 py-0.5 rounded-full ${offer.color}`}>{offer.badge}</span>
                </div>
                <p className="text-xs font-body text-muted-foreground mt-1">{offer.desc}</p>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground">
                  <Clock size={10} /> Expires in 3 days
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersPage;
