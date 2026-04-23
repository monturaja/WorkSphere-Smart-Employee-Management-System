"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { User, Mail, Briefcase, Building2, DollarSign, ArrowLeft, Loader2, Save, UserPlus, Activity } from "lucide-react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AddEmployeePage() {
  const { data: session } = useSession();
  const userRole = session?.user?.role || 'employee';
  const isAdmin = userRole === 'admin';
  const isHR = userRole === 'hr';

  const theme = {
    accent: isAdmin ? "text-amber-500" : isHR ? "text-emerald-500" : "text-indigo-500",
    hoverAccent: isAdmin ? "hover:text-amber-400" : isHR ? "hover:text-emerald-400" : "hover:text-indigo-400",
    gradient: isAdmin 
      ? "from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 shadow-amber-600/20" 
      : isHR 
        ? "from-emerald-600 to-sky-500 hover:from-emerald-500 hover:to-sky-400 shadow-emerald-600/20" 
        : "from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-indigo-600/20",
    ring: isAdmin ? "focus:ring-amber-500/50" : isHR ? "focus:ring-emerald-500/50" : "focus:ring-indigo-500/50"
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    salary: "",
    status: "Active"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create employee");
      } else {
        router.push("/employees");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl relative overflow-hidden">
        {/* Decorative background for admin/HR */}
        {(isAdmin || isHR) && (
          <div className={`absolute -top-10 -right-10 w-96 h-96 ${isAdmin ? 'bg-amber-600/5' : 'bg-emerald-600/5'} rounded-full blur-[100px] -z-10`}></div>
        )}

        <header className="mb-10 relative z-10">
          <Link href="/employees" className={`flex items-center gap-2 ${theme.accent} ${theme.hoverAccent} transition-colors text-sm font-black uppercase tracking-widest mb-4`}>
            <ArrowLeft className="w-4 h-4" />
            Back to Matrix
          </Link>
          <div className="flex items-center gap-4 mb-2">
            {isHR ? <Activity className="w-8 h-8 text-emerald-400" /> : <UserPlus className={`w-8 h-8 ${theme.accent}`} />}
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              {isAdmin ? 'Provision' : isHR ? 'Recruit' : 'Add New'} <span className={theme.accent}>Personnel</span>
            </h1>
          </div>
          <p className="text-slate-400 font-medium text-sm md:text-base">
            {isAdmin 
              ? 'High-level workforce oversight and system provisioning.' 
              : isHR 
                ? 'Identify and register new talent for the organizational intelligence matrix.' 
                : 'Register a new personnel to the company system.'}
          </p>
        </header>

        <div className="glass-card rounded-3xl p-6 md:p-8 shadow-xl shadow-black/20 bg-slate-900/40 backdrop-blur-md border border-white/5">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    className={`w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 ${theme.ring} transition-all font-medium text-sm`}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. john@company.com"
                    className={`w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 ${theme.ring} transition-all font-medium text-sm`}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              {/* Position */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Position / Role</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Software Engineer"
                    className={`w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 ${theme.ring} transition-all font-medium text-sm`}
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                  />
                </div>
              </div>

              {/* Department */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Department</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <select
                    className={`w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 ${theme.ring} transition-all font-medium text-sm appearance-none cursor-pointer`}
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>
              </div>

              {/* Salary */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Annual Salary</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="number"
                    required
                    placeholder="e.g. 85000"
                    className={`w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 ${theme.ring} transition-all font-medium text-sm`}
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                  />
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Initial Status</label>
                <select
                  className={`w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 px-4 text-white focus:outline-none focus:ring-2 ${theme.ring} transition-all font-medium text-sm appearance-none cursor-pointer`}
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-end gap-4">
              <Link href="/employees" className="px-8 py-3 bg-slate-950 border border-slate-800 text-slate-400 rounded-2xl font-bold hover:bg-slate-800 transition-all text-center">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 bg-gradient-to-r ${theme.gradient} text-slate-950 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50`}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {isAdmin ? 'Provision Personnel' : isHR ? 'Confirm Recruitment' : 'Save Employee'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
