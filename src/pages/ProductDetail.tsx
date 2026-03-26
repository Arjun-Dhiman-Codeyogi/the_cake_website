import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Minus,
  Plus,
  ShoppingBag,
  Check,
  Share2,
  MapPin,
  Clock,
  Copy,
  Heart,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import ScrollReveal from "@/components/ScrollReveal";
import WaveDivider from "@/components/WaveDivider";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";

/* ── Flavour & topper options ── */
const flavours = [
  "Dark Chocolate Truffle",
  "Vanilla & Buttercream",
  "Red Velvet",
  "Strawberry",
  "Butterscotch",
  "Pineapple",
];

const toppers = ["Happy Birthday", "Happy Anniversary", "Congratulations", "Best Wishes", "None"];

/* ── You May Also Like ── */
const relatedProducts = [
  {
    name: "Rose Macarons (Box of 6)",
    price: "\u20B9750",
    image: "/images/photo-1558326567-98ae2405596b.webp",
    badge: "Bestseller",
    category: "Gourmet",
  },
  {
    name: "Classic Chocolate Truffle",
    price: "\u20B91,800",
    image: "/images/photo-1578985545062-69928b1d9587.webp",
    badge: "Bestseller",
    category: "Signature Cakes",
  },
  {
    name: "Blueberry Cheesecake",
    price: "\u20B91,400",
    image: "/images/photo-1533134242443-d4fd215305ad.webp",
    badge: "Signature",
    category: "Tarts & Cheesecakes",
  },
  {
    name: "Caramel Luxe",
    price: "\u20B92,200",
    image: "/images/photo-1481391319762-47dff72954d9.webp",
    badge: "New",
    category: "Fleur Delice",
  },
];

