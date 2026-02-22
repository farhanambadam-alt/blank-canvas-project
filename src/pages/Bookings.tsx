import { useState } from 'react';
import { CalendarDays, X } from 'lucide-react';
import { bookings } from '@/data/mockData';

const BookingsPage = () => {
  const [tab, setTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const filtered = bookings.filter((b) => b.status === tab);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="px-4 pt-6 pb-4">
        <h1 className="font-heading font-bold text-xl text-foreground">My Bookings</h1>
      </header>

      <div className="flex gap-2 px-4 pb-4">
        {(['upcoming', 'completed', 'cancelled'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-heading font-medium capitalize transition-all ${
              tab === t ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="px-4 space-y-3">
        {filtered.map((booking) => (
          <div key={booking.id} className="bg-card rounded-2xl overflow-hidden card-shadow animate-fade-in-up">
            <div className="flex gap-3 p-3">
              <img src={booking.salonImage} alt={booking.salonName} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-sm text-foreground">{booking.salonName}</h3>
                <p className="text-[11px] font-body text-muted-foreground mt-0.5 truncate">{booking.services.join(', ')}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <CalendarDays size={12} className="text-muted-foreground" />
                  <span className="text-[11px] font-body text-muted-foreground">{booking.date} • {booking.time}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-heading font-semibold text-sm text-foreground">₹{booking.totalPrice}</span>
                  <span className={`text-[10px] font-heading font-medium px-2 py-0.5 rounded-full ${
                    booking.status === 'upcoming' ? 'bg-primary/10 text-primary' :
                    booking.status === 'completed' ? 'bg-success/10 text-success' :
                    'bg-destructive/10 text-destructive'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <CalendarDays size={40} className="mx-auto text-muted-foreground/40 mb-3" />
            <p className="font-heading font-medium text-sm text-muted-foreground">No {tab} bookings</p>
            <p className="text-xs font-body text-muted-foreground/60 mt-1">Your bookings will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
