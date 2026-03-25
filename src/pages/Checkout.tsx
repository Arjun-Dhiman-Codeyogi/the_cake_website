import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Lock,
  CreditCard,
  Truck,
  MapPin,
  Tag,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Check,
  Store,
  Mail,
  Phone,
  User,
  Building2,
  Minus,
  Plus,
  Trash2,
  Sparkles,
  Clock,
} from "lucide-react";
import WaveDivider from "@/components/WaveDivider";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

/* ── tiny wave ── */
const MiniWave = ({ color, bg }: { color: string; bg?: string }) => (
  <div className="w-full overflow-hidden leading-[0]" style={{ background: bg, marginTop: -1 }}>
    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full block" style={{ height: 12 }}>
      <path fill={color} d="M0,160 C180,280 360,40 540,160 C720,280 900,40 1080,160 C1200,240 1320,80 1440,160 L1440,320 L0,320 Z" />
    </svg>
  </div>
);

/* ── Step indicator ── */
const StepBadge = ({ num, label, active }: { num: number; label: string; active: boolean }) => (
  <div className="flex items-center gap-2">
    <span
      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-lato transition-all duration-300 ${
        active ? "bg-burgundy text-white shadow-lg scale-110" : "bg-white/60 text-burgundy/50 border border-burgundy/20"
      }`}
    >
      {num}
    </span>
    <span className={`font-lato text-sm tracking-wide hidden sm:inline ${active ? "text-burgundy font-semibold" : "text-burgundy/40"}`}>
      {label}
    </span>
  </div>
);

/* ── Indian states ── */
const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya",
  "Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal",
];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, increaseQty, decreaseQty, removeItem } = useCart();
  const { user, isLoggedIn, openAuthModal } = useAuth();

  /* redirect to cart if empty, or prompt login */
  useEffect(() => {
    if (items.length === 0) navigate("/cart", { replace: true });
  }, [items, navigate]);

  useEffect(() => {
    if (!isLoggedIn) openAuthModal();
  }, [isLoggedIn, openAuthModal]);

  /* ── form state ── */
  const [email, setEmail] = useState(user?.email ?? "");
  const [phoneNum, setPhoneNum] = useState(user?.phone ?? "");
  const [newsletter, setNewsletter] = useState(true);

  const [delivery, setDelivery] = useState<"ship" | "pickup">("pickup");

  const [firstName, setFirstName] = useState(user?.name?.split(" ")[0] ?? "");
  const [lastName, setLastName] = useState(user?.name?.split(" ").slice(1).join(" ") ?? "");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Maharashtra");
  const [pin, setPin] = useState("");
  const [billingPhone, setBillingPhone] = useState("");

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderCollapsed, setOrderCollapsed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isValidPhone = (v: string) => { const d = v.replace(/\D/g, ""); return d.length >= 10 && d.length <= 12; };

  const shipping = delivery === "ship" ? (totalPrice >= 2000 ? 0 : 99) : 0;
  const discount = couponApplied ? Math.round(totalPrice * 0.1) : 0;
  const grandTotal = totalPrice + shipping - discount;

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === "TPR10") {
      setCouponApplied(true);
    }
  };

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!email.trim()) errs.email = "Email is required.";
    else if (!isValidEmail(email.trim())) errs.email = "Please enter a valid email address.";
    if (phoneNum.trim() && !isValidPhone(phoneNum.trim())) errs.phone = "Phone number must be exactly 10 digits.";
    if (delivery === "ship") {
      if (!firstName.trim()) errs.firstName = "First name is required.";
      if (!address.trim()) errs.address = "Address is required.";
      if (!city.trim()) errs.city = "City is required.";
      if (!pin.trim()) errs.pin = "PIN code is required.";
      else if (!/^\d{6}$/.test(pin.trim())) errs.pin = "PIN code must be exactly 6 digits.";
    }
    if (billingPhone.trim() && !isValidPhone(billingPhone.trim())) errs.billingPhone = "Phone number must be exactly 10 digits.";
    setFormErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      alert("Redirecting to Razorpay payment gateway...");
    }, 1500);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-blush flex items-center justify-center flex-col gap-6">
        <Sparkles className="w-12 h-12 text-burgundy animate-pulse" />
        <p className="font-playfair text-2xl text-burgundy">Please sign in to continue</p>
        <button onClick={openAuthModal} className="px-8 py-3 bg-burgundy text-white rounded-full font-lato tracking-wider hover:bg-burgundy/90 transition">
          Sign In
        </button>
        <Link to="/" className="font-lato text-sm text-burgundy/60 hover:text-burgundy underline underline-offset-4">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── Header bar ── */}
      <header className="bg-burgundy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-blush transition group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-lato text-sm tracking-wider">Back to Home</span>
          </Link>
          <h1 className="font-playfair text-xl sm:text-2xl text-white tracking-wider">The Pink Rosette</h1>
          <div className="flex items-center gap-2 text-white/70">
            <Lock className="w-4 h-4" />
            <span className="font-lato text-xs tracking-widest uppercase hidden sm:inline">Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* ── Steps bar ── */}
      <div className="bg-blush/60 border-b border-burgundy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-center gap-4 sm:gap-8">
          <StepBadge num={1} label="Contact" active />
          <div className="w-8 sm:w-16 h-px bg-burgundy/20" />
          <StepBadge num={2} label="Delivery" active />
          <div className="w-8 sm:w-16 h-px bg-burgundy/20" />
          <StepBadge num={3} label="Payment" active />
        </div>
      </div>

      <WaveDivider height={40} color="#fce4ec" />

      {/* ── Main content ── */}
      <div className="bg-blush">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* ════════ LEFT COLUMN — FORM ════════ */}
            <div className="lg:col-span-7 space-y-8">

              {/* ── 1. Contact ── */}
              <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-burgundy/5 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-burgundy" />
                  </div>
                  <div>
                    <h2 className="font-playfair text-xl text-burgundy">Contact</h2>
                    <p className="font-lato text-xs text-burgundy/50 tracking-wide">Signed in as {user?.name}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="font-lato text-xs text-burgundy/70 tracking-wider uppercase mb-1 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-burgundy/30" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setFormErrors((p) => ({ ...p, email: "" })); }}
                        placeholder="you@example.com"
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-blush/30 font-lato text-sm text-burgundy placeholder-burgundy/30 focus:outline-none focus:ring-2 focus:ring-burgundy/20 transition ${formErrors.email ? "border-red-400" : "border-burgundy/15 focus:border-burgundy/30"}`}
                      />
                    </div>
                    {formErrors.email && <p className="font-lato text-xs text-red-500 mt-1">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label className="font-lato text-xs text-burgundy/70 tracking-wider uppercase mb-1 block">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-burgundy/30" />
                      <input
                        type="tel"
                        value={phoneNum}
                        onChange={(e) => { setPhoneNum(e.target.value); setFormErrors((p) => ({ ...p, phone: "" })); }}
                        placeholder="+91 98765 43210"
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-blush/30 font-lato text-sm text-burgundy placeholder-burgundy/30 focus:outline-none focus:ring-2 focus:ring-burgundy/20 transition ${formErrors.phone ? "border-red-400" : "border-burgundy/15 focus:border-burgundy/30"}`}
                      />
                    </div>
                    {formErrors.phone && <p className="font-lato text-xs text-red-500 mt-1">{formErrors.phone}</p>}
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={() => setNewsletter(!newsletter)}
                      className="w-4 h-4 rounded border-burgundy/30 text-burgundy focus:ring-burgundy/20 accent-burgundy"
                    />
                    <span className="font-lato text-sm text-burgundy/60 group-hover:text-burgundy transition">
                      Email me with news, offers & sweet surprises
                    </span>
                  </label>
                </div>
              </section>

              {/* ── 2. Delivery ── */}
              <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-burgundy/5" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-burgundy" />
                  </div>
                  <h2 className="font-playfair text-xl text-burgundy">Delivery</h2>
                </div>

                {/* Ship / Pickup toggle */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => setDelivery("ship")}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl font-lato text-sm tracking-wider transition-all duration-300 border-2 ${
                      delivery === "ship"
                        ? "border-burgundy bg-burgundy text-white shadow-md"
                        : "border-burgundy/15 bg-white text-burgundy/60 hover:border-burgundy/30"
                    }`}
                  >
                    <Truck className="w-4 h-4" /> Ship
                  </button>
                  <button
                    onClick={() => setDelivery("pickup")}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl font-lato text-sm tracking-wider transition-all duration-300 border-2 ${
                      delivery === "pickup"
                        ? "border-burgundy bg-burgundy text-white shadow-md"
                        : "border-burgundy/15 bg-white text-burgundy/60 hover:border-burgundy/30"
                    }`}
                  >
                    <Store className="w-4 h-4" /> Pickup
                  </button>
                </div>

                {delivery === "pickup" ? (
                  <div className="bg-gradient-to-br from-blush/50 to-white rounded-xl p-5 border border-burgundy/10">
                    <p className="font-lato text-xs text-burgundy/50 tracking-wider uppercase mb-3">
                      Pickup Location
                    </p>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-burgundy/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-burgundy" />
                      </div>
                      <div>
                        <h4 className="font-playfair text-base text-burgundy font-semibold">TPR Fort</h4>
                        <p className="font-lato text-sm text-burgundy/60 leading-relaxed mt-1">
                          9/15 Homi Modi Street, Kala Ghoda Fort,<br />
                          7 Raja Bahadur Mansion, Mumbai MH
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 font-lato text-xs font-medium">
                            <Check className="w-3 h-3" /> Free
                          </span>
                          <span className="inline-flex items-center gap-1 text-burgundy/50 font-lato text-xs">
                            <Clock className="w-3 h-3" /> Usually ready in 24 hours
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="font-lato text-xs text-burgundy/50">
                      {totalPrice >= 2000
                        ? "You qualify for free delivery!"
                        : `Add ₹${(2000 - totalPrice).toLocaleString("en-IN")} more for free delivery`}
                    </p>
                    {/* Shipping address will use billing address below */}
                  </div>
                )}
              </section>

              {/* ── 3. Payment ── */}
              <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-burgundy/5" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-burgundy" />
                  </div>
                  <div>
                    <h2 className="font-playfair text-xl text-burgundy">Payment</h2>
                    <p className="font-lato text-xs text-burgundy/50 tracking-wide">All transactions are secure and encrypted</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-burgundy/5 to-blush/40 rounded-xl p-5 border border-burgundy/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <input type="radio" checked readOnly className="accent-burgundy" />
                      <span className="font-lato text-sm text-burgundy font-medium">
                        Razorpay Secure
                      </span>
                    </div>
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="font-lato text-xs text-burgundy/50 mb-3">
                    UPI, Cards, International Cards, Wallets & Net Banking
                  </p>
                  {/* Payment icons row */}
                  <div className="flex flex-wrap gap-2">
                    {["UPI", "Visa", "Mastercard", "RuPay", "Paytm", "PhonePe", "GPay"].map((m) => (
                      <span key={m} className="px-3 py-1.5 rounded-lg bg-white border border-burgundy/10 font-lato text-xs text-burgundy/70 font-medium shadow-sm">
                        {m}
                      </span>
                    ))}
                    <span className="px-3 py-1.5 rounded-lg bg-white border border-burgundy/10 font-lato text-xs text-burgundy/40">
                      +10 more
                    </span>
                  </div>
                  <p className="font-lato text-xs text-burgundy/40 mt-4 italic">
                    You'll be redirected to Razorpay to complete your purchase securely.
                  </p>
                </div>
              </section>

              {/* ── 4. Billing Address ── */}
              <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-burgundy/5" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-burgundy" />
                  </div>
                  <h2 className="font-playfair text-xl text-burgundy">Billing Address</h2>
                </div>

                <div className="space-y-4">
                  {/* Country (locked) */}
                  <div>
                    <label className="font-lato text-xs text-burgundy/70 tracking-wider uppercase mb-1 block">Country</label>
                    <div className="w-full px-4 py-3 rounded-xl border border-burgundy/15 bg-blush/20 font-lato text-sm text-burgundy/70 flex items-center gap-2">
                      <span>🇮🇳</span> India
                    </div>
                  </div>

                  {/* Name row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-lato text-xs text-burgundy/70 tracking-wider uppercase mb-1 block">First Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-burgundy/30" />
                        <input
                          value={firstName}
                          onChange={(e) => { setFirstName(e.target.value); setFormErrors((p) => ({ ...p, firstName: "" })); }}
                          className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-blush/30 font-lato text-sm text-burgundy placeholder-burgundy/30 focus:outline-none focus:ring-2 focus:ring-burgundy/20 transition ${formErrors.firstName ? "border-red-400" : "border-burgundy/15 focus:border-burgundy/30"}`}
                          placeholder="First name"
                        />
                      </div>
                      {formErrors.firstName && <p className="font-lato text-xs text-red-500 mt-1">{formErrors.firstName}</p>}
                    </div>
                    <div>
                      <label className="font-lato text-xs text-burgundy/70 tracking-wider uppercase mb-1 block">Last Name</label>
                      <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-burgundy/15 bg-blush/30 font-lato text-sm text-burgundy placeholder-burgundy/30 focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy/30 transition"
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="font-lato text-xs text-burgundy/70 tracking-wider uppercase mb-1 block">Company (optional)</label>
                    <input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-burgundy/15 bg-blush/30 font-lato text-sm text-burgundy placeholder-burgundy/30 focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy/30 transition"
                      placeholder="Company name"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="font-lato text-xs text-burgundy/70 tracking-wider uppercase mb-1 block">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-burgundy/30" />
                      <input
                        value={address}
                        onChange={(e) => { setAddress(e.target.value); setFormErrors((p) => ({ ...p, address: "" })); }}
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-blush/30 font-lato text-sm text-burgundy placeholder-burgundy/30 focus:outline-none focus:ring-2 focus:ring-burgundy/20 transition ${formErrors.address ? "border-red-400" : "border-burgundy/15 focus:border-burgundy/30"}`}
                        placeholder="Street address"
                      />
                    </div>
                    {formErrors.address && <p className="font-lato text-xs text-red-500 mt-1">{formErrors.address}</p>}
                  </div>

                  {/* Apartment */}
                  <div>
                    <label className="font-lato text-xs text-burgundy/70 tracking-wider uppercase mb-1 block">Apartment, suite, etc. (optional)</label>
                    <input
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-burgundy/15 bg-blush/30 font-lato text-sm text-burgundy placeholder-burgundy/30 focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy/30 transition"
                      placeholder="Apt, floor, unit..."
                    />
                  </div>

                  {/* City / State / PIN row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-lato text-xs text-burgundy/70 tracking-wider uppercase mb-1 block">City</label>
                      <input
                        value={city}
                        onChange={(e) => { setCity(e.target.value); setFormErrors((p) => ({ ...p, city: "" })); }}
                        className={`w-full px-4 py-3 rounded-xl border bg-blush/30 font-lato text-sm text-burgundy placeholder-burgundy/30 focus:outline-none focus:ring-2 focus:ring-burgundy/20 transition ${formErrors.city ? "border-red-400" : "border-burgundy/15 focus:border-burgundy/30"}`}
                        placeholder="City"
                      />
                      {formErrors.city && <p className="font-lato text-xs text-red-500 mt-1">{formErrors.city}</p>}
                    </div>
                    <div>
                      <label className="font-lato text-xs text-burgundy/70 tracking-wider uppercase mb-1 block">State</label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-burgundy/15 bg-blush/30 font-lato text-sm text-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy/30 transition appearance-none"
                      >
                        {STATES.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="font-lato text-xs text-burgundy/70 tracking-wider uppercase mb-1 block">PIN Code</label>
                      <input
                        value={pin}
                        onChange={(e) => { setPin(e.target.value); setFormErrors((p) => ({ ...p, pin: "" })); }}
                        className={`w-full px-4 py-3 rounded-xl border bg-blush/30 font-lato text-sm text-burgundy placeholder-burgundy/30 focus:outline-none focus:ring-2 focus:ring-burgundy/20 transition ${formErrors.pin ? "border-red-400" : "border-burgundy/15 focus:border-burgundy/30"}`}
                        placeholder="400001"
                        maxLength={6}
                      />
                      {formErrors.pin && <p className="font-lato text-xs text-red-500 mt-1">{formErrors.pin}</p>}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="font-lato text-xs text-burgundy/70 tracking-wider uppercase mb-1 block">Phone (optional)</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-burgundy/30" />
                      <input
                        value={billingPhone}
                        onChange={(e) => { setBillingPhone(e.target.value); setFormErrors((p) => ({ ...p, billingPhone: "" })); }}
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-blush/30 font-lato text-sm text-burgundy placeholder-burgundy/30 focus:outline-none focus:ring-2 focus:ring-burgundy/20 transition ${formErrors.billingPhone ? "border-red-400" : "border-burgundy/15 focus:border-burgundy/30"}`}
                        placeholder="+91 ..."
                      />
                    </div>
                    {formErrors.billingPhone && <p className="font-lato text-xs text-red-500 mt-1">{formErrors.billingPhone}</p>}
                  </div>
                </div>
              </section>

              {/* ── Submit ── */}
              <button
                onClick={handleSubmit}
                disabled={processing}
                className="w-full py-4 rounded-2xl bg-burgundy text-white font-playfair text-lg tracking-wider shadow-xl hover:shadow-2xl hover:bg-burgundy/90 active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {processing ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Pay ₹{grandTotal.toLocaleString("en-IN")}
                  </>
                )}
              </button>

              <p className="text-center font-lato text-xs text-burgundy/40 -mt-4">
                By completing this order, you agree to our terms of service and privacy policy.
              </p>
            </div>

            {/* ════════ RIGHT COLUMN — ORDER SUMMARY ════════ */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-8 space-y-6">
                {/* Order summary card */}
                <div className="bg-white rounded-2xl shadow-sm border border-burgundy/5 overflow-hidden">
                  {/* Header */}
                  <button
                    onClick={() => setOrderCollapsed(!orderCollapsed)}
                    className="w-full px-6 py-5 flex items-center justify-between bg-gradient-to-r from-burgundy/5 to-blush/30 lg:cursor-default"
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-burgundy" />
                      <h2 className="font-playfair text-lg text-burgundy">Order Summary</h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-playfair text-lg text-burgundy font-semibold">
                        ₹{grandTotal.toLocaleString("en-IN")}
                      </span>
                      <span className="lg:hidden">
                        {orderCollapsed ? <ChevronDown className="w-5 h-5 text-burgundy/50" /> : <ChevronUp className="w-5 h-5 text-burgundy/50" />}
                      </span>
                    </div>
                  </button>

                  {/* Body */}
                  <div className={`${orderCollapsed ? "hidden lg:block" : "block"}`}>
                    {/* Items */}
                    <div className="px-6 py-4 space-y-4 max-h-[400px] overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-4 group">
                          <div className="relative flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-xl border border-burgundy/10"
                            />
                            <span className="absolute -top-2 -right-2 w-6 h-6 bg-burgundy text-white text-xs rounded-full flex items-center justify-center font-lato font-bold shadow">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-playfair text-sm text-burgundy font-semibold truncate">
                              {item.name}
                            </h4>
                            {item.badge && (
                              <span className="inline-block px-2 py-0.5 mt-1 rounded-full bg-burgundy/10 text-burgundy/60 font-lato text-[10px] tracking-wider uppercase">
                                {item.badge}
                              </span>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              <button onClick={() => decreaseQty(item.id)} className="w-6 h-6 rounded-md border border-burgundy/15 flex items-center justify-center hover:bg-burgundy hover:text-white transition">
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-lato text-sm text-burgundy min-w-[20px] text-center">{item.quantity}</span>
                              <button onClick={() => increaseQty(item.id)} className="w-6 h-6 rounded-md border border-burgundy/15 flex items-center justify-center hover:bg-burgundy hover:text-white transition">
                                <Plus className="w-3 h-3" />
                              </button>
                              <button onClick={() => removeItem(item.id)} className="ml-auto opacity-0 group-hover:opacity-100 transition text-burgundy/30 hover:text-red-500">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="font-lato text-sm text-burgundy font-medium whitespace-nowrap">
                            ₹{(item.priceNum * item.quantity).toLocaleString("en-IN")}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Coupon */}
                    <div className="px-6 py-4 border-t border-burgundy/5">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-burgundy/30" />
                          <input
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            placeholder="Discount code"
                            disabled={couponApplied}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-burgundy/15 bg-blush/20 font-lato text-sm text-burgundy placeholder-burgundy/30 focus:outline-none focus:ring-2 focus:ring-burgundy/20 transition disabled:opacity-50"
                          />
                        </div>
                        <button
                          onClick={handleApplyCoupon}
                          disabled={couponApplied || !coupon.trim()}
                          className="px-5 py-2.5 rounded-xl bg-burgundy text-white font-lato text-sm tracking-wider hover:bg-burgundy/90 transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {couponApplied ? <Check className="w-4 h-4" /> : "Apply"}
                        </button>
                      </div>
                      {couponApplied && (
                        <p className="font-lato text-xs text-green-600 mt-2 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Code TPR10 applied — 10% off!
                        </p>
                      )}
                      {!couponApplied && (
                        <p className="font-lato text-[10px] text-burgundy/30 mt-2">
                          Try "TPR10" for 10% off your first order
                        </p>
                      )}
                    </div>

                    {/* Totals */}
                    <div className="px-6 py-4 border-t border-burgundy/5 space-y-3">
                      <div className="flex justify-between font-lato text-sm text-burgundy/70">
                        <span>Subtotal</span>
                        <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between font-lato text-sm text-green-600">
                          <span>Discount (10%)</span>
                          <span>-₹{discount.toLocaleString("en-IN")}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-lato text-sm text-burgundy/70">
                        <span>{delivery === "pickup" ? "Pickup in store" : "Shipping"}</span>
                        <span className={shipping === 0 ? "text-green-600" : ""}>
                          {shipping === 0 ? "Free" : `₹${shipping}`}
                        </span>
                      </div>
                    </div>

                    {/* Grand Total */}
                    <div className="px-6 py-5 bg-gradient-to-r from-burgundy/5 to-blush/30 flex justify-between items-center">
                      <span className="font-playfair text-lg text-burgundy">Total</span>
                      <div className="text-right">
                        <span className="font-lato text-xs text-burgundy/40 tracking-wider mr-2">INR</span>
                        <span className="font-playfair text-2xl text-burgundy font-bold">
                          ₹{grandTotal.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { icon: ShieldCheck, label: "Secure\nCheckout", color: "text-green-600" },
                    { icon: Truck, label: "Free Delivery\n₹2,000+", color: "text-burgundy" },
                    { icon: Sparkles, label: "Premium\nPackaging", color: "text-amber-600" },
                  ].map(({ icon: Icon, label, color }) => (
                    <div key={label} className="bg-white rounded-xl p-3 sm:p-4 border border-burgundy/5 shadow-sm text-center">
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 ${color}`} />
                      <p className="font-lato text-[10px] text-burgundy/60 leading-tight whitespace-pre-line">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Back to cart link */}
                <Link
                  to="/cart"
                  className="flex items-center justify-center gap-2 text-burgundy/50 hover:text-burgundy font-lato text-sm tracking-wider transition group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Return to cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MiniWave color="#6b1935" bg="#fce4ec" />
      <Footer />
    </div>
  );
};

export default Checkout;
