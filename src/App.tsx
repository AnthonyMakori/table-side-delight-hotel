import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from './contexts/CartContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/auth/SignIn";
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
import Departments from "../pages/Admin/Departments";
import Reports from "../pages/Admin/Reports";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { HotelProvider } from "@/contexts/HotelContext";
import LoginForm from "../pages/auth/LoginForm";
import ReceptionistDashboard from "@/components/dashboards/ReceptionistDashboard";
import KitchenDashboard from "@/components/dashboards/KitchenDashboard";
import WaiterDashboard from "@/components/dashboards/WaiterDashboard";

const queryClient = new QueryClient();

const AppContent = () => {
  const { currentStaff, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-500">
        <div className="text-center text-primary-foreground">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-foreground mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/LoginForm" element={<LoginForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/menu/Menu" element={<Menu />} />
        <Route path="accommodation/Accommodations" element={<Accommodations />} />
        <Route path="/components/dashboards/ReceptionistDashboard" element={<ReceptionistDashboard />} />
        <Route path="/components/dashboards/KitchenDashboard" element={<KitchenDashboard />} />
        <Route path="/components/dashboards/WaiterDashboard" element={<WaiterDashboard />} />
        <Route path="/Admin/Dashboard" element={<Dashboard />} />
        <Route path="/accommodations" element={<AccommodationsAdmin />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/qr-codes" element={<QRCodes />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/room/:id" element={<RoomDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HotelProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <AppContent /> 
            </TooltipProvider>
          </CartProvider>
        </HotelProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
