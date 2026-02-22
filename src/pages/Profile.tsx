import { User, Heart, CreditCard, Bell, HelpCircle, LogOut, ChevronRight, Gift, Star } from 'lucide-react';

const menuItems = [
  { icon: Heart, label: 'Saved Salons', badge: '3' },
  { icon: Star, label: 'Membership', badge: 'Gold' },
  { icon: CreditCard, label: 'Payment Methods' },
  { icon: Gift, label: 'Referral Code', desc: 'Share & earn ₹100' },
  { icon: Bell, label: 'Notifications' },
  { icon: HelpCircle, label: 'Help & Support' },
];

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* User Info */}
      <div className="bg-primary px-4 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-foreground/30">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-heading font-bold text-lg text-primary-foreground">Aarav Sharma</h1>
            <p className="text-xs font-body text-primary-foreground/70">+91 98765 43210</p>
          </div>
        </div>

        {/* Reward Points */}
        <div className="mt-4 bg-primary-foreground/10 rounded-2xl p-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-body text-primary-foreground/60">Reward Points</p>
            <p className="font-heading font-bold text-lg text-primary-foreground">2,450</p>
          </div>
          <button className="text-xs font-heading font-medium bg-primary-foreground/20 text-primary-foreground px-3 py-1.5 rounded-xl">
            Redeem
          </button>
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 pt-4 space-y-1.5">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 bg-card rounded-2xl p-3.5 card-shadow active:scale-[0.98] transition-transform"
          >
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <item.icon size={18} className="text-primary" />
            </div>
            <div className="flex-1 text-left">
              <span className="font-heading font-medium text-sm text-foreground">{item.label}</span>
              {item.desc && <p className="text-[10px] font-body text-muted-foreground">{item.desc}</p>}
            </div>
            {item.badge && (
              <span className="text-[10px] font-heading font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        ))}

        <button className="w-full flex items-center gap-3 bg-card rounded-2xl p-3.5 card-shadow mt-4">
          <div className="w-9 h-9 rounded-xl bg-destructive/10 flex items-center justify-center">
            <LogOut size={18} className="text-destructive" />
          </div>
          <span className="font-heading font-medium text-sm text-destructive">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
