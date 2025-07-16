import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useHotel } from '../../contexts/HotelContext';
import { 
  ChefHat, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Utensils,
  Timer,
  Search,
  Filter,
  PrinterIcon,
  Bell,
  RefreshCw,
} from 'lucide-react';
import { Order } from '../../types/hotel';

const KitchenDashboard: React.FC = () => {
  const { orders, updateOrder } = useHotel();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const stats = {
    newOrders: orders.filter(o => o.status === 'new').length,
    preparingOrders: orders.filter(o => o.status === 'preparing').length,
    readyOrders: orders.filter(o => o.status === 'ready').length,
    totalOrders: orders.length,
    avgPrepTime: '12 min',
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.tableNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.menuItem.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedOrders = filteredOrders.sort((a, b) => {
    // Sort by status priority: new > preparing > ready, then by creation time
    const statusPriority = { 'new': 3, 'preparing': 2, 'ready': 1, 'served': 0, 'cancelled': 0 };
    const aPriority = statusPriority[a.status] || 0;
    const bPriority = statusPriority[b.status] || 0;
    
    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }
    
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  const handleStatusUpdate = (orderId: string, newStatus: Order['status']) => {
    updateOrder(orderId, { status: newStatus });
  };

  const getOrderStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'new':
        return 'bg-destructive text-destructive-foreground animate-pulse-soft';
      case 'preparing':
        return 'bg-warning text-warning-foreground';
      case 'ready':
        return 'bg-success text-success-foreground';
      case 'served':
        return 'bg-secondary text-secondary-foreground';
      case 'cancelled':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getOrderPriorityIcon = (order: Order) => {
    const orderAge = Date.now() - new Date(order.createdAt).getTime();
    const minutes = Math.floor(orderAge / 60000);
    
    if (minutes > 20) {
      return <AlertCircle className="h-4 w-4 text-destructive" />;
    } else if (minutes > 10) {
      return <Clock className="h-4 w-4 text-warning" />;
    }
    return <Timer className="h-4 w-4 text-muted-foreground" />;
  };

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 min ago';
    return `${minutes} mins ago`;
  };

  return (
    <DashboardLayout
      title="Kitchen Dashboard"
      subtitle="Manage incoming orders and kitchen operations"
      actions={
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <PrinterIcon className="mr-2 h-4 w-4" />
            Print Orders
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-destructive to-red-600 text-destructive-foreground shadow-hotel">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-destructive-foreground/80 text-sm">New Orders</p>
                <p className="text-2xl font-bold">{stats.newOrders}</p>
              </div>
              <div className="relative">
                <Bell className="h-8 w-8 text-destructive-foreground/80" />
                {stats.newOrders > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse-soft">
                    {stats.newOrders}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-warning to-orange-600 text-warning-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-warning-foreground/80 text-sm">Preparing</p>
                <p className="text-2xl font-bold">{stats.preparingOrders}</p>
              </div>
              <ChefHat className="h-8 w-8 text-warning-foreground/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-success to-emerald-600 text-success-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-success-foreground/80 text-sm">Ready</p>
                <p className="text-2xl font-bold">{stats.readyOrders}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success-foreground/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm">Total Orders</p>
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
              </div>
              <Utensils className="h-8 w-8 text-primary-foreground/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-gold text-accent-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-accent-foreground/80 text-sm">Avg Time</p>
                <p className="text-2xl font-bold">{stats.avgPrepTime}</p>
              </div>
              <Timer className="h-8 w-8 text-accent-foreground/80" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="history">Order History</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders or items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-background border border-input rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
              </select>
            </div>
          </div>

          {/* Orders Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {sortedOrders.map((order) => (
              <Card 
                key={order.id} 
                className={`shadow-card-soft hover:shadow-hotel transition-all duration-200 ${
                  order.status === 'new' ? 'ring-2 ring-destructive/20' : ''
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">Table {order.tableNumber}</CardTitle>
                      {getOrderPriorityIcon(order)}
                    </div>
                    <Badge className={getOrderStatusColor(order.status)}>
                      {order.status.toUpperCase()}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center justify-between">
                    <span>Order #{order.id.slice(-6)}</span>
                    <span className="text-xs">{getTimeAgo(order.createdAt)}</span>
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Items:</h4>
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div>
                          <p className="font-medium text-sm">{item.menuItem.name}</p>
                          {item.specialInstructions && (
                            <p className="text-xs text-muted-foreground">
                              Note: {item.specialInstructions}
                            </p>
                          )}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {item.quantity}x
                        </Badge>
                      </div>
                    ))}
                  </div>

                  {/* Customer Notes */}
                  {order.customerNotes && (
                    <div className="p-2 bg-info/10 border border-info/20 rounded">
                      <p className="text-xs font-medium text-info">Customer Notes:</p>
                      <p className="text-xs text-info">{order.customerNotes}</p>
                    </div>
                  )}

                  {/* Estimated Time */}
                  {order.estimatedTime && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Timer className="h-4 w-4" />
                      <span>Est. {order.estimatedTime} minutes</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {order.status === 'new' && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(order.id, 'preparing')}
                        className="flex-1 bg-warning hover:bg-warning/80 text-warning-foreground"
                      >
                        <ChefHat className="mr-1 h-4 w-4" />
                        Start Cooking
                      </Button>
                    )}
                    
                    {order.status === 'preparing' && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(order.id, 'ready')}
                        className="flex-1 bg-success hover:bg-success/80 text-success-foreground"
                      >
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Mark Ready
                      </Button>
                    )}

                    {order.status === 'ready' && (
                      <div className="w-full p-2 bg-success/10 border border-success/20 rounded text-center">
                        <p className="text-sm font-medium text-success">Ready for Service</p>
                      </div>
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => console.log('Print order:', order.id)}
                      className="px-3"
                    >
                      <PrinterIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No Orders Found</h3>
              <p className="text-sm text-muted-foreground">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters.' 
                  : 'All quiet in the kitchen! New orders will appear here.'}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="space-y-4">
            {orders.filter(o => o.status === 'served' || o.status === 'cancelled').map((order) => (
              <Card key={order.id} className="shadow-card-soft opacity-75">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Table {order.tableNumber} - Order #{order.id.slice(-6)}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} items • Completed {getTimeAgo(order.updatedAt)}
                      </p>
                    </div>
                    <Badge variant={order.status === 'served' ? 'default' : 'destructive'}>
                      {order.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default KitchenDashboard;