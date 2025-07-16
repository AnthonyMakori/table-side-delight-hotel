import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from './contexts/CartContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import  SignIn  from "../pages/auth/SignIn";
// import QR from "../pages/QR/QRread";
import Menu from "../pages/menu/Menu";
import Cart from "../pages/cart/Cart";
import Accommodations from "../pages/accommodation/Accommodations";
import RoomDetail from "../pages/accommodation/RoomDetail";
import { Sidebar } from "./components/Sidebar";
import Dashboard from "../pages/Admin/Dashboard";
import AccommodationsAdmin from "../pages/Admin/Accommodations";
import Meals from "../pages/Admin/Meals";
import QRCodes from "../pages/Admin/QRCodes";
import Orders from "../pages/Admin/Orders";
import Payments from "../pages/Admin/Payments";
import Staff from "../pages/Admin/Staff";
import Reports from "../pages/Admin/Reports";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/signin" element={<SignIn />} /> 
          {/* <Route path="/QR/QRread" element={<QR />} />  */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/menu/Menu" element={<Menu />} />
          <Route path="accommodation/Accommodations" element={<Accommodations />} />
          <Route path="/Admin/Dashboard" element={<Dashboard />} />
          <Route path="/accommodations" element={<AccommodationsAdmin />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/qr-codes" element={<QRCodes />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/room/:id" element={<RoomDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
