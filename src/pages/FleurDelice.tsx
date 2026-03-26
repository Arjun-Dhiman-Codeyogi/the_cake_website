import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import WaveDivider from "@/components/WaveDivider";

const products = [
  {
    name: "Flowers in Bloom",
    price: "₹6,500",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&q=70",
    badge: "Signature",
  },
  {
    name: "Enchanted Garden",
    price: "₹6,000",
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=70",
    badge: "New",
  },
  {
    name: "Blush Cascade",
    price: "₹5,800",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=70",
  },
  {
    name: "Rosette Dream",
    price: "₹5,500",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=70",
    badge: "Bestseller",
  },
  {
    name: "Petal Whisper",
    price: "₹5,200",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=70",
  },
  {
    name: "Garden Soirée",
    price: "₹6,200",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=70",
  },
  {
    name: "Cherry Blossom",
    price: "₹4,800",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=70",
  },
  {
    name: "Lavender Haze",
    price: "₹5,000",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=70",
  },
  {
    name: "Florentine Delight",
    price: "₹5,600",
    image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&q=70",
  },
];

const FleurDelice = () => {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navbar />

      {/* Hero Banner */}
      <section className="relative mt-8 mb-5 h-60 sm:h-80 md:h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=70"
          alt="Fleur Delice Collection"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mauve/60 to-burgundy/70 flex flex-col items-center justify-center text-center">
          <p className="font-lato text-xs tracking-[0.35em] uppercase text-blush mb-3 animate-fade-in-up">
            Our Floral Creations
          </p>
          <h1 className="font-playfair text-3xl sm:text-5xl md:text-6xl text-primary-foreground animate-fade-in-up">
            Fleur Delice
          </h1>
          <div className="w-16 h-0.5 bg-blush mt-4 animate-fade-in-up" />
          <p className="font-lato text-sm text-primary-foreground/80 mt-4 animate-fade-in-up max-w-md">
            Where florals meet flavour — each cake a masterpiece of petals and cream.
          </p>
        </div>
      </section>

      {/* Wave: white → pink */}
      <WaveDivider height={50} color="#fce4ec" />

      {/* Products Grid */}
      <div style={{ background: "#fce4ec" }}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <ScrollReveal className="text-center mb-12">
            <p className="font-lato text-xs tracking-[0.3em] uppercase text-mauve mb-2">
              Handcrafted with Florals
            </p>
            <h2 className="font-playfair text-2xl sm:text-4xl text-foreground">
              The Collection
            </h2>
            <div className="w-12 h-0.5 bg-mauve mx-auto mt-4" />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {products.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 80}>
                <ProductCard {...p} category="Fleur Delice" />
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>

      {/* Wave: pink → white */}
      <div style={{ background: "#fce4ec" }}>
        <WaveDivider height={50} color="white" />
      </div>

      {/* CTA Banner */}
      <WaveDivider height={45} color="#f8bbd0" />
      <section className="py-10 sm:py-16 text-center px-4 sm:px-6" style={{ background: "#f8bbd0" }}>
        <ScrollReveal>
          <div className="animate-petal text-3xl sm:text-4xl mb-4">🌸</div>
          <h3 className="font-playfair text-2xl sm:text-3xl text-foreground mb-3">
            Want something truly bespoke?
          </h3>
          <p className="font-lato text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Our Customise With Us service lets you design every petal and flavour.
          </p>
          <a
            href="/customise"
            className="btn-sweep inline-block bg-burgundy text-primary-foreground font-lato text-xs tracking-widest uppercase px-10 py-3.5 rounded-full hover:bg-mauve transition-colors duration-300"
          >
            Customise Your Cake
          </a>
        </ScrollReveal>
      </section>
      <div style={{ background: "#f8bbd0" }}>
        <WaveDivider height={45} color="white" />
      </div>

      <Footer />
    </div>
  );
};

export default FleurDelice;
