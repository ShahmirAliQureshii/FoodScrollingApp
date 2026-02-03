import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Warehouse,
  ShieldAlert,
  Cpu,
} from "lucide-react";

const FoodPartnerLogin = () => {
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
        "http://localhost:3000/api/auth/food-partner/login",
        {
          email: e.target.email.value,
          password: e.target.password.value,
        },
        { withCredentials: true },
      );

      setUser(res.data.foodPartner);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid operator credentials.");
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
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Cinematic Ambient Background */}
        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-neon-cyan/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-white/5 blur-[150px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-[460px] relative z-10 py-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div className="glass-panel p-8 md:p-14 rounded-4xl shadow-[0_0_150px_rgba(255,255,255,0.02)] border-white/5 transition-all duration-700 hover:border-white/10 group ring-1 ring-white/5 relative overflow-hidden">
          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          {/* Accent Glows */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-neon-cyan/10 blur-[60px] rounded-full group-hover:bg-neon-cyan/20 transition-all duration-1000" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/5 blur-[60px] rounded-full group-hover:bg-white/10 transition-all duration-1000" />

          {/* Corporate Profile Header */}
          <div className="text-center mb-10 relative">
            <div className="w-20 h-20 bg-zinc-950 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:bg-white group-hover:text-black transition-all duration-700 relative overflow-hidden">
              <Warehouse
                size={32}
                className="relative z-10 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-neon-cyan/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-white mb-3 italic leading-none">
              PARTNER <br />{" "}
              <span className="text-zinc-800 group-hover:text-white transition-colors duration-700 text-4xl uppercase">
                Console
              </span>
            </h1>
            <div className="flex items-center justify-center gap-2 mb-2">
              <ShieldAlert size={12} className="text-neon-pink animate-pulse" />
              <p className="text-zinc-600 font-bold text-[9px] uppercase tracking-[0.5em]">
                Enterprise Access Active
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-7 relative z-10">
            <div className="space-y-3 group/field">
              <div className="flex justify-between items-center ml-4 mr-4">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 group-focus-within/field:text-neon-cyan transition-colors">
                  Corporate ID
                </label>
                <Cpu
                  size={10}
                  className="text-zinc-800 group-focus-within/field:text-neon-cyan transition-all"
                />
              </div>
              <div className="relative group/input">
                <Mail
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-neon-cyan transition-colors"
                  size={18}
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="master@partner.net"
                  className="w-full pl-16 pr-8 py-5.5 bg-zinc-950/60 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-neon-cyan/40 focus:ring-4 focus:ring-neon-cyan/5 transition-all text-white placeholder:text-zinc-800 shadow-2xl group-hover:bg-zinc-950/80"
                />
              </div>
            </div>

            <div className="space-y-3 group/field">
              <div className="flex justify-between items-center ml-4 mr-4">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 group-focus-within/field:text-white transition-colors">
                  Master Passkey
                </label>
                <Cpu
                  size={10}
                  className="text-zinc-800 group-focus-within/field:text-white transition-all"
                />
              </div>
              <div className="relative group/input">
                <Lock
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-white transition-colors"
                  size={18}
                />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-16 pr-8 py-5.5 bg-zinc-950/60 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-white/20 focus:ring-4 focus:ring-white/5 transition-all text-white placeholder:text-zinc-800 shadow-2xl group-hover:bg-zinc-950/80"
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
              className="w-full py-6 bg-zinc-900 border border-white/5 text-white font-black uppercase tracking-[0.6em] text-[11px] rounded-4xl hover:bg-white hover:text-black hover:scale-[1.03] active:scale-[0.97] transition-all shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex items-center justify-center gap-3 disabled:opacity-50 relative group/btn overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />
              <span className="relative z-10">
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Authenticate Terminal"
                )}
              </span>
              {!loading && (
                <ArrowRight
                  size={18}
                  className="relative z-10 group-hover/btn:translate-x-1.5 transition-transform duration-500"
                />
              )}
            </button>
          </form>

          <div className="mt-14 pt-10 border-t border-white/5 flex flex-col gap-6 text-center relative z-10">
            <Link
              to="/partner/register"
              className="text-[11px] font-black text-zinc-600 hover:text-white transition-colors group/link uppercase tracking-[0.3em]"
            >
              No Identity?{" "}
              <span className="text-neon-cyan underline underline-offset-12 decoration-2 font-black group-hover/link:text-white transition-all">
                Onboard System
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
