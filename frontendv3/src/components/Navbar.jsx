import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Home,
  Film,
  User,
  UserPlus,
  LogOut,
  Compass,
  ChefHat,
  BarChart3,
  ShoppingBag,
  Bookmark,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const isPartner = user?.role === "partner" || user?.contactName; // Heuristic if role not explicit

  const navItems = [
    { path: "/", icon: Home, label: "Feed", public: true },
    { path: "/explore", icon: Compass, label: "Explore", public: true },

    // Partner Specific Rails
    {
      path: "/kitchen",
      icon: ChefHat,
      label: "Kitchen",
      roleRequired: "partner",
    },
    {
      path: "/analytics",
      icon: BarChart3,
      label: "Stats",
      roleRequired: "partner",
    },
    {
      path: "/orders",
      icon: ShoppingBag,
      label: "Orders",
      roleRequired: "partner",
    },

    // User Specific Rails
    {
      path: "/bookmarks",
      icon: Bookmark,
      label: "Saved",
      roleRequired: "user",
    },

    { path: "/login", icon: Film, label: "Access", guestOnly: true },
    { path: "/register", icon: UserPlus, label: "Join", guestOnly: true },
    {
      path: "/partner/login",
      icon: ChefHat,
      label: "Biz Login",
      guestOnly: true,
    },
    {
      path: "/partner/register",
      icon: ShoppingBag,
      label: "Biz Join",
      guestOnly: true,
    },
    { path: "/profile", icon: User, label: "Profile", authRequired: true },
  ].filter((item) => {
    if (item.public) return true;
    if (item.guestOnly && !user) return true;

    if (item.roleRequired === "partner" && isPartner) return true;
    if (item.roleRequired === "user" && user && !isPartner) return true;

    if (item.authRequired && user) return true;
    return false;
  });

  return (
    <>
      {/* Sidebar: Ultra-Minimalist High-Fidelity (Desktop) */}
      <nav className="fixed left-0 top-0 bottom-0 w-24 border-r border-white/5 bg-black hidden md:flex flex-col items-center py-10 z-[100] transition-all duration-500 hover:w-28">
        {/* Futuristic Brand Logo */}
        <Link to="/" className="mb-14 group relative">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]">
            <span className="text-black text-3xl font-black italic tracking-tighter">
              F
            </span>
          </div>
          <div className="absolute -inset-4 bg-white/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>

        {/* Global Navigation Hub */}
        <div className="flex-1 flex flex-col gap-10 w-full px-4 overflow-y-auto no-scrollbar items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex flex-col items-center justify-center p-4 rounded-[2rem] transition-all duration-500 ${
                  isActive
                    ? "text-neon-pink bg-white/5 shadow-[0_0_25px_rgba(255,0,80,0.1)] scale-110"
                    : "text-zinc-600 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <item.icon className="w-7 h-7 stroke-[2.2] group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute left-full ml-6 px-4 py-2 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50">
                {item.label}
              </div>
              {/* Active Indicator Pulse */}
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "absolute -bottom-2 w-1.5 h-1.5 bg-neon-pink rounded-full shadow-[0_0_10px_#ff0050]"
                    : "hidden"
                }
              />
            </NavLink>
          ))}
        </div>

        {/* User Intelligence Core */}
        <div className="mt-auto px-4 w-full flex flex-col gap-8 items-center pb-4">
          {user && (
            <button
              onClick={logout}
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-zinc-600 hover:text-red-500 hover:bg-red-500/5 transition-all group"
              title="Terminate Session"
            >
              <LogOut
                size={24}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>
          )}

          <NavLink
            to={user ? "/profile" : "/login"}
            className={({ isActive }) =>
              `block w-14 h-14 rounded-full border-2 transition-all p-0.5 shadow-2xl overflow-hidden hover:scale-110 active:scale-95 ${
                isActive
                  ? "border-neon-cyan shadow-[0_0_20px_#00f2ea]"
                  : "border-white/10 hover:border-white/30"
              }`
            }
          >
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.fullName || "Guest"}`}
              alt="Identity"
              className="w-full h-full rounded-full bg-zinc-900 object-cover"
            />
          </NavLink>
        </div>
      </nav>

      {/* Dynamic Navigation (Mobile Bottom) */}
      <nav className="fixed bottom-6 left-6 right-6 h-20 glass-panel md:hidden flex items-center justify-around px-4 z-[100] rounded-[2.5rem] border-white/5 shadow-2xl">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-500 ${
                isActive
                  ? "text-neon-pink -translate-y-4 scale-125 bg-black border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                  : "text-zinc-500"
              }`
            }
          >
            <item.icon className="w-6 h-6 stroke-[2.5]" />
          </NavLink>
        ))}
        {user && (
          <button
            onClick={logout}
            className="flex items-center justify-center w-12 h-12 text-zinc-600 hover:text-red-500 transition-colors"
          >
            <LogOut size={24} />
          </button>
        )}
      </nav>
    </>
  );
};

export default Navbar;
