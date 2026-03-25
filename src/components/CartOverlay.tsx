import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  X,
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
  Home,
  Search,
} from "lucide-react";
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

/* ─── Calendar helpers ─── */
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WEEK = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y: number, m: number) { return new Date(y, m, 1).getDay(); }
function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function pastDay(d: Date, t: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()) < new Date(t.getFullYear(), t.getMonth(), t.getDate());
}

const MiniCalendar = ({ selected, onSelect }: { selected: Date | null; onSelect: (d: Date) => void }) => {
  const today = useMemo(() => new Date(), []);
  const [vY, setVY] = useState(today.getFullYear());
  const [vM, setVM] = useState(today.getMonth());
  const days = getDaysInMonth(vY, vM);
  const first = getFirstDay(vY, vM);
  const canPrev = vY > today.getFullYear() || (vY === today.getFullYear() && vM > today.getMonth());

  const prev = () => { if (vM === 0) { setVM(11); setVY(y => y - 1); } else setVM(m => m - 1); };
  const next = () => { if (vM === 11) { setVM(0); setVY(y => y + 1); } else setVM(m => m + 1); };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <button onClick={prev} disabled={!canPrev} className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-blush/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <span className="font-lato text-xs font-semibold text-foreground tracking-wide">{MONTHS[vM]} {vY}</span>
        <button onClick={next} className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-blush/40 transition-colors">
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 mb-0.5">
        {WEEK.map(d => <div key={d} className="text-center font-lato text-[9px] tracking-wider text-muted-foreground uppercase">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: first }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: days }).map((_, i) => {
          const day = i + 1;
          const date = new Date(vY, vM, day);
          const past = pastDay(date, today);
          const isToday = sameDay(date, today);
          const isSel = selected && sameDay(date, selected);
          return (
            <button key={day} disabled={past} onClick={() => onSelect(date)}
              className={`w-full aspect-square rounded font-lato text-[11px] flex items-center justify-center transition-all duration-150
                ${past ? "text-muted-foreground/25 cursor-not-allowed" : "hover:bg-blush/50 cursor-pointer"}
                ${isToday && !isSel ? "border border-mauve/40 text-mauve font-bold" : ""}
                ${isSel ? "bg-burgundy text-white font-bold shadow-sm" : "text-foreground"}`}
            >{day}</button>
          );
        })}
      </div>
    </div>
  );
};

