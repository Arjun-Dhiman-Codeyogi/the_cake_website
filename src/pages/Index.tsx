import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import WaveDivider from "@/components/WaveDivider";
import CakeCarousel from "@/components/CakeCarousel";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=70",
    headline: "Crafted with Love.",
    sub: "Since 2018.",
  },
  {
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=70",
    headline: "Artisan Patisserie.",
    sub: "Mumbai's Finest.",
  },
  {
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=70",
    headline: "Fleur Delice.",
    sub: "Flowers in Every Bite.",
  },
  {
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800&q=70",
    headline: "Bespoke Creations.",
    sub: "Made Just for You.",
  },
];

const signatures = [
  {
    name: "Flowers in Bloom",
    price: "₹6,500",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&q=70",
    badge: "Signature",
  },
  {
    name: "Enchanted Garden",
    price: "₹6,000",
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&q=70",
  },
  {
    name: "Rosette Dream",
    price: "₹5,500",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=70",
    badge: "Bestseller",
  },
  {
    name: "Blush Cascade",
    price: "₹5,800",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&q=70",
  },
  {
    name: "Caramel Luxe",
    price: "₹4,200",
    image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=70",
  },
  {
    name: "Choco Velvet",
    price: "₹3,800",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&q=70",
  },
];

const instaImages = [
  "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=400&q=80",
  "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=400&q=80",
  "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&q=80",
  "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=400&q=80",
  "public/5.webp",
  "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&q=80",
];

