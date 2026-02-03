import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <div className="flex h-dvh bg-black overflow-hidden relative font-black">
      {/* Sidebar - Desktop Only */}
      <Navbar />

      {/* Main Perspective Viewport */}
      <main className="flex-1 h-full overflow-hidden md:ml-24 pb-20 md:pb-0 transition-all duration-500">
        <div className="h-full w-full relative z-10">
          <Outlet />
        </div>
      </main>

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-pink/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-cyan/5 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>
    </div>
  );
};

export default RootLayout;