/* ─── Suggested products ─── */
const suggestions = [
  { name: "Rose Macarons (Box of 6)", price: "\u20B9750", image: "https://images.unsplash.com/photo-1558326567-98ae2405596b?w=400&q=80", badge: "Bestseller", category: "Gourmet" },
  { name: "Classic Chocolate Truffle", price: "\u20B91,800", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80", badge: "Bestseller", category: "Signature Cakes" },
  { name: "Blueberry Cheesecake", price: "\u20B91,400", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80", badge: "Signature", category: "Tarts & Cheesecakes" },
  { name: "Red Velvet Royale", price: "\u20B92,200", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&q=80", badge: "Signature", category: "Signature Cakes" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Fleur Delice", href: "/fleur-delice" },
  { label: "TPR Bespoke", href: "/tpr-bespoke" },
  { label: "Gourmet", href: "/gourmet" },
  { label: "Customise", href: "/customise" },
  { label: "Our Cafes", href: "/our-cafes" },
  { label: "Contact", href: "/get-in-touch" },
];

/* ═══════════════════════════════════════════════ */
/*              FULL-SCREEN CART OVERLAY           */
/* ═══════════════════════════════════════════════ */

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartOverlay = ({ isOpen, onClose }: CartOverlayProps) => {
  const { items, increaseQty, decreaseQty, removeItem, clearCart, addItem, totalItems, totalPrice } = useCart();
  const [orderNote, setOrderNote] = useState("");
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);

  const formattedTotal = totalPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-fade-in">

      {/* ═══ NAVBAR ═══ */}
      <header className="shrink-0 bg-cream/95 backdrop-blur-md shadow-md py-3 z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
          {/* Logo */}
          <Link to="/" onClick={onClose} className="flex flex-col items-start shrink-0 leading-none">
            <span className="font-playfair text-[10px] sm:text-xs tracking-[0.3em] uppercase text-burgundy font-bold leading-tight">The</span>
            <span className="font-playfair text-[18px] sm:text-[23px] tracking-[0.12em] sm:tracking-[0.15em] uppercase text-burgundy font-extrabold leading-tight">Pink Rosette</span>
            <span className="font-lato text-[7px] sm:text-[8px] tracking-[0.3em] sm:tracking-[0.35em] uppercase text-mauve font-bold self-end leading-tight">ESTD.2018</span>
          </Link>

          {/* Links — desktop */}
          <ul className="hidden lg:flex gap-5 items-center justify-center flex-1">
            {navLinks.map(l => (
              <li key={l.href}>
                <Link to={l.href} onClick={onClose}
                  className="font-lato text-[11px] tracking-widest uppercase text-foreground hover:text-mauve transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right icons */}
          <div className="flex items-center gap-3 ml-auto">
            <Link to="/" onClick={onClose} className="lg:hidden text-foreground hover:text-mauve transition-colors">
              <Home className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="w-5 h-5 text-burgundy" />
              {totalItems > 0 && (
                <span className="bg-burgundy text-white text-[10px] font-lato font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-blush/40 flex items-center justify-center transition-colors" aria-label="Close cart">
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </nav>
      </header>

      {/* ═══ SCROLLABLE CONTENT ═══ */}
      <div className="flex-1 overflow-y-auto">

        {/* ── Hero banner ── */}
        <div className="bg-gradient-to-r from-burgundy via-mauve to-burgundy py-8 text-center">
          <ShoppingBag className="w-7 h-7 text-blush mx-auto mb-1.5" />
          <h1 className="font-playfair text-2xl md:text-3xl text-primary-foreground">Your Cart</h1>
          <p className="font-lato text-[11px] text-primary-foreground/70 mt-1 tracking-wider uppercase">
            {totalItems === 0 ? "Your cart is waiting to be filled" : `${totalItems} item${totalItems !== 1 ? "s" : ""} ready for checkout`}
          </p>
        </div>

        {/* wave: hero → blush */}
        <MiniWave color="#fce4ec" />

        {/* ── MAIN CONTENT ── */}
        <div style={{ background: "#fce4ec" }}>
          <MiniWave color="white" bg="#fce4ec" />

          <div style={{ background: "white" }}>
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

              {items.length === 0 ? (
                /* ── EMPTY ── */
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-blush/30 flex items-center justify-center mx-auto mb-5">
                    <ShoppingBag className="w-10 h-10 text-mauve" />
                  </div>
                  <h2 className="font-playfair text-2xl text-foreground mb-2">Your cart is empty</h2>
                  <p className="font-lato text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                    Explore our handcrafted cakes, tarts, and savoury delights.
                  </p>
                  <Link to="/tpr-bespoke" onClick={onClose}
                    className="inline-block bg-burgundy text-primary-foreground font-lato text-xs tracking-widest uppercase px-8 py-3 rounded-full hover:bg-mauve transition-colors duration-300">
                    Explore Collections
                  </Link>
                </div>
              ) : (
                /* ── CART ITEMS + SIDEBAR ── */
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                  {/* LEFT — Items (3 cols) */}
                  <div className="lg:col-span-3">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-playfair text-xl text-foreground">
                        Cart Items <span className="font-lato text-sm text-muted-foreground">({totalItems})</span>
                      </h2>
                      <button onClick={clearCart}
                        className="font-lato text-xs tracking-wider text-muted-foreground hover:text-burgundy transition-colors flex items-center gap-1">
                        <Trash2 className="w-3.5 h-3.5" /> Clear All
                      </button>
                    </div>

                    {/* Item cards */}
                    <div className="flex flex-col gap-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white border border-blush/25 shadow-sm hover:shadow-md transition-all duration-300">
                          {/* Image */}
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 shadow-sm">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0 flex flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-playfair text-sm sm:text-base text-foreground leading-snug">{item.name}</h3>
                                <p className="font-lato text-[10px] text-muted-foreground mt-0.5">{item.category}</p>
                                {item.badge && (
                                  <span className="inline-block mt-1 font-lato text-[9px] tracking-wider bg-mauve/15 text-mauve px-1.5 py-0.5 rounded-full">{item.badge}</span>
                                )}
                              </div>
                              <button onClick={() => removeItem(item.id)} title="Remove"
                                className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground/40 hover:bg-red-50 hover:text-red-500 transition-all shrink-0">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <p className="font-lato text-[11px] text-muted-foreground mt-1.5">
                              Unit: <span className="text-foreground font-semibold">{item.price}</span>
                            </p>

                            <div className="flex items-center justify-between mt-auto pt-2">
                              <div className="flex items-center gap-2">
                                <button onClick={() => decreaseQty(item.id)}
                                  className="w-7 h-7 rounded-full border border-blush/60 flex items-center justify-center text-foreground hover:bg-burgundy hover:text-white hover:border-burgundy transition-all duration-200">
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-lato text-sm font-bold text-foreground w-6 text-center select-none">{item.quantity}</span>
                                <button onClick={() => increaseQty(item.id)}
                                  className="w-7 h-7 rounded-full border border-blush/60 flex items-center justify-center text-foreground hover:bg-burgundy hover:text-white hover:border-burgundy transition-all duration-200">
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <p className="font-playfair text-base sm:text-lg font-bold text-burgundy">
                                {"\u20B9"}{(item.priceNum * item.quantity).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button onClick={onClose}
                      className="inline-flex items-center gap-2 mt-5 font-lato text-xs tracking-wider text-mauve hover:text-burgundy transition-colors uppercase">
                      <ArrowLeft className="w-4 h-4" /> Continue Shopping
                    </button>
                  </div>

                  {/* RIGHT — Order details (2 cols) */}
                  <div className="lg:col-span-2 flex flex-col gap-4">

                    {/* Delivery Date */}
                    <div className="bg-white rounded-2xl border border-blush/25 shadow-sm p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <CalendarDays className="w-4 h-4 text-burgundy" />
                        <h3 className="font-playfair text-sm text-foreground">Delivery Date</h3>
                      </div>
                      {deliveryDate && (
                        <div className="mb-2 px-3 py-1.5 rounded-lg bg-blush/25 flex items-center justify-between">
                          <span className="font-lato text-xs text-foreground">
                            {deliveryDate.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric" })}
                          </span>
                          <button onClick={() => setDeliveryDate(null)} className="font-lato text-[10px] text-muted-foreground hover:text-burgundy transition-colors">Change</button>
                        </div>
                      )}
                      <MiniCalendar selected={deliveryDate} onSelect={setDeliveryDate} />
                      <p className="font-lato text-[9px] text-muted-foreground mt-2">Same-day delivery for orders before 12 PM.</p>
                    </div>

                    {/* Order Notes */}
                    <div className="bg-white rounded-2xl border border-blush/25 shadow-sm p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <StickyNote className="w-4 h-4 text-burgundy" />
                        <h3 className="font-playfair text-sm text-foreground">Order Notes</h3>
                      </div>
                      <textarea value={orderNote} onChange={e => setOrderNote(e.target.value)}
                        placeholder="Special instructions, message on cake, allergy info..."
                        rows={3} maxLength={500}
                        className="w-full font-lato text-xs text-foreground placeholder:text-muted-foreground/50 border border-blush/40 rounded-xl px-3 py-2.5 outline-none focus:border-mauve focus:ring-1 focus:ring-mauve/30 transition-all resize-none bg-cream/30"
                      />
                      <p className="font-lato text-[9px] text-muted-foreground mt-1">{orderNote.length}/500</p>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-2xl border border-blush/25 shadow-sm p-4">
                      <h3 className="font-playfair text-sm text-foreground mb-4">Order Summary</h3>

                      {/* Line items */}
                      <div className="flex flex-col gap-2 mb-3">
                        {items.map(item => (
                          <div key={item.id} className="flex items-center justify-between font-lato text-[11px]">
                            <span className="text-muted-foreground truncate max-w-[60%]">{item.name} <span className="text-foreground font-semibold">x{item.quantity}</span></span>
                            <span className="text-foreground">{"\u20B9"}{(item.priceNum * item.quantity).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                          </div>
                        ))}
                      </div>

                      {/* mini wave divider */}
                      <div className="overflow-hidden leading-[0] -mx-4 my-2">
                        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full block" style={{ height: 10 }}>
                          <path fill="#fce4ec" d="M0,160 C180,280 360,40 540,160 C720,280 900,40 1080,160 C1200,240 1320,80 1440,160 L1440,320 L0,320 Z" />
                        </svg>
                      </div>
                      <div className="bg-blush/20 -mx-4 px-4 py-2.5">
                        <div className="flex justify-between font-lato text-xs mb-0.5">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span className="text-foreground">{"\u20B9"}{formattedTotal}</span>
                        </div>
                        <div className="flex justify-between font-lato text-[10px] mb-0.5">
                          <span className="text-muted-foreground">Shipping</span>
                          <span className="text-muted-foreground">Calculated at checkout</span>
                        </div>
                        <div className="flex justify-between font-lato text-[10px]">
                          <span className="text-muted-foreground">Taxes & Discounts</span>
                          <span className="text-muted-foreground">Calculated at checkout</span>
                        </div>
                      </div>
                      <div className="overflow-hidden leading-[0] -mx-4 mb-3">
                        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full block rotate-180" style={{ height: 10 }}>
                          <path fill="#fce4ec" d="M0,160 C180,280 360,40 540,160 C720,280 900,40 1080,160 C1200,240 1320,80 1440,160 L1440,320 L0,320 Z" />
                        </svg>
                      </div>

                      {/* Estimated Total */}
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-playfair text-base text-foreground">Estimated Total</span>
                        <span className="font-playfair text-xl font-bold text-burgundy">Rs. {formattedTotal}</span>
                      </div>

                      <p className="font-lato text-[9px] text-muted-foreground text-center mb-3">
                        Taxes, discounts and shipping calculated at checkout
                      </p>

                      {deliveryDate && (
                        <div className="flex items-center gap-1.5 mb-3 px-2.5 py-1.5 rounded-lg bg-cream/50 border border-blush/20">
                          <CalendarDays className="w-3 h-3 text-mauve shrink-0" />
                          <span className="font-lato text-[10px] text-foreground">
                            Delivery: {deliveryDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        </div>
                      )}

                      {/* Checkout */}
                      <Link
                        to="/checkout"
                        onClick={onClose}
                        className="w-full bg-burgundy text-primary-foreground font-lato text-xs tracking-[0.2em] uppercase py-3.5 rounded-full hover:bg-mauve transition-colors duration-300 shadow-lg hover:shadow-xl block text-center"
                      >
                        Proceed to Checkout
                      </Link>

                      {/* Trust badges */}
                      <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-blush/20">
                        <div className="flex flex-col items-center text-center gap-0.5">
                          <Truck className="w-3.5 h-3.5 text-mauve" />
                          <p className="font-lato text-[8px] text-muted-foreground leading-tight">Free delivery<br/>above {"\u20B9"}2,000</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-0.5">
                          <Gift className="w-3.5 h-3.5 text-mauve" />
                          <p className="font-lato text-[8px] text-muted-foreground leading-tight">Gift wrapping<br/>available</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-0.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-mauve" />
                          <p className="font-lato text-[8px] text-muted-foreground leading-tight">100% secure<br/>checkout</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          <MiniWave color="#fce4ec" bg="white" />
        </div>

        {/* ── YOU MAY ALSO LIKE ── */}
        <div style={{ background: "#fce4ec" }}>
          <MiniWave color="#f8bbd0" bg="#fce4ec" />
        </div>
        <div style={{ background: "#f8bbd0" }}>
          <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="text-center mb-6">
              <p className="font-lato text-xs tracking-[0.3em] uppercase text-mauve mb-1">Handpicked for You</p>
              <h2 className="font-playfair text-xl md:text-2xl text-foreground">You May Also Like</h2>
              <div className="w-8 h-0.5 bg-mauve mx-auto mt-2" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {suggestions.map((p) => (
                <div key={p.name} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative overflow-hidden h-32 sm:h-40">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    {p.badge && (
                      <span className="absolute top-2 left-2 bg-mauve text-accent-foreground text-[8px] font-lato tracking-widest px-1.5 py-0.5 rounded-full">{p.badge}</span>
                    )}
                  </div>
                  <div className="p-2.5">
                    <h3 className="font-playfair text-xs text-foreground mb-0.5 truncate">{p.name}</h3>
                    <p className="text-mauve font-lato text-[11px] font-bold mb-2">{p.price}</p>
                    <button onClick={() => addItem(p)}
                      className="w-full text-center bg-burgundy text-primary-foreground text-[9px] font-lato tracking-widest uppercase py-1.5 rounded-full hover:bg-mauve transition-colors duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <MiniWave color="white" bg="#f8bbd0" />
        </div>

        {/* ── Mini footer ── */}
        <div className="bg-white py-6 text-center border-t border-blush/20">
          <p className="font-lato text-[10px] text-muted-foreground tracking-wider uppercase">
            The Pink Rosette &middot; Est. 2018 &middot; Mumbai
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartOverlay;
