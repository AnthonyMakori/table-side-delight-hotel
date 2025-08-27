import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../src/components/ui/card";
import { Separator } from "../../src/components/ui/separator";
import { Badge } from "../../src/components/ui/badge";
import { Loader2, UtensilsCrossed, Truck, CheckCircle } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderTracking = () => {
  const { id } = useParams(); 
  const [order, setOrder] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [status, setStatus] = useState<string>("Preparing");

  // Format time to mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const orderData = response.data;
        setOrder(orderData);

        const prepTime = orderData.estimated_time * 60; 
        setTimeLeft(prepTime);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setStatus("Delivered");
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setStatus("Delivered");
          return 0;
        }
        if (prev < 300 && status !== "On the way") {
          setStatus("On the way"); 
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-food py-8">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Order #{order.id}</span>
              <Badge variant="outline">{status}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Items */}
            {order.items.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 border rounded-xl"
              >
                <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      No Image
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
            ))}

            <Separator />

            {/* Countdown */}
            <div className="text-center">
              {status === "Preparing" && (
                <UtensilsCrossed className="mx-auto mb-2 text-primary" />
              )}
              {status === "On the way" && (
                <Truck className="mx-auto mb-2 text-primary" />
              )}
              {status === "Delivered" && (
                <CheckCircle className="mx-auto mb-2 text-green-500" />
              )}

              <h2 className="text-lg font-semibold">
                {status === "Delivered"
                  ? "Your meal has been delivered 🎉"
                  : `Time remaining: ${formatTime(timeLeft)}`}
              </h2>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderTracking;
