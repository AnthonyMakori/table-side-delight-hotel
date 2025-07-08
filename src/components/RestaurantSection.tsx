import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import restaurantImage from "@/assets/restaurant-interior.jpg";
import QRCodeGenerator from "./QRCodeGenerator";
import { useToast } from "@/hooks/use-toast";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  allergens?: string[];
}

interface CartItem extends MenuItem {
  quantity: number;
  notes?: string;
}

const RestaurantSection = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentTable, setCurrentTable] = useState<string | null>(null);
  const { toast } = useToast();

  const menuItems: MenuItem[] = [
    // Starters
    {
      id: 1,
      name: "Truffle Arancini",
      description: "Crispy risotto balls with black truffle, parmesan, and aioli",
      price: 18,
      category: "starters",
      allergens: ["gluten", "dairy"]
    },
    {
      id: 2,
      name: "Seared Scallops",
      description: "Pan-seared scallops with cauliflower purée and pancetta",
      price: 24,
      category: "starters",
      allergens: ["shellfish"]
    },
    {
      id: 3,
      name: "Burrata Caprese",
      description: "Fresh burrata with heirloom tomatoes and basil oil",
      price: 16,
      category: "starters",
      allergens: ["dairy"]
    },
    
    // Mains
    {
      id: 4,
      name: "Wagyu Beef Tenderloin",
      description: "8oz premium wagyu with roasted vegetables and red wine jus",
      price: 65,
      category: "mains"
    },
    {
      id: 5,
      name: "Pan-Seared Salmon",
      description: "Atlantic salmon with lemon herb risotto and seasonal vegetables",
      price: 32,
      category: "mains",
      allergens: ["fish", "dairy"]
    },
    {
      id: 6,
      name: "Lobster Ravioli",
      description: "Handmade pasta with lobster filling in saffron cream sauce",
      price: 38,
      category: "mains",
      allergens: ["shellfish", "gluten", "dairy"]
    },
    
    // Desserts
    {
      id: 7,
      name: "Chocolate Soufflé",
      description: "Dark chocolate soufflé with vanilla ice cream",
      price: 14,
      category: "desserts",
      allergens: ["dairy", "eggs"]
    },
    {
      id: 8,
      name: "Tiramisu",
      description: "Classic Italian tiramisu with coffee and mascarpone",
      price: 12,
      category: "desserts",
      allergens: ["dairy", "eggs", "gluten"]
    },
    
    // Drinks
    {
      id: 9,
      name: "Craft Cocktail Selection",
      description: "Choose from our signature cocktails crafted by expert mixologists",
      price: 16,
      category: "drinks"
    },
    {
      id: 10,
      name: "Wine by the Glass",
      description: "Curated selection of premium wines from our cellar",
      price: 14,
      category: "drinks"
    }
  ];

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your order.`,
    });
  };

  const getItemsByCategory = (category: string) => {
    return menuItems.filter(item => item.category === category);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <section id="restaurant" className="py-20">
      <div className="container mx-auto px-4">
        {/* Restaurant Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Fine Dining Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Indulge in culinary excellence with our carefully crafted menu featuring 
            the finest ingredients and innovative flavors.
          </p>
          
          <div className="relative mb-12 overflow-hidden rounded-2xl">
            <img 
              src={restaurantImage} 
              alt="Restaurant Interior"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        </div>

        {/* QR Code Section for Staff */}
        <div className="mb-12">
          <QRCodeGenerator onTableSet={setCurrentTable} />
        </div>

        {/* Menu */}
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Tabs defaultValue="starters" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="starters">Starters</TabsTrigger>
                <TabsTrigger value="mains">Mains</TabsTrigger>
                <TabsTrigger value="desserts">Desserts</TabsTrigger>
                <TabsTrigger value="drinks">Drinks</TabsTrigger>
              </TabsList>
              
              {["starters", "mains", "desserts", "drinks"].map((category) => (
                <TabsContent key={category} value={category} className="mt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {getItemsByCategory(category).map((item) => (
                      <Card key={item.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                            <span className="text-xl font-bold text-accent">${item.price}</span>
                          </div>
                          <CardDescription>{item.description}</CardDescription>
                          {item.allergens && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.allergens.map((allergen) => (
                                <Badge key={allergen} variant="outline" className="text-xs">
                                  {allergen}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardHeader>
                        <CardContent>
                          <Button 
                            onClick={() => addToCart(item)}
                            className="w-full"
                            disabled={!currentTable}
                          >
                            {currentTable ? "Add to Cart" : "Scan QR Code to Order"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Your Order
                  {getTotalItems() > 0 && (
                    <Badge variant="secondary">{getTotalItems()}</Badge>
                  )}
                </CardTitle>
                {currentTable && (
                  <CardDescription>Table {currentTable}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Your cart is empty
                  </p>
                ) : (
                  <>
                    <div className="space-y-3 mb-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-medium">{item.name}</span>
                            <span className="text-muted-foreground ml-2">x{item.quantity}</span>
                          </div>
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-3 mb-4">
                      <div className="flex justify-between items-center font-bold">
                        <span>Total:</span>
                        <span className="text-accent">${getTotalPrice().toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full" disabled={!currentTable}>
                      Place Order
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantSection;