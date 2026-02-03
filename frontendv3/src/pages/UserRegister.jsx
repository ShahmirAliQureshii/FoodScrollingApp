import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Sparkles,
  Orbit,
  Fingerprint,
} from "lucide-react";

const UserRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        {
          fullName: e.target.fullName.value,
          email: e.target.email.value,
          password: e.target.password.value,
        },
        { withCredentials: true },
      );

      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Identity creation failure.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full bg-black flex items-start justify-center p-4 md:p-10 relative overflow-y-auto no-scrollbar pt-20 md:pt-32">
      {/* Premium Visual Layers */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Cinematic Background Atmosphere */}
        <div className="absolute top-[-30%] right-[-10%] w-[80%] h-[80%] bg-neon-cyan/15 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[80%] h-[80%] bg-neon-pink/15 blur-[180px] rounded-full animate-pulse delay-500" />
      </div>

      <div className="w-full max-w-[480px] relative z-10 py-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div className="glass-panel p-8 md:p-14 rounded-4xl border-white/5 shadow-[0_0_150px_rgba(0,242,234,0.05)] relative group overflow-hidden ring-1 ring-white/5 hover:ring-white/10 transition-all duration-700">
          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          {/* Pro-Brand Header */}
          <div className="text-center mb-10 relative">
            <div className="w-20 h-20 bg-zinc-950 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_80px_rgba(0,242,234,0.1)] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 relative">
              <Orbit className="text-neon-cyan animate-spin-slow" size={32} />
              <div className="absolute inset-0 bg-neon-cyan/40 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-white mb-3 italic leading-none">
              GENERATE <br />{" "}
              <span className="text-zinc-800 group-hover:text-white transition-colors duration-700 text-4xl">
                IDENTITY
              </span>
            </h1>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Fingerprint size={12} className="text-neon-cyan animate-pulse" />
              <p className="text-zinc-600 font-bold text-[9px] uppercase tracking-[0.5em]">
                Secure Persona Construction Active
              </p>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-6 relative z-10">
            <div className="space-y-3 group/field">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 ml-4 group-focus-within/field:text-white transition-colors">
                Public Persona Name
              </label>
              <div className="relative group/input">
                <User
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-white transition-all shadow-inner"
                  size={18}
                />
                <input
                  name="fullName"
                  type="text"
                  required
                  placeholder="Xavier Thorne"
                  className="w-full pl-16 pr-8 py-5.5 bg-zinc-950/60 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-white/40 focus:ring-4 focus:ring-white/5 transition-all text-white placeholder:text-zinc-800 shadow-2xl group-hover:bg-zinc-950/80"
                />
              </div>
            </div>

            <div className="space-y-3 group/field">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 ml-4 group-focus-within/field:text-neon-cyan transition-colors">
                Access Link (Email)
              </label>
              <div className="relative group/input">
                <Mail
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-neon-cyan transition-all"
                  size={18}
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="xavier@nexus.net"
                  className="w-full pl-16 pr-8 py-5.5 bg-zinc-950/60 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-neon-cyan/40 focus:ring-4 focus:ring-neon-cyan/5 transition-all text-white placeholder:text-zinc-800 shadow-2xl group-hover:bg-zinc-950/80"
                />
              </div>
            </div>

            <div className="space-y-3 group/field">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 ml-4 group-focus-within/field:text-neon-pink transition-colors">
                Neural Key
              </label>
              <div className="relative group/input">
                <Lock
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-neon-pink transition-all"
                  size={18}
                />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-16 pr-8 py-5.5 bg-zinc-950/60 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-neon-pink/40 focus:ring-4 focus:ring-neon-pink/5 transition-all text-white placeholder:text-zinc-800 shadow-2xl group-hover:bg-zinc-950/80"
                />
              </div>
            </div>

            {error && (
              <div className="p-5 bg-red-500/5 border border-red-500/10 rounded-4xl text-red-500 text-[10px] font-black uppercase tracking-[0.2em] text-center animate-shake backdrop-blur-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.6em] text-[11px] rounded-4xl hover:bg-neon-cyan hover:scale-[1.03] active:scale-[0.97] transition-all shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-center gap-3 disabled:opacity-50 relative group/btn overflow-hidden"
            >
              <div className="absolute inset-0 bg-neon-cyan/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />
              <span className="relative z-10">
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Manifest Persona"
                )}
              </span>
              {!loading && (
                <Sparkles
                  size={18}
                  className="relative z-10 group-hover/btn:rotate-45 group-hover/btn:scale-125 transition-all duration-500"
                />
              )}
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-white/5 text-center relative z-10">
            <Link
              to="/login"
              className="text-[11px] font-bold text-zinc-500 hover:text-white transition-colors group/link"
            >
              Already manifest?{" "}
              <span className="text-white underline underline-offset-12 decoration-neon-cyan/30 decoration-2 font-black group-hover/link:decoration-neon-cyan group-hover/link:text-neon-cyan transition-all">
                Login Session
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center opacity-10 hover:opacity-50 transition-opacity">
          <p className="text-[9px] font-black text-white uppercase tracking-[1.5em] ml-[1.5em]">
            Identity Creation Standard Level 4
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
