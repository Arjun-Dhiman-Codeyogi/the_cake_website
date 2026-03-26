import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import WaveDivider from "@/components/WaveDivider";
import usePreloadImages from "@/hooks/usePreloadImages";

const cakes = [
  {
    name: "Classic Chocolate Truffle",
    price: "₹1,800",
    image: "/images/photo-1578985545062-69928b1d9587.webp",
    badge: "Bestseller",
  },
  {
    name: "Red Velvet Royale",
    price: "₹2,200",
    image: "/images/photo-1606890737304-57a1ca8a5b62.webp",
    badge: "Signature",
  },
  {
    name: "Vanilla Bean Dream",
    price: "₹1,600",
    image: "/images/photo-1535141192574-5d4897c12636.webp",
  },
  {
    name: "Hazelnut Praline",
    price: "₹2,500",
    image: "/images/photo-1481391319762-47dff72954d9.webp",
    badge: "New",
  },
  {
    name: "Tiramisu Tower",
    price: "₹2,800",
    image: "/images/photo-1551024601-bec78aea704b.webp",
  },
  {
    name: "Caramel Drizzle",
    price: "₹2,000",
    image: "/images/photo-1464349095431-e9a21285b5f3.webp",
  },
  {
    name: "Pistachio Bliss",
    price: "₹2,400",
    image: "/images/photo-1563729784474-d77dbb933a9e.webp",
    badge: "Popular",
  },
  {
    name: "Mango Passion",
    price: "₹1,900",
    image: "/images/photo-1565958011703-44f9829ba187.webp",
  },
  {
    name: "Dark Forest Gateau",
    price: "₹2,100",
    image: "/images/photo-1588195538326-c5b1e9f80a1b.webp",
  },
];

const SignatureCakes = () => {
  usePreloadImages(cakes.map((p) => p.image));
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navbar />

      {/* Hero */}
      <section className="relative h-52 mb-6 sm:h-80 md:h-[420px] overflow-hidden">
        <img
          src="/images/photo-1578985545062-69928b1d9587.webp"
          alt="Signature Cakes"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy/50 via-burgundy/40 to-burgundy/70 flex flex-col items-center justify-center text-center">
          <p className="font-lato text-xs tracking-[0.35em] uppercase text-blush mb-3 animate-fade-in-up">
            TPR Bespoke Collection
          </p>
          <h1 className="font-playfair text-3xl sm:text-5xl md:text-6xl text-primary-foreground animate-fade-in-up">
            Signature Cakes
          </h1>
          <div className="w-16 h-0.5 bg-blush mt-4 animate-fade-in-up" />
          <p className="font-lato text-sm text-primary-foreground/80 mt-4 animate-fade-in-up max-w-lg">
            Timeless flavours crafted to perfection — every slice tells a story of elegance and indulgence.
          </p>
        </div>
      </section>

      {/* Wave: white → blush */}
      <WaveDivider height={55} color="#fce4ec" />

      {/* Products */}
      <div style={{ background: "#fce4ec" }}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <ScrollReveal className="text-center mb-14">
            <p className="font-lato text-xs tracking-[0.3em] uppercase text-mauve mb-2">
              Handcrafted with Love
            </p>
            <h2 className="font-playfair text-2xl sm:text-4xl text-foreground">
              The Cake Collection
            </h2>
            <div className="w-12 h-0.5 bg-mauve mx-auto mt-4" />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {cakes.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 80}>
                <ProductCard {...p} slug="/customise" category="Signature Cakes" />
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>

      {/* Wave: blush → white */}
      <div style={{ background: "#fce4ec" }}>
        <WaveDivider height={55} color="white" />
      </div>

      {/* Quote section */}
      <WaveDivider height={50} color="#f8bbd0" />
      <section className="py-10 sm:py-16 lg:py-20 text-center px-4 sm:px-6" style={{ background: "#f8bbd0" }}>
        <ScrollReveal>
          <blockquote className="font-playfair italic text-lg sm:text-2xl md:text-3xl text-foreground leading-relaxed max-w-2xl mx-auto mb-6">
            "A cake is not just a dessert — it's a celebration waiting to happen."
          </blockquote>
          <div className="w-12 h-0.5 bg-mauve mx-auto mb-6" />
          <a
            href="/customise"
            className="btn-sweep inline-block bg-burgundy text-primary-foreground font-lato text-xs tracking-widest uppercase px-10 py-3.5 rounded-full hover:bg-mauve transition-colors duration-300"
          >
            Customise Your Cake
          </a>
        </ScrollReveal>
      </section>
      <div style={{ background: "#f8bbd0" }}>
        <WaveDivider height={50} color="white" />
      </div>

      <Footer />
    </div>
  );
};

export default SignatureCakes;
