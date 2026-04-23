"use client";
import { Users, Building2, CalendarCheck, Clock, TrendingUp, UserPlus, Database, Server, Shield, Activity, Search, Bell, Settings } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard({ user }) {
  const isAdmin = user?.role === 'admin';
  const isHR = user?.role === 'hr';

  const colorBase = isAdmin ? "amber-500" : isHR ? "emerald-500" : "indigo-500";
  const colorSecondary = isAdmin ? "amber-600" : isHR ? "sky-400" : "indigo-600";

  const theme = {
    accent: isAdmin ? "text-amber-500" : isHR ? "text-emerald-500" : "text-indigo-500",
    bgAccent: isAdmin ? "bg-amber-500" : isHR ? "bg-emerald-500" : "bg-indigo-500",
    gradient: isAdmin 
      ? "from-amber-600 to-amber-500 shadow-amber-600/20" 
      : isHR 
        ? "from-emerald-600 to-sky-500 shadow-emerald-600/20" 
        : "from-indigo-600 to-indigo-500 shadow-indigo-600/20",
    textGradient: isAdmin 
      ? "from-amber-200 via-amber-500 to-amber-200" 
      : isHR 
        ? "from-emerald-200 via-sky-400 to-emerald-200" 
        : "from-indigo-200 via-indigo-500 to-indigo-200",
    blurPrimary: isAdmin ? "bg-amber-600/10" : isHR ? "bg-emerald-600/10" : "bg-indigo-600/10",
    blurSecondary: isAdmin ? "bg-rose-600/5" : isHR ? "bg-sky-600/5" : "bg-indigo-600/5",
    borderHover: isAdmin ? "group-hover:border-amber-500/30" : isHR ? "group-hover:border-emerald-500/30" : "group-hover:border-indigo-500/30",
    ping: isAdmin ? "bg-amber-500" : isHR ? "bg-emerald-500" : "bg-indigo-500",
    borderBase: isAdmin ? "border-amber-500" : isHR ? "border-emerald-500" : "border-indigo-500",
    shadow: isAdmin ? "shadow-amber-500/20" : isHR ? "shadow-emerald-500/20" : "shadow-indigo-500/20"
  };

  const stats = [
    { title: "Total Personnel", value: "248", change: "+12%", icon: Users, color: isAdmin ? "amber" : "emerald" },
    { title: isHR ? "Dept. Units" : "System Units", value: "14", change: "+2", icon: Building2, color: isHR ? "sky" : "emerald" },
    { title: "Active Absence", value: "08", change: "-3%", icon: CalendarCheck, color: "emerald" },
    { title: "Review Queue", value: "12", change: "5 New", icon: Clock, color: isAdmin ? "amber" : "emerald" }
  ];

  return (
    <div className="relative">
      {/* Decorative background elements */}
      <div className={`absolute -top-20 -right-20 w-96 h-96 ${theme.blurPrimary} rounded-full blur-[100px] -z-10 animate-pulse`}></div>
      <div className={`absolute top-1/2 -left-20 w-72 h-72 ${theme.blurSecondary} rounded-full blur-[80px] -z-10`}></div>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className={`px-3 py-1 ${theme.bgAccent}/10 border ${theme.borderBase}/20 rounded-full text-[10px] font-black ${theme.accent} uppercase tracking-[0.2em]`}>
              {isAdmin ? 'Root Access Active' : isHR ? 'Human Resource Intelligence Active' : 'Employee Access'}
            </div>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter sm:text-5xl">
            {isAdmin ? 'System' : isHR ? 'Operational' : 'Workforce'} <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.textGradient} animate-gradient`}>Overview</span>
          </h1>
          <p className="text-slate-400 font-medium mt-2">Authenticated as <span className={`${isAdmin ? 'text-amber-200' : 'text-emerald-200'} font-bold`}>{user?.name || (isHR ? "WorkSphere HR" : "WorkSphere Admin")}</span>. System status: <span className="text-emerald-400">Optimal</span></p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-slate-900/50 backdrop-blur-xl border border-slate-800 text-slate-300 px-6 py-3 rounded-2xl hover:bg-slate-800 transition-all text-sm font-bold shadow-xl">
            <Database className={`w-4 h-4 ${theme.accent}`} />
            {isAdmin ? 'System Logs' : 'Personnel Data'}
          </button>
          <Link 
            href="/employees/add"
            className={`flex items-center gap-2 bg-gradient-to-r ${theme.gradient} text-slate-950 px-7 py-3 rounded-2xl hover:brightness-110 transition-all text-sm font-black shadow-2xl active:scale-95`}
          >
            <UserPlus className="w-5 h-5" />
            {isAdmin ? 'Provision Employee' : 'Recruit Personnel'}
          </Link>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="relative group">
            <div className={`p-8 rounded-[2.5rem] bg-slate-900/60 backdrop-blur-xl border border-slate-800 ${theme.borderHover} transition-all duration-500 overflow-hidden shadow-2xl`}>
              {/* Card Decoration */}
              <div className={`absolute -right-8 -bottom-8 w-24 h-24 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:bg-${stat.color}-500/10 transition-all`}></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl bg-slate-950 border border-slate-800 group-hover:border-${stat.color}-500/30 transition-colors`}>
                  <stat.icon className={`w-7 h-7 text-white`} />
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-black bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{stat.title}</p>
                <div className="flex items-baseline gap-2">
                   <h3 className="text-4xl font-black text-white tracking-tighter">{stat.value}</h3>
                   <div className={`w-6 h-1 ${isAdmin ? 'bg-amber-500/30' : 'bg-emerald-500/30'} rounded-full`}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Advanced System Vitality - NEW section for Admin/HR */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
        {[
          { icon: Shield, label: isAdmin ? 'Defense Status' : 'Retention Index', val: isAdmin ? 'Armed & Active' : '94% Stability', color: isAdmin ? 'bg-emerald-500' : 'bg-emerald-500' },
          { icon: Server, label: isAdmin ? 'Server Network' : 'Recruitment Pulse', val: isAdmin ? '99.9% Latency' : '12 Open Reqs', color: isAdmin ? 'bg-amber-500' : 'bg-sky-500' },
          { icon: Database, label: isAdmin ? 'Data Registry' : 'Document Archive', val: isAdmin ? 'Synched Live' : 'Verified Secure', color: isHR ? 'bg-emerald-500' : isAdmin ? 'bg-amber-500' : 'bg-indigo-500' },
          { icon: Activity, label: isAdmin ? 'System Load' : 'Workforce Health', val: isAdmin ? 'Minimal Resource' : 'Optimal Sync', color: isHR ? 'bg-sky-500' : isAdmin ? 'bg-amber-500' : 'bg-rose-500' }
        ].map((v, i) => (
          <div key={i} className={`p-5 rounded-[2rem] bg-slate-950 border border-slate-900 group hover:bg-slate-900 transition-all cursor-crosshair`}>
            <div className="flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full ${v.color} animate-ping`}></div>
              <div>
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{v.label}</p>
                <p className="text-xs font-bold text-slate-300">{v.val}</p>
              </div>
              <v.icon className={`w-4 h-4 text-slate-700 ml-auto group-hover:${theme.accent}/40 transition-colors`} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 p-10 rounded-[3rem] bg-slate-900/40 backdrop-blur-xl border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight leading-none mb-1">{isAdmin ? 'Corporate Performance' : 'Personnel Engagement'}</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{isAdmin ? 'Aggregate Project Distribution' : 'Workforce Productivity Metrics'}</p>
            </div>
            <select className={`bg-slate-950 border border-slate-800 text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-2 outline-none focus:${theme.borderBase} transition-all`}>
              <option>Real-time Scan</option>
              <option>Periodic Review</option>
            </select>
          </div>
          <div className={`h-80 flex flex-col items-center justify-center border-2 border-dashed border-slate-800/50 rounded-3xl group transition-all hover:${theme.borderBase}/20`}>
            <div className="w-20 h-20 bg-slate-950 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className={`w-10 h-10 text-slate-800 group-hover:${theme.accent}/30`} />
            </div>
            <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">Visualizing Matrix Data...</p>
          </div>
          {/* Decorative Gradient Line */}
          <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-${colorBase}/20 to-transparent`}></div>
        </div>

        <div className="lg:col-span-4 p-10 rounded-[3rem] bg-slate-900 border border-slate-800 shadow-2xl relative">
          <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3">
             <Shield className={`w-6 h-6 ${theme.accent}`} />
             {isAdmin ? 'Strategic Reports' : 'HR Intel Reports'}
          </h3>
          <div className="space-y-5">
            {[
              { title: "Monthly Payroll", date: "Apr 01, 2026", type: "Payroll", val: "Verified" },
              { title: "Quarterly Audit", date: "Mar 31, 2026", type: "Audit", val: "Critical" },
              { title: "Budget Allocation", date: "Mar 20, 2026", type: "Finance", val: "Approved" }
            ].map((report, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-950 border border-slate-900 hover:bg-slate-900 hover:translate-x-1 transition-all cursor-pointer group/item">
                <div className="flex justify-between items-center mb-2">
                   <div className="flex items-center gap-2">
                     <div className={`w-1.5 h-1.5 rounded-full ${report.val === 'Critical' ? 'bg-rose-500' : isAdmin ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                     <h4 className={`text-sm font-bold text-white group-hover/item:${isAdmin ? 'text-amber-200' : 'text-emerald-200'} transition-colors`}>{report.title}</h4>
                   </div>
                   <span className="text-[9px] px-2 py-0.5 rounded-lg bg-white/5 text-slate-500 font-black uppercase">
                    {report.type}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                   <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{report.date}</p>
                   <p className={`text-[10px] font-black uppercase ${report.val === 'Critical' ? 'text-rose-400' : 'text-emerald-400'}`}>{report.val}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-4 bg-slate-950 border border-slate-800 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-white transition-all">View All Intelligence</button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
