"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Plus, Search, Filter, Edit2, Trash2, Loader2, User as UserIcon, ShieldCheck } from 'lucide-react';

export default function EmployeeList() {
  const { data: session } = useSession();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  const userRole = session?.user?.role || 'employee';
  const isAdmin = userRole === 'admin';
  const isHR = userRole === 'hr';

  const theme = {
    accent: isAdmin ? "text-amber-500" : isHR ? "text-emerald-500" : "text-indigo-500",
    bgAccent: isAdmin ? "bg-amber-500" : isHR ? "bg-emerald-500" : "bg-indigo-600",
    borderFocus: isAdmin ? "focus:ring-amber-500/50" : isHR ? "focus:ring-emerald-500/50" : "focus:ring-indigo-500/50",
    highlight: isAdmin ? "hover:bg-amber-500/5" : isHR ? "hover:bg-emerald-500/5" : "hover:bg-indigo-500/5",
    iconBg: isAdmin ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : isHR ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch("/api/employees");
      const data = await res.json();
      if (data.success) {
        setEmployees(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch employees", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.email.toLowerCase().includes(search.toLowerCase()) ||
    emp.position?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className={`w-12 h-12 ${theme.accent} animate-spin`} />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Decoding Workforce Intel...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:${theme.accent} transition-colors`} />
          <input 
            type="text" 
            placeholder="Authorized Personnel Search..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-11 pr-4 py-4 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 ${theme.borderFocus} transition-all font-bold tracking-tight`}
          />
        </div>
        <button className="flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-400 px-6 py-4 rounded-2xl hover:bg-slate-800 hover:text-white transition-all text-xs font-black uppercase tracking-widest">
          <Filter className="w-4 h-4" />
          Filter Matrix
        </button>
      </div>

      <div className="rounded-[2.5rem] bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl relative">
          <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-${isAdmin ? 'amber-500' : 'indigo-500'}/20 to-transparent`}></div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 border-b border-slate-800">
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Designation Profile</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Operational Unit</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Security Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Central Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filteredEmployees.length > 0 ? filteredEmployees.map((emp) => (
                <tr key={emp._id} className={`${theme.highlight} transition-colors group`}>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${theme.iconBg} flex items-center justify-center text-lg font-black tracking-tighter shadow-inner`}>
                        {emp.image ? (
                          <img src={emp.image} alt="" className="w-full h-full rounded-2xl object-cover" />
                        ) : (
                          emp.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <p className="text-base font-black text-white tracking-tight mb-0.5">{emp.name}</p>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm text-slate-200 font-black tracking-tight">{emp.position}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{emp.department}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      emp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${emp.status === 'Active' ? 'bg-emerald-400 shadow-lg shadow-emerald-500/50' : 'bg-slate-400'} animate-pulse`}></span>
                      {emp.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                      <button className={`p-3 text-slate-500 hover:text-white hover:${theme.bgAccent} rounded-2xl transition-all border border-transparent hover:border-white/10`} title="Edit Profile">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-3 text-slate-500 hover:text-white hover:bg-rose-500 rounded-2xl transition-all border border-transparent hover:border-white/10" title="Revoke Access">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="px-8 py-24 text-center">
                    <div className="w-16 h-16 bg-slate-950 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="w-8 h-8 text-slate-800" />
                    </div>
                    <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">No matches found in the Personnel Matrix.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="px-8 py-6 bg-slate-950/50 border-t border-slate-800 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <ShieldCheck className={`w-5 h-5 ${theme.accent}`} />
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Aggregate Count: <span className="text-white font-black">{filteredEmployees.length}</span> Personnel</p>
            </div>
            <div className="flex gap-4">
              <button disabled className="px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 disabled:opacity-20 transition-all">Previous Phase</button>
              <button disabled className="px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 disabled:opacity-20 transition-all">Next Phase</button>
            </div>
          </div>
        </div>
    </div>
  );
}
