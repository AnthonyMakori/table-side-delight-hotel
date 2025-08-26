// src/components/MenuCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export function MenuCard({ item }: { item: any }) {
const { addItem } = useCart();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="h-48 bg-muted rounded-t-lg overflow-hidden">
        {item.image_path ? (
          <img
            src={`http://localhost:8000${item.image_path}`}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      <CardContent className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        <p className="font-bold">${item.price}</p>
        <Button className="w-full mt-2" onClick={() => addItem(item)}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
