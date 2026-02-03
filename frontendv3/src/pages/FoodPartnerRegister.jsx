import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  UtensilsCrossed,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  ArrowRight,
  Loader2,
  Globe,
  MonitorCheck,
} from "lucide-react";

const FoodPartnerRegister = () => {
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
        "http://localhost:3000/api/auth/food-partner/register",
        {
          name: e.target.name.value,
          contactName: e.target.contactName.value,
          phone: e.target.phone.value,
          address: e.target.address.value,
          email: e.target.email.value,
          password: e.target.password.value,
        },
        { withCredentials: true },
      );

      setUser(res.data.foodPartner);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration construction failure.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full bg-black flex items-start justify-center p-4 md:p-10 lg:p-16 relative overflow-y-auto no-scrollbar pt-20 md:pt-32">
      {/* Premium Visual Layers */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Sub-Industrial Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1.5px, transparent 1.5px), linear-gradient(90deg, #fff 1.5px, transparent 1.5px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Dynamic Cinematic Background */}
        <div className="absolute top-[-30%] left-[-20%] w-[100%] h-[100%] bg-neon-cyan/5 blur-[220px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-neon-pink/5 blur-[220px] rounded-full animate-pulse delay-700" />
      </div>

      <div className="w-full max-w-[680px] relative z-10 py-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div className="glass-panel p-8 md:p-14 rounded-4xl border-white/5 shadow-[0_0_150px_rgba(0,0,0,0.95)] relative overflow-hidden transition-all duration-700 hover:border-white/10 group ring-1 ring-white/5">
          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          {/* Accent Glows */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-neon-pink/5 blur-[80px] rounded-full group-hover:bg-neon-pink/15 transition-all duration-1000" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-neon-cyan/5 blur-[80px] rounded-full group-hover:bg-neon-cyan/15 transition-all duration-1000" />

          {/* Partnership Hub Header */}
          <div className="text-center mb-10 relative">
            <div className="w-20 h-20 bg-zinc-950 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:bg-white group-hover:text-black transition-all duration-1000 relative">
              <Globe
                className="animate-spin-slow group-hover:animate-none"
                size={32}
              />
              <div className="absolute inset-0 bg-neon-pink/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-white mb-3 italic leading-none">
              STRATEGIC <br />{" "}
              <span className="text-zinc-800 group-hover:text-white transition-colors duration-700 text-4xl uppercase tracking-widest">
                Onboarding
              </span>
            </h1>
            <div className="flex items-center justify-center gap-2 mb-2">
              <MonitorCheck
                size={12}
                className="text-neon-cyan animate-pulse"
              />
              <p className="text-zinc-600 font-bold text-[9px] uppercase tracking-[0.5em]">
                Network Expansion Protocol Active
              </p>
            </div>
          </div>

          <form
            onSubmit={handleRegister}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
          >
            <div className="md:col-span-2 space-y-3 group/field">
              <label className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-600 ml-5 group-focus-within/field:text-neon-cyan transition-colors">
                Kitchen Label
              </label>
              <div className="relative group/input">
                <UtensilsCrossed
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-neon-cyan transition-colors"
                  size={18}
                />
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Neon Diner"
                  className="w-full pl-16 pr-8 py-5.5 bg-zinc-950/60 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-neon-cyan/40 focus:ring-4 focus:ring-neon-cyan/5 transition-all text-white placeholder:text-zinc-800 shadow-2xl group-hover:bg-zinc-950/80"
                />
              </div>
            </div>

            <div className="space-y-3 group/field">
              <label className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-600 ml-5 group-focus-within/field:text-white transition-colors">
                Head Curator
              </label>
              <div className="relative group/input">
                <User
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-white transition-colors"
                  size={18}
                />
                <input
                  name="contactName"
                  type="text"
                  required
                  placeholder="Leo Vance"
                  className="w-full pl-16 pr-8 py-5.5 bg-zinc-950/60 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-white/30 focus:ring-4 focus:ring-white/5 transition-all text-white placeholder:text-zinc-800 shadow-2xl group-hover:bg-zinc-950/80"
                />
              </div>
            </div>

            <div className="space-y-3 group/field">
              <label className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-600 ml-5 group-focus-within/field:text-white transition-colors">
                Link Number
              </label>
              <div className="relative group/input">
                <Phone
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-white transition-colors"
                  size={18}
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="+44 20 7946 0000"
                  className="w-full pl-16 pr-8 py-5.5 bg-zinc-950/60 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-white/30 focus:ring-4 focus:ring-white/5 transition-all text-white placeholder:text-zinc-800 shadow-2xl group-hover:bg-zinc-950/80"
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-3 group/field">
              <label className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-600 ml-5 group-focus-within/field:text-neon-cyan transition-colors">
                Physical Coordinates
              </label>
              <div className="relative group/input">
                <MapPin
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-neon-cyan transition-colors"
                  size={18}
                />
                <input
                  name="address"
                  type="text"
                  required
                  placeholder="Unit 14, High Tech Park, East Grid"
                  className="w-full pl-16 pr-8 py-5.5 bg-zinc-950/60 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-neon-cyan/40 focus:ring-4 focus:ring-neon-cyan/5 transition-all text-white placeholder:text-zinc-800 shadow-2xl group-hover:bg-zinc-950/80"
                />
              </div>
            </div>

            <div className="space-y-3 group/field">
              <label className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-600 ml-5 group-focus-within/field:text-neon-cyan transition-colors">
                Master ID
              </label>
              <div className="relative group/input">
                <Mail
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-neon-cyan transition-colors"
                  size={18}
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="corp@nexus.sys"
                  className="w-full pl-16 pr-8 py-5.5 bg-zinc-950/60 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-neon-cyan/40 focus:ring-4 focus:ring-neon-cyan/5 transition-all text-white placeholder:text-zinc-800 shadow-2xl group-hover:bg-zinc-950/80"
                />
              </div>
            </div>

            <div className="space-y-3 group/field">
              <label className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-600 ml-5 group-focus-within/field:text-neon-pink transition-colors">
                System Passkey
              </label>
              <div className="relative group/input">
                <Lock
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/input:text-neon-pink transition-colors"
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
              <div className="md:col-span-2 p-5 bg-red-500/5 border border-red-500/10 rounded-4xl text-red-500 text-[10px] font-black uppercase tracking-[0.2em] text-center animate-shake backdrop-blur-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 w-full py-6 bg-white text-black font-black uppercase tracking-[0.6em] text-[11px] rounded-4xl hover:bg-neon-pink hover:text-white hover:scale-[1.01] active:scale-[0.99] transition-all shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex items-center justify-center gap-4 disabled:opacity-50 mt-4 relative group/btn overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/5 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />
              <span className="relative z-10">
                {loading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  "Initiate Onboarding Protocol"
                )}
              </span>
              {!loading && (
                <ArrowRight
                  size={20}
                  className="relative z-10 group-hover/btn:translate-x-2 transition-transform duration-500"
                />
              )}
            </button>
          </form>

          <p className="mt-14 text-center text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 relative z-10">
            Already linked?{" "}
            <Link
              to="/partner/login"
              className="text-neon-cyan underline underline-offset-12 decoration-neon-cyan/30 decoration-2 hover:text-white transition-all"
            >
              Return to Console
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