const Index = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % heroSlides.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              src={slide.image}
              alt={slide.headline}
              className="w-full h-full object-cover ken-burns"
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-burgundy/50 via-burgundy/30 to-burgundy/60" />
          </div>
        ))}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="font-lato  bolder text-sm tracking-[0.35em] uppercase text-blush mb-4 animate-fade-in-up">
            Mumbai's Luxury Patisserie
          </p>
          <h1 className="font-playfair text-3xl sm:text-5xl md:text-7xl text-primary-foreground mb-3 animate-fade-in-up">
            {heroSlides[current].headline}
          </h1>
          <h2 className="font-playfair italic text-xl sm:text-3xl md:text-5xl text-blush mb-8 animate-fade-in-up">
            {heroSlides[current].sub}
          </h2>
          <Link
            to="/fleur-delice"
            className="btn-sweep inline-block border-2 border-primary-foreground text-primary-foreground font-lato text-xs tracking-widest uppercase px-10 py-3.5 rounded-full hover:bg-primary-foreground hover:text-burgundy transition-colors duration-300 animate-fade-in-up"
          >
            Explore Our Collections
          </Link>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "bg-primary-foreground w-6" : "bg-primary-foreground/40"
                }`}
            />
          ))}
        </div>

        {/* Scroll cue */}
        {/* <div className="absolute bottom-8 right-8 flex flex-col items-center gap-1 text-primary-foreground/60">
          <span className="font-lato text-[10px] tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div> */}
      </section>

      {/* ── 3D CAKE CAROUSEL (white bg, above TPR Signatures) ── */}
      <ScrollReveal>
        <CakeCarousel />
      </ScrollReveal>

      {/* Wave: white → pink */}
      <WaveDivider height={50} color="#fce4ec" />

      {/* ── TPR SIGNATURES ── */}
      <div style={{ background: "#fce4ec" }}>
        <section className="py-10 sm:py-16 lg:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-8 sm:mb-12">
            <p className="font-lato text-xs tracking-[0.3em] uppercase text-mauve mb-3">
              Our Creations
            </p>
            <h2 className="font-playfair text-2xl sm:text-4xl md:text-5xl text-foreground">
              TPR Signatures
            </h2>
            <div className="w-16 h-0.5 bg-mauve mx-auto mt-4" />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {signatures.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 100}>
                <ProductCard {...p} slug="/fleur-delice" category="TPR Signatures" />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-12">
            <Link
              to="/fleur-delice"
              className="btn-sweep inline-block bg-burgundy text-primary-foreground font-lato text-xs tracking-widest uppercase px-10 py-3.5 rounded-full hover:bg-mauve transition-colors duration-300"
            >
              View All Collections
            </Link>
          </ScrollReveal>
        </section>
      </div>

      {/* Wave: pink → white */}
      <div style={{ background: "#fce4ec" }}>
        <WaveDivider height={40} color="white" />
      </div>

      {/* ── FEATURED COLLECTIONS BANNER ── */}
      <section className="grid mt-12 mb-8 md:grid-cols-2 h-[320px] sm:h-[400px] lg:h-[480px] overflow-hidden">
        <ScrollReveal className="relative overflow-hidden group cursor-pointer">
          <Link to="/fleur-delice" className="block h-full">
            <img
              src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=70"
              alt="Fleur Delice"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-mauve/50 group-hover:bg-mauve/60 transition-colors duration-500 flex flex-col items-center justify-center text-center p-8">
              <p className="font-lato text-xs tracking-[0.3em] uppercase text-blush mb-3">
                Our Floral Creations
              </p>
              <h3 className="font-playfair text-2xl sm:text-4xl text-primary-foreground mb-4">
                Fleur Delice
              </h3>
              <span className="border border-primary-foreground text-primary-foreground font-lato text-xs tracking-widest uppercase px-8 py-2.5 rounded-full hover:bg-primary-foreground hover:text-burgundy transition-colors">
                Explore
              </span>
            </div>
          </Link>
        </ScrollReveal>

        <ScrollReveal className="relative overflow-hidden group cursor-pointer" delay={150}>
          <Link to="/tpr-bespoke" className="block h-full">
            <img
              src="https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&q=70"
              alt="TPR Bespoke"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-burgundy/55 group-hover:bg-burgundy/65 transition-colors duration-500 flex flex-col items-center justify-center text-center p-8">
              <p className="font-lato text-xs tracking-[0.3em] uppercase text-blush mb-3">
                Custom Celebration Cakes
              </p>
              <h3 className="font-playfair text-2xl sm:text-4xl text-primary-foreground mb-4">
                TPR Bespoke
              </h3>
              <span className="border border-primary-foreground text-primary-foreground font-lato text-xs tracking-widest uppercase px-8 py-2.5 rounded-full hover:bg-primary-foreground hover:text-burgundy transition-colors">
                Explore
              </span>
            </div>
          </Link>
        </ScrollReveal>
      </section>

      {/* Wave: white → soft pink */}
      <WaveDivider height={55} color="#f8bbd0" />

      {/* ── ABOUT QUOTE ── */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6" style={{ background: "#f8bbd0" }}>
        <ScrollReveal className="max-w-3xl mx-auto text-center">
          <div className="animate-petal text-3xl sm:text-5xl mb-6">🌸</div>
          <blockquote className="font-playfair italic text-xl sm:text-3xl md:text-4xl text-foreground leading-relaxed mb-6">
            "Every cake tells a story. Every Rosette holds a memory."
          </blockquote>
          <p className="font-lato text-sm tracking-widest uppercase text-mauve">
            — The Pink Rosette, Est. 2018
          </p>
          <div className="w-12 h-0.5 bg-mauve mx-auto mt-6" />
          <p className="font-lato text-sm text-muted-foreground mt-6 max-w-xl mx-auto leading-relaxed">
            Born in the heart of Fort, Mumbai, The Pink Rosette is a haven for
            those who believe in the art of patisserie. Our cakes are more than
            dessert — they are edible poetry.
          </p>
          <Link
            to="/our-cafes"
            className="btn-sweep inline-block mt-8 border border-burgundy text-burgundy font-lato text-xs tracking-widest uppercase px-8 py-3 rounded-full hover:bg-burgundy hover:text-primary-foreground transition-colors duration-300"
          >
            Visit Our Café
          </Link>
        </ScrollReveal>
      </section>

      {/* Wave: pink → white */}
      <div style={{ background: "#f8bbd0" }}>
        <WaveDivider height={55} color="white" />
      </div>

      {/* Wave: white → light pink for instagram */}
      <WaveDivider height={45} color="#fce4ec" />

      {/* ── INSTAGRAM FEED ── */}
      <div style={{ background: "#fce4ec" }}>
        <section className="py-10 sm:py-16 lg:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <p className="font-lato text-xs tracking-[0.3em] uppercase text-mauve mb-2">
              Follow Along
            </p>
            <h2 className="font-playfair text-3xl text-foreground">
              @thepinkrosette
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2">
            {instaImages.map((src, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <a
                  href="https://www.instagram.com/thepinkrosette"
                  target="_blank"
                  rel="noreferrer"
                  className="block relative overflow-hidden aspect-square group rounded-lg"
                >
                  <img
                    src={src}
                    alt="Instagram"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-burgundy/0 group-hover:bg-burgundy/40 transition-all duration-400 flex items-center justify-center">
                    <span className="text-primary-foreground font-lato text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      ♡ View
                    </span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-8">
            <a
              href="https://www.instagram.com/thepinkrosette"
              target="_blank"
              rel="noreferrer"
              className="btn-sweep inline-block border border-mauve text-mauve font-lato text-xs tracking-widest uppercase px-8 py-3 rounded-full hover:bg-mauve hover:text-accent-foreground transition-colors duration-300"
            >
              Follow on Instagram
            </a>
          </ScrollReveal>
        </section>
      </div>

      {/* Wave: pink → white before footer */}
      <div style={{ background: "#fce4ec" }}>
        <WaveDivider height={45} color="white" />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
