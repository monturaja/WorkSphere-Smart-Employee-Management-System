"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, ArrowRight, Loader2, UserPlus, Sparkles } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        router.push("/login?registered=true");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Dynamic Background elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]"></div>
      
      {/* Decorative stars/dots */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-indigo-600 to-purple-600 shadow-2xl shadow-indigo-600/30 mb-2 rotate-3 hover:rotate-0 transition-transform duration-500">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-white tracking-tighter leading-tight">
              Create <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">WorkSphere</span> Account
            </h1>
            <div className="flex items-center justify-center gap-2 text-slate-400 font-medium">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Join the future of workforce management</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/50 p-10 rounded-[2.5rem] shadow-2xl shadow-black/50 backdrop-blur-2xl relative overflow-hidden">
          {/* Subtle light effect on top */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm px-5 py-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                {error}
              </div>
            )}

            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1 group-focus-within:text-indigo-400 transition-colors">Full Name</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Varun Sisodiya"
                  required
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1 group-focus-within:text-indigo-400 transition-colors">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="varun@worksphere.com"
                  required
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1 group-focus-within:text-indigo-400 transition-colors">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-600/30 disabled:opacity-50 mt-6 active:scale-[0.98]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Establish Account"}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 mt-10 text-sm font-medium">
          Already a member of the sphere?{" "}
          <Link href="/login" className="text-indigo-400 font-bold hover:text-indigo-300 underline underline-offset-4 decoration-indigo-500/30">Connect Here</Link>
        </p>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
