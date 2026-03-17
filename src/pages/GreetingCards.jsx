import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, Download } from "lucide-react";

const CATEGORIES = [
  {
    id: "eid-fitr",
    label: "عيد الفطر",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    id: "eid-adha",
    label: "عيد الأضحى",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    id: "ramadan",
    label: "رمضان",
    gradient: "from-violet-400 to-purple-600",
  },
];

const CARD_FIELDS = [
  {
    key: "name",
    label: "الاسم",
    placeholder: "اكتب اسمك هنا",
    x: 1080 / 2, // Centered horizontally
    y: 1080 * 0.79, // Y position from visual analysis (dark box)
    w: 430, // Width from visual analysis
    h: 80,
    fontSize: 40,
    fontWeight: "700",
    color: "#ffffff",
    align: "center",
    bgColor: "rgba(0,0,0,0.3)", // Little opacity bg as requested
  },
];

function useTypewriter(value) {
  const [shown, setShown] = useState(value);
  const prev = useRef(value);
  const timer = useRef(null);
  useEffect(() => {
    clearTimeout(timer.current);
    const p = prev.current;
    prev.current = value;
    if (value.startsWith(p) && value.length > p.length) {
      let i = p.length + 1;
      const tick = () => {
        setShown(value.slice(0, i));
        if (i < value.length) {
          i++;
          timer.current = setTimeout(tick, 40);
        }
      };
      tick();
    } else {
      setShown(value);
    }
    return () => clearTimeout(timer.current);
  }, [value]);
  return shown;
}

function CardTextField({ field, value, isActive, onActivate, scale }) {
  const shown = useTypewriter(value);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (!isActive) return;
    const id = setInterval(() => setBlink((b) => !b), 520);
    return () => clearInterval(id);
  }, [isActive]);

  const txt = value ? shown : field.placeholder;
  const col = value ? field.color : "rgba(255,255,255,0.6)";

  // Calculate position based on alignment
  // If centered, x is the center point, so we adjust left to be x - w/2
  const leftX = field.align === "center" ? field.x - field.w / 2 : field.x;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onActivate();
      }}
      style={{
        position: "absolute",
        left: leftX * scale,
        top: field.y * scale,
        width: field.w * scale,
        height: field.h * scale,
        display: "flex",
        alignItems: "center",
        justifyContent: field.align === "center" ? "center" : "flex-start",
        cursor: "text",
        backgroundColor: field.bgColor || "transparent",
        borderRadius: 12 * scale, // Rounded corners for input
        border: isActive ? "1px solid rgba(255,255,255,0.4)" : "none", // Subtle border only when active
        transition: "all 0.2s",
        zIndex: 10,
      }}>
      <span
        style={{
          fontSize: field.fontSize * scale,
          fontWeight: field.fontWeight,
          fontFamily: "inherit",
          color: col,
          whiteSpace: "nowrap",
          overflow: "hidden",
          lineHeight: 1,
          userSelect: "none",
          direction: "rtl",
          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          width: "100%",
          textAlign: field.align,
        }}>
        {txt}
        {isActive && (
          <span
            style={{
              display: "inline-block",
              width: Math.max(1.5, scale * 1.5),
              height: field.fontSize * scale * 0.85,
              background: "white",
              marginRight: 4,
              verticalAlign: "middle",
              opacity: blink ? 1 : 0,
            }}
          />
        )}
      </span>
    </div>
  );
}

