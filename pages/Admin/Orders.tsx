import { Sidebar } from "@/components/Sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardList,
  Clock,
  DollarSign,
  MapPin,
  Search,
  Filter,
  Eye,
  Check,
  X,
} from "lucide-react";

export default function Orders() {
  const orders = [
    {
      id: "ORD001",
      tableNumber: "5",
      customerName: "John Smith",
      items: [
        { name: "Caesar Salad", quantity: 2, price: 14.99 },
        { name: "Grilled Salmon", quantity: 1, price: 28.99 },
      ],
      total: 58.97,
      status: "In Progress",
      orderTime: "12:30 PM",
      estimatedTime: "15 min",
      paymentStatus: "Paid",
    },
    {
      id: "ORD002",
      tableNumber: "12",
      customerName: "Sarah Johnson",
      items: [{ name: "Breakfast Special", quantity: 3, price: 12.99 }],
      total: 38.97,
      status: "Completed",
      orderTime: "11:45 AM",
      estimatedTime: "Completed",
      paymentStatus: "Paid",
    },
    {
      id: "ORD003",
      tableNumber: "8",
      customerName: "Mike Davis",
      items: [
        { name: "Ribeye Steak", quantity: 1, price: 45.99 },
        { name: "Red Wine", quantity: 2, price: 16.25 },
      ],
      total: 78.49,
      status: "Pending",
      orderTime: "1:15 PM",
      estimatedTime: "25 min",
      paymentStatus: "Pending",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success/20 text-success";
      case "In Progress":
        return "bg-warning/20 text-warning";
      case "Pending":
        return "bg-muted/20 text-muted-foreground";
      case "Cancelled":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-success/20 text-success";
      case "Pending":
        return "bg-warning/20 text-warning";
      case "Failed":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar (locked from scrolling) */}
      <Sidebar />

      {/* Scrollable main content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted pl-72">
        <div>
          <h1 className="text-3xl font-bold">Order Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage meal orders from all tables
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Orders
                  </p>
                  <p className="text-2xl font-bold">
                    {orders.filter((o) => o.status !== "Completed").length}
                  </p>
                </div>
                <ClipboardList className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Completed Today
                  </p>
                  <p className="text-2xl font-bold">
                    {orders.filter((o) => o.status === "Completed").length}
                  </p>
                </div>
                <Check className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Revenue Today
                  </p>
                  <p className="text-2xl font-bold">
                    ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Avg. Prep Time
                  </p>
                  <p className="text-2xl font-bold">18m</p>
                </div>
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search orders..." className="pl-10" />
                </div>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter by Status
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardList className="h-5 w-5" />
                      Order #{order.id}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Table {order.tableNumber}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {order.orderTime}
                      </span>
                      <span>{order.customerName}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                      {order.paymentStatus}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Order Items */}
                <div>
                  <h4 className="font-medium mb-2">Order Items:</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-secondary rounded">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium">
                          ${(item.quantity * item.price).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      Est. Time: {order.estimatedTime}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">Total: ${order.total.toFixed(2)}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                  {order.status === "Pending" && (
                    <Button size="sm" className="flex items-center gap-1">
                      <Check className="h-4 w-4" />
                      Start Preparing
                    </Button>
                  )}
                  {order.status === "In Progress" && (
                    <Button size="sm" className="flex items-center gap-1">
                      <Check className="h-4 w-4" />
                      Mark Complete
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
