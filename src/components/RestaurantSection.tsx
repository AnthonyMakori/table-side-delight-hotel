import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import restaurantImage from "@/assets/restaurant-interior.jpg";
import QRCodeGenerator from "./QRCodeGenerator";
import { useToast } from "@/hooks/use-toast";
import { ChefHat, Sparkles } from "lucide-react";



const RestaurantSection = () => {
  // const [cart, setCart] = useState<CartItem[]>([]);
  const [currentTable, setCurrentTable] = useState<string | null>(null);
  const { toast } = useToast();


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
      </div>
    </section>
  );
};

export default RestaurantSection;