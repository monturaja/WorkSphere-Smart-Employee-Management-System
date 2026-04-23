"use client";
import AttendanceGrid from "@/components/attendance/AttendanceGrid";
import { useSession } from "next-auth/react";
import { Activity, ShieldCheck } from 'lucide-react';
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AttendancePage() {
  const { data: session } = useSession();
  const userRole = session?.user?.role || 'employee';
  const isAdmin = userRole === 'admin';
  const isHR = userRole === 'hr';

  const theme = {
    accent: isAdmin ? "text-amber-500" : isHR ? "text-emerald-500" : "text-indigo-500",
    blur: isAdmin ? "bg-amber-600/5" : isHR ? "bg-emerald-600/5" : "bg-indigo-600/5"
  };

  return (
    <DashboardLayout>
       <header className="mb-12 relative overflow-hidden">
        {/* Decorative background for admin/HR */}
        {(isAdmin || isHR) && <div className={`absolute -top-10 -right-10 w-64 h-64 ${theme.blur} rounded-full blur-[80px] -z-10`}></div>}

        <div className="flex items-center gap-3 mb-2">
          {isAdmin || isHR ? <ShieldCheck className={`w-5 h-5 ${theme.accent}`} /> : <Activity className="w-5 h-5 text-indigo-500" />}
          <h1 className="text-4xl font-black text-white tracking-tighter">
            {isAdmin || isHR ? 'Activity' : 'Attendance'} <span className={theme.accent}>Matrix</span>
          </h1>
        </div>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
          {isAdmin ? 'Real-time Chronological Personnel Verification' : isHR ? 'Personnel Activity Logistics & Synchronization' : 'Track daily check-ins and working hours.'}
        </p>
      </header>

      <AttendanceGrid />
    </DashboardLayout>
  );
}
