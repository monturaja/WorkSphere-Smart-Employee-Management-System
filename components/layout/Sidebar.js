"use client";
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react";
import { usePathname } from 'next/navigation';
import { 
  Users, 
  LayoutDashboard, 
  Building2, 
  UserCheck, 
  CalendarDays, 
  Wallet, 
  UserCircle, 
  ChevronRight,
  LogOut,
  ShieldCheck,
  MessageSquare,
  X
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'hr', 'employee'] },
  { name: 'Employees', href: '/employees', icon: Users, roles: ['admin', 'hr'] },
  { name: 'Departments', href: '/departments', icon: Building2, roles: ['admin', 'hr'] },
  { name: 'Attendance', href: '/attendance', icon: UserCheck, roles: ['admin', 'hr', 'employee'] },
  { name: 'Leave', href: '/leave', icon: CalendarDays, roles: ['admin', 'hr', 'employee'] },
  { name: 'Payroll', href: '/payroll', icon: Wallet, roles: ['admin', 'hr'] },
  { name: 'Profile', href: '/profile', icon: UserCircle, roles: ['admin', 'hr', 'employee'] },
  { name: 'Inquiries', href: '/dashboard/inquiries', icon: MessageSquare, roles: ['admin'] },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = session?.user?.role || 'employee';
  const isAdmin = userRole === 'admin';
  const isHR = userRole === 'hr';

  const theme = {
    primary: isAdmin ? "bg-amber-500" : isHR ? "bg-emerald-500" : "bg-indigo-600",
    activeItem: isAdmin 
      ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20" 
      : isHR
        ? "bg-gradient-to-r from-emerald-600 to-sky-500 text-white shadow-lg shadow-emerald-500/20"
        : "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20",
    iconActive: (isAdmin) ? "text-slate-900" : "text-white",
    iconHover: isAdmin ? "group-hover:text-amber-400" : isHR ? "group-hover:text-emerald-400" : "group-hover:text-indigo-400",
    logoBg: isAdmin ? "bg-amber-500" : isHR ? "bg-gradient-to-br from-emerald-500 to-sky-400" : "bg-indigo-600",
    logoShadow: isAdmin ? "shadow-amber-500/30" : isHR ? "shadow-emerald-500/30" : "shadow-indigo-600/20"
  };

  const filteredItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside className={cn(
        "fixed left-0 top-0 z-50 h-screen w-64 border-r border-slate-800 bg-slate-950 px-3 py-6 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="mb-10 flex items-center justify-between px-3">
          <div className="flex items-center gap-3">
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl shadow-lg", theme.logoBg, theme.logoShadow)}>
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">WorkSphere</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-1">
          {filteredItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold transition-all duration-300",
                  isActive 
                    ? theme.activeItem
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("h-5 w-5 transition-colors", isActive ? theme.iconActive : cn("text-slate-500", theme.iconHover))} />
                  {item.name}
                </div>
                {isActive && <ChevronRight className={cn("h-4 w-4 opacity-70", isActive ? "animate-in slide-in-from-left-2" : "")} />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-0 w-full px-3">
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-all hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
