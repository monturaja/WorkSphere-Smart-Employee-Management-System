"use client";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { 
  Loader2, 
  Crown, 
  Activity, 
  X, 
  Save, 
  Edit3, 
  CheckCircle2, 
  Shield, 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar 
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    officeLocation: '',
    position: '',
    department: '',
    image: '',
    role: ''
  });

  useEffect(() => {
    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status]);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile');
      const result = await res.json();
      if (result.success) {
        setProfile({
          name: result.data.user?.name || '',
          email: result.data.user?.email || '',
          phone: result.data.employee?.phone || '',
          officeLocation: result.data.employee?.officeLocation || '',
          position: result.data.employee?.position || '',
          department: result.data.employee?.department || '',
          image: result.data.employee?.image || '',
          role: result.data.user?.role || ''
        });
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Image size should be less than 2MB' });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      const result = await res.json();
      if (result.success) {
        setIsEditing(false);
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: result.error || result.message || 'Update failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while saving' });
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || (loading && status === "authenticated")) {
    return (
      <div className="flex h-screen bg-slate-950 items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
      </div>
    );
  }

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const isAdmin = profile.role === 'admin';
  const isHR = profile.role === 'hr';

  // Theme Constants
  const theme = {
    primary: isAdmin ? 'amber-500' : isHR ? 'emerald-500' : 'indigo-600',
    primaryBg: isAdmin ? 'bg-amber-500/10' : isHR ? 'bg-emerald-500/10' : 'bg-indigo-600/10',
    primaryBorder: isAdmin ? 'border-amber-500/30' : isHR ? 'border-emerald-500/30' : 'border-indigo-500/30',
    gradient: isAdmin 
      ? 'from-amber-400 via-yellow-200 to-amber-500' 
      : isHR 
        ? 'from-emerald-300 via-sky-300 to-emerald-500' 
        : 'from-indigo-400 to-purple-400',
    shadow: isAdmin ? 'shadow-amber-500/20' : isHR ? 'shadow-emerald-500/20' : 'shadow-indigo-600/20',
    accent: isAdmin ? 'text-amber-400' : isHR ? 'text-emerald-400' : 'text-indigo-400'
  };

  return (
    <DashboardLayout>
      <div className="relative overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {isAdmin ? (
            <>
              <div className="absolute top-[-15%] right-[-10%] w-[50%] h-[50%] bg-amber-600/5 rounded-full blur-[150px] animate-pulse"></div>
              <div className="absolute bottom-[-15%] left-[-10%] w-[40%] h-[40%] bg-rose-600/5 rounded-full blur-[130px]"></div>
            </>
          ) : isHR ? (
            <>
              <div className="absolute top-[-15%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/10 rounded-full blur-[150px] animate-pulse"></div>
              <div className="absolute bottom-[-15%] left-[-10%] w-[40%] h-[40%] bg-sky-600/10 rounded-full blur-[130px]"></div>
            </>
          ) : (
            <>
              <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
              <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[100px]"></div>
            </>
          )}
        </div>

        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {isAdmin && <Crown className="w-8 h-8 text-amber-400 animate-bounce" />}
              {isHR && <Activity className="w-8 h-8 text-emerald-400 animate-pulse" />}
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${theme.gradient}`}>
                  {isAdmin ? 'Administrator Central' : isHR ? 'Personnel Intelligence Central' : isEditing ? 'Customize Profile' : 'Profile Overview'}
                </span>
              </h1>
            </div>
            <p className="text-slate-400 text-base md:text-lg">
              {isAdmin ? "Superuser Access - System Oversight and Authority" : isHR ? "Human Resource Oversight - Workforce Analytics and Intelligence" : "Manage your professional identity and preferences."}
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            {isEditing ? (
              <>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 text-slate-300 px-6 py-2.5 rounded-2xl hover:bg-slate-800 transition-all text-sm font-semibold shadow-lg shadow-black/20"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className={`flex-1 md:flex-none flex items-center justify-center gap-2 ${isAdmin ? 'bg-amber-600 border-amber-500 hover:bg-amber-500' : isHR ? 'bg-emerald-600 border-emerald-500 hover:bg-emerald-500' : 'bg-indigo-600 border-indigo-500 hover:bg-indigo-500'} text-white px-6 py-2.5 rounded-2xl transition-all text-sm font-semibold shadow-lg disabled:opacity-50`}
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className={`w-full md:w-auto flex items-center justify-center gap-2 ${isAdmin ? 'bg-amber-500 text-slate-950' : isHR ? 'bg-emerald-500 text-slate-950' : 'bg-slate-100 text-slate-950'} px-6 py-2.5 rounded-2xl hover:brightness-110 transition-all text-sm font-bold shadow-xl active:scale-95`}
              >
                <Edit3 className="w-4 h-4" />
                Edit Authority Profile
              </button>
            )}
          </div>
        </header>

        {message.text && (
          <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${
            message.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
          }`}>
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          {/* Sidebar Info Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className={`p-6 md:p-8 rounded-[2.5rem] ${isAdmin ? 'bg-slate-900/60 border-amber-500/20' : isHR ? 'bg-slate-900/60 border-emerald-500/20' : 'bg-slate-900/40 border-slate-800/50'} backdrop-blur-xl border flex flex-col items-center text-center shadow-2xl relative overflow-hidden group`}>
              {/* Decorative Circle */}
              <div className={`absolute -top-24 -right-24 w-48 h-48 ${isAdmin ? 'bg-amber-600/10' : isHR ? 'bg-emerald-600/10' : 'bg-indigo-600/5'} rounded-full blur-3xl group-hover:blur-[50px] transition-all duration-700`}></div>
              
              <div className="relative mb-8 group/avatar">
                <div className={`w-32 h-32 md:w-44 md:h-44 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br ${isAdmin ? 'from-amber-600 to-amber-900' : isHR ? 'from-emerald-600 to-sky-700' : 'from-indigo-600 to-indigo-800'} flex items-center justify-center text-white text-4xl md:text-6xl font-bold shadow-2xl ${isAdmin ? 'shadow-amber-600/30 ring-4 ring-amber-500/20' : isHR ? 'shadow-emerald-600/30 ring-4 ring-emerald-500/20' : 'shadow-indigo-600/20 ring-4 ring-slate-800'} overflow-hidden relative`}>
                  {profile.image ? (
                    <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    getInitials(profile.name)
                  )}
                  {isEditing && (
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-all duration-300 cursor-pointer"
                    >
                      <Camera className="w-8 h-8 text-white" />
                    </button>
                  )}
                </div>
                {isEditing && (
                  <div className={`absolute -bottom-2 -right-2 ${isAdmin ? 'bg-amber-500' : isHR ? 'bg-emerald-500' : 'bg-indigo-500'} w-10 h-10 rounded-2xl border-4 border-slate-900 flex items-center justify-center text-white shadow-xl`}>
                    <Camera className="w-5 h-5" />
                  </div>
                )}
                {!isEditing && (
                  <div className={`absolute -bottom-2 -right-2 ${isAdmin ? 'bg-amber-400' : isHR ? 'bg-emerald-400' : 'bg-emerald-500'} w-6 h-6 rounded-full border-4 border-slate-900 shadow-lg`}></div>
                )}
                <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
              </div>

              <div className="space-y-1 mb-8">
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">{profile.name || (isHR ? "HR Executive" : "System Admin")}</h2>
                <div className={`inline-flex py-1 px-4 rounded-full ${isAdmin ? 'bg-amber-500/10 text-amber-400' : isHR ? 'bg-emerald-500/10 text-emerald-400' : 'bg-indigo-500/10 text-indigo-400'} text-[10px] font-black uppercase tracking-[0.2em] animate-pulse`}>
                  {profile.role?.toUpperCase() || (isHR ? "HR INTELLIGENCE" : "ROOT ACCESS")}
                </div>
              </div>
              
              <div className="w-full pt-8 border-t border-slate-800/50 space-y-5 text-left">
                {[
                  { icon: Mail, label: 'Secure Email', value: profile.email, type: 'email' },
                  { icon: Phone, label: 'Priority Line', value: profile.phone, type: 'phone' },
                  { icon: MapPin, label: 'Executive HQ', value: profile.officeLocation, type: 'officeLocation' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 group/item">
                    <div className={`p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover/item:${theme.primaryBorder} transition-all`}>
                      <item.icon className={`w-4 h-4 ${isAdmin ? 'text-amber-400' : 'text-slate-400'}`} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className={`text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5`}>{item.label}</p>
                      {isEditing && item.type !== 'email' ? (
                        <input name={item.type} value={profile[item.type]} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-sm text-white focus:outline-none focus:border-amber-500" />
                      ) : (
                        <p className="text-sm text-slate-200 font-bold truncate">{item.value || "Not Set"}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isAdmin ? (
              <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-amber-600/10 to-rose-600/10 backdrop-blur-xl border border-amber-500/20 group hover:border-amber-500/40 transition-all duration-500">
                <h3 className="text-white font-black mb-4 flex items-center gap-3">
                  <Shield  className="w-6 h-6 text-amber-400" />
                  System Authority
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Security Level', val: 'Level 10 (Root)' },
                    { label: 'Encryption', val: 'AES-256 Valid' },
                    { label: 'Audit Trail', val: 'Logging Active' }
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-bold uppercase tracking-widest">{s.label}</span>
                      <span className="text-amber-200 font-black">{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={`p-8 rounded-[2.5rem] ${isHR ? 'bg-emerald-600/5 border-emerald-500/10' : 'bg-indigo-600/5 border-indigo-500/10'} backdrop-blur-xl border`}>
                <h3 className="text-white font-extrabold mb-4 flex items-center gap-3">
                  <Shield className={`w-6 h-6 ${theme.accent}`} />
                  Security Hub
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">Enhanced protection enabled. Your profile is encrypted.</p>
                <button className={`w-full py-3.5 ${isHR ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20'} text-white rounded-2xl text-xs font-black shadow-lg transition-all active:scale-95`}>Update Security</button>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className={`p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] ${isAdmin ? 'bg-slate-900/80 border-amber-500/10 shadow-amber-500/5' : isHR ? 'bg-slate-900/80 border-emerald-500/10 shadow-emerald-500/5' : 'bg-slate-900/40 border-slate-800/50'} backdrop-blur-xl border shadow-2xl relative overflow-hidden`}>
               {/* Decorative Gradient Line */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${isAdmin ? 'via-amber-500/40' : isHR ? 'via-emerald-500/40' : 'via-indigo-500/40'} to-transparent`}></div>

              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl md:text-2xl font-black text-white flex items-center gap-3">
                  <Activity className={`w-6 h-6 ${theme.accent}`} />
                  {isAdmin ? 'System Governance & Role' : isHR ? 'Personnel Intelligence & Identity' : 'Employment Details'}
                </h3>
                <span className={`hidden sm:block ${isAdmin ? 'bg-amber-500' : 'bg-emerald-500'} text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase`}>{isAdmin ? 'Superuser Mode' : 'Authority Mode'}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <div className="space-y-6 md:y-8">
                  {[
                    { label: isAdmin ? 'Admin Identifier' : 'Full Name', name: 'name', value: profile.name },
                    { label: isAdmin ? 'Executive Position' : 'Job Title', name: 'position', value: profile.position || (isAdmin ? 'Director of Systems' : isHR ? 'HR Executive Director' : 'Professional') }
                  ].map((field, i) => (
                    <div key={i} className="space-y-2 group/field">
                      <label className={`text-[10px] md:text-[11px] font-black text-slate-500 uppercase tracking-widest block group-focus-within/field:${isAdmin ? 'text-amber-400' : 'text-emerald-400'} transition-colors`}>{field.label}</label>
                      {isEditing ? (
                        <input name={field.name} value={field.value} onChange={handleChange} className={`w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-${isAdmin ? 'amber-500' : 'emerald-500'} transition-all`} />
                      ) : (
                        <p className={`text-lg md:text-xl font-bold ${isAdmin ? 'text-amber-100' : isHR ? 'text-emerald-100' : 'text-white'} px-1`}>{field.value}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-6 md:space-y-8">
                  <div className="space-y-2 group/field">
                    <label className={`text-[10px] md:text-[11px] font-black text-slate-500 uppercase tracking-widest block group-focus-within/field:${isAdmin ? 'text-amber-400' : 'text-emerald-400'} transition-colors`}>Managed Unit</label>
                    {isEditing ? (
                      <select name="department" value={profile.department} onChange={handleChange} className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-5 py-4 text-white appearance-none cursor-pointer">
                        <option value="Administration">Administration</option>
                        <option value="Executive Board">Executive Board</option>
                        <option value="System Core">System Core</option>
                        <option value="Human Resources">Human Resources</option>
                      </select>
                    ) : (
                      <p className={`text-lg md:text-xl font-bold ${isAdmin ? 'text-amber-100' : isHR ? 'text-emerald-100' : 'text-white'} px-1`}>{profile.department || (isHR ? "Human Resources" : "Core System")}</p>
                    )}
                  </div>

                  <div className="flex gap-4 items-center p-4 bg-slate-950/50 rounded-[2rem] border border-slate-800/50 shadow-inner">
                    <div className={`p-4 ${isAdmin ? 'bg-amber-500/10 border-amber-500/20' : isHR ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-indigo-500/10 border-indigo-500/20'} rounded-2xl border shadow-md`}>
                      <Calendar className={`w-5 h-5 md:w-6 md:h-6 ${theme.accent}`} />
                    </div>
                    <div>
                      <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Authority Granted On</p>
                      <p className="text-base md:text-lg font-black text-slate-100">Jan 01, 2024</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 md:mt-16 pt-10 md:pt-12 border-t border-slate-800/50">
                <h4 className={`text-[10px] md:text-[11px] font-black text-slate-600 uppercase tracking-[0.3em] mb-8 md:mb-10 text-center`}>Authority Timeline & Logs</h4>
                <div className="space-y-4">
                  {[
                    { action: isAdmin ? `Admin Authentication` : isHR ? `HR Verification` : `Login Success`, detail: isAdmin ? `Secure Root Access Granted` : isHR ? `High-Level Personnel Access Verified` : `Profile session started`, time: 'Live' },
                    { action: 'Config Overhaul', detail: 'System-wide UI Refactoring', time: '1h ago' },
                    { action: 'Database Seed', detail: isHR ? 'Populated Personnel Records' : 'Populated System Records', time: 'Recently' }
                  ].map((act, i) => (
                    <div key={i} className="flex items-center gap-4 md:gap-6 p-4 md:p-5 rounded-[1.5rem] bg-slate-950/40 border border-slate-800/40 hover:bg-slate-900 transition-all group/log">
                      <div className={`flex-shrink-0 w-3 h-3 rounded-full ${isAdmin ? 'bg-amber-500 shadow-amber-500/40 shadow-lg' : isHR ? 'bg-emerald-500 shadow-emerald-500/40 shadow-lg' : 'bg-indigo-500 shadow-indigo-500/20 shadow-md'} transition-all`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{act.action}</p>
                           <p className="text-[9px] text-slate-600 font-bold uppercase">{act.time}</p>
                        </div>
                        <p className="text-sm font-bold text-slate-200 truncate">{act.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </DashboardLayout>
  );
}
