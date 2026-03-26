import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  StickyNote,
  Truck,
  Gift,
  ShieldCheck,
} from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useCart } from "@/context/CartContext";

/* ─── tiny wave (10-12 px) ─── */
const MiniWave = ({ color, bg }: { color: string; bg?: string }) => (
  <div className="w-full overflow-hidden leading-[0]" style={{ background: bg, marginTop: -1 }}>
    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full block" style={{ height: 12 }}>
      <path
        fill={color}
        d="M0,160 C180,280 360,40 540,160 C720,280 900,40 1080,160 C1200,240 1320,80 1440,160 L1440,320 L0,320 Z"
      />
    </svg>
  </div>
);

/* ─── calendar helpers ─── */
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isPastDay(date: Date, today: Date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return d < t;
}

/* ─── Calendar Component ─── */
const DeliveryCalendar = ({
  selected,
  onSelect,
}: {
  selected: Date | null;
  onSelect: (d: Date) => void;
}) => {
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const canGoPrev = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-blush/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4 text-foreground" />
        </button>
        <span className="font-lato text-sm font-semibold text-foreground tracking-wide">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-blush/40 transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center font-lato text-[10px] tracking-wider text-muted-foreground uppercase">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`e-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = new Date(viewYear, viewMonth, day);
          const past = isPastDay(date, today);
          const isToday = isSameDay(date, today);
          const isSelected = selected && isSameDay(date, selected);

          return (
            <button
              key={day}
              disabled={past}
              onClick={() => onSelect(date)}
              className={`w-full aspect-square rounded-lg font-lato text-xs flex items-center justify-center transition-all duration-200
                ${past ? "text-muted-foreground/30 cursor-not-allowed" : "hover:bg-blush/50 cursor-pointer"}
                ${isToday && !isSelected ? "border border-mauve/40 text-mauve font-bold" : ""}
                ${isSelected ? "bg-burgundy text-white font-bold shadow-md scale-105" : "text-foreground"}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ─── Suggested products ─── */
const suggestedProducts = [
  { name: "Rose Macarons (Box of 6)", price: "\u20B9750", image: "/images/photo-1558326567-98ae2405596b.webp", badge: "Bestseller", category: "Gourmet" },
  { name: "Classic Chocolate Truffle", price: "\u20B91,800", image: "/images/photo-1578985545062-69928b1d9587.webp", badge: "Bestseller", category: "Signature Cakes" },
  { name: "Blueberry Cheesecake", price: "\u20B91,400", image: "/images/photo-1533134242443-d4fd215305ad.webp", badge: "Signature", category: "Tarts & Cheesecakes" },
  { name: "Red Velvet Royale", price: "\u20B92,200", image: "/images/photo-1606890737304-57a1ca8a5b62.webp", badge: "Signature", category: "Signature Cakes" },
];

/* ─── CART PAGE ─── */
const Cart = () => {
  const { items, increaseQty, decreaseQty, removeItem, clearCart, addItem, totalItems, totalPrice } = useCart();
  const [orderNote, setOrderNote] = useState("");
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);

  const formattedTotal = totalPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-36 sm:h-48 md:h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy via-mauve to-burgundy" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <ShoppingBag className="w-8 h-8 text-blush mb-2 animate-fade-in-up" />
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-primary-foreground animate-fade-in-up">
            Your Cart
          </h1>
          <p className="font-lato text-xs text-primary-foreground/70 mt-1 animate-fade-in-up tracking-wider uppercase">
            {totalItems === 0
              ? "Your cart is waiting to be filled"
              : `${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart`}
          </p>
        </div>
      </section>

      {/* wave: hero → blush */}
      {/* <MiniWave color="#fce4ec" /> */}

      {/* ── MAIN CART CONTENT ── */}
      <div style={{ background: "#fce4ec" }}>

        {/* wave: blush → white */}
        <MiniWave color="white" bg="#fce4ec" />

        <div style={{ background: "white" }}>
          <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            {items.length === 0 ? (
              /* ── EMPTY STATE ── */
              <ScrollReveal>
                <div className="text-center py-20">
                  <div className="w-24 h-24 rounded-full bg-blush/30 flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <ShoppingBag className="w-12 h-12 text-mauve" />
                  </div>
                  <h2 className="font-playfair text-3xl text-foreground mb-3">Your cart is empty</h2>
                  <p className="font-lato text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
                    Explore our handcrafted cakes, tarts, and savoury delights. Every creation is baked with love.
                  </p>
                  <Link
                    to="/tpr-bespoke"
                    className="btn-sweep inline-block bg-burgundy text-primary-foreground font-lato text-xs tracking-widest uppercase px-10 py-3.5 rounded-full hover:bg-mauve transition-colors duration-300"
                  >
                    Explore Collections
                  </Link>
                </div>
              </ScrollReveal>
            ) : (
              /* ── CART WITH ITEMS ── */
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* ──── LEFT: Items list (3 cols) ──── */}
                <div className="lg:col-span-3">
                  <ScrollReveal>
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="font-playfair text-2xl text-foreground">
                        Cart Items
                        <span className="font-lato text-sm text-muted-foreground ml-2">({totalItems})</span>
                      </h2>
                      <button
                        onClick={clearCart}
                        className="font-lato text-xs tracking-wider text-muted-foreground hover:text-burgundy transition-colors flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Clear All
                      </button>
                    </div>
                  </ScrollReveal>

                  {/* ── Item cards ── */}
                  <div className="flex flex-col gap-4">
                    {items.map((item, idx) => (
                      <ScrollReveal key={item.id} delay={idx * 50}>
                        <div className="flex gap-4 p-4 rounded-2xl bg-white border border-blush/25 shadow-sm hover:shadow-md transition-all duration-300">
                          {/* Product image */}
                          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 shadow-sm">
                            <img src={item.image} alt={item.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                          </div>

                          {/* Product details */}
                          <div className="flex-1 min-w-0 flex flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-playfair text-base sm:text-lg text-foreground leading-snug">
                                  {item.name}
                                </h3>
                                <p className="font-lato text-[11px] text-muted-foreground mt-0.5">{item.category}</p>
                                {item.badge && (
                                  <span className="inline-block mt-1.5 font-lato text-[10px] tracking-wider bg-mauve/15 text-mauve px-2 py-0.5 rounded-full">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              {/* Delete */}
                              <button
                                onClick={() => removeItem(item.id)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground/40 hover:bg-red-50 hover:text-red-500 transition-all duration-200 shrink-0"
                                title="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Price per unit */}
                            <p className="font-lato text-xs text-muted-foreground mt-2">
                              Unit price: <span className="text-foreground font-semibold">{item.price}</span>
                            </p>

                            {/* Quantity + line total */}
                            <div className="flex items-center justify-between mt-auto pt-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => decreaseQty(item.id)}
                                  className="w-8 h-8 rounded-full border border-blush/60 flex items-center justify-center text-foreground hover:bg-burgundy hover:text-white hover:border-burgundy transition-all duration-200"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="font-lato text-base font-bold text-foreground w-8 text-center select-none">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => increaseQty(item.id)}
                                  className="w-8 h-8 rounded-full border border-blush/60 flex items-center justify-center text-foreground hover:bg-burgundy hover:text-white hover:border-burgundy transition-all duration-200"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <p className="font-playfair text-lg font-bold text-burgundy">
                                {"\u20B9"}{(item.priceNum * item.quantity).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>

                  {/* Continue shopping */}
                  <ScrollReveal>
                    <Link
                      to="/tpr-bespoke"
                      className="inline-flex items-center gap-2 mt-6 font-lato text-xs tracking-wider text-mauve hover:text-burgundy transition-colors uppercase"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Continue Shopping
                    </Link>
                  </ScrollReveal>
                </div>

                {/* ──── RIGHT: Order details (2 cols) ──── */}
                <div className="lg:col-span-2">
                  <div className="sticky top-24 flex flex-col gap-5">

                    {/* ── Delivery Date ── */}
                    <ScrollReveal delay={80}>
                      <div className="bg-white rounded-2xl border border-blush/25 shadow-sm p-5">
                        <div className="flex items-center gap-2 mb-4">
                          <CalendarDays className="w-4 h-4 text-burgundy" />
                          <h3 className="font-playfair text-base text-foreground">Delivery Date</h3>
                        </div>

                        {deliveryDate && (
                          <div className="mb-3 px-3 py-2 rounded-lg bg-blush/25 flex items-center justify-between">
                            <span className="font-lato text-sm text-foreground">
                              {deliveryDate.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric" })}
                            </span>
                            <button
                              onClick={() => setDeliveryDate(null)}
                              className="text-muted-foreground hover:text-burgundy transition-colors"
                            >
                              <span className="font-lato text-xs">Change</span>
                            </button>
                          </div>
                        )}

                        <DeliveryCalendar selected={deliveryDate} onSelect={setDeliveryDate} />

                        <p className="font-lato text-[10px] text-muted-foreground mt-3 leading-relaxed">
                          Select a future date for delivery. Same-day delivery available for orders before 12 PM.
                        </p>
                      </div>
                    </ScrollReveal>

                    {/* ── Order Notes ── */}
                    <ScrollReveal delay={120}>
                      <div className="bg-white rounded-2xl border border-blush/25 shadow-sm p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <StickyNote className="w-4 h-4 text-burgundy" />
                          <h3 className="font-playfair text-base text-foreground">Order Notes</h3>
                        </div>
                        <textarea
                          value={orderNote}
                          onChange={(e) => setOrderNote(e.target.value)}
                          placeholder="Any special instructions? E.g., write a message on cake, allergy info, eggless option..."
                          rows={3}
                          className="w-full font-lato text-sm text-foreground placeholder:text-muted-foreground/50 border border-blush/40 rounded-xl px-4 py-3 outline-none focus:border-mauve focus:ring-1 focus:ring-mauve/30 transition-all resize-none bg-cream/30"
                        />
                        <p className="font-lato text-[10px] text-muted-foreground mt-2">{orderNote.length}/500 characters</p>
                      </div>
                    </ScrollReveal>

                    {/* ── Order Summary ── */}
                    <ScrollReveal delay={160}>
                      <div className="bg-white rounded-2xl border border-blush/25 shadow-sm p-5">
                        <h3 className="font-playfair text-base text-foreground mb-5">Order Summary</h3>

                        {/* Line items summary */}
                        <div className="flex flex-col gap-2.5 mb-4">
                          {items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between font-lato text-xs">
                              <span className="text-muted-foreground truncate max-w-[60%]">
                                {item.name} <span className="text-foreground font-semibold">x{item.quantity}</span>
                              </span>
                              <span className="text-foreground">{"\u20B9"}{(item.priceNum * item.quantity).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                            </div>
                          ))}
                        </div>

                        {/* mini wave inside summary */}
                        <div className="overflow-hidden leading-[0] -mx-5 my-3">
                          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full block" style={{ height: 10 }}>
                            <path fill="#fce4ec" d="M0,160 C180,280 360,40 540,160 C720,280 900,40 1080,160 C1200,240 1320,80 1440,160 L1440,320 L0,320 Z" />
                          </svg>
                        </div>
                        <div className="bg-blush/20 -mx-5 px-5 py-3">
                          <div className="flex justify-between font-lato text-sm mb-1">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="text-foreground">{"\u20B9"}{formattedTotal}</span>
                          </div>
                          <div className="flex justify-between font-lato text-xs mb-1">
                            <span className="text-muted-foreground">Shipping</span>
                            <span className="text-muted-foreground">Calculated at checkout</span>
                          </div>
                          <div className="flex justify-between font-lato text-xs">
                            <span className="text-muted-foreground">Taxes & Discounts</span>
                            <span className="text-muted-foreground">Calculated at checkout</span>
                          </div>
                        </div>
                        <div className="overflow-hidden leading-[0] -mx-5 mb-4">
                          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full block rotate-180" style={{ height: 10 }}>
                            <path fill="#fce4ec" d="M0,160 C180,280 360,40 540,160 C720,280 900,40 1080,160 C1200,240 1320,80 1440,160 L1440,320 L0,320 Z" />
                          </svg>
                        </div>

                        {/* Estimated Total */}
                        <div className="flex justify-between items-center mb-5">
                          <span className="font-playfair text-lg text-foreground">Estimated Total</span>
                          <span className="font-playfair text-2xl font-bold text-burgundy">
                            Rs. {formattedTotal}
                          </span>
                        </div>

                        <p className="font-lato text-[10px] text-muted-foreground text-center mb-4 leading-relaxed">
                          Taxes, discounts and shipping calculated at checkout
                        </p>

                        {/* Delivery date reminder */}
                        {deliveryDate && (
                          <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-cream/50 border border-blush/20">
                            <CalendarDays className="w-3.5 h-3.5 text-mauve shrink-0" />
                            <span className="font-lato text-[11px] text-foreground">
                              Delivery: {deliveryDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </span>
                          </div>
                        )}

                        {/* Checkout button */}
                        <Link
                          to="/checkout"
                          className="w-full bg-burgundy text-primary-foreground font-lato text-xs tracking-[0.2em] uppercase py-4 rounded-full hover:bg-mauve transition-colors duration-300 shadow-lg hover:shadow-xl block text-center"
                        >
                          Proceed to Checkout
                        </Link>

                        {/* Trust badges */}
                        <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-blush/20">
                          <div className="flex flex-col items-center text-center gap-1">
                            <Truck className="w-4 h-4 text-mauve" />
                            <p className="font-lato text-[9px] text-muted-foreground leading-tight">Free delivery<br />above {"\u20B9"}2,000</p>
                          </div>
                          <div className="flex flex-col items-center text-center gap-1">
                            <Gift className="w-4 h-4 text-mauve" />
                            <p className="font-lato text-[9px] text-muted-foreground leading-tight">Gift wrapping<br />available</p>
                          </div>
                          <div className="flex flex-col items-center text-center gap-1">
                            <ShieldCheck className="w-4 h-4 text-mauve" />
                            <p className="font-lato text-[9px] text-muted-foreground leading-tight">100% secure<br />checkout</p>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>

                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* wave: white → blush */}
        <MiniWave color="#fce4ec" bg="white" />
      </div>

      {/* ── YOU MAY ALSO LIKE ── */}
      <div style={{ background: "#fce4ec" }}>
        <MiniWave color="#f8bbd0" bg="#fce4ec" />
      </div>

      <div style={{ background: "#f8bbd0" }}>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <ScrollReveal className="text-center mb-8">
            <p className="font-lato text-xs tracking-[0.3em] uppercase text-mauve mb-2">
              Handpicked for You
            </p>
            <h2 className="font-playfair text-2xl md:text-3xl text-foreground">
              You May Also Like
            </h2>
            <div className="w-10 h-0.5 bg-mauve mx-auto mt-3" />
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {suggestedProducts.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 70}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-400 hover:-translate-y-1">
                  <div className="relative overflow-hidden h-40 sm:h-48">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {p.badge && (
                      <span className="absolute top-2 left-2 bg-mauve text-accent-foreground text-[9px] font-lato tracking-widest px-2 py-0.5 rounded-full">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-playfair text-sm text-foreground mb-0.5 truncate">{p.name}</h3>
                    <p className="text-mauve font-lato text-xs font-bold mb-2">{p.price}</p>
                    <button
                      onClick={() => addItem(p)}
                      className="w-full text-center bg-burgundy text-primary-foreground text-[10px] font-lato tracking-widest uppercase py-2 rounded-full hover:bg-mauve transition-colors duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <MiniWave color="white" bg="#f8bbd0" />
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
