import React from "react";

const GreetingCards = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-white px-4 text-center">
      <h1 className="text-3xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent">
        بطائق التهنئة
      </h1>
      <p className="text-base sm:text-xl text-white/50 max-w-md leading-relaxed">
        قريباً... استكشف مجموعتنا من بطاقات التهنئة ثلاثية الأبعاد.
      </p>
    </div>
  );
};

export default GreetingCards;
