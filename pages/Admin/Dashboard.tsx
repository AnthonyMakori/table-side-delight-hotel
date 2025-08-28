import { useEffect, useState } from "react";
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

interface Room {
  id: string | number;
  number: string | number;
  type?: string;
}

interface Stat {
  title: string;
  value: string | number;
  icon: any;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}

interface Booking {
  id: string | number;
  guest: string;
  room: Room | null;
  checkin: string;
  status: string;
}

interface Order {
  id: string | number;
  table: string;
  items: string;
  total: string | number;
  status: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        // Map stats to your StatCard structure
        const statsArray: Stat[] = [
          {
            title: "Total Rooms",
            value: data.stats.totalRooms,
            icon: Building,
            change: "2 new this month",
            changeType: "positive",
          },
          {
            title: "Today's Bookings",
            value: data.stats.todaysBookings,
            icon: Calendar,
            change: "+12% from yesterday",
            changeType: "positive",
          },
          {
            title: "Revenue Today",
            value: `$${data.stats.revenueToday}`,
            icon: DollarSign,
            change: "+8% from yesterday",
            changeType: "positive",
          },
          {
            title: "Active Orders",
            value: data.stats.activeOrders,
            icon: UtensilsCrossed,
            change: `${data.stats.activeOrders} pending`,
            changeType: "neutral",
          },
        ];
        setStats(statsArray);
        setRecentBookings(data.recentBookings);
        setRecentOrders(data.recentOrders);
      })
      .catch((err) => console.error("Failed to fetch dashboard data:", err));
  }, []);

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
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{booking.guest}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.room ? `Room ${booking.room.number} (${booking.room.type ?? "N/A"})` : "N/A"}
                    </p>

                      <p className="text-xs text-muted-foreground">
                        Check-in: {booking.checkin}
                      </p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        booking.status === "Confirmed"
                          ? "bg-success/20 text-success"
                          : booking.status === "Checked In"
                          ? "bg-primary/20 text-primary"
                          : "bg-warning/20 text-warning"
                      }`}
                    >
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
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{order.table}</p>
                      <p className="text-sm text-muted-foreground">{order.items}</p>
                      <p className="text-xs text-muted-foreground">Total: {order.total}</p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        order.status === "Completed"
                          ? "bg-success/20 text-success"
                          : order.status === "In Progress"
                          ? "bg-warning/20 text-warning"
                          : "bg-muted/20 text-muted-foreground"
                      }`}
                    >
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
