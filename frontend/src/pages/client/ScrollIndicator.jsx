import React from "react";

const steps = [
    "Intro",
    "Start",
    "Vurdering",
    "Visning",
    "Oppgjør",
    "Garanti",
    "Bileier",
    "Rådgivning",
    "Vurdering"
];

const ScrollIndicator = ({activeIndex}) => {
    return (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2">
            {steps.map((_, i) => (
                <div
                    key = {i}
                    className={`w-2 h-2 rounded-full transition-all ${
                        i === activeIndex ? "bg-[#047464] scale-125" : "bg-gray-300"
                    }`}
                />
            ))}
        </div>
    )
}

export default ScrollIndicator;