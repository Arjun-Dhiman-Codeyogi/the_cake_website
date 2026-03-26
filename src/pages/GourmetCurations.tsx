import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import WaveDivider from "@/components/WaveDivider";

const categories = [
  {
    name: "Artisan Chocolates",
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&q=70",
    count: "12 Products",
  },
  {
    name: "Macarons",
    image: "https://images.unsplash.com/photo-1558326567-98ae2405596b?w=600&q=70",
    count: "8 Products",
  },
  {
    name: "Gift Hampers",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=70",
    count: "6 Products",
  },
  {
    name: "Tarts & Mignardises",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=70",
    count: "10 Products",
  },
];

const products = [
  {
    name: "Dark Chocolate Truffles",
    price: "₹850",
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&q=70",
    badge: "New",
  },
  {
    name: "Rose Macarons (Box of 6)",
    price: "₹750",
    image: "https://images.unsplash.com/photo-1558326567-98ae2405596b?w=600&q=70",
    badge: "Bestseller",
  },
  {
    name: "Luxury Gift Hamper",
    price: "₹2,500",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=70",
  },
  {
    name: "Strawberry Tart",
    price: "₹450",
    image: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=600&q=70",
  },
  {
    name: "Salted Caramel Bonbons",
    price: "₹650",
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=70",
  },
  {
    name: "Pistachio Éclair",
    price: "₹380",
    image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=600&q=70",
  },
];

const GourmetCurations = () => {
  return (
    <div className="min-h-screen mt-10 bg-white">
      <AnnouncementBar />
      <Navbar />

      {/* Hero */}
      <section className="relative h-52 sm:h-72 md:h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1484659619207-9165d119dafe?w=800&q=70"
          alt="Gourmet Curations"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mauve/50 to-burgundy/65 flex flex-col items-center justify-center text-center">
          <p className="font-lato text-xs tracking-[0.35em] uppercase text-blush mb-3 animate-fade-in-up">
            Indulge Your Senses
          </p>
          <h1 className="font-playfair text-3xl sm:text-5xl md:text-6xl text-primary-foreground animate-fade-in-up">
            Gourmet Curations
          </h1>
          <div className="w-16 h-0.5 bg-blush mt-4 animate-fade-in-up" />
          <p className="font-lato text-sm text-primary-foreground/80 mt-4 animate-fade-in-up max-w-md">
            Handpicked artisan confections crafted for those who appreciate life's finest flavours.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <ScrollReveal className="text-center mb-8 sm:mb-12">
          <h2 className="font-playfair text-2xl sm:text-4xl text-foreground">
            Browse Categories
          </h2>
          <div className="w-12 h-0.5 bg-mauve mx-auto mt-4" />
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.name} delay={i * 100}>
              <div className="group relative overflow-hidden rounded-xl cursor-pointer">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-32 sm:h-44 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-burgundy/50 group-hover:bg-burgundy/65 transition-colors flex flex-col items-center justify-center text-center p-4">
                  <h3 className="font-playfair text-lg text-primary-foreground">
                    {cat.name}
                  </h3>
                  <p className="font-lato text-xs text-blush mt-1">{cat.count}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Wave: white → pink */}
      <WaveDivider height={50} color="#fce4ec" />

      {/* Products */}
      <div style={{ background: "#fce4ec" }}>
        <section className="py-10 sm:py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <p className="font-lato text-xs tracking-[0.3em] uppercase text-mauve mb-2">
                Featured Picks
              </p>
              <h2 className="font-playfair text-2xl sm:text-4xl text-foreground">
                Artisan Selections
              </h2>
              <div className="w-12 h-0.5 bg-mauve mx-auto mt-4" />
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {products.map((p, i) => (
                <ScrollReveal key={p.name} delay={i * 90}>
                  <ProductCard {...p} category="Gourmet" />
                </ScrollReveal>
              ))}
            </div>
          </div>
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

export default GourmetCurations;
