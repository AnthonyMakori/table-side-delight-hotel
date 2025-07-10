import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import  SignIn  from "../pages/auth/SignIn";
import Admin from "../pages/admin/dash";
// import QR from "../pages/QR/QRread";
import Menu from "../pages/menu/Menu";
import Cart from "../pages/cart/Cart";
import Accommodations from "../pages/accommodation/Accommodations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/signin" element={<SignIn />} /> 
          <Route path ="/admin/dash" element={<Admin />} />
          {/* <Route path="/QR/QRread" element={<QR />} />  to be connected later back to scanning the Qr code on table */}
          <Route path="/cart/Cart" element={<Cart />} />
          {/* <Route path="/menu/Menu" element={<Menu />} /> */}
          <Route path="accommodation/Accommodations" element={<Accommodations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
