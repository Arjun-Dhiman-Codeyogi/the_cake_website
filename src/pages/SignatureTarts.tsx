import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import WaveDivider from "@/components/WaveDivider";

const tarts = [
  {
    name: "Classic Lemon Tart",
    price: "₹950",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&q=70",
    badge: "Bestseller",
  },
  {
    name: "Blueberry Cheesecake",
    price: "₹1,400",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=70",
    badge: "Signature",
  },
  {
    name: "Raspberry Tart",
    price: "₹1,100",
    image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=600&q=70",
  },
  {
    name: "New York Cheesecake",
    price: "₹1,600",
    image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=600&q=70",
    badge: "Popular",
  },
  {
    name: "Chocolate Ganache Tart",
    price: "₹1,200",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=70",
  },
  {
    name: "Mango Cheesecake",
    price: "₹1,300",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=70",
    badge: "New",
  },
  {
    name: "Passion Fruit Tart",
    price: "₹1,050",
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=70",
  },
  {
    name: "Baked Strawberry Cheesecake",
    price: "₹1,500",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=70",
  },
  {
    name: "Salted Caramel Tart",
    price: "₹1,150",
    image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&q=70",
    badge: "Chef's Pick",
  },
];

const SignatureTarts = () => {
  return (
    <div className="min-h-screen mt-16 bg-white">
      {/* <AnnouncementBar /> */}
      <Navbar />

      {/* Hero */}
      <section className="relative mb-6 h-52 sm:h-80 md:h-[420px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&q=70"
          alt="Signature Tarts & Cheesecakes"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mauve/50 via-mauve/35 to-burgundy/65 flex flex-col items-center justify-center text-center">
          <p className="font-lato text-xs tracking-[0.35em] uppercase text-blush mb-3 animate-fade-in-up">
            TPR Bespoke Collection
          </p>
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-6xl text-primary-foreground animate-fade-in-up">
            Tarts & Cheesecakes
          </h1>
          <div className="w-16 h-0.5 bg-blush mt-4 animate-fade-in-up" />
          <p className="font-lato text-sm text-primary-foreground/80 mt-4 animate-fade-in-up max-w-lg">
            Buttery crusts, velvety fillings — where artisanal baking meets pure indulgence.
          </p>
        </div>
      </section>

      {/* Wave: white → soft rose */}
      <WaveDivider height={55} color="#fce4ec" />

      {/* Products */}
      <div style={{ background: "#fce4ec" }}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <ScrollReveal className="text-center mb-8 sm:mb-14">
            <p className="font-lato text-xs tracking-[0.3em] uppercase text-mauve mb-2">
              Baked to Perfection
            </p>
            <h2 className="font-playfair text-2xl sm:text-4xl text-foreground">
              The Tart & Cheesecake Collection
            </h2>
            <div className="w-12 h-0.5 bg-mauve mx-auto mt-4" />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {tarts.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 80}>
                <ProductCard {...p} slug="/customise" category="Tarts & Cheesecakes" />
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>

      {/* Wave: rose → white */}
      <div style={{ background: "#fce4ec" }}>
        <WaveDivider height={55} color="white" />
      </div>

      {/* Banner section */}
      <WaveDivider height={50} color="#f8bbd0" />
      <section className="py-10 sm:py-16 lg:py-20 px-4 sm:px-6" style={{ background: "#f8bbd0" }}>
        <ScrollReveal className="max-w-3xl mx-auto text-center">
          <blockquote className="font-playfair italic text-lg sm:text-2xl md:text-3xl text-foreground leading-relaxed mb-6">
            "From zesty lemon to velvety cheesecake — every tart is a love letter to flavour."
          </blockquote>
          <div className="w-12 h-0.5 bg-mauve mx-auto mb-6" />
          <a
            href="/customise"
            className="btn-sweep inline-block bg-burgundy text-primary-foreground font-lato text-xs tracking-widest uppercase px-10 py-3.5 rounded-full hover:bg-mauve transition-colors duration-300"
          >
            Customise Your Order
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

export default SignatureTarts;
