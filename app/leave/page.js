"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import LeaveRequests from "@/components/leave/LeaveRequests";
import ApplyLeaveModal from "@/components/leave/ApplyLeaveModal";
import { Plus, CalendarDays, ShieldAlert } from 'lucide-react';
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function LeavePage() {
  const { data: session } = useSession();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const userRole = session?.user?.role || 'employee';
  const isAdmin = userRole === 'admin';
  const isHR = userRole === 'hr';

  const theme = {
    accent: isAdmin ? 'text-amber-500' : isHR ? 'text-emerald-500' : 'text-indigo-500',
    bgAccent: isAdmin 
      ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 shadow-2xl shadow-amber-600/20' 
      : isHR
        ? 'bg-gradient-to-r from-emerald-600 to-sky-500 text-slate-950 shadow-2xl shadow-emerald-500/20'
        : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <DashboardLayout>
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative overflow-hidden text-white">
        {/* Decorative background for admin/HR */}
        {(isAdmin || isHR) && <div className={`absolute -top-10 -right-10 w-64 h-64 ${isAdmin ? 'bg-amber-600/5' : 'bg-emerald-600/5'} rounded-full blur-[80px] -z-10`}></div>}

        <div>
          <div className="flex items-center gap-3 mb-2">
            {isAdmin ? <ShieldAlert className="w-5 h-5 text-amber-500" /> : isHR ? <ShieldAlert className="w-5 h-5 text-emerald-500" /> : <CalendarDays className="w-5 h-5 text-indigo-500" />}
            <h1 className="text-4xl font-black tracking-tighter">
              {isAdmin || isHR ? 'Absence' : 'Leave'} <span className={theme.accent}>{isAdmin || isHR ? 'Oversight' : 'Management'}</span>
            </h1>
          </div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
            {isAdmin ? 'Review and manage critical employee leave requests' : isHR ? 'Workforce Availability & Leave Logistics Oversight' : 'Manage your leave requests and balances.'}
          </p>
        </div>
        
        <button 
          onClick={() => setShowApplyModal(true)}
          className={`flex items-center gap-2 ${theme.bgAccent} px-7 py-4 rounded-2xl hover:brightness-110 transition-all text-xs font-black uppercase tracking-widest active:scale-95`}
        >
          {isAdmin || isHR ? <ShieldAlert className="w-5 h-5" /> : <Plus className="w-4 h-4" />}
          {isAdmin || isHR ? 'Authorized Absence Request' : 'Apply for Leave'}
        </button>
      </header>

      <LeaveRequests key={refreshKey} />

      <ApplyLeaveModal 
        isOpen={showApplyModal} 
        onClose={() => setShowApplyModal(false)}
        onSuccess={handleRefresh}
      />
    </DashboardLayout>
  );
}
