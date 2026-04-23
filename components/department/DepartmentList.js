"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Building2, Users, ArrowUpRight, Loader2, DollarSign, Shield } from 'lucide-react';

export default function DepartmentList() {
  const { data: session } = useSession();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const userRole = session?.user?.role || 'employee';
  const isAdmin = userRole === 'admin';
  const isHR = userRole === 'hr';

  const theme = {
    accent: isAdmin ? "text-amber-500" : isHR ? "text-emerald-500" : "text-indigo-500",
    bgAccent: isAdmin ? "bg-amber-500" : isHR ? "bg-emerald-500" : "bg-indigo-600",
    iconBg: isAdmin ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : isHR ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-indigo-500/10 border-indigo-500/20 text-indigo-500",
    hoverBorder: isAdmin ? "hover:border-amber-500/30" : isHR ? "hover:border-emerald-500/30" : "hover:border-indigo-500/50",
    highlightBg: isAdmin ? "bg-amber-500/5" : isHR ? "bg-emerald-500/5" : "bg-indigo-500/5"
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await fetch("/api/departments");
      const data = await res.json();
      if (data.success) {
        setDepartments(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch departments", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className={`w-12 h-12 ${theme.accent} animate-spin`} />
        <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Syncing Matrix Structure...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {departments.length > 0 ? departments.map((dept) => (
        <div key={dept._id} className={`p-10 rounded-[2.5rem] bg-slate-900/60 backdrop-blur-xl border border-slate-800 ${theme.hoverBorder} transition-all duration-500 group relative overflow-hidden shadow-2xl`}>
          {/* Background Decorative Element */}
          <div className={`absolute top-0 right-0 w-32 h-32 ${theme.highlightBg} rounded-full -mr-12 -mt-12 blur-3xl transition-opacity group-hover:opacity-100 opacity-60`}></div>
          
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div className={`p-5 rounded-[1.5rem] ${isAdmin ? 'bg-slate-950 border border-slate-800' : isHR ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-indigo-500/10 border border-indigo-500/20'} group-hover:${theme.bgAccent} group-hover:border-transparent transition-all duration-300`}>
              <Building2 className={`w-9 h-9 ${isAdmin ? 'text-amber-500' : isHR ? 'text-emerald-500' : 'text-indigo-500'} group-hover:text-white transition-colors`} />
            </div>
            <button className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-500 hover:text-white transition-all transform hover:scale-110 active:scale-95 shadow-xl">
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative z-10">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                 <div className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-amber-500' : isHR ? 'bg-emerald-500' : 'bg-indigo-500'}`}></div>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Department Unit</span>
              </div>
              <h3 className="text-3xl font-black text-white tracking-tighter sm:text-4xl">{dept.name}</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">
                Unit Lead: <span className="text-slate-200">{dept.head?.name || 'Unassigned'}</span>
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-[2rem] bg-slate-950/80 border border-slate-800/50 group-hover:border-white/5 transition-all">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <Users className="w-4 h-4" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Team Matrix</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-black text-white tracking-tighter">12</p>
                  <div className={`w-4 h-1 rounded-full ${isAdmin ? 'bg-amber-500/30' : isHR ? 'bg-emerald-500/30' : 'bg-indigo-500/30'}`}></div>
                </div>
              </div>
              <div className="p-6 rounded-[2rem] bg-slate-950/80 border border-slate-800/50 group-hover:border-white/5 transition-all">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Fiscal Scope</span>
                </div>
                <div className="flex items-baseline gap-1">
                   <span className="text-emerald-400 text-sm font-black">$</span>
                   <p className="text-3xl font-black text-white tracking-tighter">
                    {dept.budget ? (dept.budget / 1000).toFixed(0) : '0'}<span className="text-xs text-slate-500 font-bold ml-0.5">K</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800/50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all">
             <div className="flex items-center gap-2">
                <Shield className={`w-4 h-4 ${theme.accent} opacity-50`} />
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Access: Level {isAdmin ? 'Root' : 'HR'} Restricted</span>
             </div>
             <p className="text-[10px] font-bold text-slate-500 hover:text-white cursor-pointer transition-colors">Manage Full Unit Structure →</p>
          </div>
        </div>
      )) : (
        <div className="col-span-1 md:col-span-2 p-20 rounded-[3rem] border-2 border-dashed border-slate-800/50 flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6">
            <Building2 className="w-10 h-10 text-slate-700" />
          </div>
          <p className="text-slate-500 font-black uppercase tracking-widest text-xs">No Structural Entities Found.</p>
          <button className={`mt-6 px-6 py-3 rounded-xl border border-slate-800 text-slate-400 text-[10px] font-black uppercase ${isAdmin ? 'hover:border-amber-500' : isHR ? 'hover:border-emerald-500' : 'hover:border-indigo-500'} hover:text-white transition-all`}>Initialize Structure</button>
        </div>
      )}
    </div>
  );
}
