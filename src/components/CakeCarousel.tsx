import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FRAME_COUNT = 200;
const FRAME_INTERVAL = 50; // ms per frame for animation

const cakes = [
  {
    name: "Strawberry Cream Cake",
    folder: "/pink_cake",
    desc: "Delicate Strawberry Elegance",
    accent: "#f8bbd0",
    shadow: "rgba(248,187,208,0.5)",
  },
  {
    name: "White Cream Cake",
    folder: "/blue_cake",
    desc: "Smooth & Luxury Cake",
    accent: "#90caf9",
    shadow: "rgba(144,202,249,0.5)",
  },
  {
    name: "Chocolate Berry Cake",
    folder: "/brown_cake",
    desc: "Rich Chocolate Indulgence",
    accent: "#bcaaa4",
    shadow: "rgba(188,170,164,0.5)",
  },
];

// Generate frame paths
const pad = (n: number) => String(n).padStart(3, "0");
const framePath = (folder: string, i: number) =>
  `${folder}/ezgif-frame-${pad(i)}.jpg`;

const CakeCarousel = () => {
  const [active, setActive] = useState(0);
  const [frame, setFrame] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Animate frames
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFrame((f) => (f >= FRAME_COUNT ? 1 : f + 1));
    }, FRAME_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Preload first few frames of each cake
  useEffect(() => {
    cakes.forEach((cake) => {
      for (let i = 1; i <= 5; i++) {
        const img = new Image();
        img.src = framePath(cake.folder, i);
      }
    });
  }, []);

  const prev = () => setActive((a) => (a === 0 ? cakes.length - 1 : a - 1));
  const next = () => setActive((a) => (a === cakes.length - 1 ? 0 : a + 1));

  // Position: -1 = left, 0 = center, 1 = right
  const getPosition = (i: number): number => {
    if (i === active) return 0;
    const diff = ((i - active) + cakes.length) % cakes.length;
    return diff === 1 ? 1 : -1;
  };

  return (
    <section className="py-10 mt-10 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={prev}
            className="absolute left-0 sm:left-2 md:left-4 z-20 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-burgundy hover:bg-burgundy hover:text-white transition-all duration-300 hover:scale-110"
            aria-label="Previous cake"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Cards Container */}
          <div className="flex items-center justify-center w-full" style={{ perspective: "1400px" }}>
            <div className="relative flex items-center justify-center w-full max-w-5xl" style={{ minHeight: "min(540px, 78vw)" }}>
              {cakes.map((cake, i) => {
                const isActive = i === active;
                const pos = getPosition(i);

                // Active: dead center. Side cards offset by 60% of container width
                const translateX = pos === 0
                  ? "-50%"                       // true center
                  : pos === -1
                    ? "calc(-50% - min(200px, 32vw))"  // left
                    : "calc(-50% + min(200px, 32vw))"; // right

                return (
                  <div
                    key={cake.name}
                    onClick={() => setActive(i)}
                    className="absolute cursor-pointer transition-all duration-700 ease-out left-1/2"
                    style={{
                      width: isActive ? "min(368px, 57vw)" : "min(268px, 39vw)",
                      height: isActive ? "min(502px, 74vw)" : "min(392px, 57vw)",
                      transform: `translateX(${translateX}) rotateY(${pos * -12}deg) scale(${isActive ? 1.05 : 0.82})`,
                      transformStyle: "preserve-3d",
                      zIndex: isActive ? 10 : 5,
                      opacity: isActive ? 1 : 0.55,
                      filter: isActive ? "none" : "brightness(0.8)",
                    }}
                  >
                    <div
                      className="w-full h-full overflow-hidden relative"
                      style={{
                        borderRadius: "22px",
                        boxShadow: isActive
                          ? `0 25px 70px ${cake.shadow}, 0 10px 30px rgba(0,0,0,0.2)`
                          : "0 8px 24px rgba(0,0,0,0.1)",
                        transform: "translateZ(0)",
                      }}
                    >
                      {/* Animated cake image — only active card animates */}
                      <img
                        src={framePath(cake.folder, isActive ? frame : 1)}
                        alt={cake.name}
                        className="w-full h-full object-cover"
                      />

                      {/* Gradient overlay at bottom */}
                      <div
                        className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 pt-12 sm:pt-16"
                        style={{
                          background: `linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)`,
                        }}
                      >
                        <h3 className="font-playfair text-sm sm:text-xl text-white font-bold leading-tight">
                          {cake.name}
                        </h3>
                        <p className="font-lato text-[10px] sm:text-xs text-white/80 tracking-wider uppercase mt-0.5 sm:mt-1">
                          {cake.desc}
                        </p>
                      </div>

                      {/* Active indicator glow border */}
                      {isActive && (
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            borderRadius: "22px",
                            boxShadow: `inset 0 0 0 3px ${cake.accent}`,
                          }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={next}
            className="absolute right-0 sm:right-2 md:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-burgundy hover:bg-burgundy hover:text-white transition-all duration-300 hover:scale-110"
            aria-label="Next cake"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-5 sm:mt-8">
          {cakes.map((cake, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="h-2.5 rounded-full transition-all duration-300"
              style={{
                background: i === active ? cake.accent : "#d1c4e9",
                width: i === active ? "28px" : "10px",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CakeCarousel;
