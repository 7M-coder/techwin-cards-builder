import React, { useEffect, useRef } from "react";

// ─── Static decorative shapes ───────────────────────────────────────────────
const SHAPES = [
  {
    color: "#8B5CF6",
    w: 160,
    h: 62,
    rx: 31,
    style: {
      top: "6%",
      left: "-2%",
      transform: "rotate(-30deg)",
      animation: "drift-tl 9s ease-in-out infinite",
      opacity: 0.85,
      boxShadow: "0 0 40px 10px #8B5CF655",
    },
  },
  {
    color: "#06B6D4",
    w: 74,
    h: 74,
    rx: 20,
    style: {
      top: "3%",
      right: "8%",
      transform: "rotate(12deg)",
      animation: "bob-tr 6s ease-in-out infinite",
      opacity: 0.88,
      boxShadow: "0 0 32px 8px #06B6D455",
    },
  },
  {
    color: "#F97316",
    w: 90,
    h: 90,
    rx: 24,
    style: {
      top: "38%",
      right: "-1%",
      animation: "spin-float-r 11s ease-in-out infinite",
      opacity: 0.82,
      boxShadow: "0 0 36px 8px #F9731655",
    },
  },
  {
    color: "#EAB308",
    w: 80,
    h: 80,
    rx: 40,
    style: {
      bottom: "10%",
      right: "5%",
      animation: "pulse-br 7s ease-in-out infinite",
      opacity: 0.9,
      boxShadow: "0 0 44px 12px #EAB30855",
    },
  },
  {
    color: "#EF4444",
    w: 170,
    h: 64,
    rx: 32,
    style: {
      bottom: "7%",
      left: "-3%",
      transform: "rotate(25deg)",
      animation: "slide-bl 10s ease-in-out infinite",
      opacity: 0.85,
      boxShadow: "0 0 40px 10px #EF444455",
    },
  },
];

const COLORS = ["#8B5CF6", "#06B6D4", "#F97316", "#EAB308", "#EF4444"];

// ─── Star field ──────────────────────────────────────────────────────────────
const STAR_COUNT = 55;
const MIN_LIFE = 2200; // ms a star lives before fading out
const MAX_LIFE = 5000;
const FADE_DURATION = 900; // ms for fade in/out

function randomStar() {
  return {
    x: Math.random() * 100, // vw %
    y: Math.random() * 100, // vh %
    r: Math.random() * 2.2 + 1, // radius px
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    life: MIN_LIFE + Math.random() * (MAX_LIFE - MIN_LIFE),
    born: performance.now() + Math.random() * MAX_LIFE, // stagger birth
  };
}

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef(Array.from({ length: STAR_COUNT }, randomStar));
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current = starsRef.current.map((star) => {
        const age = now - star.born;

        // Not born yet
        if (age < 0) {
          return star;
        }

        // Dead — replace with a brand new star
        if (age > star.life) {
          return { ...randomStar(), born: now };
        }

        // Compute opacity: fade in, hold, fade out
        let alpha;
        if (age < FADE_DURATION) {
          alpha = age / FADE_DURATION;
        } else if (age > star.life - FADE_DURATION) {
          alpha = (star.life - age) / FADE_DURATION;
        } else {
          alpha = 1;
        }

        // Draw plain dot
        const x = (star.x / 100) * canvas.width;
        const y = (star.y / 100) * canvas.height;

        ctx.beginPath();
        ctx.arc(x, y, star.r, 0, Math.PI * 2);
        ctx.fillStyle =
          star.color +
          Math.round(alpha * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();

        return star;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Star canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Decorative shapes */}
      {SHAPES.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: s.w,
            height: s.h,
            borderRadius: s.rx,
            backgroundColor: s.color,
            ...s.style,
          }}
        />
      ))}

      <style>{`
        @keyframes drift-tl {
          0%   { transform: rotate(-30deg) translate(0px, 0px); }
          30%  { transform: rotate(-26deg) translate(18px, 14px); }
          60%  { transform: rotate(-32deg) translate(8px, 22px); }
          100% { transform: rotate(-30deg) translate(0px, 0px); }
        }
        @keyframes bob-tr {
          0%   { transform: rotate(12deg) translateY(0px); }
          40%  { transform: rotate(8deg)  translateY(-18px); }
          70%  { transform: rotate(14deg) translateY(-8px); }
          100% { transform: rotate(12deg) translateY(0px); }
        }
        @keyframes spin-float-r {
          0%   { transform: translate(0px, 0px)    rotate(0deg); }
          25%  { transform: translate(-14px, -20px) rotate(20deg); }
          50%  { transform: translate(-6px, -30px)  rotate(8deg); }
          75%  { transform: translate(-18px, -12px) rotate(22deg); }
          100% { transform: translate(0px, 0px)    rotate(0deg); }
        }
        @keyframes pulse-br {
          0%   { transform: scale(1)    translate(0px, 0px); }
          35%  { transform: scale(1.12) translate(-10px, -14px); }
          65%  { transform: scale(0.95) translate(-4px, -6px); }
          100% { transform: scale(1)    translate(0px, 0px); }
        }
        @keyframes slide-bl {
          0%   { transform: rotate(25deg) translate(0px,  0px); }
          30%  { transform: rotate(20deg) translate(22px, -12px); }
          65%  { transform: rotate(28deg) translate(10px, -6px); }
          100% { transform: rotate(25deg) translate(0px,  0px); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
