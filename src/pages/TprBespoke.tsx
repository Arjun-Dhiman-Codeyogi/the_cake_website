import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import WaveDivider from "@/components/WaveDivider";

const tabs = ["All", "Birthday", "Wedding", "Celebration", "Custom"];

const allProducts = [
  {
    name: "Signature Chocolate Cake",
    price: "From ₹1,500",
    image: "/images/photo-1606890737304-57a1ca8a5b62.jpg",
    badge: "Bestseller",
    category: "Birthday",
  },
  {
    name: "Victorian Vanilla",
    price: "From ₹1,800",
    image: "/images/photo-1535141192574-5d4897c12636.jpg",
    category: "Wedding",
  },
  {
    name: "Caramel Luxe",
    price: "From ₹2,200",
    image: "/images/photo-1481391319762-47dff72954d9.jpg",
    badge: "New",
    category: "Celebration",
  },
  {
    name: "Chocolate Hazelnut",
    price: "From ₹1,900",
    image: "/images/photo-1578985545062-69928b1d9587.jpg",
    category: "Birthday",
  },
  {
    name: "Fondant Fantasy",
    price: "From ₹3,500",
    image: "/images/photo-1551024601-bec78aea704b.jpg",
    badge: "Custom",
    category: "Custom",
  },
  {
    name: "Tiered Elegance",
    price: "From ₹8,000",
    image: "/images/photo-1464349095431-e9a21285b5f3.jpg",
    category: "Wedding",
  },
  {
    name: "Birthday Bonanza",
    price: "From ₹1,600",
    image: "/images/photo-1562440499-64c9a111f713.jpg",
    category: "Birthday",
  },
  {
    name: "Anniversary Delight",
    price: "From ₹2,500",
    image: "/images/photo-1588195538326-c5b1e9f80a1b.jpg",
    category: "Celebration",
  },
];

const TprBespoke = () => {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === active);

  return (
    <div className="min-h-screen mt-10 bg-white">
      <AnnouncementBar />
      <Navbar />

      {/* Hero */}
      <section className="relative mb-8 h-60 sm:h-80 md:h-96 overflow-hidden">
        <img
          src="/images/photo-1558636508-e0db3814bd1d.jpg"
          alt="TPR Bespoke"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy/60 to-burgundy/75 flex flex-col items-center justify-center text-center">
          <p className="font-lato text-xs tracking-[0.35em] uppercase text-blush mb-3 animate-fade-in-up">
            Custom Celebration Cakes
          </p>
          <h1 className="font-playfair text-3xl sm:text-5xl md:text-6xl text-primary-foreground animate-fade-in-up">
            TPR Bespoke
          </h1>
          <div className="w-16 h-0.5 bg-blush mt-4 animate-fade-in-up" />
          <p className="font-lato text-sm text-primary-foreground/80 mt-4 animate-fade-in-up max-w-md">
            Celebrate every milestone with a cake designed to tell your story.
          </p>
        </div>
      </section>

      {/* Wave: white → pink */}
      <WaveDivider height={50} color="#fce4ec" />

      {/* Tabs */}
      <div style={{ background: "#fce4ec" }}>
        <section className="py-8 sm:py-12 px-4 sm:px-6 max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={`font-lato text-xs tracking-widest uppercase px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border transition-all duration-300 ${active === tab
                    ? "bg-burgundy text-primary-foreground border-burgundy"
                    : "border-muted text-muted-foreground hover:border-mauve hover:text-mauve"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7">
            {filtered.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 80}>
                <ProductCard {...p} slug="/customise" category="TPR Bespoke" />
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>

      {/* Wave: pink → white */}
      <div style={{ background: "#fce4ec" }}>
        <WaveDivider height={50} color="white" />
      </div>

      {/* Bottom CTA */}
      <section className="bg-burgundy py-10 mt-10 sm:py-16 text-center px-4 sm:px-6">
        <ScrollReveal>
          <h3 className="font-playfair text-2xl sm:text-3xl text-primary-foreground mb-3">
            Can't find what you're looking for?
          </h3>
          <p className="font-lato text-sm text-primary-foreground/80 mb-6 max-w-md mx-auto">
            Let us craft something uniquely yours. Share your vision and we'll
            bring it to life.
          </p>
          <a
            href="/customise"
            className="btn-sweep inline-block border border-primary-foreground text-primary-foreground font-lato text-xs tracking-widest uppercase px-10 py-3.5 rounded-full hover:bg-primary-foreground hover:text-burgundy transition-colors duration-300"
          >
            Start Customising
          </a>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default TprBespoke;
