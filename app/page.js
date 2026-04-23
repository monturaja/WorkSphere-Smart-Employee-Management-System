"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  LayoutDashboard,
  ShieldCheck,
  PieChart,
  Zap,
  Cpu,
  Globe,
  CheckCircle2,
  ExternalLink,
  Share2,
  Send,
  Mail,
  Menu,
  X
} from "lucide-react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col items-center min-h-screen relative overflow-hidden bg-slate-950 text-white selection:bg-amber-500/30">
      {/* Background blobs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-[40%] left-[20%] w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      <div className="absolute -bottom-8 right-20 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <header className="fixed top-0 w-full z-50 flex justify-center px-4 md:px-6 py-4">
        <div className="w-full max-w-7xl glass-dark rounded-2xl px-6 md:px-8 py-3 md:py-4 flex justify-between items-center bg-slate-950/40 backdrop-blur-xl border border-white/5 relative">
          <div className="flex items-center gap-2">
            <div className="bg-violet-600 p-2 rounded-lg shadow-lg shadow-violet-600/20">
              <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white">WorkSphere</span>
          </div>

          <nav className="hidden md:flex gap-8 text-sm font-bold text-slate-400 uppercase tracking-widest italic">
            <a href="#features" className="hover:text-amber-400 transition-colors cursor-pointer">Features</a>
            <a href="#about" className="hover:text-amber-400 transition-colors cursor-pointer">About</a>
            <a href="#solutions" className="hover:text-amber-400 transition-colors cursor-pointer">Solutions</a>
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/login" className="hidden sm:block px-5 py-2 text-sm font-black uppercase tracking-widest text-slate-300 hover:text-white transition-colors italic">
              Login
            </Link>
            <Link href="/dashboard" className="px-5 md:px-6 py-2.5 text-xs md:text-sm font-black uppercase tracking-widest bg-amber-400 text-slate-950 hover:bg-amber-300 rounded-xl transition-all shadow-xl shadow-amber-500/20 italic">
              Join Matrix
            </Link>
            <button 
              className="md:hidden p-2 text-slate-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div className="absolute top-24 left-0 right-0 bg-slate-900/95 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 flex flex-col gap-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-lg font-black uppercase tracking-widest text-white border-b border-white/5 pb-4">Features</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-black uppercase tracking-widest text-white border-b border-white/5 pb-4">About</a>
              <a href="#solutions" onClick={() => setMobileMenuOpen(false)} className="text-lg font-black uppercase tracking-widest text-white border-b border-white/5 pb-4">Solutions</a>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-lg font-black uppercase tracking-widest text-amber-400">Client Login</Link>
            </div>
          )}
        </div>
      </header>

      <main className="w-full pt-28 md:pt-40 flex flex-col items-center">
        {/* Hero Section */}
        <section className="min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center text-center px-6 max-w-5xl text-white">
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-violet-600/10 text-amber-400 text-[10px] md:text-xs font-black uppercase tracking-widest mb-8">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
            SYNC: AI-CORE ACTIVE
          </div>

          <h1 className="animate-fade-in-up text-5xl md:text-8xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-[0.95] md:leading-[0.9]">
            The OS For <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-amber-400 to-violet-500">
              Elite Teams.
            </span>
          </h1>

          <p className="animate-fade-in-up text-lg md:text-xl text-slate-400 mb-10 md:mb-12 max-w-2xl leading-relaxed [animation-delay:200ms] font-medium">
            WorkSphere synchronizes HR, payroll, and attendance into one high-performance interface.
            Engineered for companies that demand absolute precision.
          </p>

          <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 md:gap-5 mb-16 md:mb-24 [animation-delay:400ms] w-full sm:w-auto px-10 sm:px-0">
            <Link href="/dashboard" className="group px-8 md:px-10 py-4 md:py-5 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl shadow-violet-600/40 flex items-center justify-center gap-3 italic">
              Open Hub
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 md:px-10 py-4 md:py-5 bg-slate-900 border border-slate-800 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all italic">
              View Specs
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full max-w-7xl px-6 py-20 md:py-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8 text-white">
            <div className="max-w-2xl">
              <h2 className="text-amber-500 font-black tracking-[0.3em] text-xs md:text-sm uppercase mb-4 italic">Capabilities</h2>
              <h3 className="text-3xl md:text-5xl font-black text-white leading-tight md:leading-[1.1]">
                Unified intelligence for <br className="hidden md:block" /> global operations.
              </h3>
            </div>
            <p className="text-slate-400 max-w-sm font-medium leading-relaxed">
              Our architecture is designed to manage complex workforce topologies with sub-millisecond precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
            {[
              { icon: Users, title: "Personnel Node", desc: "A unified system of record for all employee data, documents, and history.", color: "amber" },
              { icon: LayoutDashboard, title: "Executive Command", desc: "Real-time analytics on headcount, turnover, and department distribution.", color: "violet" },
              { icon: PieChart, title: "Capital Flow", desc: "Automated tax compliance and streamlined payroll processing in one click.", color: "amber" },
              { icon: Zap, title: "Neural Attendance", desc: "Geo-fenced check-ins and AI-powered shift scheduling.", color: "violet" },
              { icon: Cpu, title: "System Protocols", desc: "Connect with Slack, Jira, and other tools you already use.", color: "amber" },
              { icon: Globe, title: "Global Sync", desc: "Manage remote teams with local compliance and currency support.", color: "violet" }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] group relative overflow-hidden bg-slate-900/40 backdrop-blur-md border border-white/5 hover:border-amber-500/20 transition-all duration-500">
                <div className={`w-12 h-12 md:w-14 md:h-14 bg-violet-600/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-white/5 group-hover:bg-violet-600 transition-all duration-500 shadow-lg`}>
                  <feature.icon className="w-5 h-5 md:w-7 md:h-7 text-amber-500 group-hover:text-amber-300 transition-colors" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-3 md:mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base font-medium">{feature.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-amber-400 font-black text-xs md:text-sm uppercase tracking-widest group-hover:gap-4 transition-all opacity-0 group-hover:opacity-100 italic">
                  Read Specs <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-20 md:py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl"></div>
              <div className="relative glass-dark p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 bg-slate-900/60 shadow-2xl">
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {[
                    { val: "99.9%", label: "Uptime" },
                    { val: "25k+", label: "Nodes Active" },
                    { val: "Zero", label: "Latency" },
                    { val: "ROOT", label: "Security" }
                  ].map((stat, i) => (
                    <div key={i} className={`p-6 md:p-8 rounded-2xl md:rounded-3xl ${i === 0 ? 'bg-violet-600/20 border-violet-500/30' : i === 3 ? 'bg-amber-500/10 border-amber-500/30' : 'bg-white/5 border-white/10'} border text-center shadow-lg`}>
                      <div className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tighter">{stat.val}</div>
                      <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 md:gap-8 order-1 lg:order-2">
              <h2 className="text-amber-500 font-black tracking-[0.3em] text-xs md:text-sm uppercase italic">Protocol</h2>
              <h3 className="text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tighter">
                Synchronizing the <span className="text-slate-600">Workforce Matrix.</span>
              </h3>
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-medium">
                We engineered WorkSphere for organizations that view HR as a primary intelligence function. Reach peak efficiency with neural-linked data.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Hyper-Responsive Neural Interface",
                  "Blockchain-Encrypted Personnel Records",
                  "Cross-Region Real-time Synchronization"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-white font-black uppercase tracking-widest text-xs md:text-sm italic">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500">
                      <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="w-full py-20 md:py-32 px-6 bg-slate-900/40 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-7xl mx-auto text-center mb-16 md:mb-20 text-white">
            <h2 className="text-amber-500 font-black tracking-[0.3em] text-xs md:text-sm uppercase mb-4 italic">Solutions</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter capitalize leading-[0.95]">Architected for your scale.</h3>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-medium">
              Select the deployment configuration that aligns with your operational requirements.
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                tag: "Beta Team",
                title: "Inception",
                price: "$49",
                features: ["50 Personnel Nodes", "Standard Protocols", "L1 Support", "Mobile Access"]
              },
              {
                tag: "Enterprise",
                title: "Scale Core",
                price: "$199",
                primary: true,
                features: ["500 Personnel Nodes", "Payroll Automation", "L3 Priority Support", "Full Integration API"]
              },
              {
                tag: "Government",
                title: "Root Global",
                price: "Custom",
                features: ["Unlimited Nodes", "Custom Matrix Workflows", "Dedicated Strategist", "Private Cloud Deployment"]
              }
            ].map((plan, i) => (
              <div key={i} className={`p-10 md:p-12 rounded-[2.5rem] md:rounded-[3rem] ${plan.primary ? 'bg-violet-600 shadow-[0_0_50px_rgba(124,58,237,0.3)] md:scale-105 z-10' : 'glass-dark border border-white/5 bg-slate-900/60'} flex flex-col items-start text-left transition-all duration-500 hover:border-white/20 relative group`}>
                {plan.primary && (
                  <div className="absolute top-8 right-8 bg-amber-400 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest shadow-xl shadow-amber-400/20">RECOMMENDED</div>
                )}
                <span className={`${plan.primary ? 'text-amber-300' : 'text-amber-400'} font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mb-6 italic`}>{plan.tag}</span>
                <h4 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">{plan.title}</h4>
                <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-slate-400 text-xs md:text-sm font-black uppercase tracking-widest">/cycle</span>}
                </div>
                <div className="w-full space-y-4 mb-12 flex-1">
                  {plan.features.map((feat, j) => (
                    <div key={j} className="flex items-center gap-3 text-white">
                      <CheckCircle2 className={`w-4 h-4 md:w-5 md:h-5 ${plan.primary ? 'text-amber-300' : 'text-amber-500'}`} />
                      <span className={`text-sm md:text-base font-bold ${plan.primary ? 'text-white/90' : 'text-slate-300'}`}>{feat}</span>
                    </div>
                  ))}
                </div>
                <button className={`w-full py-4 md:py-5 rounded-2xl md:rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs md:text-sm transition-all italic shadow-xl ${plan.primary ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-amber-500/20' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>
                  Activate Phase
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32 px-6">
          <div className="max-w-7xl mx-auto rounded-[3rem] md:rounded-[4rem] bg-gradient-to-br from-violet-700 via-indigo-600 to-amber-500 p-10 md:p-24 text-center relative overflow-hidden shadow-[0_0_80px_rgba(124,58,237,0.2)]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl animate-pulse"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black text-white mb-6 md:mb-8 leading-[0.95] tracking-tighter">Ready to optimize <br className="hidden md:block" /> your matrix?</h2>
              <p className="text-white/90 text-lg md:text-xl mb-10 md:mb-12 max-w-2xl mx-auto font-black italic uppercase tracking-widest px-4">
                Join 2,000+ elite organizations synchronizing with WorkSphere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4 sm:px-0">
                <Link href="/dashboard" className="w-full sm:w-auto px-10 md:px-12 py-5 bg-amber-400 text-slate-950 font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-amber-300 transition-all shadow-2xl shadow-amber-400/20 italic">
                  Initialize Sync
                </Link>
                <Link href="/contact" className="w-full sm:w-auto px-10 md:px-12 py-5 bg-violet-950/40 border border-white/20 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-900 transition-all italic">
                  Sales Comms
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-slate-950 border-t border-white/5 pt-20 md:pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-16 mb-20">
            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-4 space-y-8 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <div className="bg-violet-600 p-2.5 rounded-xl shadow-lg shadow-violet-600/20">
                  <ShieldCheck className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-white">WorkSphere</span>
              </div>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-sm mx-auto sm:mx-0 font-medium">
                The high-performance workforce matrix. We empower elite teams to maintain operational peak.
              </p>
              <div className="flex justify-center sm:justify-start gap-3 md:gap-4">
                {[Globe, ExternalLink, Share2, Mail].map((Icon, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 hover:text-amber-400 hover:border-amber-500/30 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="sm:col-span-1 lg:col-span-4 grid grid-cols-2 gap-8">
              <div className="space-y-6 md:space-y-8">
                <h5 className="text-white font-black uppercase tracking-widest text-[10px] md:text-xs italic text-center sm:text-left">Platform</h5>
                <ul className="space-y-3 md:space-y-4 text-center sm:text-left">
                  {["Features", "Solutions", "Pricing", "Enterprise"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-slate-500 hover:text-amber-400 transition-colors font-black uppercase text-[10px] tracking-widest">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6 md:space-y-8">
                <h5 className="text-white font-black uppercase tracking-widest text-[10px] md:text-xs italic text-center sm:text-left">Organization</h5>
                <ul className="space-y-3 md:space-y-4 text-center sm:text-left">
                  {["About Matrix", "Our Strategists", "Careers", "Secure Blog"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-slate-500 hover:text-amber-400 transition-colors font-black uppercase text-[10px] tracking-widest">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="sm:col-span-1 lg:col-span-4 space-y-6 md:space-y-8">
              <h5 className="text-white font-black uppercase tracking-widest text-[10px] md:text-xs italic text-center sm:text-left">Neural Feed</h5>
              <p className="text-slate-500 font-bold text-center sm:text-left text-xs md:text-sm">Get high-priority HR intel delivered to your terminal.</p>
              <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-400 transition-colors">
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <input 
                  type="email" 
                  placeholder="name@company.os" 
                  className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 md:py-4 pl-12 pr-16 focus:outline-none focus:border-amber-500/50 transition-all text-white font-black uppercase text-[10px] tracking-widest" 
                />
                <button className="absolute right-2 top-2 bottom-2 px-3 md:px-4 bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-all shadow-lg">
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[9px] md:text-[10px] text-slate-700 font-black uppercase tracking-[0.3em] text-center lg:text-left">
                ENCRYPTED COMMS ONLY.
              </p>
            </div>
          </div>

          <div className="pt-10 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
            <div className="text-slate-600 text-[10px] md:text-xs font-black uppercase tracking-widest text-center">
              © {new Date().getFullYear()} WorkSphere Matrix. Core Version 4.0.2
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[10px] md:text-xs font-black uppercase tracking-widest">
              <a href="#" className="text-slate-600 hover:text-white transition-colors">Privacy Prot</a>
              <a href="#" className="text-slate-600 hover:text-white transition-colors">Service Terms</a>
              <a href="#" className="text-slate-600 hover:text-white transition-colors">Neural Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .glass-dark {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .glass-card {
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
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
      `}</style>
    </div>
  );
}
