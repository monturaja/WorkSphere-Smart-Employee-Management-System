"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Loader2, ShieldCheck, Sparkles } from "lucide-react";

export default function LoginPage() {
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
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res.error) {
        setError(res.error);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 items-center justify-center p-4 md:p-6 relative overflow-hidden font-sans">
      {/* Premium Background Ambiance */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8 md:mb-10 space-y-4">
          <Link href="/" className="inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl md:rounded-[1.5rem] bg-gradient-to-br from-indigo-600 to-indigo-800 shadow-2xl shadow-indigo-600/30 mb-2 hover:scale-105 transition-all duration-300 ring-1 ring-white/10">
            <ShieldCheck className="h-7 w-7 md:h-8 md:w-8 text-white" />
          </Link>
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight">
              Welcome Back
            </h1>
            <div className="flex items-center justify-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-xs italic">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-indigo-400" />
              <span>Initialize Matrix Link</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/50 p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-black/50 backdrop-blur-3xl relative overflow-hidden">
          {/* Top highlight bar */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"></div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] md:text-xs font-black uppercase tracking-widest px-5 py-4 rounded-2xl flex items-center gap-3 animate-in fade-in italic">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse"></div>
                {error}
              </div>
            )}

            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1 group-focus-within:text-indigo-400 transition-colors">Credential Email</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@worksphere.os"
                  required
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3.5 md:py-4 pl-12 md:pl-14 pr-6 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-black uppercase text-xs tracking-widest shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] group-focus-within:text-indigo-400 transition-colors">Neural Key</label>
                <a href="#" className="text-[9px] font-black text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition-colors">Assistance?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3.5 md:py-4 pl-12 md:pl-14 pr-6 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-black uppercase text-xs tracking-widest shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50 mt-6 active:scale-[0.98] italic"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Establish Link"}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 mt-10 text-[10px] md:text-sm font-black uppercase tracking-widest">
          New Unit?{" "}
          <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 decoration-indigo-500/30 transition-all">Begin Onboarding</Link>
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
