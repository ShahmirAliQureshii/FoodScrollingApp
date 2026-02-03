import React from "react";
import { NavLink } from "react-router-dom";
import { Home, LogIn, UserPlus } from "lucide-react";

const TopNavigation = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-[70px] z-50 transition-all duration-300 glass border-b-0 shadow-lg">
      <div className="h-full max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-black tracking-tighter text-(--text-primary) flex items-center gap-2 group"
        >
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-xl">
            <span className="text-white text-xl">F</span>
          </div>
          <span>
            FOOD<span className="text-(--primary)">REELS</span>
          </span>
        </NavLink>

        {/* Navigation Icons */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `p-3 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-(--primary) text-white shadow-lg shadow-purple-500/30"
                  : "text-(--text-primary) hover:bg-(--border-subtle)"
              }`
            }
          >
            <Home size={22} strokeWidth={2.5} />
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `p-3 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-(--primary) text-white shadow-lg shadow-purple-500/30"
                  : "text-(--text-primary) hover:bg-(--border-subtle)"
              }`
            }
          >
            <LogIn size={22} strokeWidth={2.5} />
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `p-3 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-(--primary) text-white shadow-lg shadow-purple-500/30"
                  : "text-(--text-primary) hover:bg-(--border-subtle)"
              }`
            }
          >
            <UserPlus size={22} strokeWidth={2.5} />
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default TopNavigation;
