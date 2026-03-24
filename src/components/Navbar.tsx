import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, Facebook } from "lucide-react";

const leftLinks = [
  { label: "Fleur Delice", href: "/fleur-delice" },
  { label: "TPR Bespoke", href: "/tpr-bespoke" },
  { label: "Gourmet", href: "/gourmet" },
];

const rightLinks = [
  { label: "Customise", href: "/customise" },
  { label: "Our Cafes", href: "/our-cafes" },
  { label: "Contact", href: "/get-in-touch" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const isHome = location.pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-cream/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left links */}
        <ul className="hidden lg:flex gap-7 items-center">
          {leftLinks.map((l) => (
            <li key={l.href}>
              <Link
                to={l.href}
                className={`font-lato text-xs tracking-widest uppercase transition-colors hover:text-mauve ${
                  scrolled || !isHome ? "text-foreground" : "text-primary-foreground"
                } ${location.pathname === l.href ? "text-mauve border-b border-mauve" : ""}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logo */}
        <Link to="/" className="flex flex-col items-center mx-6">
          <span
            className={`font-playfair text-2xl tracking-wide transition-colors ${
              scrolled || !isHome ? "text-burgundy" : "text-primary-foreground"
            }`}
          >
            The Pink Rosette
          </span>
          <span
            className={`font-lato text-[9px] tracking-[0.25em] uppercase mt-0.5 transition-colors ${
              scrolled || !isHome ? "text-mauve" : "text-primary-foreground/80"
            }`}
          >
            Est. 2018 · Mumbai
          </span>
        </Link>

        {/* Right links */}
        <ul className="hidden lg:flex gap-7 items-center">
          {rightLinks.map((l) => (
            <li key={l.href}>
              <Link
                to={l.href}
                className={`font-lato text-xs tracking-widest uppercase transition-colors hover:text-mauve ${
                  scrolled || !isHome ? "text-foreground" : "text-primary-foreground"
                } ${location.pathname === l.href ? "text-mauve border-b border-mauve" : ""}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="flex items-center gap-3 ml-4">
            <a href="https://www.instagram.com/thepinkrosette" target="_blank" rel="noreferrer">
              <Instagram
                className={`w-4 h-4 hover:text-mauve transition-colors ${
                  scrolled || !isHome ? "text-foreground" : "text-primary-foreground"
                }`}
              />
            </a>
            <a href="https://www.facebook.com/thepinkrosette" target="_blank" rel="noreferrer">
              <Facebook
                className={`w-4 h-4 hover:text-mauve transition-colors ${
                  scrolled || !isHome ? "text-foreground" : "text-primary-foreground"
                }`}
              />
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-cream/98 backdrop-blur-md border-t border-border animate-fade-in">
          <ul className="flex flex-col py-6 px-8 gap-5">
            {[...leftLinks, ...rightLinks].map((l) => (
              <li key={l.href}>
                <Link
                  to={l.href}
                  className="font-lato text-sm tracking-widest uppercase text-foreground hover:text-mauve transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
