import { Link } from "react-router-dom";
import { Instagram, Facebook, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-burgundy text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <h3 className="font-playfair text-3xl">The Pink Rosette</h3>
          <p className="font-lato text-xs tracking-[0.2em] uppercase text-primary-foreground/70">
            Est. 2018 · Mumbai
          </p>
          <p className="font-lato text-sm text-primary-foreground/80 leading-relaxed max-w-xs">
            Crafted with love — bespoke cakes, artisan patisserie, and sweet
            memories since 2018.
          </p>
          <div className="flex gap-4 mt-2">
            <a
              href="https://www.instagram.com/thepinkrosette"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blush transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/thepinkrosette"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blush transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-playfair text-lg mb-5">Explore</h4>
          <ul className="flex flex-col gap-3">
            {[
              { label: "Fleur Delice Collection", href: "/fleur-delice" },
              { label: "TPR Bespoke Collection", href: "/tpr-bespoke" },
              { label: "Gourmet Curations", href: "/gourmet" },
              { label: "Customise With Us", href: "/customise" },
              { label: "Our Cafes", href: "/our-cafes" },
              { label: "Get In Touch", href: "/get-in-touch" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  to={l.href}
                  className="font-lato text-sm text-primary-foreground/75 hover:text-primary-foreground transition-colors tracking-wide"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="font-playfair text-lg mb-5">Visit Us</h4>
          <ul className="flex flex-col gap-3 font-lato text-sm text-primary-foreground/75">
            <li>
              <p className="text-primary-foreground/90 font-medium mb-1">
                Fort, Mumbai
              </p>
              <p className="leading-relaxed">
                Our flagship Patisserie & Café nestled in the heart of Fort,
                Mumbai
              </p>
            </li>
            <li className="mt-3">
              <p className="text-primary-foreground/90 font-medium mb-1">
                Delivery Hours
              </p>
              <p>12:00 pm – 6:00 pm</p>
              <p>24–48 hrs advance notice</p>
            </li>
            <li className="mt-3">
              <a
                href="mailto:hello@thepinkrosette.com"
                className="hover:text-primary-foreground transition-colors"
              >
                hello@thepinkrosette.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20 py-5 text-center">
        <p className="font-lato text-xs text-primary-foreground/50 tracking-widest flex items-center justify-center gap-2">
          © {new Date().getFullYear()} The Pink Rosette. Made with{" "}
          <Heart className="w-3 h-3 fill-current text-blush" /> in Mumbai.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
