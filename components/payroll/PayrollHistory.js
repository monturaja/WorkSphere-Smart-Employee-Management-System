"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Wallet, DollarSign, ArrowUpRight, TrendingDown, FileText, Loader2, CheckCircle, ShieldCheck } from 'lucide-react';

export default function PayrollHistory() {
  const { data: session } = useSession();
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const userRole = session?.user?.role || 'employee';
  const isAdmin = userRole === 'admin';
  const isHR = userRole === 'hr';

  const theme = {
    accent: isAdmin ? "text-amber-500" : isHR ? "text-emerald-500" : "text-indigo-500",
    bgAccent: isAdmin ? "bg-amber-500" : isHR ? "bg-emerald-500" : "bg-indigo-600",
    primaryCard: isAdmin 
      ? "bg-gradient-to-br from-amber-600 to-amber-800 shadow-amber-600/30" 
      : isHR
        ? "bg-gradient-to-br from-emerald-600 to-sky-700 shadow-emerald-500/30"
        : "bg-indigo-600 shadow-indigo-600/30",
    highlight: isAdmin ? "hover:bg-amber-500/5 text-amber-500" : isHR ? "hover:bg-emerald-500/5 text-emerald-500" : "hover:bg-indigo-500/5 text-indigo-500"
  };

  useEffect(() => {
    fetchPayroll();
  }, []);

  const fetchPayroll = async () => {
    try {
      const res = await fetch("/api/payroll");
      const data = await res.json();
      if (data.success) {
        setPayrolls(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch payroll", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className={`w-12 h-12 ${theme.accent} animate-spin`} />
        <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Processing Fiscal Ledger...</p>
      </div>
    );
  }

  const totalMtd = payrolls.reduce((acc, p) => acc + p.totalSalary, 0);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className={`p-10 rounded-[2.5rem] ${theme.primaryCard} text-slate-950 relative overflow-hidden group shadow-2xl`}>
          <div className="relative z-10">
            <p className="text-slate-950/60 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Aggregate Outflow (MTD)</p>
            <h2 className="text-5xl font-black tracking-tighter mb-8">${totalMtd.toLocaleString()}</h2>
            <div className="flex items-center gap-2 text-slate-950 text-xs font-black uppercase tracking-widest bg-white/20 backdrop-blur-md w-fit px-4 py-2 rounded-full">
              <ArrowUpRight className="w-4 h-4" />
              <span>+8.2% <span className="opacity-60 font-bold ml-1">vs Prior Cycle</span></span>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-20 group-hover:scale-125 transition-transform duration-700">
            <TrendingDown className="w-56 h-56 rotate-180" />
          </div>
        </div>

        <div className="p-10 rounded-[2.5rem] bg-slate-900/60 backdrop-blur-xl border border-slate-800 shadow-2xl relative group overflow-hidden">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Review Required</p>
          <div className="flex items-baseline gap-2 mb-8">
            <h2 className="text-5xl font-black text-white tracking-tighter">
              {payrolls.filter(p => p.status === 'Pending').length.toString().padStart(2, '0')}
            </h2>
            <div className="w-8 h-1.5 bg-amber-500/30 rounded-full"></div>
          </div>
          <p className="text-slate-400 text-[10px] flex items-center gap-3 font-black uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            Awaiting Executive Approval
          </p>
          <Wallet className="absolute -right-6 -bottom-6 w-32 h-32 text-slate-800 opacity-20 group-hover:rotate-12 transition-transform duration-700" />
        </div>

        <div className="p-10 rounded-[2.5rem] bg-slate-900 border border-slate-800 shadow-2xl relative group overflow-hidden">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Mean Compensation</p>
          <h2 className="text-5xl font-black text-white tracking-tighter mb-8">
            ${payrolls.length > 0 ? (totalMtd / payrolls.length).toFixed(0).toLocaleString() : '0'}
          </h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Global Payrate Benchmark</p>
          <ShieldCheck className="absolute -right-6 -bottom-6 w-32 h-32 text-slate-800 opacity-20 group-hover:-rotate-12 transition-transform duration-700" />
        </div>
      </div>

      {/* Transaction Table */}
      <div className="rounded-[3rem] bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl relative">
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-${isAdmin ? 'amber-500' : 'indigo-500'}/20 to-transparent`}></div>
        <div className="p-10 border-b border-slate-800 flex justify-between items-center bg-slate-950/40 backdrop-blur-md">
          <h3 className="font-black text-white text-2xl tracking-tighter sm:text-3xl">Fiscal <span className={theme.accent}>Registry</span></h3>
          <button className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-slate-500 hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95">
            <FileText className="w-6 h-6" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/20 border-b border-slate-800">
                <th className="px-10 py-7 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Personnel Entity</th>
                <th className="px-10 py-7 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Billing Interval</th>
                <th className="px-10 py-7 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Gross Disbursement</th>
                <th className="px-10 py-7 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {payrolls.length > 0 ? payrolls.map((p) => (
                <tr key={p._id} className={`${theme.highlight} transition-all group`}>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                       <div className={`w-11 h-11 rounded-2xl ${isAdmin ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'} border flex items-center justify-center text-sm font-black tracking-tighter`}>
                         {p.employeeId?.name?.charAt(0)}
                       </div>
                       <div>
                         <p className="text-base font-black text-white tracking-tight mb-0.5">{p.employeeId?.name || 'Personnel'}</p>
                         <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{p.employeeId?.position}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-slate-300 text-[10px] font-black uppercase tracking-widest bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl group-hover:border-white/10 transition-colors">
                      {p.month}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-1 text-white font-black text-xl tracking-tighter">
                      <span className={`${theme.accent} text-sm`}>$</span>
                      {p.totalSalary.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border ${
                      p.status === 'Paid' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : 'text-amber-400 bg-amber-400/10 border-amber-400/20'
                    }`}>
                      {p.status === 'Paid' ? <CheckCircle className="w-3.5 h-3.5" /> : <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>}
                      {p.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="px-10 py-32 text-center">
                    <div className="w-20 h-20 bg-slate-950 rounded-full flex items-center justify-center mx-auto mb-8">
                       <Wallet className="w-10 h-10 text-slate-900" />
                    </div>
                    <p className="text-slate-600 font-black uppercase tracking-[0.2em] text-[10px]">Financial ledger is currently empty.</p>
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
