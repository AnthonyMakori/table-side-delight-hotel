import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  DollarSign,
  Users,
  Building,
  UtensilsCrossed,
  QrCode
} from "lucide-react";

export default function Reports() {
  const dailyStats = {
    revenue: 2840.50,
    bookings: 12,
    mealOrders: 45,
    qrScans: 67,
    occupancyRate: 78
  };

  const weeklyTrends = [
    { day: "Mon", revenue: 2100, orders: 35 },
    { day: "Tue", revenue: 2300, orders: 42 },
    { day: "Wed", revenue: 2840, orders: 45 },
    { day: "Thu", revenue: 2650, orders: 38 },
    { day: "Fri", revenue: 3200, orders: 52 },
    { day: "Sat", revenue: 3800, orders: 68 },
    { day: "Sun", revenue: 3400, orders: 58 }
  ];

  const topMenuItems = [
    { name: "Grilled Salmon", orders: 24, revenue: 695.76 },
    { name: "Caesar Salad", orders: 18, revenue: 269.82 },
    { name: "Ribeye Steak", orders: 15, revenue: 689.85 },
    { name: "Breakfast Special", orders: 22, revenue: 285.78 }
  ];

  const roomTypePerformance = [
    { type: "Deluxe Suite", bookings: 8, revenue: 2392.00, rate: 95 },
    { type: "Premium Room", bookings: 15, revenue: 2985.00, rate: 85 },
    { type: "Standard Room", bookings: 22, revenue: 3278.00, rate: 72 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into hotel performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Daily Revenue</p>
                <p className="text-2xl font-bold">${dailyStats.revenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
            <p className="text-xs text-success mt-2">+12% vs yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bookings</p>
                <p className="text-2xl font-bold">{dailyStats.bookings}</p>
              </div>
              <Building className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-success mt-2">+8% vs yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Meal Orders</p>
                <p className="text-2xl font-bold">{dailyStats.mealOrders}</p>
              </div>
              <UtensilsCrossed className="h-8 w-8 text-accent" />
            </div>
            <p className="text-xs text-success mt-2">+15% vs yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">QR Scans</p>
                <p className="text-2xl font-bold">{dailyStats.qrScans}</p>
              </div>
              <QrCode className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-xs text-success mt-2">+22% vs yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Occupancy</p>
                <p className="text-2xl font-bold">{dailyStats.occupancyRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
            <p className="text-xs text-success mt-2">+5% vs yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
          <TabsTrigger value="dining">Dining</TabsTrigger>
          <TabsTrigger value="operational">Operational</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Weekly Revenue Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyTrends.map((day) => (
                    <div key={day.day} className="flex items-center justify-between">
                      <span className="font-medium">{day.day}</span>
                      <div className="flex items-center gap-4">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(day.revenue / 4000) * 100}%` }}
                          />
                        </div>
                        <span className="font-bold">${day.revenue}</span>
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
                  <div className="flex justify-between items-center">
                    <span>Accommodation Revenue</span>
                    <span className="font-bold">$1,680.50 (59%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Dining Revenue</span>
                    <span className="font-bold">$1,160.00 (41%)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-primary h-3 rounded-l-full" style={{ width: '59%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="accommodation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Room Type Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roomTypePerformance.map((room) => (
                  <div key={room.type} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div>
                      <p className="font-medium">{room.type}</p>
                      <p className="text-sm text-muted-foreground">{room.bookings} bookings</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${room.revenue.toFixed(2)}</p>
                      <Badge className="bg-success/20 text-success">{room.rate}% occupancy</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dining" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Menu Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topMenuItems.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.orders} orders</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${item.revenue.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operational" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Staff Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Average Order Processing Time</span>
                    <Badge className="bg-success/20 text-success">12 min</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Customer Satisfaction</span>
                    <Badge className="bg-success/20 text-success">4.8/5</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Staff Efficiency</span>
                    <Badge className="bg-success/20 text-success">94%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>QR Code Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Scans Today</span>
                    <span className="font-bold">67</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Conversion Rate</span>
                    <Badge className="bg-success/20 text-success">67%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Most Used Table</span>
                    <span className="font-bold">Table 5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}