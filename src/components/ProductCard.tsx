import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Check, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  badge?: string;
  slug?: string;
  category?: string;
}

const ProductCard = ({ name, price, image, badge, slug = "#", category = "" }: ProductCardProps) => {
  const { addItem } = useCart();
  const { isLoggedIn, openAuthModal } = useAuth();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const detailUrl = `/product?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}${badge ? `&badge=${encodeURIComponent(badge)}` : ""}${category ? `&category=${encodeURIComponent(category)}` : ""}`;

  const handleAdd = () => {
    addItem({ name, price, image, badge, category });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleOrder = () => {
    if (!isLoggedIn) {
      openAuthModal();
      return;
    }
    addItem({ name, price, image, badge, category });
    setOrdered(true);
    setTimeout(() => {
      setOrdered(false);
      navigate("/checkout");
    }, 600);
  };

  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(107,25,53,0.15)] transition-all duration-500 hover:-translate-y-2" style={{ transformStyle: "preserve-3d" }}>
      <Link to={detailUrl} className="block relative overflow-hidden h-48 sm:h-56 lg:h-64 cursor-pointer">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
        {badge && (
          <span className="absolute top-3 left-3 bg-mauve text-accent-foreground text-xs font-lato tracking-widest px-3 py-1 rounded-full shadow-md">
            {badge}
          </span>
        )}
        <div className="absolute inset-0 bg-burgundy/0 group-hover:bg-burgundy/10 transition-all duration-500" />

        {/* Quick add button on hover */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAdd(); }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
            added
              ? "bg-green-500 text-white scale-110"
              : "bg-white/90 text-burgundy opacity-0 group-hover:opacity-100 hover:bg-burgundy hover:text-white"
          }`}
        >
          {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
        </button>
      </Link>
      <div className="p-5">
        <h3 className="font-playfair text-lg text-foreground mb-1">{name}</h3>
        <p className="text-mauve font-lato text-sm font-bold mb-4">{price}</p>
        <div className="flex flex-wrap gap-2">
          <Link
            to={detailUrl}
            className="btn-sweep flex-1 inline-flex items-center justify-center border border-burgundy text-burgundy text-[10px] font-lato tracking-widest uppercase py-2.5 px-2 rounded-full hover:bg-burgundy hover:text-primary-foreground transition-colors duration-300"
          >
            Details
          </Link>
          <button
            onClick={handleAdd}
            className={`flex-1 inline-flex items-center justify-center gap-1 text-[10px] font-lato tracking-widest uppercase py-2.5 px-3 rounded-full transition-all duration-300 ${
              added
                ? "bg-green-500 text-white"
                : "bg-burgundy text-primary-foreground hover:bg-mauve active:scale-[0.98]"
            }`}
          >
            <ShoppingBag className="w-3 h-3" />
            {added ? "Added!" : "Add to Cart"}
          </button>
          <button
            onClick={handleOrder}
            className={`flex-1 inline-flex items-center justify-center gap-1 text-[10px] font-lato tracking-widest uppercase py-2.5 px-3 rounded-full transition-all duration-300 ${
              ordered
                ? "bg-green-500 text-white"
                : "bg-mauve text-white hover:bg-burgundy active:scale-[0.98]"
            }`}
          >
            <ArrowRight className="w-3 h-3" />
            {ordered ? "Going!" : "Order Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
