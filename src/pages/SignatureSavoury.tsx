import { useState, useMemo, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import WaveDivider from "@/components/WaveDivider";
import { SlidersHorizontal, ArrowUpDown, Check } from "lucide-react";

type Product = {
  name: string;
  price: string;
  priceNum: number;
  image: string;
  badge?: string;
  tag: "Pizza" | "Burger";
  inStock: boolean;
};

const products: Product[] = [
  {
    name: "Margherita Pizza",
    price: "\u20B9450",
    priceNum: 450,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80",
    badge: "Bestseller",
    tag: "Pizza",
    inStock: true,
  },
  {
    name: "Farm Fresh Veggie Pizza",
    price: "\u20B9550",
    priceNum: 550,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    badge: "Popular",
    tag: "Pizza",
    inStock: true,
  },
  {
    name: "Paneer Tikka Pizza",
    price: "\u20B9620",
    priceNum: 620,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80",
    badge: "New",
    tag: "Pizza",
    inStock: false,
  },
  {
    name: "Classic Veg Burger",
    price: "\u20B9350",
    priceNum: 350,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    badge: "Bestseller",
    tag: "Burger",
    inStock: true,
  },
  {
    name: "Spicy Paneer Burger",
    price: "\u20B9420",
    priceNum: 420,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80",
    tag: "Burger",
    inStock: true,
  },
];

const filterTabs = ["All", "Pizza", "Burger", "In Stock", "Out of Stock"] as const;
type FilterTab = (typeof filterTabs)[number];

const sortOptions = [
  { label: "Default", value: "default" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Name: A → Z", value: "name-asc" },
  { label: "Name: Z → A", value: "name-desc" },
] as const;
type SortValue = (typeof sortOptions)[number]["value"];

const SignatureSavoury = () => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
  const [sortBy, setSortBy] = useState<SortValue>("default");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    if (sortOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sortOpen]);

  const filtered = useMemo(() => {
    let list = [...products];

    // Filter
    if (activeFilter === "Pizza") list = list.filter((p) => p.tag === "Pizza");
    else if (activeFilter === "Burger") list = list.filter((p) => p.tag === "Burger");
    else if (activeFilter === "In Stock") list = list.filter((p) => p.inStock);
    else if (activeFilter === "Out of Stock") list = list.filter((p) => !p.inStock);

    // Sort
    if (sortBy === "price-asc") list.sort((a, b) => a.priceNum - b.priceNum);
    else if (sortBy === "price-desc") list.sort((a, b) => b.priceNum - a.priceNum);
    else if (sortBy === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "name-desc") list.sort((a, b) => b.name.localeCompare(a.name));

    return list;
  }, [activeFilter, sortBy]);

  return (
    <div className="min-h-screen mt-16 bg-white">
      {/* <AnnouncementBar /> */}
      <Navbar />

      {/* Hero */}
      <section className="relative h-52 sm:h-80 md:h-[420px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1600&q=85"
          alt="Pizzas & Burgers"
          className="w-full h-full object-cover ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy/45 via-burgundy/35 to-burgundy/70 flex flex-col items-center justify-center text-center px-4">
          <p className="font-lato text-xs tracking-[0.35em] uppercase text-blush mb-3 animate-fade-in-up">
            TPR Bespoke Collection
          </p>
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-6xl text-primary-foreground animate-fade-in-up">
            Pizzas & Burgers
          </h1>
          <div className="w-16 h-0.5 bg-blush mt-4 animate-fade-in-up" />
          <p className="font-lato text-sm text-primary-foreground/80 mt-4 animate-fade-in-up max-w-lg">
            Freshly baked pizzas and gourmet burgers — pure comfort, crafted with love.
          </p>
        </div>
      </section>

      {/* Wave: white → warm blush */}
      <WaveDivider height={55} color="#fce4ec" />

      {/* Products */}
      <div style={{ background: "#fce4ec" }}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <ScrollReveal className="text-center mb-6 sm:mb-10">
            <p className="font-lato text-xs tracking-[0.3em] uppercase text-mauve mb-2">
              From Our Kitchen
            </p>
            <h2 className="font-playfair text-2xl sm:text-4xl text-foreground">
              The Savoury Collection
            </h2>
            <div className="w-12 h-0.5 bg-mauve mx-auto mt-4" />
          </ScrollReveal>

          {/* ── Filter & Sort Bar ── */}
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10">
              {/* Filter tabs */}
              <div className="flex items-center gap-2 flex-wrap">
                <SlidersHorizontal className="w-4 h-4 text-mauve shrink-0 hidden sm:block" />
                {filterTabs.map((tab) => {
                  const isActive = activeFilter === tab;
                  const isOutOfStock = tab === "Out of Stock";
                  const isInStock = tab === "In Stock";
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveFilter(tab)}
                      className={`font-lato text-[10px] sm:text-xs tracking-wider uppercase px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all duration-300 ${isActive
                        ? isOutOfStock
                          ? "bg-red-500/90 text-white border-red-500 shadow-md shadow-red-500/20"
                          : isInStock
                            ? "bg-green-600 text-white border-green-600 shadow-md shadow-green-600/20"
                            : "bg-burgundy text-white border-burgundy shadow-md shadow-burgundy/20"
                        : "border-mauve/30 text-muted-foreground hover:border-mauve hover:text-mauve bg-white"
                        }`}
                    >
                      {isInStock && isActive && <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mr-1.5 animate-pulse" />}
                      {isOutOfStock && isActive && <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mr-1.5" />}
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Sort dropdown */}
              <div className="relative" ref={sortRef}>
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="inline-flex items-center gap-2 font-lato text-[10px] sm:text-xs tracking-wider uppercase px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-mauve/30 text-muted-foreground hover:border-mauve hover:text-mauve bg-white transition-all duration-300"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  Sort
                </button>

                {/* Sort popup overlay */}
                {sortOpen && (
                  <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]" onClick={() => setSortOpen(false)} />

                    {/* Popup card */}
                    <div className="fixed inset-x-4 sm:inset-x-auto sm:absolute sm:right-0 bottom-4 sm:bottom-auto sm:top-full sm:mt-3 z-50 animate-fade-in">
                      <div className="bg-white rounded-2xl sm:rounded-xl shadow-2xl border border-blush/30 overflow-hidden sm:min-w-[220px] max-w-sm mx-auto sm:mx-0">
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-3.5 border-b border-blush/20">
                          <p className="font-lato text-xs tracking-wider uppercase text-foreground font-semibold">Sort By</p>
                          <button onClick={() => setSortOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          </button>
                        </div>
                        {/* Options */}
                        <div className="py-1">
                          {sortOptions.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => {
                                setSortBy(opt.value);
                                setSortOpen(false);
                              }}
                              className={`w-full text-left px-5 py-3.5 font-lato text-xs sm:text-[13px] tracking-wider transition-all duration-200 flex items-center justify-between ${sortBy === opt.value
                                ? "bg-burgundy/8 text-burgundy font-semibold"
                                : "text-foreground hover:bg-blush/20"
                                }`}
                            >
                              <span>{opt.label}</span>
                              {sortBy === opt.value && (
                                <span className="w-5 h-5 rounded-full bg-burgundy flex items-center justify-center">
                                  <Check className="w-3 h-3 text-white" />
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* ── Results count ── */}
          <div className="mb-5 sm:mb-6">
            <p className="font-lato text-xs text-muted-foreground tracking-wider">
              Showing <span className="text-foreground font-semibold">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "item" : "items"}
              {activeFilter !== "All" && (
                <span>
                  {" "}in <span className="text-burgundy font-semibold">{activeFilter}</span>
                </span>
              )}
            </p>
          </div>

          {/* ── Product Grid ── */}
          {filtered.length === 0 ? (
            <ScrollReveal>
              <div className="text-center py-16">
                <p className="font-playfair text-xl text-foreground mb-2">No items found</p>
                <p className="font-lato text-sm text-muted-foreground">
                  Try changing your filters to see more products.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filtered.map((p, i) => (
                <ScrollReveal key={p.name} delay={i * 80}>
                  <div className="relative">
                    {!p.inStock && (
                      <div className="absolute inset-0 z-10 bg-white/60 rounded-xl flex items-center justify-center pointer-events-none">
                        <span className="bg-red-500 text-white font-lato text-xs sm:text-sm tracking-widest uppercase px-5 py-2 rounded-full shadow-lg -rotate-6">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    <div className={!p.inStock ? "opacity-70 grayscale-[30%]" : ""}>
                      <ProductCard
                        name={p.name}
                        price={p.price}
                        image={p.image}
                        badge={p.badge}
                        category="Pizzas & Burgers"
                      />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Wave: blush → white */}
      <div style={{ background: "#fce4ec" }}>
        <WaveDivider height={55} color="white" />
      </div>

      {/* CTA Banner */}
      <WaveDivider height={50} color="#f8bbd0" />
      <section className="py-10 sm:py-16 lg:py-20 px-4 sm:px-6" style={{ background: "#f8bbd0" }}>
        <ScrollReveal className="max-w-3xl mx-auto text-center">
          <blockquote className="font-playfair italic text-lg sm:text-2xl md:text-3xl text-foreground leading-relaxed mb-6">
            "Freshly baked, generously topped — comfort food elevated to an art form."
          </blockquote>
          <div className="w-12 h-0.5 bg-mauve mx-auto mb-6" />
          <a
            href="/get-in-touch"
            className="btn-sweep inline-block bg-burgundy text-primary-foreground font-lato text-xs tracking-widest uppercase px-10 py-3.5 rounded-full hover:bg-mauve transition-colors duration-300"
          >
            Place a Bulk Order
          </a>
        </ScrollReveal>
      </section>
      <div style={{ background: "#f8bbd0" }}>
        <WaveDivider height={50} color="white" />
      </div>

      <Footer />
    </div>
  );
};

export default SignatureSavoury;
