"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Send, 
  User, 
  Mail, 
  Building2, 
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  Loader2
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 -left-4 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 right-20 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="glass-card p-10 md:p-12 rounded-[2.5rem] md:rounded-[3rem] max-w-lg w-full text-center relative z-10 border border-white/10 bg-slate-900/40 backdrop-blur-2xl">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8 md:w-12 md:h-12 text-emerald-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-4">Inquiry Received!</h1>
          <p className="text-slate-400 text-base md:text-lg mb-10 leading-relaxed font-medium">
            Your synchronization request has been indexed. Our strategist will contact you shortly.
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all shadow-xl shadow-violet-600/30 w-full sm:w-auto italic"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Matrix
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col items-center py-10 md:py-20 px-6">
      {/* Background blobs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

      <header className="w-full max-w-7xl mb-12 md:mb-16 flex justify-between items-center relative z-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-violet-600 p-2 rounded-lg shadow-lg shadow-violet-600/20">
            <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tighter">WorkSphere</span>
        </Link>
        <Link href="/" className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 font-black uppercase tracking-widest text-[10px] md:text-xs italic">
          <ArrowLeft className="w-4 h-4" />
          Exit Protocol
        </Link>
      </header>

      <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative z-10">
        <div className="flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-violet-600/10 text-amber-400 text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 md:mb-8 w-fit">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
            SALES INQUIRY PROTOCOL
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[0.95] md:leading-[0.9] tracking-tighter">
            Architect your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-amber-400 to-violet-500">
              Neural Network.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-8 md:mb-10 leading-relaxed font-medium">
            Initialize the transmission. Our team will provide a personalized walkthrough of the WorkSphere ecosystem.
          </p>
          
          <div className="space-y-4 md:space-y-6">
            {[
              { icon: CheckCircle2, text: "Personalized Product Demo" },
              { icon: CheckCircle2, text: "Custom Enterprise Pricing" },
              { icon: CheckCircle2, text: "Migration Support for Teams" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300 font-bold uppercase tracking-widest text-[10px] md:text-xs italic">
                <item.icon className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                {item.text}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 shadow-2xl relative bg-slate-900/40 backdrop-blur-2xl">
          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Full Identity</label>
              <div className="relative group text-white">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-400 transition-colors">
                  <User className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <input 
                  required
                  type="text" 
                  placeholder="EX: JOHN DOE"
                  className="w-full bg-slate-950/80 border border-white/5 rounded-2xl py-3.5 md:py-4 pl-12 pr-4 focus:outline-none focus:border-amber-500/50 transition-all font-black uppercase text-xs tracking-widest"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Secure Intel Drop</label>
              <div className="relative group text-white">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-400 transition-colors">
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <input 
                  required
                  type="email" 
                  placeholder="NAME@COMPANY.OS"
                  className="w-full bg-slate-950/80 border border-white/5 rounded-2xl py-3.5 md:py-4 pl-12 pr-4 focus:outline-none focus:border-amber-500/50 transition-all font-black uppercase text-xs tracking-widest"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Operational Unit</label>
              <div className="relative group text-white">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-400 transition-colors">
                  <Building2 className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <input 
                  required
                  type="text" 
                  placeholder="ACME SOLUTIONS"
                  className="w-full bg-slate-950/80 border border-white/5 rounded-2xl py-3.5 md:py-4 pl-12 pr-4 focus:outline-none focus:border-amber-500/50 transition-all font-black uppercase text-xs tracking-widest"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Transmission Detail</label>
              <div className="relative group text-white">
                <div className="absolute left-4 top-6 text-slate-500 group-focus-within:text-amber-400 transition-colors">
                  <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <textarea 
                  required
                  rows="3"
                  placeholder="DESCRIBE OPERATIONAL REQUIREMENTS..."
                  className="w-full bg-slate-950/80 border border-white/5 rounded-2xl py-3.5 md:py-4 pl-12 pr-4 focus:outline-none focus:border-amber-500/50 transition-all font-black uppercase text-xs tracking-widest"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 font-bold uppercase text-[10px] tracking-widest animate-pulse">
                {error}
              </div>
            )}

            <button 
              disabled={status === "loading"}
              type="submit"
              className="w-full py-4 md:py-5 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-800 text-white font-black uppercase tracking-[0.3em] rounded-2xl transition-all shadow-2xl shadow-violet-600/40 flex items-center justify-center gap-3 text-xs md:text-sm italic"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Transmitting...
                </>
              ) : (
                <>
                  Engage Sync
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .glass-card {
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}</style>
    </div>
  );
}
