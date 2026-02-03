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

      <div className="w-full max-w-[680px] relative z-10 py-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
        <div className="glass-panel p-8 md:p-14 rounded-4xl border-white/5 shadow-[0_0_150px_rgba(0,0,0,0.9)] relative overflow-hidden transition-all duration-700 hover:border-white/10 group ring-1 ring-white/5">
          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          {/* Partnership Hub Header */}
          <div className="text-center mb-10 relative">
            <div className="w-20 h-20 bg-zinc-950 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:bg-white group-hover:text-black transition-all duration-1000 relative">
              <Globe
                className="animate-spin-slow group-hover:animate-none"
                size={32}
              />
              <div className="absolute inset-0 bg-neon-pink/15 blur-2xl rounded-full" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-white mb-3 italic">
              ECOSYSTEM JOIN
            </h1>
            <p className="text-neon-pink font-bold text-[9px] uppercase tracking-[0.6em] mb-1">
              Onboard your Kitchen into the high-fidelity future
            </p>
          </div>

          <form
            onSubmit={handleRegister}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
          >
            <div className="md:col-span-2 space-y-2.5 group/field">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 ml-5 group-focus-within/field:text-neon-cyan transition-colors">
                Kitchen Identity
              </label>
              <div className="relative group/input">
                <UtensilsCrossed
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/input:text-neon-cyan transition-colors"
                  size={18}
                />
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Midnight Bistro"
                  className="w-full pl-16 pr-8 py-5 bg-zinc-950/40 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-neon-cyan/50 focus:ring-4 focus:ring-neon-cyan/5 transition-all text-white placeholder:text-zinc-800 shadow-inner group-hover:bg-zinc-950/60"
                />
              </div>
            </div>

            <div className="space-y-2.5 group/field">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 ml-5 group-focus-within/field:text-white transition-colors">
                Primary Lead
              </label>
              <div className="relative group/input">
                <User
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/input:text-white transition-colors"
                  size={18}
                />
                <input
                  name="contactName"
                  type="text"
                  required
                  placeholder="Jordan Vane"
                  className="w-full pl-16 pr-8 py-5 bg-zinc-950/40 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-white/20 focus:ring-4 focus:ring-white/5 transition-all text-white placeholder:text-zinc-800 shadow-inner group-hover:bg-zinc-950/60"
                />
              </div>
            </div>

            <div className="space-y-2.5 group/field">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 ml-5 group-focus-within/field:text-white transition-colors">
                Direct Link
              </label>
              <div className="relative group/input">
                <Phone
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/input:text-white transition-colors"
                  size={18}
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="+44 7700 900077"
                  className="w-full pl-16 pr-8 py-5 bg-zinc-950/40 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-white/20 focus:ring-4 focus:ring-white/5 transition-all text-white placeholder:text-zinc-800 shadow-inner group-hover:bg-zinc-950/60"
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2.5 group/field">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 ml-5 group-focus-within/field:text-neon-cyan transition-colors">
                Operational Coordinates
              </label>
              <div className="relative group/input">
                <MapPin
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/input:text-neon-cyan transition-colors"
                  size={18}
                />
                <input
                  name="address"
                  type="text"
                  required
                  placeholder="Sector 7G, Industrial District, Cyber City"
                  className="w-full pl-16 pr-8 py-5 bg-zinc-950/40 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-neon-cyan/50 focus:ring-4 focus:ring-neon-cyan/5 transition-all text-white placeholder:text-zinc-800 shadow-inner group-hover:bg-zinc-950/60"
                />
              </div>
            </div>

            <div className="space-y-2.5 group/field">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 ml-5 group-focus-within/field:text-neon-cyan transition-colors">
                Admin Email
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
                  placeholder="admin@bistro.corp"
                  className="w-full pl-16 pr-8 py-5 bg-zinc-950/40 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-neon-cyan/50 focus:ring-4 focus:ring-neon-cyan/5 transition-all text-white placeholder:text-zinc-800 shadow-inner group-hover:bg-zinc-950/60"
                />
              </div>
            </div>

            <div className="space-y-2.5 group/field">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 ml-5 group-focus-within/field:text-neon-pink transition-colors">
                Secure Key
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
                  className="w-full pl-16 pr-8 py-5 bg-zinc-950/40 border border-white/5 rounded-3xl text-sm font-medium focus:outline-none focus:border-neon-pink/50 focus:ring-4 focus:ring-neon-pink/5 transition-all text-white placeholder:text-zinc-800 shadow-inner group-hover:bg-zinc-950/60"
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
              className="md:col-span-2 w-full py-6 bg-white text-black font-black uppercase tracking-[0.5em] text-[11px] rounded-4xl hover:bg-neon-pink hover:text-white hover:scale-[1.01] active:scale-[0.99] transition-all shadow-2xl flex items-center justify-center gap-4 disabled:opacity-50 mt-4 relative group/btn overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/5 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
              <span className="relative z-10">
                {loading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  "Finalize Partnership Protocol"
                )}
              </span>
              {!loading && (
                <ArrowRight
                  size={20}
                  className="relative z-10 group-hover/btn:translate-x-1 transition-transform"
                />
              )}
            </button>
          </form>

          <p className="mt-12 text-center text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700 relative z-10">
            Already operational?{" "}
            <Link
              to="/partner/login"
              className="text-neon-cyan underline underline-offset-8 decoration-2 hover:text-white transition-colors"
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
