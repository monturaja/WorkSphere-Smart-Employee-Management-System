"use client";
import { Clock, CalendarDays, Wallet, UserCircle, Send, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function EmployeeDashboard({ user }) {
  return (
    <>
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">My Overview</h1>
          <p className="text-slate-400">Welcome back, {user?.name || "Employee"}. Have a productive day!</p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/leave"
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-500 transition-all text-sm font-medium shadow-lg shadow-indigo-600/20"
          >
            <Send className="w-4 h-4" />
            Apply Leave
          </Link>
        </div>
      </header>

      {/* Employee Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          { title: "Attendance Score", value: "98%", status: "On Track", icon: Clock, color: "emerald" },
          { title: "Leaves Remaining", value: "14 Days", status: "Available", icon: CalendarDays, color: "indigo" },
          { title: "Next Pay Date", value: "May 01", status: "Upcoming", icon: Wallet, color: "blue" }
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm hover:border-slate-700 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 group-hover:bg-${stat.color}-500 transition-colors`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-500 group-hover:text-white`} />
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                {stat.status}
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">{stat.title}</p>
            <h3 className="text-3xl font-bold text-white tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Attendance */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800">
          <h3 className="text-xl font-bold text-white mb-6">Recent Attendance</h3>
          <div className="space-y-4">
            {[
              { date: "Today, Apr 21", login: "08:55 AM", status: "Present" },
              { date: "Yesterday, Apr 20", login: "09:02 AM", status: "Present" },
              { date: "Fri, Apr 17", login: "08:45 AM", status: "Present" }
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-800">
                    {row.date.split(',')[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{row.date}</h4>
                    <p className="text-xs text-slate-500">Login: {row.login}</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {row.status}
                </span>
              </div>
            ))}
          </div>
          <Link href="/attendance" className="mt-6 flex items-center justify-center gap-2 text-sm text-indigo-400 font-medium hover:text-indigo-300 transition-colors">
            View Full Report <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Leave Summary */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800">
          <h3 className="text-xl font-bold text-white mb-6">Active Leave Requests</h3>
          <div className="space-y-4">
            {[
              { type: "Sick Leave", date: "Apr 25, 2026", status: "Pending" },
              { type: "Casual Leave", date: "Apr 10, 2026", status: "Approved" }
            ].map((leave, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800/50">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-sm font-bold text-white">{leave.type}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    leave.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {leave.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500">Scheduled for: {leave.date}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-sm font-medium text-slate-500 hover:text-slate-400 transition-colors border-t border-slate-800">
            Request History
          </button>
        </div>
      </div>
    </>
  );
}
