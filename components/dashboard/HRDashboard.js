"use client";
import { Users, FileDiff, UserCheck, CalendarDays, Plus, ArrowRight, ClipboardCheck, Zap, Activity, Shield } from 'lucide-react';
import Link from 'next/link';

export default function HRDashboard({ user }) {
  const theme = {
    accent: "text-emerald-500",
    bgAccent: "bg-emerald-500",
    gradient: "from-emerald-600 to-sky-500 hover:from-emerald-500 hover:to-sky-400 shadow-emerald-500/20",
    textGradient: "from-emerald-200 via-sky-400 to-emerald-200",
    blurPrimary: "bg-emerald-600/10",
    blurSecondary: "bg-sky-600/5",
    borderHover: "group-hover:border-emerald-500/30",
    highlight: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
  };

  const hrStats = [
    { title: "Personnel Assets", value: "248", label: "Active Nodes", icon: Users, color: "emerald", trend: "+12%" },
    { title: "Absence Requests", value: "11", label: "Awaiting Review", icon: CalendarDays, color: "sky", trend: "08 Urgent" },
    { title: "New Personnel", value: "04", label: "Last 30 Days", icon: UserCheck, color: "emerald", trend: "Synced" },
    { title: "Talent Requisitions", value: "07", label: "Active Searches", icon: FileDiff, color: "sky", trend: "High Priority" }
  ];

  return (
    <div className="relative">
      {/* Decorative background elements */}
      <div className={`absolute -top-20 -right-20 w-96 h-96 ${theme.blurPrimary} rounded-full blur-[100px] -z-10 animate-pulse`}></div>
      <div className={`absolute top-1/2 -left-20 w-72 h-72 ${theme.blurSecondary} rounded-full blur-[80px] -z-10`}></div>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">
              Personnel Intelligence Central
            </div>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter sm:text-5xl">
            Operations <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.textGradient}`}>Intelligence</span>
          </h1>
          <p className="text-slate-400 font-medium mt-2">Welcome back, <span className="text-emerald-200 font-bold">{user?.name || "HR Director"}</span>. Matrix status: <span className="text-emerald-400">Optimal Synchronization</span></p>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/employees/add"
            className={`flex items-center gap-2 bg-gradient-to-r ${theme.gradient} text-slate-950 px-7 py-3 rounded-2xl hover:brightness-110 transition-all text-sm font-black shadow-2xl active:scale-95`}
          >
            <Plus className="w-5 h-5" />
            Recruit Personnel
          </Link>
        </div>
      </header>

      {/* HR Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {hrStats.map((stat, i) => (
          <div key={i} className="relative group">
            <div className={`p-8 rounded-[2.5rem] bg-slate-900/60 backdrop-blur-xl border border-slate-800 ${theme.borderHover} transition-all duration-500 overflow-hidden shadow-2xl`}>
              <div className={`absolute -right-8 -bottom-8 w-24 h-24 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:bg-${stat.color}-500/10 transition-all`}></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl bg-slate-950 border border-slate-800 group-hover:border-${stat.color}-500/30 transition-colors`}>
                  <stat.icon className={`w-7 h-7 ${stat.color === 'emerald' ? 'text-emerald-400' : 'text-sky-400'} group-hover:text-white`} />
                </div>
                <div className={`flex items-center gap-1.5 ${stat.color === 'emerald' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-sky-400 bg-sky-500/10 border-sky-500/20'} text-[10px] font-black px-3 py-1.5 rounded-full border`}>
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{stat.title}</p>
                <div className="flex items-baseline gap-2">
                   <h3 className="text-4xl font-black text-white tracking-tighter">{stat.value}</h3>
                   <div className={`w-6 h-1 ${stat.color === 'emerald' ? 'bg-emerald-500/30' : 'bg-sky-500/30'} rounded-full`}></div>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-2">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Urgent Approvals - CENTER */}
        <div className="lg:col-span-8 p-10 rounded-[3rem] bg-slate-900/40 backdrop-blur-xl border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-center mb-10 relative z-10">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                <Shield className="w-7 h-7 text-emerald-500" />
                Urgent Action Center
              </h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">High-priority personnel synchronization required</p>
            </div>
            <div className="flex gap-2">
               <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-lg text-[9px] font-black text-rose-400 uppercase">
                  <Activity className="w-3 h-3 animate-pulse" />
                  Live Intel
               </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { type: "Absence Request", from: "Emily Blunt", reason: "Medical Appointment", date: "Apr 22", severity: "High" },
              { type: "Identity Protocol", from: "David Goggins", reason: "Credential Update", date: "Apr 21", severity: "Normal" },
              { type: "Absence Request", from: "Mike Ross", reason: "Family Event", date: "Apr 24", severity: "Low" }
            ].map((action, i) => (
              <div key={i} className="flex items-center justify-between p-6 rounded-[1.8rem] bg-slate-950/80 border border-slate-800/50 hover:bg-slate-900 hover:border-emerald-500/30 transition-all group/item shadow-lg">
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/10 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all`}>
                    <ClipboardCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white group-hover/item:text-emerald-300 transition-colors">{action.type} from <span className="text-emerald-400 font-extrabold">{action.from}</span></h4>
                    <p className="text-xs text-slate-500 mt-0.5 font-bold uppercase tracking-wide">{action.reason} • {action.date}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="px-5 py-2.5 text-xs font-black text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all shadow-lg active:scale-95">Verify</button>
                  <button className="px-5 py-2.5 text-xs font-black text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition-all hover:bg-slate-800 active:scale-95">Deny</button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Decorative Gradient Line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
        </div>

        {/* Recent Personnel Registry */}
        <div className="lg:col-span-4 p-10 rounded-[3rem] bg-slate-900 border border-slate-800 shadow-2xl relative">
          <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3">
             <Zap className="w-6 h-6 text-emerald-500" />
             Personnel Registry
          </h3>
          <div className="space-y-6">
            {[
              { name: "Jessica Pearson", role: "Legal Counsel", dept: "Corporate", status: "Active" },
              { name: "Louis Litt", role: "Financial Auditor", dept: "Finance", status: "Active" },
              { name: "Harvey Specter", role: "Sr. Executive", dept: "Legal", status: "Onboarding" }
            ].map((hire, i) => (
              <div key={i} className="flex items-center gap-5 group/entry cursor-pointer p-4 rounded-2xl hover:bg-slate-950 transition-all">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500/10 via-slate-800 to-sky-500/10 animate-pulse border border-slate-700 flex items-center justify-center text-xs font-black text-white group-hover/entry:border-emerald-500/30">
                  {hire.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-black text-white group-hover/entry:text-emerald-400 transition-colors uppercase tracking-tight">{hire.name}</h4>
                  <p className="text-[10px] text-slate-500 font-bold">{hire.role} • {hire.dept}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${hire.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'} shadow-lg`}></div>
              </div>
            ))}
          </div>
          <Link href="/employees" className="w-full mt-10 py-5 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-emerald-400 transition-all border-t border-slate-800/50 flex items-center justify-center gap-3 group">
            Access Full Matrix <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
