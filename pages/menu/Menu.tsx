// src/pages/Menu.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../src/components/ui/tabs";
import { Badge } from "../../src/components/ui/badge";
import { Button } from "../../src/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MenuCard } from "../../src/components/MenuCard";
import { useCart } from "../../src/contexts/CartContext";

const API_BASE = "http://localhost:8000/api"; // same as admin panel

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Drinks",
    "Desserts",
  ]);
  const { itemCount } = useCart();
  const navigate = useNavigate();

  // Fetch meals
  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${API_BASE}/menu-items`, {
        params: {
          category: activeCategory !== "all" ? activeCategory : undefined,
        },
      });
      setMenuItems(response.data);
    } catch (err) {
      console.error("Failed to fetch menu items", err);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-gradient-food">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-foreground">Grandeur</h1>
              <span className="ml-2 text-sm text-muted-foreground">Restaurant</span>
            </div>
            <Button
              onClick={() => navigate("/cart")}
              variant="default"
              className="relative bg-blue-600 hover:bg-blue-800 text-white flex items-center"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Cart
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Menu</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully crafted dishes made with the finest ingredients and passion for great taste.
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8 bg-white/60 backdrop-blur-sm">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat.toLowerCase()}
                className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Menu Items Grid */}
          {categories.map((cat) => (
            <TabsContent key={cat} value={cat.toLowerCase()}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {menuItems
                  .filter((item) => cat === "All" || item.category.toLowerCase() === cat.toLowerCase())
                  .map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default Menu;
