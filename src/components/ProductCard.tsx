import { Link } from "react-router-dom";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  badge?: string;
  slug?: string;
}

const ProductCard = ({ name, price, image, badge, slug = "#" }: ProductCardProps) => {
  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      <div className="relative overflow-hidden h-64">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {badge && (
          <span className="absolute top-3 left-3 bg-mauve text-accent-foreground text-xs font-lato tracking-widest px-3 py-1 rounded-full">
            {badge}
          </span>
        )}
        <div className="absolute inset-0 bg-burgundy/0 group-hover:bg-burgundy/10 transition-all duration-500" />
      </div>
      <div className="p-5">
        <h3 className="font-playfair text-lg text-foreground mb-1">{name}</h3>
        <p className="text-mauve font-lato text-sm font-bold mb-4">{price}</p>
        <Link
          to={slug}
          className="btn-sweep inline-block w-full text-center border border-burgundy text-burgundy text-xs font-lato tracking-widest uppercase py-2.5 px-4 rounded-full hover:bg-burgundy hover:text-primary-foreground transition-colors duration-300"
        >
          Choose Options
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
