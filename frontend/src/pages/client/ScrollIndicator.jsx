import React from "react";

const ScrollIndicator = ({ activeIndex, sectionRefs, steps }) => {
  const handleClick = (index) => {
    const section = sectionRefs.current[index];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-4">
      {steps.map((label, i) => (
        <button
          key={i}
          onClick={() => handleClick(i)}
          className="relative group flex items-center focus:outline-none bg-transparent border-none p-0"
          >
          {/* Hover label for inactive */}
          {i !== activeIndex && (
            <span
                className={`mr-2 text-sm text-[#047464] transition-all ${
                    i === activeIndex ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
                >
                    {label}
            </span>
          )}

          {/* Label for active */}
          {i === activeIndex && (
            <span className="mr-2 text-sm text-[#047464]">{label}</span>
          )}

          {/* Dot */}
          <div
            className={`w-2 h-2 rounded-full transition-all ${
              i === activeIndex ? "bg-[#047464] scale-150" : "bg-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default ScrollIndicator;
