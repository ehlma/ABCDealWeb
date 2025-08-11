import React from "react";

const ScrollIndicator = ({ activeIndex, sectionRefs, steps }) => {
  const handleClick = (index) => {
    const section = sectionRefs.current[index];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-row items-center justify-center gap-4">
      {steps.map((label, i) => (
        <button
          key={i}
          onClick={() => handleClick(i)}
          className="group relative flex flex-col items-center bg-transparent focus:outline-none"
          style={{ height: "2rem" }} >


          {/* Dot */}
          <div
            className={`w-2 h-2 rounded-full transition-all ${
              i === activeIndex ? "bg-[#047464] scale-150" : "bg-[#fffefc]"
            }`}
          />
          {/* Label (vises bare på hover) */}
            <span
              className="absolute top-8 text-xs text-[#047464] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
            >
              {label}
            </span>
        </button>
      ))}
    </div>
  );
};

export default ScrollIndicator;
