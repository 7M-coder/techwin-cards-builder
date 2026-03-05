import React, { useRef, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { label: "الرئيسية", path: "/", color: "#8B5CF6" },
  { label: "بطائق التهنئة", path: "/greeting-cards", color: "#06B6D4" },
  { label: "البطاقة الشخصية", path: "/personal-card", color: "#F97316" },
];

const BottomNav = () => {
  const location = useLocation();
  const navRef = useRef(null);
  const itemRefs = useRef([]);
  const [pill, setPill] = useState({ left: 0, width: 0, color: "#8B5CF6" });

  useEffect(() => {
    const activeIndex = navItems.findIndex(
      (item) => item.path === location.pathname,
    );
    if (activeIndex === -1) return;
    const el = itemRefs.current[activeIndex];
    const nav = navRef.current;
    if (!el || !nav) return;

    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    setPill({
      left: elRect.left - navRect.left,
      width: elRect.width,
      color: navItems[activeIndex].color,
    });
  }, [location.pathname]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <nav
        ref={navRef}
        className="relative flex items-center gap-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full px-4 py-2 shadow-lg shadow-black/20"
        style={{
          // Corner glow via box-shadow using theme colors
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.15),
            -6px -6px 18px 0px #8B5CF644,
            6px  6px  18px 0px #F9731644,
            0 8px 32px 0px rgba(0,0,0,0.3)
          `,
        }}>
        {/* Animated sliding pill */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: "6px",
            left: pill.left,
            width: pill.width,
            height: "calc(100% - 12px)",
            borderRadius: "9999px",
            backgroundColor: pill.color + "33",
            boxShadow: `0 0 14px 3px ${pill.color}55`,
            border: `1px solid ${pill.color}66`,
            transition:
              "left 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1), background-color 0.35s ease, box-shadow 0.35s ease",
            pointerEvents: "none",
          }}
        />

        {navItems.map((item, i) => (
          <NavLink
            key={item.path}
            to={item.path}
            ref={(el) => (itemRefs.current[i] = el)}
            className="relative px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-300"
            style={({ isActive }) => ({
              color: isActive ? item.color : "rgba(255,255,255,0.6)",
              textShadow: isActive ? `0 0 12px ${item.color}99` : "none",
            })}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default BottomNav;
