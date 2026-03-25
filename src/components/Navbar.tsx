import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, ShoppingBag, ChevronDown, LogOut } from "lucide-react";
import SearchOverlay from "./SearchOverlay";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const leftLinks = [
  { label: "Fleur Delice", href: "/fleur-delice" },
  {
    label: "TPR Bespoke",
    href: "/tpr-bespoke",
    dropdown: [
      { label: "Signature Cakes", href: "/signature-cakes" },
      { label: "Signature Tarts & Cheesecakes", href: "/signature-tarts" },
      { label: "Signature Savoury Quiches & Pies", href: "/signature-savoury" },
    ],
  },
  { label: "Gourmet", href: "/gourmet" },
];

const rightLinks = [
  { label: "Customise", href: "/customise" },
  { label: "Our Cafes", href: "/our-cafes" },
  { label: "Contact", href: "/get-in-touch" },
];

type NavLink = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { totalItems } = useCart();
  const { user, isLoggedIn, logout, openAuthModal } = useAuth();

  /* ── Brand glow cursor tracker ── */
  const brandRef = useRef<HTMLAnchorElement>(null);
  const [glow, setGlow] = useState({ x: 0, y: 0, active: false });

  const handleBrandMove = useCallback((e: React.MouseEvent) => {
    const rect = brandRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  }, []);

  const handleBrandLeave = useCallback(() => {
    setGlow((g) => ({ ...g, active: false }));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropdownOpen(null);
    setMobileExpanded(null);
    setUserMenuOpen(false);
  }, [location]);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(null), 250);
  };

  const renderLink = (l: NavLink) => {
    const hasDropdown = l.dropdown && l.dropdown.length > 0;
    const isDropdownOpen = dropdownOpen === l.label;
    const isActive = location.pathname === l.href;

    if (hasDropdown) {
      return (
        <li
          key={l.href}
          className="relative"
          onMouseEnter={() => handleMouseEnter(l.label)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="group/link relative font-lato text-xs tracking-widest uppercase transition-all duration-300 text-foreground inline-flex items-center gap-1 py-1 cursor-pointer">
            <Link
              to={l.href}
              className={`relative z-10 transition-all duration-300 group-hover/link:text-white ${isActive ? "text-white" : ""}`}
            >
              {l.label}
            </Link>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setDropdownOpen(isDropdownOpen ? null : l.label); }}
              className="relative z-10 p-0.5"
            >
              <ChevronDown
                className={`w-3 h-3 transition-all duration-300 group-hover/link:text-white ${isDropdownOpen ? "rotate-180" : ""} ${isActive ? "text-white" : ""}`}
              />
            </button>
            {/* 3D pill bg */}
            <span
              className={`absolute inset-0 -mx-3 -my-1 rounded-full transition-all duration-300 ${isActive
                ? "bg-burgundy scale-100 opacity-100 shadow-[0_4px_15px_rgba(107,25,53,0.4)]"
                : "bg-burgundy scale-75 opacity-0 group-hover/link:scale-100 group-hover/link:opacity-100 group-hover/link:shadow-[0_4px_15px_rgba(107,25,53,0.4)]"
                }`}
              style={{ transform: isActive ? "translateZ(0) scale(1)" : undefined, transformStyle: "preserve-3d" }}
            />
          </div>
        </li>
      );
    }

    return (
      <li key={l.href}>
        <Link
          to={l.href}
          className="group/link relative font-lato text-xs tracking-widest uppercase transition-all duration-300 text-foreground py-1 inline-block"
        >
          <span className={`relative z-10 transition-all duration-300 group-hover/link:text-white ${isActive ? "text-white" : ""}`}>
            {l.label}
          </span>
          {/* 3D pill bg */}
          <span
            className={`absolute inset-0 -mx-3 -my-1 rounded-full transition-all duration-300 ${isActive
              ? "bg-burgundy scale-100 opacity-100 shadow-[0_4px_15px_rgba(107,25,53,0.4)]"
              : "bg-burgundy scale-75 opacity-0 group-hover/link:scale-100 group-hover/link:opacity-100 group-hover/link:shadow-[0_4px_15px_rgba(107,25,53,0.4)]"
              }`}
          />
        </Link>
      </li>
    );
  };

  const renderMobileLink = (l: NavLink) => {
    const hasDropdown = l.dropdown && l.dropdown.length > 0;
    const isExpanded = mobileExpanded === l.label;

    if (hasDropdown) {
      return (
        <li key={l.href}>
          <div className="flex items-center justify-between">
            <Link
              to={l.href}
              className="font-lato text-sm tracking-widest uppercase text-foreground hover:text-mauve transition-colors"
            >
              {l.label}
            </Link>
            <button
              onClick={() => setMobileExpanded(isExpanded ? null : l.label)}
              className="p-1 text-foreground hover:text-mauve transition-colors"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
          {isExpanded && (
            <ul className="ml-4 mt-3 flex flex-col gap-3 border-l-2 border-blush pl-4">
              {l.dropdown!.map((sub) => (
                <li key={sub.href}>
                  <Link
                    to={sub.href}
                    className={`font-lato text-xs tracking-wider text-muted-foreground hover:text-burgundy transition-colors ${location.pathname === sub.href ? "text-burgundy font-semibold" : ""
                      }`}
                  >
                    {sub.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    }

    return (
      <li key={l.href}>
        <Link
          to={l.href}
          className="font-lato text-sm tracking-widest uppercase text-foreground hover:text-mauve transition-colors"
        >
          {l.label}
        </Link>
      </li>
    );
  };

  const CartButton = ({ className = "" }: { className?: string }) => (
    <button
      aria-label="Cart"
      onClick={() => navigate("/cart")}
      className={`relative text-foreground hover:text-mauve transition-all duration-300 hover:scale-110 ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <ShoppingBag className="w-5 h-5" style={{ filter: "drop-shadow(0 2px 4px rgba(107,25,53,0.2))" }} />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-burgundy text-white text-[10px] font-lato font-bold rounded-full flex items-center justify-center animate-scale-in shadow-[0_2px_8px_rgba(107,25,53,0.5)]">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </button>
  );

  /* Scallop SVG path: 20 semi-circles across 1000-unit viewBox */
  const scallops = 20;
  const sw = 1000 / scallops;
  const scallopD =
    `M0,0 L1000,0 L1000,2 ` +
    Array.from({ length: scallops }, (_, i) => {
      const x1 = 1000 - i * sw;
      const x2 = x1 - sw;
      const mx = (x1 + x2) / 2;
      return `Q${x1},2 ${x1},8 Q${x1},16 ${mx},16 Q${x2},16 ${x2},8 Q${x2},2 ${x2},2`;
    }).join(" ") +
    ` L0,2 Z`;

  /* ── Find TPR Bespoke for its dropdown data ── */
  const tprLink = leftLinks.find((l) => l.dropdown);
  const tprDropdownOpen = dropdownOpen === tprLink?.label;

  return (
    <>
      <header
        className="w-[100vw] fixed top-0 left-0 right-0 z-50"
        style={{ perspective: "1200px" }}
      >
        {/* ── Navbar body ── */}
        <div
          className={`transition-all duration-500 ${scrolled
            ? "bg-cream backdrop-blur-xl py-2"
            : "bg-cream backdrop-blur-md py-3"
            }`}
        >
          <nav className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center">
            {/* ── Brand logo with cursor-following glow ── */}
            <Link
              to="/"
              ref={brandRef}
              className="relative flex flex-col items-start shrink-0 leading-none overflow-hidden rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 -mx-2 sm:-mx-3 -my-1.5 sm:-my-2 group/brand"
              onMouseMove={handleBrandMove}
              onMouseLeave={handleBrandLeave}
              style={{ transformStyle: "preserve-3d" }}
            >
              <span
                className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-300"
                style={{
                  background: glow.active
                    ? `radial-gradient(circle 80px at ${glow.x}px ${glow.y}px, rgba(248,187,208,0.6) 0%, rgba(194,24,91,0.15) 40%, transparent 70%)`
                    : "transparent",
                  opacity: glow.active ? 1 : 0,
                }}
              />
              <span
                className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300"
                style={{
                  boxShadow: glow.active
                    ? `inset 0 0 0 1.5px rgba(248,187,208,0.4), 0 0 20px rgba(194,24,91,0.1)`
                    : "inset 0 0 0 1.5px transparent",
                }}
              />
              <span
                className="font-playfair text-[10px] sm:text-sm tracking-[0.3em] uppercase text-burgundy font-bold leading-tight relative z-10 transition-all duration-300 group-hover/brand:tracking-[0.35em]"
                style={{ textShadow: glow.active ? "0 2px 10px rgba(107,25,53,0.15)" : "none" }}
              >
                The
              </span>
              <span
                className="font-playfair text-[18px] sm:text-[27px] tracking-[0.12em] sm:tracking-[0.15em] uppercase text-burgundy font-extrabold leading-tight relative z-10 transition-all duration-300 group-hover/brand:tracking-[0.18em]"
                style={{ textShadow: glow.active ? "0 4px 20px rgba(107,25,53,0.2)" : "none" }}
              >
                Pink Rosette
              </span>
              <span
                className="font-lato text-[7px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase text-mauve font-bold self-end leading-tight relative z-10 transition-all duration-300"
                style={{ textShadow: glow.active ? "0 2px 8px rgba(194,24,91,0.2)" : "none" }}
              >
                ESTD.2018
              </span>
            </Link>

            {/* ── Nav links — 3D pill hover ── */}
            <ul className="hidden lg:flex gap-7 items-center justify-center flex-1">
              {[...leftLinks, ...rightLinks].map((l) => renderLink(l))}
            </ul>

            {/* ── Desktop right icons ── */}
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              <button
                aria-label="Search"
                onClick={() => navigate("/search")}
                className="text-foreground hover:text-mauve transition-all duration-300 hover:scale-110"
              >
                <Search className="w-5 h-5" />
              </button>
              <CartButton />
              {isLoggedIn ? (
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-9 h-9 rounded-full bg-burgundy text-white flex items-center justify-center font-playfair text-sm font-bold uppercase transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_20px_rgba(107,25,53,0.4)]"
                >
                  {user?.name.charAt(0)}
                </button>
              ) : (
                <button
                  onClick={openAuthModal}
                  className="relative font-lato text-xs tracking-widest uppercase bg-burgundy text-white px-5 py-2 rounded-full transition-all duration-300 font-semibold hover:shadow-[0_4px_20px_rgba(107,25,53,0.4)] hover:scale-105 active:scale-95 overflow-hidden group/order"
                >
                  <span className="relative z-10">Order</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-mauve to-burgundy opacity-0 group-hover/order:opacity-100 transition-opacity duration-300" />
                </button>
              )}
            </div>

            {/* ── Mobile: search → cart → hamburger → account ── */}
            <div className="lg:hidden flex items-center gap-2 ml-auto">
              <button
                className="p-1 text-foreground hover:text-mauve transition-colors"
                onClick={() => navigate("/search")}
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>
              <CartButton className="p-1" />
              <button
                className="p-1 text-foreground transition-all duration-300 hover:scale-110"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
              >
                {open ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
              </button>
              {isLoggedIn ? (
                <button
                  onClick={() => { setOpen(false); setUserMenuOpen(!userMenuOpen); }}
                  className="w-[22px] h-[22px] rounded-full bg-burgundy text-white flex items-center justify-center font-playfair text-[9px] font-bold uppercase shrink-0"
                >
                  {user?.name.charAt(0)}
                </button>
              ) : (
                <button
                  onClick={openAuthModal}
                  className="p-1 text-foreground hover:text-mauve transition-colors"
                  aria-label="Sign In"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </button>
              )}
            </div>
          </nav>

          {/* Mobile menu */}
          {open && (
            <div className="lg:hidden bg-cream/98 backdrop-blur-xl border-t border-border animate-fade-in">
              <ul className="flex flex-col py-6 px-8 gap-5">
                {[...leftLinks, ...rightLinks].map((l) => renderMobileLink(l))}
              </ul>
            </div>
          )}
        </div>{/* end navbar body */}

        {/* ── Scalloped bottom edge ── */}
        <svg
          viewBox="0 0 1000 16"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "clamp(8px, 1.2vw, 14px)", marginTop: -1 }}
        >
          <path
            d={scallopD}
            style={{ fill: "hsl(var(--cream))" }}
            className="transition-all duration-500"
          />
        </svg>

        <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      </header>

      {/* ══════════════════════════════════════════════════════
          PORTALED OVERLAYS — rendered OUTSIDE <header> so
          overflow:hidden can never clip them
          ══════════════════════════════════════════════════════ */}

      {/* ── TPR Bespoke Dropdown (desktop) ── */}
      {tprDropdownOpen && tprLink?.dropdown && (
        <div
          className="hidden lg:block fixed z-[60]"
          style={{ top: scrolled ? 52 : 60, left: "50%", transform: "translateX(-50%)" }}
          onMouseEnter={() => handleMouseEnter(tprLink.label)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(107,25,53,0.18)] border border-blush/30 overflow-hidden min-w-[280px] animate-fade-in">
            {tprLink.dropdown.map((sub, idx) => (
              <Link
                key={sub.href}
                to={sub.href}
                className={`group/sub block px-5 py-4 font-lato text-xs tracking-wider text-foreground transition-all duration-200 relative overflow-hidden ${location.pathname === sub.href ? "bg-burgundy/10 text-burgundy font-semibold" : ""
                  } ${idx !== tprLink.dropdown!.length - 1 ? "border-b border-blush/15" : ""}`}
              >
                <span className="relative z-10 group-hover/sub:text-burgundy group-hover/sub:translate-x-1 inline-block transition-all duration-200">
                  {sub.label}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blush/50 to-transparent scale-x-0 group-hover/sub:scale-x-100 origin-left transition-transform duration-300" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── User Account Popup — works on BOTH mobile & desktop ── */}
      {userMenuOpen && isLoggedIn && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-[3px]"
            onClick={() => setUserMenuOpen(false)}
          />
          {/* Centered card */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-2xl border border-blush/30 overflow-hidden w-full max-w-[320px] animate-fade-in">
              {/* Close button */}
              <div className="flex justify-end px-4 pt-4">
                <button
                  onClick={() => setUserMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-cream/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-blush/40 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {/* Avatar + info */}
              <div className="flex flex-col items-center px-6 pb-5">
                <div className="w-20 h-20 rounded-full bg-burgundy text-white flex items-center justify-center font-playfair text-3xl font-bold uppercase shadow-xl shadow-burgundy/25 mb-4">
                  {user?.name.charAt(0)}
                </div>
                <p className="font-playfair text-lg text-foreground font-semibold">{user?.name}</p>
                <p className="font-lato text-sm text-muted-foreground mt-1">{user?.email}</p>
              </div>
              {/* Divider */}
              <div className="h-px bg-blush/30 mx-6" />
              {/* Sign out */}
              <div className="p-4">
                <button
                  onClick={() => { setUserMenuOpen(false); logout(); }}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-lato text-sm tracking-wider text-white bg-red-500 hover:bg-red-600 transition-colors duration-200 shadow-md shadow-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
