"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { CalendarDays, Clock, CheckCircle, XCircle, Loader2, User as UserIcon, ShieldCheck } from 'lucide-react';

export default function LeaveRequests() {
  const { data: session } = useSession();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdminOrHR = session?.user?.role === 'admin' || session?.user?.role === 'hr';

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/leave");
      const data = await res.json();
      if (data.success) {
        setRequests(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch leave requests", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch("/api/leave", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        fetchRequests();
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
        <p className="text-slate-500 font-medium tracking-tight">Retrieving leave applications...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          { label: "Pending", count: requests.filter(r => r.status === 'Pending').length, icon: Clock, color: "amber" },
          { label: "Approved", count: requests.filter(r => r.status === 'Approved').length, icon: CheckCircle, color: "emerald" },
          { label: "Rejected", count: requests.filter(r => r.status === 'Rejected').length, icon: XCircle, color: "red" }
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-[2rem] bg-slate-900/50 backdrop-blur-xl border border-slate-800 hover:border-slate-700 transition-all group">
            <div className="flex items-center gap-5">
              <div className={`p-4 rounded-2xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-4 pt-4">
        {requests.length > 0 ? requests.map((req) => (
          <div key={req._id} className="p-6 rounded-[2rem] bg-slate-900 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-slate-700 transition-all relative overflow-hidden">
             {/* Status indicator line */}
             <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
               req.status === 'Approved' ? 'bg-emerald-500' : 
               req.status === 'Pending' ? 'bg-amber-500' : 'bg-red-500'
             }`}></div>

            <div className="flex items-center gap-5">
              <div className="relative">
                {req.employeeId?.image ? (
                  <img src={req.employeeId.image} alt="" className="w-14 h-14 rounded-2xl object-cover border border-slate-800" />
                ) : (
                  <div className="w-14 h-14 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-slate-600" />
                  </div>
                )}
                {req.status === 'Approved' && (
                  <div className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-1 border-2 border-slate-950">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold text-white">{req.employeeId?.name || 'Unknown User'}</h4>
                  {req.employeeId?.position?.toLowerCase().includes('admin') && (
                    <ShieldCheck className="w-4 h-4 text-amber-500" />
                  )}
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{req.type} • {req.reason}</p>
              </div>
            </div>

            <div className="flex-1 flex flex-col md:items-center">
               <div className="flex items-center gap-2 text-slate-300 text-sm font-semibold bg-slate-950/50 px-4 py-2 rounded-xl border border-slate-800">
                  <CalendarDays className="w-4 h-4 text-indigo-400" />
                  {new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}
               </div>
               <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-2">Duration Cycle</span>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase border tracking-widest ${
                req.status === 'Approved' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : 
                req.status === 'Pending' ? 'text-amber-400 bg-amber-400/10 border-amber-400/20' : 
                'text-red-400 bg-red-400/10 border-red-400/20'
              }`}>
                {req.status}
              </span>
              
              {req.status === 'Pending' && isAdminOrHR && (
                <div className="flex gap-2">
                  <button 
                    onClick={() => updateStatus(req._id, 'Approved')}
                    className="p-3 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-2xl transition-all border border-emerald-500/20 group/btn"
                    title="Approve Request"
                  >
                    <CheckCircle className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                  </button>
                  <button 
                    onClick={() => updateStatus(req._id, 'Rejected')}
                    className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all border border-red-500/20 group/btn"
                    title="Reject Request"
                  >
                    <XCircle className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )) : (
          <div className="p-20 rounded-[3rem] bg-slate-900/30 border-2 border-dashed border-slate-800 text-center">
            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarDays className="w-10 h-10 text-slate-700" />
            </div>
            <h3 className="text-xl font-bold text-slate-400 mb-2">No Leave Applications</h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">When employees apply for time off, their requests will appear here for review.</p>
          </div>
        )}
      </div>
    </div>
  );
}
