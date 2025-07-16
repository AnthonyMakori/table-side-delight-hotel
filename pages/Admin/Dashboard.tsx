import { StatCard } from "../../src/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "../../src/components/ui/card";
import { Sidebar } from "../../src/components/Sidebar";
import {
  Building,
  UtensilsCrossed,
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Rooms",
      value: "45",
      icon: Building,
      change: "2 new this month",
      changeType: "positive" as const,
    },
    {
      title: "Today's Bookings",
      value: "28",
      icon: Calendar,
      change: "+12% from yesterday",
      changeType: "positive" as const,
    },
    {
      title: "Revenue Today",
      value: "$12,580",
      icon: DollarSign,
      change: "+8% from yesterday",
      changeType: "positive" as const,
    },
    {
      title: "Active Orders",
      value: "15",
      icon: UtensilsCrossed,
      change: "3 pending",
      changeType: "neutral" as const,
    },
  ];

  const recentBookings = [
    { id: "BK001", guest: "John Smith", room: "Deluxe Suite 101", checkin: "Today", status: "Confirmed" },
    { id: "BK002", guest: "Sarah Johnson", room: "Standard Room 205", checkin: "Tomorrow", status: "Pending" },
    { id: "BK003", guest: "Mike Davis", room: "Premium Room 304", checkin: "Today", status: "Checked In" },
  ];

  const recentOrders = [
    { id: "ORD001", table: "Table 5", items: "2x Caesar Salad, 1x Grilled Salmon", total: "$45.99", status: "In Progress" },
    { id: "ORD002", table: "Table 12", items: "3x Breakfast Special", total: "$32.97", status: "Completed" },
    { id: "ORD003", table: "Table 8", items: "1x Ribeye Steak, 2x Wine", total: "$78.50", status: "Pending" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 h-full overflow-hidden">
        <Sidebar />
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to Grandeur Management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Recent Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div>
                      <p className="font-medium">{booking.guest}</p>
                      <p className="text-sm text-muted-foreground">{booking.room}</p>
                      <p className="text-xs text-muted-foreground">Check-in: {booking.checkin}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      booking.status === "Confirmed" ? "bg-success/20 text-success" :
                      booking.status === "Checked In" ? "bg-primary/20 text-primary" :
                      "bg-warning/20 text-warning"
                    }`}>
                      {booking.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UtensilsCrossed className="h-5 w-5" />
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div>
                      <p className="font-medium">{order.table}</p>
                      <p className="text-sm text-muted-foreground">{order.items}</p>
                      <p className="text-xs text-muted-foreground">Total: {order.total}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      order.status === "Completed" ? "bg-success/20 text-success" :
                      order.status === "In Progress" ? "bg-warning/20 text-warning" :
                      "bg-muted/20 text-muted-foreground"
                    }`}>
                      {order.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Building className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Add Room</p>
              </button>
              <button className="p-4 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors">
                <UtensilsCrossed className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Add Menu Item</p>
              </button>
              <button className="p-4 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-colors">
                <Users className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Add Staff</p>
              </button>
              <button className="p-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors">
                <TrendingUp className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm font-medium">View Reports</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
