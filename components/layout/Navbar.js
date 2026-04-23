import { Search, Bell, Settings, User as UserIcon, Menu } from 'lucide-react';
import { useSession } from "next-auth/react";

export default function Navbar({ onMenuClick }) {
  const { data: session } = useSession();
  const user = session?.user;
  const isAdmin = user?.role === 'admin';
  const isHR = user?.role === 'hr';

  // Get initials for the avatar
  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const theme = {
    accent: isAdmin ? "text-amber-500" : isHR ? "text-emerald-500" : "text-indigo-500",
    bgAccent: isAdmin ? "bg-amber-500" : isHR ? "bg-emerald-500" : "bg-indigo-500",
    borderFocus: isAdmin ? "focus:ring-amber-500" : isHR ? "focus:ring-emerald-500" : "focus:ring-indigo-500",
    badge: isAdmin 
      ? "bg-amber-500 text-slate-950 font-black border-transparent" 
      : isHR
        ? "bg-emerald-500 text-slate-950 font-black border-transparent"
        : "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    avatar: isAdmin 
      ? "bg-gradient-to-br from-amber-400 to-amber-700 shadow-amber-500/30" 
      : isHR
        ? "bg-gradient-to-br from-emerald-400 to-sky-600 shadow-emerald-500/30"
        : "bg-indigo-600 shadow-indigo-600/20"
  };

  return (
    <nav className="fixed top-0 right-0 left-0 lg:left-64 h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md z-30 flex justify-between items-center px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="relative w-48 md:w-96 hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Global search" 
            className={cn(
              "w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 transition-all",
              theme.borderFocus
            )}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-1">
          <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className={cn("absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-slate-950", theme.bgAccent)}></span>
          </button>
          <button className="hidden md:block p-2 text-slate-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        <div className="h-8 w-[1px] bg-slate-800 mx-1 md:mx-2"></div>
        
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="hidden sm:flex flex-col items-end mr-1">
            <span className="text-sm font-black text-white leading-none mb-1 tracking-tight">{user?.name || "User"}</span>
            <span className={cn(
              "text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md border",
              theme.badge
            )}>
              {user?.role || "Guest"}
            </span>
          </div>
          <div className={cn("w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center text-white text-xs md:text-sm font-black shadow-lg", theme.avatar)}>
            {getInitials(user?.name)}
          </div>
        </div>
      </div>
    </nav>
  );
}

function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}
