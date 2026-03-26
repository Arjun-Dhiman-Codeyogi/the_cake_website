import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import ScrollReveal from "@/components/ScrollReveal";
import WaveDivider from "@/components/WaveDivider";
import { MapPin, Clock, ExternalLink } from "lucide-react";

const gallery = [
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=70",
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=70",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&q=70",
  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=70",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=70",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=70",
];

/* ── 3D Carousel Gallery (like CakeCarousel) ── */
const GallerySlider = ({ images }: { images: string[] }) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev >= images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [paused, images.length]);

  // Show max 3 visible cards: prev, active, next
  const getVisible = () => {
    const len = images.length;
    const prev = (active - 1 + len) % len;
    const next = (active + 1) % len;
    return [prev, active, next];
  };

  const visible = getVisible();

  return (
    <div
      className="max-w-6xl mx-auto px-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 3D cards */}
      <div className="flex items-center justify-center w-full" style={{ perspective: "1400px" }}>
        <div className="flex items-center justify-center gap-4 md:gap-6 w-full max-w-5xl">
          {visible.map((idx) => {
            const isActive = idx === active;
            const pos = idx === visible[0] ? -1 : idx === visible[2] ? 1 : 0;

            return (
              <div
                key={idx}
                onClick={() => setActive(idx)}
                className="cursor-pointer transition-all duration-700 ease-out shrink-0"
                style={{
                  width: isActive ? "min(420px, 55vw)" : "min(260px, 30vw)",
                  height: isActive ? "min(320px, 45vw)" : "min(220px, 30vw)",
                  transform: isActive
                    ? "rotateY(0deg) scale(1.05)"
                    : `rotateY(${pos < 0 ? 12 : -12}deg) scale(0.85)`,
                  transformStyle: "preserve-3d",
                  zIndex: isActive ? 10 : 5,
                  opacity: isActive ? 1 : 0.55,
                  filter: isActive ? "none" : "brightness(0.8)",
                }}
              >
                <div
                  className="w-full h-full rounded-2xl overflow-hidden relative"
                  style={{
                    boxShadow: isActive
                      ? "0 25px 70px rgba(107,25,53,0.3), 0 10px 30px rgba(0,0,0,0.2)"
                      : "0 8px 24px rgba(0,0,0,0.1)",
                    transform: "translateZ(0)",
                  }}
                >
                  <img
                    src={images[idx]}
                    alt={`Café ambiance ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />

                  {/* Active glow border */}
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{ boxShadow: "inset 0 0 0 3px rgba(248,187,208,0.7)" }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2.5 mt-8">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-full transition-all duration-300 ${i === active
              ? "w-7 h-2.5 bg-burgundy"
              : "w-2.5 h-2.5 bg-burgundy/25 hover:bg-burgundy/50"
              }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const OurCafes = () => {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navbar />

      {/* Hero */}
      <section className="relative h-60 sm:h-80 md:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=70"
          alt="The Pink Rosette Café"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy/50 to-burgundy/70 flex flex-col items-center justify-center text-center px-6">
          <p className="font-lato text-xs tracking-[0.35em] uppercase text-blush mb-3 animate-fade-in-up">
            Where Every Bite Matters
          </p>
          <h1 className="font-playfair text-3xl sm:text-5xl md:text-6xl text-primary-foreground animate-fade-in-up">
            Our Cafés
          </h1>
          <div className="w-16 h-0.5 bg-blush mt-4 animate-fade-in-up" />
          <p className="font-lato text-sm text-primary-foreground/80 mt-4 animate-fade-in-up max-w-md">
            Step into a world of delicate flavours and beautiful surroundings.
          </p>
        </div>
      </section>

      {/* Café Card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center bg-card rounded-2xl overflow-hidden shadow-lg">
            <div className="relative overflow-hidden h-80 md:h-full">
              <img
                src="public/cafe.webp"
                alt="Fort Café Interior"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="p-5 sm:p-8 md:p-10">
              <p className="font-lato text-xs tracking-[0.3em] uppercase text-mauve mb-3">
                Flagship Location
              </p>
              <h2 className="font-playfair text-2xl sm:text-4xl text-foreground mb-4">
                Fort, Mumbai
              </h2>
              <div className="w-10 h-0.5 bg-mauve mb-6" />

              <p className="font-lato text-sm text-muted-foreground leading-relaxed mb-6">
                Our flagship Patisserie & Café is nestled in the heart of Fort,
                Mumbai — a beautifully curated space where you can savour our
                artisan cakes, pastries, and seasonal specials in a warm,
                intimate atmosphere.
              </p>

              <ul className="flex flex-col gap-3 mb-8">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-mauve mt-0.5 shrink-0" />
                  <span className="font-lato text-sm text-foreground">
                    Fort, Mumbai, Maharashtra 400001
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-mauve mt-0.5 shrink-0" />
                  <div className="font-lato text-sm text-foreground">
                    <p>Mon – Sat: 10:00 am – 8:00 pm</p>
                    <p>Sun: 11:00 am – 7:00 pm</p>
                  </div>
                </li>
              </ul>

              <a
                href="https://maps.google.com/?q=Fort+Mumbai"
                target="_blank"
                rel="noreferrer"
                className="btn-sweep inline-flex items-center gap-2 bg-burgundy text-primary-foreground font-lato text-xs tracking-widest uppercase px-8 py-3 rounded-full hover:bg-mauve transition-colors duration-300"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Wave: white → pink */}
      <WaveDivider height={50} color="#fce4ec" />

      {/* Ambiance Gallery */}
      <div style={{ background: "#fce4ec" }}>
        <section className="py-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal className="text-center mb-10">
              <p className="font-lato text-xs tracking-[0.3em] uppercase text-mauve mb-2">
                The Atmosphere
              </p>
              <h2 className="font-playfair text-2xl sm:text-4xl text-foreground">
                Ambiance Gallery
              </h2>
              <div className="w-12 h-0.5 bg-mauve mx-auto mt-4" />
            </ScrollReveal>
          </div>

          {/* Auto-sliding gallery with dots */}
          <GallerySlider images={gallery} />
        </section>
      </div>

      {/* Wave: pink → white */}
      <div style={{ background: "#fce4ec" }}>
        <WaveDivider height={50} color="white" />
      </div>

      <Footer />
    </div>
  );
};

export default OurCafes;
