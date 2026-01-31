"use client";

import React, { useEffect, useRef, useState } from 'react';

type SectionUnderlineProps = {
  className?: string;
  variant?: "minimal" | "gradient" | "capsule";
  align?: "center"; // kept for future extension
  compact?: boolean; // Added compact prop
  animate?: "slide"; // Added animate prop (assuming 'slide' is the only value used)
};

const SectionUnderline: React.FC<SectionUnderlineProps> = ({
  className = "",
  variant = "gradient",
  align = "center",
  compact = false,
  animate,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const base =
    "mx-auto rounded-full transition-all duration-700 ease-out";
  
  // Adjust size based on compact prop
  const size = compact ? "h-1 w-16 sm:w-20 md:w-24" : "h-1.5 w-24 sm:w-28 md:w-32";
  
  const shadow = "shadow-[0_2px_8px_rgba(45,74,62,0.2)]";

  const stylesByVariant = {
    minimal: "bg-[#3d5a4f]",
    gradient: "bg-gradient-to-r from-[#3d5a4f] via-[#4e6f61] to-[#5a8068]",
    capsule: "bg-[#3d5a4f]",
  };

  const capsuleWrapper =
    "mx-auto flex items-center justify-center";
  
  // Adjust capsule size based on compact prop
  const capsuleInner = compact 
    ? "h-1.5 w-20 sm:w-24 md:w-28 rounded-full bg-gradient-to-r from-[#3d5a4f] via-[#4e6f61] to-[#5a8068]"
    : "h-2 w-28 sm:w-32 md:w-36 rounded-full bg-gradient-to-r from-[#3d5a4f] via-[#4e6f61] to-[#5a8068]";

  const animationClasses = animate === 'slide' && !visible ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0";

  return (
    <div
      ref={ref}
      className={`${
        align === "center" ? "flex justify-center" : ""
      } mt-6 ${className}`}
    >
      {variant === "capsule" ? (
        <div
          className={`${capsuleWrapper} ${animationClasses} transition-all duration-700`}
        >
          <div className={`${capsuleInner} ${shadow}`}></div>
        </div>
      ) : (
        <div
          className={`${base} ${size} ${stylesByVariant[variant]} ${shadow} ${animationClasses}`}
        />
      )}
    </div>
  );
};

export default SectionUnderline;