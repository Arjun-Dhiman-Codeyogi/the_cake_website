import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Index from "./pages/Index";
import FleurDelice from "./pages/FleurDelice";
import TprBespoke from "./pages/TprBespoke";
import Customise from "./pages/Customise";
import GourmetCurations from "./pages/GourmetCurations";
import OurCafes from "./pages/OurCafes";
import GetInTouch from "./pages/GetInTouch";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Scroll to top on navigation
function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          <Route path="/"             element={<Index />} />
          <Route path="/fleur-delice" element={<FleurDelice />} />
          <Route path="/tpr-bespoke"  element={<TprBespoke />} />
          <Route path="/customise"    element={<Customise />} />
          <Route path="/gourmet"      element={<GourmetCurations />} />
          <Route path="/our-cafes"    element={<OurCafes />} />
          <Route path="/get-in-touch" element={<GetInTouch />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*"             element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
