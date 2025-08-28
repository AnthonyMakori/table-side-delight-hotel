import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import {
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  CreditCard,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("online");
  const navigate = useNavigate();
  const { toast } = useToast();

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

 const handlePlaceOrder = async () => {
  if (state.items.length === 0) {
    toast({
      title: "Cart is empty",
      description: "Please add some items before placing an order.",
      variant: "destructive",
    });
    return;
  }

  try {
    const payload = {
      items: state.items.map((item) => ({
        meal_id: item.id,            
        quantity: item.quantity,
        price: item.price,           
      })),
      payment_method: paymentMethod,
    };

    const response = await axios.post(
      "http://127.0.0.1:8000/api/orders", 
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      }
    );

    toast({
      title: "Order placed successfully",
      description: `Your order totaling ${formatCurrency(
        state.total
      )} has been placed. Payment method: ${paymentMethod}`,
    });

    clearCart();
    navigate("/cart/OrderTracking"); 

  } catch (error: any) {
    console.error(error);

    toast({
      title: "Order failed",
      description: error.response?.data?.message || "Something went wrong. Try again.",
      variant: "destructive",
    });
  }
};


  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-food flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <UtensilsCrossed className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything delicious yet.
            </p>
            <Button
              onClick={() => navigate(-1)}
              variant="default"
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Browse Menu
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-food">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button onClick={() => navigate(-1)} variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="ml-4 text-2xl font-bold">Your Cart</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order Items</span>
                  <Badge variant="secondary">{state.items.length} items</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border rounded-xl hover:shadow-md transition"
                  >
                    {/* Image from DB */}
                    <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground">No Image</span>
                      )}
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{item.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {item.description}
                      </p>
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(item.price)}
                      </p>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>

            </Card>
          </div>

          {/* Summary */}
          <div className="space-y-6 lg:sticky lg:top-20 h-fit">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">
                    {formatCurrency(state.total)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  {[
                    {
                      value: "online",
                      label: "Pay Now (Online)",
                      icon: CreditCard,
                    },
                    {
                      value: "delivery",
                      label: "Pay on Delivery",
                      icon: Truck,
                    },
                    {
                      value: "after",
                      label: "Pay After Meal",
                      icon: UtensilsCrossed,
                    },
                  ].map(({ value, label, icon: Icon }) => (
                    <div
                      key={value}
                      className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer transition ${
                        paymentMethod === value
                          ? "border-primary bg-primary/5"
                          : "border-transparent hover:bg-muted"
                      }`}
                      onClick={() => setPaymentMethod(value)}
                    >
                      <RadioGroupItem value={value} id={value} />
                      <Label
                        htmlFor={value}
                        className="flex items-center cursor-pointer"
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            <Button
              onClick={handlePlaceOrder}
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md"
            >
              Place Order – {formatCurrency(state.total)}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
