"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserCheck, Clock, Calendar, CheckCircle2, XCircle, Loader2, ShieldCheck, Activity } from 'lucide-react';

export default function AttendanceGrid() {
  const { data: session } = useSession();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const userRole = session?.user?.role || 'employee';
  const isAdmin = userRole === 'admin';
  const isHR = userRole === 'hr';

  const theme = {
    accent: isAdmin ? "text-amber-500" : isHR ? "text-emerald-500" : "text-indigo-500",
    bgAccent: isAdmin ? "bg-amber-500" : isHR ? "bg-emerald-500" : "bg-indigo-600",
    highlight: isAdmin ? "hover:bg-amber-500/5" : isHR ? "hover:bg-emerald-500/5" : "hover:bg-indigo-500/5",
    iconBg: isAdmin ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : isHR ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await fetch("/api/attendance");
      const data = await res.json();
      if (data.success) {
        setLogs(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch attendance", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className={`w-12 h-12 ${theme.accent} animate-spin`} />
        <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Accessing Biometric Matrix...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Operational Alignment", value: "92%", icon: CheckCircle2, color: isAdmin ? "amber" : "emerald" },
          { label: "Chronological Drift", value: "05", icon: Clock, color: "rose" },
          { label: "Personnel Absenteeism", value: "02", icon: XCircle, color: "slate" }
        ].map((stat, i) => (
          <div key={i} className="group p-8 rounded-[2.5rem] bg-slate-900 border border-slate-800 shadow-2xl hover:border-white/10 transition-all duration-500 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-500/5 rounded-full -mr-10 -mt-10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            <div className="flex items-center gap-6 relative z-10">
              <div className={`p-5 rounded-2xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 group-hover:bg-${stat.color}-500 group-hover:border-transparent transition-all duration-500`}>
                <stat.icon className={`w-8 h-8 text-${stat.color}-400 group-hover:text-slate-950 transition-colors`} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <p className="text-4xl font-black text-white tracking-tighter">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Logs Table */}
      <div className="rounded-[3rem] bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl relative">
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-${isAdmin ? 'amber-500' : 'indigo-500'}/20 to-transparent`}></div>
        <div className="p-10 border-b border-slate-800 flex justify-between items-center bg-slate-950/40 backdrop-blur-md">
          <h3 className="font-black text-white flex items-center gap-4 text-2xl tracking-tighter sm:text-3xl">
            <div className={`h-3 w-3 rounded-full ${isAdmin ? 'bg-amber-500 shadow-lg shadow-amber-500/50' : 'bg-emerald-500 shadow-lg shadow-emerald-500/50'} animate-pulse`}></div>
            Daily Workforce <span className={theme.accent}>Registry</span>
          </h3>
          <div className="flex gap-4">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest bg-slate-950 border border-slate-800 px-5 py-2.5 rounded-xl flex items-center gap-3">
              <Calendar className={`w-4 h-4 ${theme.accent}`} />
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/20 border-b border-slate-800">
                <th className="px-10 py-7 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Personnel Proxy</th>
                <th className="px-10 py-7 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Initial Sync</th>
                <th className="px-10 py-7 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Termination Sync</th>
                <th className="px-10 py-7 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Activity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {logs.length > 0 ? logs.map((log) => (
                <tr key={log._id} className={`${theme.highlight} transition-all group`}>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-2xl ${isAdmin ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'} border flex items-center justify-center text-sm font-black tracking-tighter`}>
                        {log.employeeId?.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-base font-black text-white tracking-tight mb-0.5">{log.employeeId?.name || 'System Entity'}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{log.employeeId?.position}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3 text-slate-200 font-black text-xs uppercase tracking-widest bg-slate-950/50 w-fit px-5 py-2.5 rounded-xl border border-white/5 transition-colors group-hover:border-white/10 shadow-inner">
                      <Clock className={`w-4 h-4 ${theme.accent}`} />
                      {log.checkIn}
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3 text-slate-500 font-black text-xs uppercase tracking-widest">
                      {log.checkOut ? (
                        <span className="text-slate-200 bg-slate-950/50 px-5 py-2.5 rounded-xl border border-white/5 flex items-center gap-3 group-hover:border-white/10 transition-colors shadow-inner">
                          <Activity className="w-4 h-4 text-emerald-500" />
                          {log.checkOut}
                        </span>
                      ) : '-- : --'}
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border ${
                      log.status === 'Present' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' :
                      log.status === 'Late' ? 'text-amber-400 bg-amber-400/10 border-amber-400/20' :
                      'text-rose-400 bg-rose-400/10 border-rose-400/20'
                    }`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${
                        log.status === 'Present' ? 'bg-emerald-400 shadow-lg shadow-emerald-500/50' :
                        log.status === 'Late' ? 'bg-amber-400 shadow-lg shadow-amber-500/50' :
                        'bg-rose-400 shadow-lg shadow-rose-500/50'
                      } animate-pulse`}></div>
                      {log.status === 'Present' ? 'Operational' : log.status === 'Late' ? 'Delayed Sync' : 'Offline'}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="px-10 py-32 text-center">
                    <div className="w-20 h-20 bg-slate-950 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl border border-slate-900">
                       <ShieldCheck className="w-10 h-10 text-slate-900" />
                    </div>
                    <p className="text-slate-600 font-black uppercase tracking-[0.2em] text-[10px]">Biometric matrix registry is currently in standby mode.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
