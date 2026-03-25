import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search, ArrowLeft, X, TrendingUp, Star, Clock, ArrowRight,
  Cake, Coffee, Gift, ChefHat, Sparkles, MapPin, Phone, Heart,
  Pizza, UtensilsCrossed,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";

/* ── Product data ── */
interface Product {
  name: string;
  price: string;
  image: string;
  badge?: string;
  category: string;
}

const allProducts: Product[] = [
  { name: "Flowers in Bloom", price: "\u20B96,500", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&q=80", badge: "Signature", category: "Fleur Delice" },
  { name: "Enchanted Garden", price: "\u20B96,000", image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&q=80", badge: "New", category: "Fleur Delice" },
  { name: "Rosette Dream", price: "\u20B95,500", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80", badge: "Bestseller", category: "Fleur Delice" },
  { name: "Blush Cascade", price: "\u20B95,800", image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&q=80", category: "Fleur Delice" },
  { name: "Petal Whisper", price: "\u20B95,200", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80", category: "Fleur Delice" },
  { name: "Garden Soir\u00E9e", price: "\u20B96,200", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=80", category: "Fleur Delice" },
  { name: "Cherry Blossom", price: "\u20B94,800", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80", category: "Fleur Delice" },
  { name: "Lavender Haze", price: "\u20B95,000", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80", category: "Fleur Delice" },

  { name: "Classic Chocolate Truffle", price: "\u20B91,800", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80", badge: "Bestseller", category: "Signature Cakes" },
  { name: "Red Velvet Royale", price: "\u20B92,200", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&q=80", badge: "Signature", category: "Signature Cakes" },
  { name: "Vanilla Bean Dream", price: "\u20B91,600", image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&q=80", category: "Signature Cakes" },
  { name: "Hazelnut Praline", price: "\u20B92,500", image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80", badge: "New", category: "Signature Cakes" },
  { name: "Tiramisu Tower", price: "\u20B92,800", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80", category: "Signature Cakes" },
  { name: "Caramel Drizzle", price: "\u20B92,000", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80", category: "Signature Cakes" },
  { name: "Pistachio Bliss", price: "\u20B92,400", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=80", badge: "Popular", category: "Signature Cakes" },
  { name: "Mango Passion", price: "\u20B91,900", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80", category: "Signature Cakes" },
  { name: "Dark Forest Gateau", price: "\u20B92,100", image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&q=80", category: "Signature Cakes" },

  { name: "Classic Lemon Tart", price: "\u20B9950", image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&q=80", badge: "Bestseller", category: "Tarts & Cheesecakes" },
  { name: "Blueberry Cheesecake", price: "\u20B91,400", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80", badge: "Signature", category: "Tarts & Cheesecakes" },
  { name: "Raspberry Tart", price: "\u20B91,100", image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=400&q=80", category: "Tarts & Cheesecakes" },
  { name: "New York Cheesecake", price: "\u20B91,600", image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&q=80", badge: "Popular", category: "Tarts & Cheesecakes" },
  { name: "Chocolate Ganache Tart", price: "\u20B91,200", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&q=80", category: "Tarts & Cheesecakes" },
  { name: "Mango Cheesecake", price: "\u20B91,300", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80", badge: "New", category: "Tarts & Cheesecakes" },
  { name: "Salted Caramel Tart", price: "\u20B91,150", image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80", badge: "Chef's Pick", category: "Tarts & Cheesecakes" },

  { name: "Margherita Pizza", price: "\u20B9450", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80", badge: "Bestseller", category: "Pizzas & Burgers" },
  { name: "Farm Fresh Veggie Pizza", price: "\u20B9550", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", badge: "Popular", category: "Pizzas & Burgers" },
  { name: "Paneer Tikka Pizza", price: "\u20B9620", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80", badge: "New", category: "Pizzas & Burgers" },
  { name: "Classic Veg Burger", price: "\u20B9350", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", badge: "Bestseller", category: "Pizzas & Burgers" },
  { name: "Spicy Paneer Burger", price: "\u20B9420", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80", category: "Pizzas & Burgers" },

  { name: "Signature Chocolate Cake", price: "From \u20B91,500", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&q=80", badge: "Bestseller", category: "TPR Bespoke" },
  { name: "Victorian Vanilla", price: "From \u20B91,800", image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&q=80", category: "TPR Bespoke" },
  { name: "Fondant Fantasy", price: "From \u20B93,500", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80", badge: "Custom", category: "TPR Bespoke" },
  { name: "Tiered Elegance", price: "From \u20B98,000", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80", category: "TPR Bespoke" },

  { name: "Dark Chocolate Truffles", price: "\u20B9850", image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&q=80", badge: "New", category: "Gourmet" },
  { name: "Rose Macarons (Box of 6)", price: "\u20B9750", image: "https://images.unsplash.com/photo-1558326567-98ae2405596b?w=400&q=80", badge: "Bestseller", category: "Gourmet" },
  { name: "Luxury Gift Hamper", price: "\u20B92,500", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80", category: "Gourmet" },
  { name: "Pistachio \u00C9clair", price: "\u20B9380", image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=400&q=80", category: "Gourmet" },
];

const trendingNames = [
  "Rosette Dream", "Classic Chocolate Truffle", "Blueberry Cheesecake",
  "Red Velvet Royale", "Rose Macarons (Box of 6)", "New York Cheesecake",
  "Margherita Pizza", "Classic Veg Burger",
];
const trending = allProducts.filter((p) => trendingNames.includes(p.name));

const collections = [
  { name: "Fleur Delice", slug: "/fleur-delice", color: "#f8bbd0", icon: Sparkles, desc: "Floral luxury cakes" },
  { name: "Signature Cakes", slug: "/signature-cakes", color: "#ffccbc", icon: Cake, desc: "Classic favourites" },
  { name: "Tarts & Cheesecakes", slug: "/signature-tarts", color: "#c5cae9", icon: ChefHat, desc: "Buttery & creamy" },
  { name: "Pizzas & Burgers", slug: "/signature-savoury", color: "#dcedc8", icon: Pizza, desc: "Savoury delights" },
  { name: "Gourmet", slug: "/gourmet", color: "#f0e6ff", icon: Gift, desc: "Truffles & hampers" },
  { name: "TPR Bespoke", slug: "/tpr-bespoke", color: "#ffe0b2", icon: Star, desc: "Custom celebrations" },
];

const quickPages = [
  { name: "Customise Your Cake", slug: "/customise", icon: UtensilsCrossed, desc: "Build your dream cake from scratch" },
  { name: "Visit Our Cafes", slug: "/our-cafes", icon: MapPin, desc: "Find a TPR cafe near you" },
  { name: "Get in Touch", slug: "/get-in-touch", icon: Phone, desc: "We'd love to hear from you" },
  { name: "My Cart", slug: "/cart", icon: Heart, desc: "Review your selections" },
];

const popularTerms = ["Chocolate", "Red Velvet", "Cheesecake", "Tart", "Vanilla", "Mango", "Pistachio", "Pizza", "Burger", "Macarons", "Caramel", "Truffle"];

const buildDetailUrl = (p: Product) =>
  `/product?name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(p.price)}&image=${encodeURIComponent(p.image)}${p.badge ? `&badge=${encodeURIComponent(p.badge)}` : ""}&category=${encodeURIComponent(p.category)}`;

/* ═══════════════════════ Component ═══════════════════════ */
const SearchPage = () => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 150);
  }, []);

  const filtered = query.trim().length > 0
    ? allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    )
    : [];

  const hasQuery = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* <AnnouncementBar /> */}
      <Navbar />

      {/* ── Sticky Search Bar ── */}
      <div className="sticky top-[80px] z-40 bg-white border-b border-blush/30 shadow-sm pt-5 sm:pt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-cream flex items-center justify-center shrink-0 hover:bg-blush/40 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-burgundy" />
          </button>
          <div className="flex-1 flex items-center gap-2.5 bg-cream/70 rounded-full px-4 py-2.5 border border-blush/30 focus-within:border-mauve/50 focus-within:shadow-[0_0_0_3px_rgba(194,24,91,0.08)] transition-all">
            <Search className="w-4 h-4 text-mauve shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cakes, tarts, pizzas, burgers..."
              className="flex-1 font-lato text-sm text-foreground placeholder:text-muted-foreground/50 outline-none bg-transparent"
            />
            {query && (
              <button
                onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                className="w-6 h-6 rounded-full bg-muted-foreground/10 flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
              >
                <X className="w-3 h-3 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-[92px] pb-6 sm:pb-8">
        {hasQuery ? (
          /* ════════════ SEARCH RESULTS ════════════ */
          <div>
            <p className="font-lato text-[11px] tracking-[0.2em] text-muted-foreground uppercase mb-5">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{query}"
            </p>

            {filtered.length === 0 ? (
              /* ── No Results ── */
              <div className="text-center py-12 sm:py-20">
                <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-blush/40 to-cream flex items-center justify-center">
                  <Search className="w-10 h-10 sm:w-12 sm:h-12 text-mauve/40" />
                </div>
                <h2 className="font-playfair text-xl sm:text-2xl text-foreground mb-2">
                  No items found
                </h2>
                <p className="font-lato text-sm text-muted-foreground mb-8 max-w-sm mx-auto">
                  We couldn't find anything matching "<span className="text-burgundy font-semibold">{query}</span>". Try a different search or browse our collections.
                </p>

                <p className="font-lato text-[11px] tracking-[0.2em] text-muted-foreground uppercase mb-3">Try these instead</p>
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                  {["Chocolate", "Red Velvet", "Pizza", "Cheesecake", "Mango", "Burger"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setQuery(t)}
                      className="font-lato text-xs px-4 py-2 rounded-full bg-cream text-foreground hover:bg-burgundy hover:text-white transition-all duration-300 border border-blush/30 hover:border-burgundy"
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="w-12 h-0.5 bg-blush mx-auto mb-8" />

                <p className="font-lato text-[11px] tracking-[0.2em] text-muted-foreground uppercase mb-4">Browse Collections</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-lg mx-auto">
                  {collections.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Link
                        key={cat.slug}
                        to={cat.slug}
                        className="group flex flex-col items-center gap-1.5 p-3.5 rounded-2xl border border-blush/25 hover:border-mauve/40 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                        style={{ background: `linear-gradient(135deg, ${cat.color}20, ${cat.color}08)` }}
                      >
                        <div className="w-9 h-9 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: `${cat.color}50` }}>
                          <Icon className="w-4 h-4 text-foreground/70" />
                        </div>
                        <span className="font-lato text-[11px] tracking-wider text-foreground text-center font-medium">{cat.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* ── Results Grid ── */
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {filtered.map((p) => (
                  <Link
                    key={p.name + p.category}
                    to={buildDetailUrl(p)}
                    className="group rounded-2xl overflow-hidden border border-blush/20 hover:border-mauve/30 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative aspect-square overflow-hidden bg-cream/30">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {p.badge && (
                        <span className="absolute top-2 left-2 font-lato text-[9px] sm:text-[10px] tracking-wider bg-white/90 backdrop-blur-sm text-burgundy px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-semibold shadow-sm">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-2.5 sm:p-3">
                      <p className="font-lato text-[10px] text-mauve tracking-wider uppercase">{p.category}</p>
                      <h4 className="font-playfair text-xs sm:text-sm text-foreground truncate group-hover:text-burgundy transition-colors mt-0.5 leading-tight">
                        {p.name}
                      </h4>
                      <p className="font-lato text-xs sm:text-sm font-bold text-burgundy mt-1">{p.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ════════════ DEFAULT — EXPLORE PAGE ════════════ */
          <div>

            {/* ── Hero Banner ── */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden mb-8 relative h-36 sm:h-48">
              <img
                src="https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=1200&q=80"
                alt="Explore"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-burgundy/80 via-burgundy/60 to-transparent flex items-center">
                <div className="px-5 sm:px-8">
                  <p className="font-lato text-[10px] sm:text-xs tracking-[0.3em] uppercase text-blush mb-1">Discover</p>
                  <h2 className="font-playfair text-xl sm:text-3xl text-white leading-tight">Explore Our<br />Collections</h2>
                  <p className="font-lato text-[11px] sm:text-sm text-white/70 mt-1.5 max-w-xs">Find your perfect cake, tart, or savoury delight</p>
                </div>
              </div>
            </div>

            {/* ── Quick Page Links ── */}
            <div className="mb-8">
              <p className="font-lato text-[11px] tracking-[0.2em] text-muted-foreground uppercase mb-3.5 flex items-center gap-2">
                <ArrowRight className="w-3.5 h-3.5 text-mauve" />
                Quick Links
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {quickPages.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.slug}
                      to={link.slug}
                      className="group p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-cream/80 to-blush/15 border border-blush/20 hover:border-mauve/40 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-2.5 group-hover:shadow-md group-hover:scale-105 transition-all">
                        <Icon className="w-4 h-4 text-burgundy" />
                      </div>
                      <p className="font-lato text-[11px] sm:text-xs font-semibold text-foreground tracking-wide leading-tight">{link.name}</p>
                      <p className="font-lato text-[10px] text-muted-foreground mt-0.5 leading-tight hidden sm:block">{link.desc}</p>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* ── Browse Collections ── */}
            <div className="mb-8">
              <p className="font-lato text-[11px] tracking-[0.2em] text-muted-foreground uppercase mb-3.5 flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-mauve" />
                Browse Collections
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {collections.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={cat.slug}
                      to={cat.slug}
                      className="group relative overflow-hidden rounded-2xl border border-blush/25 hover:border-mauve/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 p-4 sm:p-5"
                      style={{ background: `linear-gradient(135deg, ${cat.color}30, ${cat.color}10)` }}
                    >
                      <div
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform duration-300 shadow-sm"
                        style={{ background: `${cat.color}60` }}
                      >
                        <Icon className="w-5 h-5 text-foreground/70" />
                      </div>
                      <p className="font-lato text-xs sm:text-sm font-semibold text-foreground leading-tight">{cat.name}</p>
                      <p className="font-lato text-[10px] sm:text-[11px] text-muted-foreground mt-0.5">{cat.desc}</p>
                      <ArrowRight className="absolute top-4 right-4 w-3.5 h-3.5 text-mauve/30 group-hover:text-burgundy group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* ── Popular Searches ── */}
            <div className="mb-8">
              <p className="font-lato text-[11px] tracking-[0.2em] text-muted-foreground uppercase mb-3.5 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-mauve" />
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularTerms.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="font-lato text-[11px] sm:text-xs tracking-wider px-4 py-2.5 rounded-full bg-cream/80 text-foreground hover:bg-burgundy hover:text-white transition-all duration-300 border border-blush/30 hover:border-burgundy hover:shadow-md"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Trending Right Now ── */}
            <div className="mb-8">
              <p className="font-lato text-[11px] tracking-[0.2em] text-muted-foreground uppercase mb-3.5 flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-mauve" />
                Trending Right Now
              </p>

              {/* Horizontal scroll on mobile */}
              <div className="flex gap-3 overflow-x-auto pb-3 -mx-1 px-1 sm:grid sm:grid-cols-4 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 snap-x snap-mandatory sm:snap-none scrollbar-hide">
                {trending.map((p) => (
                  <Link
                    key={p.name + p.category}
                    to={buildDetailUrl(p)}
                    className="snap-start shrink-0 w-[150px] sm:w-auto group"
                  >
                    <div className="rounded-2xl overflow-hidden border border-blush/20 hover:border-mauve/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white">
                      <div className="relative h-[120px] sm:h-36 overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {p.badge && (
                          <span className="absolute top-2 left-2 font-lato text-[9px] tracking-wider bg-white/90 backdrop-blur-sm text-burgundy px-2 py-0.5 rounded-full font-semibold shadow-sm">
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <div className="p-2.5 sm:p-3">
                        <h4 className="font-playfair text-[11px] sm:text-sm text-foreground truncate group-hover:text-burgundy transition-colors leading-tight">
                          {p.name}
                        </h4>
                        <p className="font-lato text-[11px] sm:text-xs font-bold text-mauve mt-0.5">{p.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* ── CTA Banner ── */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden relative p-6 sm:p-10 mb-4 bg-gradient-to-br from-burgundy via-burgundy to-mauve text-center">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10">
                <p className="font-playfair text-lg sm:text-2xl text-white mb-2">
                  Can't find what you need?
                </p>
                <p className="font-lato text-[11px] sm:text-sm text-white/70 mb-5 max-w-sm mx-auto">
                  Let us craft something uniquely yours — share your vision and we'll bring it to life.
                </p>
                <Link
                  to="/customise"
                  className="inline-block font-lato text-[11px] sm:text-xs tracking-widest uppercase bg-white text-burgundy px-7 py-3 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Start Customising
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;
