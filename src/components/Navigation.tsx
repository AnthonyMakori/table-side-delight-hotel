import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Button2 } from "@/components/ui/button2/button2";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "Accommodation", href: "#accommodation" },
    {label: "Menu", href: "/menu/Menu"}, 
    { label: "Contact", href: "#contact" },
  ];

  

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="font-bold text-2xl text-primary">
          Grandeur Hotel
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {/* Menu item handled separately */}
          <Button variant="outline" size="sm">
            Book Now
          </Button>
          <Button2
            variant="outline"
            size="sm"
            onClick={() => { window.location.href = "/auth/signin"; }}
          >
            Login
          </Button2>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-64">
            <div className="flex flex-col space-y-4 mt-8">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-foreground hover:text-primary transition-colors py-2"
                >
                  {item.label}
                </Link>
              ))}
              {/* Mobile version of Menu item */}        
              <Button variant="outline" className="mt-4">
                Book Now
              </Button>
              <Button2
                variant="outline"
                size="sm"
                onClick={() => { window.location.href = "/auth/signin"; }}
              >
                Login
              </Button2>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navigation;