const ProductDetail = () => {
  const [params] = useSearchParams();
  const name = params.get("name") || "Enchanted Garden";
  const price = params.get("price") || "\u20B96,000";
  const image = params.get("image") || "/images/photo-1486427944299-d1955d23e34d.webp";
  const badge = params.get("badge") || "";
  const category = params.get("category") || "";

  const { addItem } = useCart();

  const [egg, setEgg] = useState<"yes" | "no">("yes");
  const [flavour, setFlavour] = useState(flavours[0]);
  const [topper, setTopper] = useState("None");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  /* Reset on product change */
  useEffect(() => {
    setEgg("yes");
    setFlavour(flavours[0]);
    setTopper("None");
    setQuantity(1);
    setAdded(false);
  }, [name]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ name, price, image, badge: badge || undefined, category });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: name, text: `Check out ${name} from The Pink Rosette!`, url });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="bg-blush/30 border-b border-blush/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="font-lato text-[11px] sm:text-xs tracking-wider text-muted-foreground">
            <Link to="/" className="hover:text-burgundy transition-colors">Home</Link>
            <span className="mx-2">/</span>
            {category && (
              <>
                <span className="text-muted-foreground">{category}</span>
                <span className="mx-2">/</span>
              </>
            )}
            <span className="text-foreground font-medium">{name}</span>
          </nav>
        </div>
      </div>

      {/* ── Product Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-14">

          {/* ──── LEFT: Image ──── */}
          <ScrollReveal>
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg group sticky top-28">
              <img
                src={image}
                alt={name}
                loading="lazy"
                decoding="async"
                className="w-full aspect-square sm:aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {badge && (
                <span className="absolute top-4 left-4 bg-mauve text-white text-[10px] sm:text-xs font-lato tracking-widest px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-lg">
                  {badge}
                </span>
              )}
              {/* Wishlist */}
              <button
                onClick={() => setLiked(!liked)}
                className="absolute top-4 right-4 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
              >
                <Heart
                  className={`w-5 h-5 transition-colors duration-300 ${
                    liked ? "fill-red-500 text-red-500" : "text-burgundy"
                  }`}
                />
              </button>
            </div>
          </ScrollReveal>

          {/* ──── RIGHT: Details ──── */}
          <ScrollReveal delay={100}>
            <div className="flex flex-col">
              {/* Category tag */}
              {category && (
                <p className="font-lato text-[10px] sm:text-xs tracking-[0.3em] uppercase text-mauve mb-2 sm:mb-3">
                  {category}
                </p>
              )}

              {/* Name */}
              <h1 className="font-playfair text-2xl sm:text-3xl lg:text-4xl text-foreground mb-2">
                {name}
              </h1>

              {/* Price */}
              <p className="font-playfair text-xl sm:text-2xl text-burgundy font-bold mb-5 sm:mb-6">
                {price}
              </p>

              <div className="w-12 h-0.5 bg-mauve/30 mb-5 sm:mb-6" />

              {/* ── Egg option ── */}
              <div className="mb-5 sm:mb-6">
                <label className="font-lato text-xs tracking-widest uppercase text-muted-foreground block mb-2.5">
                  Egg
                </label>
                <div className="flex gap-2">
                  {(["yes", "no"] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setEgg(opt)}
                      className={`font-lato text-xs tracking-wider uppercase px-5 sm:px-6 py-2.5 rounded-full border transition-all duration-300 ${
                        egg === opt
                          ? "bg-burgundy text-white border-burgundy shadow-md"
                          : "border-blush/60 text-foreground hover:border-mauve"
                      }`}
                    >
                      {opt === "yes" ? "Yes" : "No"}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Flavour ── */}
              <div className="mb-5 sm:mb-6">
                <label className="font-lato text-xs tracking-widest uppercase text-muted-foreground block mb-2.5">
                  Looks & Flavour
                </label>
                <div className="flex flex-wrap gap-2">
                  {flavours.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFlavour(f)}
                      className={`font-lato text-[11px] sm:text-xs tracking-wider px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all duration-300 ${
                        flavour === f
                          ? "bg-burgundy text-white border-burgundy shadow-md"
                          : "border-blush/60 text-foreground hover:border-mauve"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Topper ── */}
              <div className="mb-6 sm:mb-8">
                <label className="font-lato text-xs tracking-widest uppercase text-muted-foreground block mb-2.5">
                  Add Topper
                </label>
                <div className="flex flex-wrap gap-2">
                  {toppers.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTopper(t)}
                      className={`font-lato text-[11px] sm:text-xs tracking-wider px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all duration-300 ${
                        topper === t
                          ? "bg-burgundy text-white border-burgundy shadow-md"
                          : "border-blush/60 text-foreground hover:border-mauve"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Quantity ── */}
              <div className="mb-6 sm:mb-8">
                <label className="font-lato text-xs tracking-widest uppercase text-muted-foreground block mb-2.5">
                  Quantity
                </label>
                <div className="inline-flex items-center border border-blush/60 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-foreground hover:bg-blush/30 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 sm:w-14 text-center font-lato text-base font-bold text-foreground select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-foreground hover:bg-blush/30 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ── Add to Cart button ── */}
              <button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center gap-2.5 font-lato text-xs sm:text-sm tracking-[0.2em] uppercase py-4 sm:py-4.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl ${
                  added
                    ? "bg-green-500 text-white"
                    : "bg-burgundy text-white hover:bg-mauve active:scale-[0.98]"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>

              {/* ── Pickup info ── */}
              <div className="mt-5 sm:mt-6 p-4 sm:p-5 bg-cream/40 rounded-xl border border-blush/20">
                <div className="flex items-start gap-3 mb-2">
                  <MapPin className="w-4 h-4 text-mauve mt-0.5 shrink-0" />
                  <div>
                    <p className="font-lato text-xs sm:text-sm text-foreground font-medium">
                      Pickup available at <span className="text-burgundy font-semibold">TPR FORT</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-mauve mt-0.5 shrink-0" />
                  <p className="font-lato text-xs text-muted-foreground">
                    Usually ready in 24 hours
                  </p>
                </div>
              </div>

              {/* ── Description ── */}
              <div className="mt-6 sm:mt-8">
                <h3 className="font-playfair text-lg sm:text-xl text-foreground mb-3">
                  About This Product
                </h3>
                <div className="font-lato text-sm text-muted-foreground leading-relaxed space-y-3">
                  <p>Our {name} arrangement contains:</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>1kg Cake</li>
                    <li>8 Assorted Colourful Macarons</li>
                  </ul>
                  <p className="text-xs text-muted-foreground/70 italic">
                    *Please note - Sprinkles (if any), flowers & macaron colours will be subject to availability.
                  </p>
                  <p className="text-xs text-muted-foreground/70 italic">
                    *For a note card, please write the message under special instructions at the time of checkout.
                  </p>
                </div>
              </div>

              {/* ── Share (visible below details on mobile) ── */}
              <div className="mt-6 sm:mt-8 flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className={`inline-flex items-center gap-2 font-lato text-xs tracking-widest uppercase px-6 py-3 rounded-full border transition-all duration-300 ${
                    copied
                      ? "border-green-500 text-green-600 bg-green-50"
                      : "border-mauve/40 text-mauve hover:bg-mauve hover:text-white"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Link Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      Share
                    </>
                  )}
                </button>
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="w-10 h-10 rounded-full border border-mauve/40 flex items-center justify-center text-mauve hover:bg-mauve hover:text-white transition-all duration-300"
                  title="Copy link"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Wave: white → pink ── */}
      <WaveDivider height={50} color="#fce4ec" />

      {/* ── You May Also Like ── */}
      <div style={{ background: "#fce4ec" }}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <ScrollReveal className="text-center mb-8 sm:mb-10">
            <p className="font-lato text-xs tracking-[0.3em] uppercase text-mauve mb-2">
              Handpicked for You
            </p>
            <h2 className="font-playfair text-2xl sm:text-3xl text-foreground">
              You May Also Like
            </h2>
            <div className="w-10 h-0.5 bg-mauve mx-auto mt-3" />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {relatedProducts.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 80}>
                <ProductCard {...p} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>

      {/* ── Wave: pink → white ── */}
      <div style={{ background: "#fce4ec" }}>
        <WaveDivider height={50} color="white" />
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