const EidCardGenerator = ({ onBack }) => {
  const [values, setValues] = useState({ name: "" });
  const [activeKey, setActive] = useState(null);
  const [downloading, setDl] = useState(false);
  const cardRef = useRef(null);
  const inputRef = useRef(null);
  const [scale, setScale] = useState(1);
  const CW = 1080;
  const CH = 1080;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Responsive scale and mobile detection
  useEffect(() => {
    const resize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      // Reduce max width to match PersonalCard style (approx 460px on desktop)
      const maxW = Math.min(window.innerWidth * 0.9, 460);
      setScale(maxW / CW);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Keyboard input handling
  useEffect(() => {
    if (!activeKey) return;

    // Focus hidden input for mobile keyboard
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const onKey = (e) => {
      if (e.key === "Escape") {
        setActive(null);
        return;
      }
      if (e.key === "Enter") {
        setActive(null);
        return;
      }
      // Backspace and character input are now handled by the hidden input's onChange
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeKey]);

  // Click outside to deactivate
  useEffect(() => {
    const onOut = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setActive(null);
      }
    };
    document.addEventListener("mousedown", onOut);
    return () => document.removeEventListener("mousedown", onOut);
  }, []);

  const handleDownload = async () => {
    setDl(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = CW;
      canvas.height = CH;
      const ctx = canvas.getContext("2d");

      // Load PNG image
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.src = "/x_post2.png";
        img.crossOrigin = "anonymous";
        img.onload = () => {
          ctx.drawImage(img, 0, 0, CW, CH);
          resolve();
        };
        img.onerror = reject;
      });

      // Draw text
      const field = CARD_FIELDS[0];
      const val = values.name;
      if (val) {
        ctx.font = `bold ${field.fontSize}px sans-serif`;
        ctx.fillStyle = field.color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.shadowBlur = 6;
        ctx.fillText(val, CW / 2, field.y + field.h / 2); // Center text in field area
      }

      const link = document.createElement("a");
      link.download = "eid-card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Error generating image:", err);
    } finally {
      setDl(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        gap: "1.5rem",
        width: "100%",
        justifyContent: "center",
        direction: "ltr",
        minHeight: "75vh",
      }}>
      {/* Hidden input to trigger mobile keyboard */}
      <input
        ref={inputRef}
        type="text"
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          zIndex: -1,
          left: "-100vw",
        }}
        value={activeKey ? values[activeKey] : ""}
        onChange={(e) => {
          if (activeKey) {
            setValues((v) => ({ ...v, [activeKey]: e.target.value }));
          }
        }}
      />
      {/* Buttons Column */}
      <div
        style={{
          width: isMobile ? "100%" : "auto",
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          flexWrap: "wrap",
          alignItems: isMobile ? "center" : "flex-end",
          justifyContent: isMobile ? "center" : "flex-start",
          gap: "0.6rem",
          minWidth: isMobile ? "auto" : "9.5rem",
          order: isMobile ? 2 : 1,
        }}>
        <button
          onClick={onBack}
          style={{
            padding: isMobile ? "0.4rem 0.8rem" : "0.5rem 1rem",
            borderRadius: "9999px",
            backdropFilter: "blur(12px)",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "rgba(255,255,255,0.8)",
            fontSize: "clamp(0.7rem, 2vw, 0.82rem)",
            fontWeight: 600,
            fontFamily: "inherit",
            cursor: "pointer",
            width: isMobile ? "auto" : "9.5rem",
            flexGrow: isMobile ? 1 : 0,
            boxShadow:
              "-3px -3px 10px 0px #8B5CF622, 3px 3px 10px 0px #06B6D422",
            transition: "all 0.2s ease",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.4rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.16)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.transform = "scale(1)";
          }}>
          <ArrowRight size={14} />
          {"عودة"}
        </button>

        <button
          onClick={handleDownload}
          disabled={downloading}
          style={{
            padding: isMobile ? "0.4rem 0.8rem" : "0.5rem 1rem",
            borderRadius: "9999px",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            background: downloading
              ? "rgba(255,255,255,0.05)"
              : "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: downloading
              ? "rgba(255,255,255,0.35)"
              : "rgba(255,255,255,0.85)",
            fontSize: "clamp(0.7rem, 2vw, 0.82rem)",
            fontWeight: 600,
            fontFamily: "inherit",
            cursor: downloading ? "not-allowed" : "pointer",
            width: isMobile ? "100%" : "9.5rem",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.06), -4px -4px 12px 0px #8B5CF622, 4px 4px 12px 0px #06B6D422, 0 6px 24px rgba(0,0,0,0.25)",
            transition: "all 0.2s ease",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.4rem",
            flexGrow: isMobile ? 1 : 0,
          }}
          onMouseEnter={(e) => {
            if (!downloading) {
              e.currentTarget.style.background = "rgba(255,255,255,0.15)";
              e.currentTarget.style.transform = "scale(1.05)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = downloading
              ? "rgba(255,255,255,0.05)"
              : "rgba(255,255,255,0.08)";
            e.currentTarget.style.transform = "scale(1)";
          }}>
          <Download size={14} />
          {downloading ? "..." : "تحميل"}
        </button>
      </div>

      <div className="flex flex-col items-center gap-4 order-1 sm:order-2">
        {/* Card Container */}
        <div
          ref={cardRef}
          style={{
            position: "relative",
            width: CW * scale,
            height: CH * scale,
            borderRadius: 14 * scale,
            overflow: "hidden",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07)",
            backgroundColor: "#1a1a1a",
            order: isMobile ? 1 : 2,
            flexShrink: 0,
          }}>
          <img
            src="/x_post2.png"
            alt="Eid Card Template"
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              pointerEvents: "none",
              userSelect: "none",
            }}
          />

          {CARD_FIELDS.map((f) => (
            <CardTextField
              key={f.key}
              field={f}
              value={values[f.key]}
              isActive={activeKey === f.key}
              onActivate={() => setActive(f.key)}
              scale={scale}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const GreetingCards = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (selectedCategory === "eid-fitr") {
    return <EidCardGenerator onBack={() => setSelectedCategory(null)} />;
  }

  if (selectedCategory) {
    const category = CATEGORIES.find((c) => c.id === selectedCategory);
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-white px-4 text-center animate-in fade-in zoom-in duration-300">
        <div className="relative mb-8 p-12 max-w-lg w-full overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
            <h2
              className={`text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r ${category?.gradient} bg-clip-text text-transparent`}>
              {category?.label}
            </h2>
            <p className="text-xl sm:text-2xl text-white/70 mb-10 font-light">
              قريباً...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl sm:text-5xl font-bold mb-12 bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent text-center drop-shadow-sm">
        اختر المناسبة
      </h1>

      <div className="grid grid-cols-1 gap-2 w-full">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className="group relative flex flex-col items-center justify-center p-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:border-white/25 hover:shadow-2xl"
            style={{
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
            }}>
            {/* Hover gradient overlay */}
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${category.gradient}`}
            />

            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:animate-shine" />
            </div>

            <h3 className="relative z-10 text-lg lg:text-3xl sm:text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-500 drop-shadow-md">
              {category.label}
            </h3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GreetingCards;
