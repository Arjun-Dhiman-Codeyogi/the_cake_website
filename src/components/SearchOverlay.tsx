import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Search, X, TrendingUp, Star, Clock, ArrowRight,
  Cake, Coffee, Gift, ChefHat, Sparkles, MapPin, Phone,
} from "lucide-react";

interface Product {
  name: string;
  price: string;
  image: string;
  badge?: string;
  category: string;
  slug: string;
}

const allProducts: Product[] = [
  // Fleur Delice
  { name: "Flowers in Bloom", price: "\u20B96,500", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&q=80", badge: "Signature", category: "Fleur Delice", slug: "/fleur-delice" },
  { name: "Enchanted Garden", price: "\u20B96,000", image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&q=80", badge: "New", category: "Fleur Delice", slug: "/fleur-delice" },
  { name: "Rosette Dream", price: "\u20B95,500", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80", badge: "Bestseller", category: "Fleur Delice", slug: "/fleur-delice" },
  { name: "Blush Cascade", price: "\u20B95,800", image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&q=80", category: "Fleur Delice", slug: "/fleur-delice" },
  { name: "Petal Whisper", price: "\u20B95,200", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80", category: "Fleur Delice", slug: "/fleur-delice" },
  { name: "Garden Soir\u00E9e", price: "\u20B96,200", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=80", category: "Fleur Delice", slug: "/fleur-delice" },
  { name: "Cherry Blossom", price: "\u20B94,800", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80", category: "Fleur Delice", slug: "/fleur-delice" },
  { name: "Lavender Haze", price: "\u20B95,000", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80", category: "Fleur Delice", slug: "/fleur-delice" },
  { name: "Florentine Delight", price: "\u20B95,600", image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400&q=80", category: "Fleur Delice", slug: "/fleur-delice" },

  // Signature Cakes
  { name: "Classic Chocolate Truffle", price: "\u20B91,800", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80", badge: "Bestseller", category: "Signature Cakes", slug: "/signature-cakes" },
  { name: "Red Velvet Royale", price: "\u20B92,200", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&q=80", badge: "Signature", category: "Signature Cakes", slug: "/signature-cakes" },
  { name: "Vanilla Bean Dream", price: "\u20B91,600", image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&q=80", category: "Signature Cakes", slug: "/signature-cakes" },
  { name: "Hazelnut Praline", price: "\u20B92,500", image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80", badge: "New", category: "Signature Cakes", slug: "/signature-cakes" },
  { name: "Tiramisu Tower", price: "\u20B92,800", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80", category: "Signature Cakes", slug: "/signature-cakes" },
  { name: "Caramel Drizzle", price: "\u20B92,000", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80", category: "Signature Cakes", slug: "/signature-cakes" },
  { name: "Pistachio Bliss", price: "\u20B92,400", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=80", badge: "Popular", category: "Signature Cakes", slug: "/signature-cakes" },
  { name: "Mango Passion", price: "\u20B91,900", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80", category: "Signature Cakes", slug: "/signature-cakes" },
  { name: "Dark Forest Gateau", price: "\u20B92,100", image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&q=80", category: "Signature Cakes", slug: "/signature-cakes" },

  // Signature Tarts & Cheesecakes
  { name: "Classic Lemon Tart", price: "\u20B9950", image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&q=80", badge: "Bestseller", category: "Tarts & Cheesecakes", slug: "/signature-tarts" },
  { name: "Blueberry Cheesecake", price: "\u20B91,400", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80", badge: "Signature", category: "Tarts & Cheesecakes", slug: "/signature-tarts" },
  { name: "Raspberry Tart", price: "\u20B91,100", image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=400&q=80", category: "Tarts & Cheesecakes", slug: "/signature-tarts" },
  { name: "New York Cheesecake", price: "\u20B91,600", image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&q=80", badge: "Popular", category: "Tarts & Cheesecakes", slug: "/signature-tarts" },
  { name: "Chocolate Ganache Tart", price: "\u20B91,200", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&q=80", category: "Tarts & Cheesecakes", slug: "/signature-tarts" },
  { name: "Mango Cheesecake", price: "\u20B91,300", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80", badge: "New", category: "Tarts & Cheesecakes", slug: "/signature-tarts" },
  { name: "Passion Fruit Tart", price: "\u20B91,050", image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&q=80", category: "Tarts & Cheesecakes", slug: "/signature-tarts" },
  { name: "Baked Strawberry Cheesecake", price: "\u20B91,500", image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&q=80", category: "Tarts & Cheesecakes", slug: "/signature-tarts" },
  { name: "Salted Caramel Tart", price: "\u20B91,150", image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80", badge: "Chef's Pick", category: "Tarts & Cheesecakes", slug: "/signature-tarts" },

  // Pizzas & Burgers
  { name: "Margherita Pizza", price: "\u20B9450", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80", badge: "Bestseller", category: "Pizzas & Burgers", slug: "/signature-savoury" },
  { name: "Farm Fresh Veggie Pizza", price: "\u20B9550", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", badge: "Popular", category: "Pizzas & Burgers", slug: "/signature-savoury" },
  { name: "Classic Veg Burger", price: "\u20B9350", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", badge: "Bestseller", category: "Pizzas & Burgers", slug: "/signature-savoury" },
  { name: "Spicy Paneer Burger", price: "\u20B9420", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80", category: "Pizzas & Burgers", slug: "/signature-savoury" },

  // TPR Bespoke
  { name: "Signature Chocolate Cake", price: "From \u20B91,500", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&q=80", badge: "Bestseller", category: "TPR Bespoke", slug: "/tpr-bespoke" },
  { name: "Victorian Vanilla", price: "From \u20B91,800", image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&q=80", category: "TPR Bespoke", slug: "/tpr-bespoke" },
  { name: "Fondant Fantasy", price: "From \u20B93,500", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80", badge: "Custom", category: "TPR Bespoke", slug: "/tpr-bespoke" },
  { name: "Tiered Elegance", price: "From \u20B98,000", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80", category: "TPR Bespoke", slug: "/tpr-bespoke" },

  // Gourmet
  { name: "Dark Chocolate Truffles", price: "\u20B9850", image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&q=80", badge: "New", category: "Gourmet", slug: "/gourmet" },
  { name: "Rose Macarons (Box of 6)", price: "\u20B9750", image: "https://images.unsplash.com/photo-1558326567-98ae2405596b?w=400&q=80", badge: "Bestseller", category: "Gourmet", slug: "/gourmet" },
  { name: "Luxury Gift Hamper", price: "\u20B92,500", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80", category: "Gourmet", slug: "/gourmet" },
  { name: "Pistachio \u00C9clair", price: "\u20B9380", image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=400&q=80", category: "Gourmet", slug: "/gourmet" },
];

const trending: Product[] = allProducts.filter((p) =>
  ["Rosette Dream", "Classic Chocolate Truffle", "Blueberry Cheesecake", "Red Velvet Royale", "Rose Macarons (Box of 6)", "New York Cheesecake"].includes(p.name)
);

const categories = [
  { name: "Fleur Delice", slug: "/fleur-delice", color: "#f8bbd0", icon: Sparkles },
  { name: "Signature Cakes", slug: "/signature-cakes", color: "#ffccbc", icon: Cake },
  { name: "Tarts & Cheesecakes", slug: "/signature-tarts", color: "#c5cae9", icon: ChefHat },
  { name: "Pizzas & Burgers", slug: "/signature-savoury", color: "#dcedc8", icon: Coffee },
  { name: "Gourmet", slug: "/gourmet", color: "#f0e6ff", icon: Gift },
  { name: "TPR Bespoke", slug: "/tpr-bespoke", color: "#ffe0b2", icon: Star },
];

const quickLinks = [
  { name: "Customise Your Cake", slug: "/customise", icon: Cake, desc: "Design your dream cake" },
  { name: "Visit Our Cafes", slug: "/our-cafes", icon: MapPin, desc: "Find a cafe near you" },
  { name: "Get in Touch", slug: "/get-in-touch", icon: Phone, desc: "We'd love to hear from you" },
];

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const filtered = query.trim().length > 0
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleLinkClick = () => {
    setQuery("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] animate-fade-in">
      {/* Backdrop — solid on mobile, blurred on desktop */}
      <div
        className="absolute inset-0 bg-white/95 md:bg-burgundy/40 md:backdrop-blur-sm"
        onClick={onClose}
      />

      {/* ── Search Panel ── */}
      <div className="relative z-10 w-full h-full md:h-auto max-w-3xl mx-auto mt-0 md:mt-16 px-0 md:px-4">
        <div className="bg-white md:rounded-3xl md:shadow-2xl overflow-hidden h-full md:h-auto md:max-h-[85vh] flex flex-col">

          {/* ── Search Header ── */}
          <div className="flex items-center gap-3 px-4 sm:px-6 py-3.5 sm:py-5 border-b border-blush/30 bg-white sticky top-0 z-10">
            <button
              onClick={onClose}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-full bg-blush/30 text-burgundy shrink-0"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
            <div className="flex-1 flex items-center gap-2.5 bg-cream/80 rounded-full px-4 py-2.5 md:bg-transparent md:px-0 md:py-0 md:rounded-none">
              <Search className="w-4 h-4 md:w-5 md:h-5 text-mauve shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search cakes, tarts, pizzas..."
                className="flex-1 font-lato text-sm sm:text-base text-foreground placeholder:text-muted-foreground/50 outline-none bg-transparent"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="hidden md:block font-lato text-xs tracking-wider text-mauve hover:text-burgundy transition-colors uppercase"
            >
              Esc
            </button>
          </div>

          {/* ── Scrollable Content ── */}
          <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-5 sm:py-6">

            {query.trim().length > 0 ? (
              /* ════════ SEARCH RESULTS ════════ */
              <div>
                <p className="font-lato text-[11px] tracking-wider text-muted-foreground uppercase mb-4">
                  {filtered.length} result{filtered.length !== 1 ? "s" : ""} found
                </p>

                {filtered.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-blush/30 flex items-center justify-center">
                      <Search className="w-8 h-8 text-mauve/50" />
                    </div>
                    <p className="font-playfair text-lg text-foreground mb-2">
                      No results found
                    </p>
                    <p className="font-lato text-sm text-muted-foreground mb-6">
                      Try searching for "chocolate", "tart", or "pizza"
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {["Chocolate", "Red Velvet", "Pizza", "Cheesecake"].map((t) => (
                        <button
                          key={t}
                          onClick={() => setQuery(t)}
                          className="font-lato text-xs px-4 py-2 rounded-full bg-cream text-foreground hover:bg-blush/40 hover:text-burgundy transition-all"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {filtered.map((p) => (
                      <Link
                        key={p.name + p.category}
                        to={`/product?name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(p.price)}&image=${encodeURIComponent(p.image)}${p.badge ? `&badge=${encodeURIComponent(p.badge)}` : ""}&category=${encodeURIComponent(p.category)}`}
                        onClick={handleLinkClick}
                        className="flex items-center gap-3 p-3 rounded-2xl hover:bg-blush/20 transition-all duration-200 group border border-transparent hover:border-blush/30"
                      >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 shadow-sm">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-playfair text-sm text-foreground truncate group-hover:text-burgundy transition-colors">
                            {p.name}
                          </h4>
                          <p className="font-lato text-[11px] text-muted-foreground">{p.category}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-lato text-xs font-bold text-mauve">{p.price}</span>
                            {p.badge && (
                              <span className="font-lato text-[9px] tracking-wider bg-mauve/15 text-mauve px-2 py-0.5 rounded-full">
                                {p.badge}
                              </span>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-burgundy group-hover:translate-x-1 transition-all shrink-0" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* ════════ DEFAULT STATE — Full Search Page ════════ */
              <div>

                {/* ── Quick Page Links ── */}
                <div className="mb-7">
                  <p className="font-lato text-[11px] tracking-[0.2em] text-muted-foreground uppercase mb-3 flex items-center gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-mauve" />
                    Quick Links
                  </p>
                  <div className="flex flex-col gap-2">
                    {quickLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.slug}
                          to={link.slug}
                          onClick={handleLinkClick}
                          className="flex items-center gap-3.5 p-3 rounded-2xl bg-gradient-to-r from-cream/80 to-blush/20 hover:from-blush/30 hover:to-blush/40 transition-all duration-300 group border border-blush/20 hover:border-blush/40"
                        >
                          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:shadow-md transition-shadow">
                            <Icon className="w-4.5 h-4.5 text-burgundy" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-lato text-xs font-semibold text-foreground tracking-wide">{link.name}</p>
                            <p className="font-lato text-[11px] text-muted-foreground">{link.desc}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-mauve/40 group-hover:text-burgundy group-hover:translate-x-1 transition-all shrink-0" />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* ── Browse Collections (grid cards) ── */}
                <div className="mb-7">
                  <p className="font-lato text-[11px] tracking-[0.2em] text-muted-foreground uppercase mb-3 flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 text-mauve" />
                    Browse Collections
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <Link
                          key={cat.slug}
                          to={cat.slug}
                          onClick={handleLinkClick}
                          className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-blush/25 hover:border-mauve/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                          style={{ background: `linear-gradient(135deg, ${cat.color}25, ${cat.color}10)` }}
                        >
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300"
                            style={{ background: `${cat.color}60` }}
                          >
                            <Icon className="w-4.5 h-4.5 text-foreground/70" />
                          </div>
                          <span className="font-lato text-[11px] sm:text-xs tracking-wider text-foreground text-center font-medium leading-tight">
                            {cat.name}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* ── Popular Searches (pill tags) ── */}
                <div className="mb-7">
                  <p className="font-lato text-[11px] tracking-[0.2em] text-muted-foreground uppercase mb-3 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-mauve" />
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Chocolate", "Red Velvet", "Cheesecake", "Tart", "Vanilla", "Mango", "Pistachio", "Pizza", "Burger", "Macarons"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="font-lato text-[11px] sm:text-xs tracking-wider px-4 py-2 rounded-full bg-cream/90 text-foreground hover:bg-burgundy hover:text-white transition-all duration-300 border border-blush/30 hover:border-burgundy"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Trending Right Now (product cards) ── */}
                <div className="mb-4">
                  <p className="font-lato text-[11px] tracking-[0.2em] text-muted-foreground uppercase mb-3 flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-mauve" />
                    Trending Right Now
                  </p>

                  {/* Horizontal scroll on mobile, grid on desktop */}
                  <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 snap-x snap-mandatory sm:snap-none scrollbar-hide">
                    {trending.map((p) => (
                      <Link
                        key={p.name + p.category}
                        to={`/product?name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(p.price)}&image=${encodeURIComponent(p.image)}${p.badge ? `&badge=${encodeURIComponent(p.badge)}` : ""}&category=${encodeURIComponent(p.category)}`}
                        onClick={handleLinkClick}
                        className="snap-start shrink-0 w-[160px] sm:w-auto group"
                      >
                        <div className="rounded-2xl overflow-hidden border border-blush/25 hover:border-mauve/40 transition-all duration-300 hover:shadow-lg bg-white">
                          <div className="relative h-28 sm:h-32 overflow-hidden">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {p.badge && (
                              <span className="absolute top-2 left-2 font-lato text-[9px] tracking-wider bg-white/90 backdrop-blur-sm text-burgundy px-2.5 py-1 rounded-full font-semibold shadow-sm">
                                {p.badge}
                              </span>
                            )}
                          </div>
                          <div className="p-3">
                            <h4 className="font-playfair text-xs sm:text-sm text-foreground truncate group-hover:text-burgundy transition-colors leading-tight">
                              {p.name}
                            </h4>
                            <p className="font-lato text-xs font-bold text-mauve mt-1">{p.price}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* ── Bottom CTA ── */}
                <div className="mt-6 mb-2 p-5 rounded-2xl bg-gradient-to-br from-burgundy to-mauve text-center">
                  <p className="font-playfair text-base sm:text-lg text-white mb-1.5">
                    Can't find what you need?
                  </p>
                  <p className="font-lato text-[11px] text-white/70 mb-4">
                    Let us craft something uniquely yours.
                  </p>
                  <Link
                    to="/customise"
                    onClick={handleLinkClick}
                    className="inline-block font-lato text-[11px] tracking-widest uppercase bg-white text-burgundy px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Start Customising
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
