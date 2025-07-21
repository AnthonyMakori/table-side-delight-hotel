import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Building,
  UtensilsCrossed,
  QrCode,
  ClipboardList,
  CreditCard,
  Users,
  BarChart3,
  Hotel,
  LogOut
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/Admin/Dashboard", icon: LayoutDashboard },
  { name: "Accommodations", href: "/accommodations", icon: Building },
  { name: "Meals Management", href: "/meals", icon: UtensilsCrossed },
  { name: "Table QR Codes", href: "/qr-codes", icon: QrCode },
  { name: "Orders", href: "/orders", icon: ClipboardList },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Staff Management", href: "/staff", icon: Users },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];

export function Sidebar() {
    const navigate = useNavigate();


  const handleLogout = () => {
    // Clear user session data (adjust as needed for your auth)
    localStorage.clear(); // or localStorage.removeItem('token')
    sessionStorage.clear();

    // Redirect to login page
    navigate("/auth/signin");
  };
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-blue-600 text-white flex flex-col justify-between z-50">
      {/* Top Section */}
      <div>
        <div className="p-6 border-b border-primary-foreground/20">
          <div className="flex items-center gap-3">
            <Hotel className="h-8 w-8 text-accent" />
            <div>
              <h1 className="text-xl font-bold">Grandeur Hotel</h1>
              <p className="text-primary-foreground/70 text-sm">Management System</p>
            </div>
          </div>
        </div>

        <nav className="p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  end={item.href === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-aqua text-accent-foreground font-medium"
                        : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                    }`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom Logout Button */}
       <div className="p-4 border-t border-primary-foreground/20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-colors duration-200 w-full"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </button>
      </div>
    </div>
  );
}
