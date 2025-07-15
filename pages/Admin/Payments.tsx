import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  Search,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";

export default function Payments() {
  const payments = [
    {
      id: "PAY001",
      orderId: "ORD001",
      tableNumber: "5",
      amount: 58.97,
      method: "Credit Card",
      status: "Completed",
      transactionId: "tx_1234567890",
      timestamp: "12:45 PM",
      customerName: "John Smith",
      type: "Meal"
    },
    {
      id: "PAY002", 
      orderId: "BK001",
      roomNumber: "101",
      amount: 299.00,
      method: "Online Payment",
      status: "Completed",
      transactionId: "tx_0987654321",
      timestamp: "10:30 AM",
      customerName: "Sarah Johnson",
      type: "Accommodation"
    },
    {
      id: "PAY003",
      orderId: "ORD003",
      tableNumber: "8", 
      amount: 78.49,
      method: "Mobile Payment",
      status: "Failed",
      transactionId: "tx_1122334455",
      timestamp: "1:20 PM",
      customerName: "Mike Davis",
      type: "Meal"
    },
    {
      id: "PAY004",
      orderId: "ORD002",
      tableNumber: "12",
      amount: 38.97,
      method: "Cash",
      status: "Completed", 
      transactionId: "cash_001",
      timestamp: "12:00 PM",
      customerName: "Lisa Wong",
      type: "Meal"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-success/20 text-success";
      case "Pending": return "bg-warning/20 text-warning";
      case "Failed": return "bg-destructive/20 text-destructive";
      case "Refunded": return "bg-muted/20 text-muted-foreground";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Accommodation": return "bg-primary/20 text-primary";
      case "Meal": return "bg-accent/20 text-accent-foreground";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const totalRevenue = payments.filter(p => p.status === "Completed").reduce((sum, payment) => sum + payment.amount, 0);
  const failedPayments = payments.filter(p => p.status === "Failed").length;
  const completedPayments = payments.filter(p => p.status === "Completed").length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment Management</h1>
        <p className="text-muted-foreground">Monitor transactions for accommodations and meals</p>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
            <p className="text-xs text-success mt-2">+15% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Successful Payments</p>
                <p className="text-2xl font-bold">{completedPayments}</p>
              </div>
              <CreditCard className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Failed Payments</p>
                <p className="text-2xl font-bold">{failedPayments}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <p className="text-xs text-destructive mt-2">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">92%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
            <p className="text-xs text-success mt-2">+3% this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search payments..." className="pl-10" />
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { method: "Credit Card", amount: 396.94, percentage: 65 },
                { method: "Mobile Payment", amount: 78.49, percentage: 13 },
                { method: "Cash", amount: 38.97, percentage: 7 },
                { method: "Online Payment", amount: 299.00, percentage: 15 }
              ].map((item) => (
                <div key={item.method} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="font-medium">{item.method}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${item.amount.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="font-medium">Accommodation</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">$299.00</p>
                  <p className="text-xs text-muted-foreground">43%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="font-medium">Meals</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">$397.43</p>
                  <p className="text-xs text-muted-foreground">57%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">{payment.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.customerName} • {payment.timestamp}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getTypeColor(payment.type)}>
                      {payment.type}
                    </Badge>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-bold text-lg">${payment.amount.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">{payment.method}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}