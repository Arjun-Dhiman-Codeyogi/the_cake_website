import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, lazy, Suspense } from "react";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

// Lazy load all pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const FleurDelice = lazy(() => import("./pages/FleurDelice"));
const TprBespoke = lazy(() => import("./pages/TprBespoke"));
const Customise = lazy(() => import("./pages/Customise"));
const GourmetCurations = lazy(() => import("./pages/GourmetCurations"));
const OurCafes = lazy(() => import("./pages/OurCafes"));
const GetInTouch = lazy(() => import("./pages/GetInTouch"));
const SignatureCakes = lazy(() => import("./pages/SignatureCakes"));
const SignatureTarts = lazy(() => import("./pages/SignatureTarts"));
const SignatureSavoury = lazy(() => import("./pages/SignatureSavoury"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Scroll to top on navigation
function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-8 h-8 border-2 border-burgundy border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollTop />
          <Suspense fallback={null}>
            <Auth />
          </Suspense>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"             element={<Index />} />
              <Route path="/fleur-delice" element={<FleurDelice />} />
              <Route path="/tpr-bespoke"  element={<TprBespoke />} />
              <Route path="/customise"    element={<Customise />} />
              <Route path="/gourmet"      element={<GourmetCurations />} />
              <Route path="/our-cafes"    element={<OurCafes />} />
              <Route path="/get-in-touch" element={<GetInTouch />} />
              <Route path="/signature-cakes" element={<SignatureCakes />} />
              <Route path="/signature-tarts" element={<SignatureTarts />} />
              <Route path="/signature-savoury" element={<SignatureSavoury />} />
              <Route path="/cart"         element={<Cart />} />
              <Route path="/checkout"    element={<Checkout />} />
              <Route path="/product"     element={<ProductDetail />} />
              <Route path="/search"      element={<SearchPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*"             element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
