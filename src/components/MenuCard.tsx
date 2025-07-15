import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { MenuItem, useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem(item);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-food transition-all duration-300 group">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {item.dietary && (
          <div className="absolute top-2 left-2 flex gap-1">
            {item.dietary.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-white/90 rounded-full text-xs font-medium text-foreground backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1">
            {item.name}
          </h3>
          <span className="text-xl font-bold text-primary ml-2">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {item.description}
        </p>
        <Button
          onClick={handleAddToCart}
          variant="default"
          size="sm"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white shadow-md"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add to Cart
        </Button>

      </CardContent>
    </Card>
  );
};