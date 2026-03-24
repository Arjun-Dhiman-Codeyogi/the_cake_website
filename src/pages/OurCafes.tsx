import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import ScrollReveal from "@/components/ScrollReveal";
import { MapPin, Clock, ExternalLink } from "lucide-react";

const gallery = [
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80",
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=80",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&q=80",
  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
];

const OurCafes = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />

      {/* Hero */}
      <section className="relative h-80 md:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&q=85"
          alt="The Pink Rosette Café"
          className="w-full h-full object-cover ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy/50 to-burgundy/70 flex flex-col items-center justify-center text-center px-6">
          <p className="font-lato text-xs tracking-[0.35em] uppercase text-blush mb-3 animate-fade-in-up">
            Where Every Bite Matters
          </p>
          <h1 className="font-playfair text-5xl md:text-6xl text-primary-foreground animate-fade-in-up">
            Our Cafés
          </h1>
          <div className="w-16 h-0.5 bg-blush mt-4 animate-fade-in-up" />
          <p className="font-lato text-sm text-primary-foreground/80 mt-4 animate-fade-in-up max-w-md">
            Step into a world of delicate flavours and beautiful surroundings.
          </p>
        </div>
      </section>

      {/* Café Card */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-12 items-center bg-card rounded-2xl overflow-hidden shadow-lg">
            <div className="relative overflow-hidden h-80 md:h-full">
              <img
                src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=85"
                alt="Fort Café Interior"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="p-8 md:p-10">
              <p className="font-lato text-xs tracking-[0.3em] uppercase text-mauve mb-3">
                Flagship Location
              </p>
              <h2 className="font-playfair text-4xl text-foreground mb-4">
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

      {/* Ambiance Gallery */}
      <section className="py-16 bg-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-10">
            <p className="font-lato text-xs tracking-[0.3em] uppercase text-mauve mb-2">
              The Atmosphere
            </p>
            <h2 className="font-playfair text-4xl text-foreground">
              Ambiance Gallery
            </h2>
            <div className="w-12 h-0.5 bg-mauve mx-auto mt-4" />
          </ScrollReveal>
        </div>

        {/* Horizontal scroll gallery */}
        <div className="flex gap-4 px-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {gallery.map((src, i) => (
            <div
              key={i}
              className="shrink-0 w-72 md:w-96 h-60 rounded-xl overflow-hidden snap-start group"
            >
              <img
                src={src}
                alt={`Café ambiance ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurCafes;
