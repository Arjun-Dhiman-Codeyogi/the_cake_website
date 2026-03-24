import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";

const products = [
  {
    name: "Flowers in Bloom",
    price: "₹6,500",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&q=80",
    badge: "Signature",
  },
  {
    name: "Enchanted Garden",
    price: "₹6,000",
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80",
    badge: "New",
  },
  {
    name: "Blush Cascade",
    price: "₹5,800",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=80",
  },
  {
    name: "Rosette Dream",
    price: "₹5,500",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80",
    badge: "Bestseller",
  },
  {
    name: "Petal Whisper",
    price: "₹5,200",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80",
  },
  {
    name: "Garden Soirée",
    price: "₹6,200",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80",
  },
  {
    name: "Cherry Blossom",
    price: "₹4,800",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80",
  },
  {
    name: "Lavender Haze",
    price: "₹5,000",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80",
  },
  {
    name: "Florentine Delight",
    price: "₹5,600",
    image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&q=80",
  },
];

const FleurDelice = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-80 md:h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1600&q=85"
          alt="Fleur Delice Collection"
          className="w-full h-full object-cover ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mauve/60 to-burgundy/70 flex flex-col items-center justify-center text-center">
          <p className="font-lato text-xs tracking-[0.35em] uppercase text-blush mb-3 animate-fade-in-up">
            Our Floral Creations
          </p>
          <h1 className="font-playfair text-5xl md:text-6xl text-primary-foreground animate-fade-in-up">
            Fleur Delice
          </h1>
          <div className="w-16 h-0.5 bg-blush mt-4 animate-fade-in-up" />
          <p className="font-lato text-sm text-primary-foreground/80 mt-4 animate-fade-in-up max-w-md">
            Where florals meet flavour — each cake a masterpiece of petals and cream.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <ScrollReveal className="text-center mb-12">
          <p className="font-lato text-xs tracking-[0.3em] uppercase text-mauve mb-2">
            Handcrafted with Florals
          </p>
          <h2 className="font-playfair text-4xl text-foreground">
            The Collection
          </h2>
          <div className="w-12 h-0.5 bg-mauve mx-auto mt-4" />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <ScrollReveal key={p.name} delay={i * 80}>
              <ProductCard {...p} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-secondary py-16 text-center px-6">
        <ScrollReveal>
          <div className="animate-petal text-4xl mb-4">🌸</div>
          <h3 className="font-playfair text-3xl text-foreground mb-3">
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

      <Footer />
    </div>
  );
};

export default FleurDelice;
