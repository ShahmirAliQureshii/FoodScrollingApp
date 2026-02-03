import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, ArrowRight, Loader2, ShieldCheck } from "lucide-react";

const UserLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        {
          email: e.target.email.value,
          password: e.target.password.value,
        },
        { withCredentials: true },
      );

      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials. Try again.",
      );
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

        {/* Dynamic Background Ambience */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-neon-pink/15 blur-[160px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-neon-cyan/10 blur-[160px] rounded-full animate-pulse delay-700" />
      </div>

      <div className="w-full max-w-[460px] relative z-10 py-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
        <div className="glass-panel p-8 md:p-14 rounded-4xl border-white/5 shadow-[0_0_150px_rgba(0,0,0,0.9)] relative group overflow-hidden ring-1 ring-white/5 hover:ring-white/10 transition-all duration-700">
          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          {/* Futuristic Branding */}
          <div className="text-center mb-10 relative">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_80px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-700 relative">
              <span className="text-black text-4xl font-black italic tracking-tighter z-10">
                F
              </span>
              <div className="absolute inset-0 bg-neon-pink/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-white mb-3 italic">
              ACCESS PORTAL
            </h1>
            <div className="flex items-center justify-center gap-2 mb-2">
              <ShieldCheck size={12} className="text-neon-cyan" />
              <p className="text-zinc-500 font-bold text-[9px] uppercase tracking-[0.5em]">
                Identity Verification Active
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-7 relative z-10">
            <div className="space-y-2.5 group/field">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 ml-4 group-focus-within/field:text-neon-cyan transition-colors">
                Credential Identity
              </label>
              <div className="relative group/input">
                <Mail
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/input:text-neon-cyan transition-colors"
                  size={18}
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="user@network.com"
                  className="w-full pl-16 pr-8 py-5.5 bg-zinc-950/40 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-neon-cyan/50 focus:ring-4 focus:ring-neon-cyan/5 transition-all text-white placeholder:text-zinc-800 shadow-inner group-hover:bg-zinc-950/60"
                />
              </div>
            </div>

            <div className="space-y-2.5 group/field">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 ml-4 group-focus-within/field:text-neon-pink transition-colors">
                Neural Key
              </label>
              <div className="relative group/input">
                <Lock
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/input:text-neon-pink transition-colors"
                  size={18}
                />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-16 pr-8 py-5.5 bg-zinc-950/40 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-neon-pink/50 focus:ring-4 focus:ring-neon-pink/5 transition-all text-white placeholder:text-zinc-800 shadow-inner group-hover:bg-zinc-950/60"
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
              className="w-full py-5.5 bg-white text-black font-black uppercase tracking-[0.4em] text-[11px] rounded-4xl hover:bg-neon-pink hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 relative overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-black/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
              <span className="relative z-10">
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Initialize Session"
                )}
              </span>
              {!loading && (
                <ArrowRight
                  size={18}
                  className="relative z-10 group-hover/btn:translate-x-1 transition-transform"
                />
              )}
            </button>
          </form>

          {/* Nav Links */}
          <div className="mt-14 pt-8 border-t border-white/5 flex flex-col gap-6 text-center relative z-10">
            <Link
              to="/register"
              className="text-[11px] font-bold text-zinc-600 hover:text-white transition-colors group/link"
            >
              Unidentified?{" "}
              <span className="text-white underline underline-offset-8 decoration-neon-pink decoration-2 font-black group-hover/link:text-neon-pink transition-colors">
                Register Identity
              </span>
            </Link>
            <Link
              to="/partner/login"
              className="text-[8px] font-black uppercase tracking-[0.6em] text-zinc-800 hover:text-neon-cyan transition-all"
            >
              Strategic Partner Portal
            </Link>
          </div>
        </div>

        {/* Global Metadata */}
        <div className="mt-12 text-center select-none opacity-20">
          <p className="text-[9px] font-black text-white uppercase tracking-[1.5em] ml-[1.5em]">
            System-Standard Protocol 3.01
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
