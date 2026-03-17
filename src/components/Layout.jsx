import React from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import AnimatedBackground from "./AnimatedBackground";

const Layout = () => {
  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden bg-black text-white"
      dir="rtl">
      {/* Animated 3D Background */}
      <AnimatedBackground />

      {/* Glass Overlay - REMOVED */}
      {/* <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl z-0 pointer-events-none"></div> */}

      {/* Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation */}
        {/* <BottomNav /> */}

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-4 sm:py-8 mb-24 sm:mb-20">
          <div className="w-full h-full flex items-center justify-center">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="fixed bottom-0 sm:bottom-2 left-0 w-full py-2 sm:py-4 text-center text-white/30 text-[10px] sm:text-xs pointer-events-none">
          <p>@حماد & القنيوي</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
