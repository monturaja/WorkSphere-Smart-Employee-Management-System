"use client";
import { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  Mail, 
  Building2, 
  Loader2 
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function InquiriesDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (err) {
      console.error("Error fetching inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setInquiries(inquiries.map(iq => iq._id === id ? { ...iq, status } : iq));
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const filteredInquiries = inquiries.filter(iq => {
    const matchesFilter = filter === "all" || iq.status === filter;
    const matchesSearch = 
      iq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iq.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: inquiries.length,
    pending: inquiries.filter(i => i.status === "pending").length,
    accepted: inquiries.filter(i => i.status === "accepted").length,
    rejected: inquiries.filter(i => i.status === "rejected").length,
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">Sales Inquiries</h1>
          <p className="text-slate-400 text-sm">Manage and respond to potential client inquiries from the landing page.</p>
        </div>
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="flex bg-slate-900 border border-white/5 rounded-xl p-1 overflow-x-auto w-full md:w-auto scrollbar-hide">
            {["all", "pending", "accepted", "rejected"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold capitalize transition-all flex-1 md:flex-none whitespace-nowrap ${filter === f ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
        {[
          { label: "Total Inquiries", value: stats.total, icon: MessageSquare, color: "text-blue-400", bg: "bg-blue-400/10" },
          { label: "Pending Review", value: stats.pending, icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10" },
          { label: "Accepted Deals", value: stats.accepted, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10" },
          { label: "Rejected", value: stats.rejected, icon: XCircle, color: "text-red-400", bg: "bg-red-400/10" },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</div>
            <div className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search and List */}
      <div className="glass-card rounded-3xl border border-white/5 overflow-hidden bg-slate-900/40 backdrop-blur-md">
        <div className="p-4 md:p-6 border-b border-white/5 bg-slate-900/30 flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by name, email or company..."
              className="w-full bg-slate-950 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all font-medium text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="hidden md:block p-3 bg-slate-800 rounded-xl text-slate-400 border border-white/5">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-x-auto overflow-y-hidden">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-slate-900/30 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <th className="px-6 py-5">Prospect Details</th>
                <th className="px-6 py-5">Company</th>
                <th className="px-6 py-5">Message</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Submitted At</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <Loader2 className="w-10 h-10 text-amber-500 animate-spin mx-auto mb-4" />
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Synchronizing Inquiries...</p>
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <p className="text-slate-500 font-bold">No inquiry entities found.</p>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((iq) => (
                  <tr key={iq._id} className="group hover:bg-white/5 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center font-black text-violet-400 text-xs shadow-lg">
                          {iq.name[0]}
                        </div>
                        <div className="overflow-hidden">
                          <div className="font-bold text-white mb-0.5 text-sm">{iq.name}</div>
                          <div className="text-[10px] text-slate-500 flex items-center gap-1.5 font-medium truncate">
                            <Mail className="w-3 h-3" />
                            {iq.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-300 font-bold text-sm">
                        <Building2 className="w-4 h-4 text-amber-500" />
                        {iq.company}
                      </div>
                    </td>
                    <td className="px-6 py-5 max-w-[200px]">
                      <p className="text-slate-400 text-sm italic line-clamp-1">"{iq.message}"</p>
                    </td>
                    <td className="px-6 py-5 text-sm">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black uppercase tracking-tighter text-[9px] ${
                        iq.status === "accepted" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                        iq.status === "rejected" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                        "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                        {iq.status === "pending" && <Clock className="w-3 h-3" />}
                        {iq.status === "accepted" && <CheckCircle2 className="w-3 h-3" />}
                        {iq.status === "rejected" && <XCircle className="w-3 h-3" />}
                        {iq.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-xs text-slate-500 font-bold uppercase tracking-tighter">
                      {new Date(iq.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {iq.status !== "accepted" && (
                          <button 
                            onClick={() => updateStatus(iq._id, "accepted")}
                            className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20 shadow-lg shadow-emerald-500/10"
                            title="Accept"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        {iq.status !== "rejected" && (
                          <button 
                            onClick={() => updateStatus(iq._id, "rejected")}
                            className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all border border-red-500/20 shadow-lg shadow-red-500/10"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                        {iq.status !== "pending" && (
                          <button 
                            onClick={() => updateStatus(iq._id, "pending")}
                            className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:bg-slate-700 hover:text-white transition-all border border-white/5"
                            title="Reset to Pending"
                          >
                            <Clock className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  </DashboardLayout>
);
}
