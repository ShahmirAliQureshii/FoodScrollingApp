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

      <div className="w-full max-w-[480px] relative z-10 py-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
        <div className="glass-panel p-8 md:p-14 rounded-4xl border-white/5 shadow-[0_0_150px_rgba(0,0,0,0.8)] relative group overflow-hidden ring-1 ring-white/5 hover:ring-white/10 transition-all duration-700">
          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          {/* Pro-Brand Header */}
          <div className="text-center mb-10 relative">
            <div className="w-20 h-20 bg-zinc-950 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-700 relative">
              <Orbit className="text-neon-cyan animate-spin-slow" size={32} />
              <div className="absolute inset-0 bg-neon-cyan/20 blur-2xl rounded-full" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-white mb-3 italic">
              IDENTITY GEN
            </h1>
            <p className="text-neon-cyan font-bold text-[9px] uppercase tracking-[0.5em] mb-1">
              Construct your global FoodProfile
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6 relative z-10">
            <div className="space-y-2.5 group/field">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 ml-4 group-focus-within/field:text-white transition-colors">
                Display Name
              </label>
              <div className="relative group/input">
                <User
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/input:text-white transition-all"
                  size={18}
                />
                <input
                  name="fullName"
                  type="text"
                  required
                  placeholder="Alex Rivera"
                  className="w-full pl-16 pr-8 py-5 bg-zinc-950/40 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-white/50 focus:ring-4 focus:ring-white/5 transition-all text-white placeholder:text-zinc-800 shadow-inner group-hover:bg-zinc-950/60"
                />
              </div>
            </div>

            <div className="space-y-2.5 group/field">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 ml-4 group-focus-within/field:text-neon-cyan transition-colors">
                Access Email
              </label>
              <div className="relative group/input">
                <Mail
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/input:text-neon-cyan transition-all"
                  size={18}
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="alex@network.com"
                  className="w-full pl-16 pr-8 py-5 bg-zinc-950/40 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-neon-cyan/50 focus:ring-4 focus:ring-neon-cyan/5 transition-all text-white placeholder:text-zinc-800 shadow-inner group-hover:bg-zinc-950/60"
                />
              </div>
            </div>

            <div className="space-y-2.5 group/field">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 ml-4 group-focus-within/field:text-neon-pink transition-colors">
                Secure Passkey
              </label>
              <div className="relative group/input">
                <Lock
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/input:text-neon-pink transition-all"
                  size={18}
                />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-16 pr-8 py-5 bg-zinc-950/40 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-neon-pink/50 focus:ring-4 focus:ring-neon-pink/5 transition-all text-white placeholder:text-zinc-800 shadow-inner group-hover:bg-zinc-950/60"
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
              className="w-full py-5.5 bg-white text-black font-black uppercase tracking-[0.4em] text-[11px] rounded-4xl hover:bg-neon-cyan hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 relative group/btn overflow-hidden"
            >
              <div className="absolute inset-0 bg-neon-cyan/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
              <span className="relative z-10">
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Initiate Identity"
                )}
              </span>
              {!loading && (
                <Sparkles
                  size={18}
                  className="relative z-10 group-hover/btn:rotate-12 transition-transform"
                />
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5 text-center relative z-10">
            <Link
              to="/login"
              className="text-[11px] font-bold text-zinc-600 hover:text-white transition-colors group/link"
            >
              Already identified?{" "}
              <span className="text-white underline underline-offset-8 decoration-neon-cyan decoration-2 font-black group-hover/link:text-neon-cyan transition-colors">
                Log In Portal
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center opacity-10 hover:opacity-50 transition-opacity">
          <p className="text-[8px] font-black text-white uppercase tracking-[1em] ml-[1em]">
            Identity Encryption Standard Active
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
