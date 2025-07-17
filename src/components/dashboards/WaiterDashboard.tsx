import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useHotel } from '../../contexts/HotelContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Utensils,
  Search,
  Filter,
  Check,
  X,
  AlertTriangle,
  MapPin,
  ClipboardList,
} from 'lucide-react';
import { Table, Order } from '../../types/hotel';

const WaiterDashboard: React.FC = () => {
  const { tables, orders, updateTable, updateOrder } = useHotel();
  const { currentStaff } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [sectionFilter, setSectionFilter] = useState<string>('all');

  // Filter tables assigned to current waiter or unassigned
  const myTables = tables.filter(table => 
    !table.waiterId || table.waiterId === currentStaff?.id
  );

  const myOrders = orders.filter(order => {
    const table = tables.find(t => t.number === order.tableNumber);
    return table && (!table.waiterId || table.waiterId === currentStaff?.id);
  });

  const stats = {
    assignedTables: myTables.filter(t => t.waiterId === currentStaff?.id).length,
    occupiedTables: myTables.filter(t => t.status === 'occupied').length,
    pendingOrders: myOrders.filter(o => o.status === 'ready').length,
    totalEarnings: myOrders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.totalAmount, 0),
  };

  const filteredTables = myTables.filter(table => {
    const matchesSearch = table.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         table.section.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = sectionFilter === 'all' || table.section === sectionFilter;
    return matchesSearch && matchesSection;
  });

  const sections = Array.from(new Set(tables.map(t => t.section)));

  const handleAssignTable = (tableId: string) => {
    updateTable(tableId, { waiterId: currentStaff?.id });
  };

  const handleUnassignTable = (tableId: string) => {
    updateTable(tableId, { waiterId: undefined });
  };

  const handleTableStatusUpdate = (tableId: string, status: Table['status']) => {
    updateTable(tableId, { status });
  };

  const handleMarkServed = (orderId: string) => {
    updateOrder(orderId, { status: 'served' });
  };

  const getTableStatusColor = (status: Table['status']) => {
    switch (status) {
      case 'available':
        return 'bg-success text-success-foreground';
      case 'occupied':
        return 'bg-primary text-primary-foreground';
      case 'reserved':
        return 'bg-info text-info-foreground';
      case 'cleaning':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getOrderStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'new':
        return 'bg-info text-info-foreground';
      case 'preparing':
        return 'bg-warning text-warning-foreground';
      case 'ready':
        return 'bg-success text-success-foreground animate-pulse-soft';
      case 'served':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getTableIcon = (table: Table) => {
    if (table.currentOrderId) {
      const order = orders.find(o => o.id === table.currentOrderId);
      if (order?.status === 'ready') {
        return <AlertTriangle className="h-4 w-4 text-success animate-pulse-soft" />;
      }
    }
    return <Users className="h-4 w-4" />;
  };

  return (
    <DashboardLayout
      title="Waiter Dashboard"
      subtitle="Manage your assigned tables and customer service"
      actions={
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <ClipboardList className="mr-2 h-4 w-4" />
            Take Order
          </Button>
        </div>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground shadow-hotel">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm">My Tables</p>
                <p className="text-2xl font-bold">{stats.assignedTables}</p>
              </div>
              <Users className="h-8 w-8 text-primary-foreground/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-info to-blue-600 text-info-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-info-foreground/80 text-sm">Occupied</p>
                <p className="text-2xl font-bold">{stats.occupiedTables}</p>
              </div>
              <Utensils className="h-8 w-8 text-info-foreground/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-success to-emerald-600 text-success-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-success-foreground/80 text-sm">Ready Orders</p>
                <p className="text-2xl font-bold">{stats.pendingOrders}</p>
              </div>
              <div className="relative">
                <CheckCircle className="h-8 w-8 text-success-foreground/80" />
                {stats.pendingOrders > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse-soft">
                    {stats.pendingOrders}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-gold text-accent-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-accent-foreground/80 text-sm">Earnings</p>
                <p className="text-2xl font-bold">${stats.totalEarnings}</p>
              </div>
              <DollarSign className="h-8 w-8 text-accent-foreground/80" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tables" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tables">Table Management</TabsTrigger>
          <TabsTrigger value="orders">Order Status</TabsTrigger>
        </TabsList>

        <TabsContent value="tables" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tables..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <select
                value={sectionFilter}
                onChange={(e) => setSectionFilter(e.target.value)}
                className="px-3 py-2 bg-background border border-input rounded-md text-sm"
              >
                <option value="all">All Sections</option>
                {sections.map(section => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tables Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTables.map((table) => {
              const currentOrder = table.currentOrderId ? orders.find(o => o.id === table.currentOrderId) : null;
              const isMyTable = table.waiterId === currentStaff?.id;
              
              return (
                <Card 
                  key={table.id} 
                  className={`shadow-card-soft hover:shadow-hotel transition-all duration-200 ${
                    currentOrder?.status === 'ready' ? 'ring-2 ring-success/40' : ''
                  } ${!isMyTable ? 'opacity-60' : ''}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">Table {table.number}</CardTitle>
                        {getTableIcon(table)}
                      </div>
                      <Badge className={getTableStatusColor(table.status)}>
                        {table.status.toUpperCase()}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{table.section}</span>
                      </div>
                      <span>Capacity: {table.capacity}</span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Assignment Status */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Assigned to:</span>
                      <span className={isMyTable ? 'text-success font-medium' : 'text-muted-foreground'}>
                        {isMyTable ? 'You' : table.waiterId ? 'Other waiter' : 'Unassigned'}
                      </span>
                    </div>

                    {/* Current Order Info */}
                    {currentOrder && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Current Order</span>
                          <Badge className={getOrderStatusColor(currentOrder.status)}>
                            {currentOrder.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {currentOrder.items.length} items • ${currentOrder.totalAmount}
                        </p>
                        {currentOrder.status === 'ready' && (
                          <Button
                            size="sm"
                            onClick={() => handleMarkServed(currentOrder.id)}
                            className="w-full mt-2 bg-success hover:bg-success/80"
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Mark as Served
                          </Button>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      {!isMyTable && !table.waiterId && (
                        <Button
                          size="sm"
                          onClick={() => handleAssignTable(table.id)}
                          className="flex-1"
                          variant="outline"
                        >
                          <Check className="mr-1 h-4 w-4" />
                          Assign to Me
                        </Button>
                      )}
                      
                      {isMyTable && (
                        <Button
                          size="sm"
                          onClick={() => handleUnassignTable(table.id)}
                          variant="outline"
                          className="flex-1"
                        >
                          <X className="mr-1 h-4 w-4" />
                          Unassign
                        </Button>
                      )}

                      {table.status === 'occupied' && isMyTable && (
                        <Button
                          size="sm"
                          onClick={() => handleTableStatusUpdate(table.id, 'cleaning')}
                          variant="outline"
                          className="flex-1"
                        >
                          <Clock className="mr-1 h-4 w-4" />
                          Clear Table
                        </Button>
                      )}

                      {table.status === 'cleaning' && isMyTable && (
                        <Button
                          size="sm"
                          onClick={() => handleTableStatusUpdate(table.id, 'available')}
                          className="flex-1 bg-success hover:bg-success/80"
                        >
                          <Check className="mr-1 h-4 w-4" />
                          Ready
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <div className="space-y-4">
            {myOrders.filter(order => order.status !== 'served' && order.status !== 'cancelled').map((order) => {
              const table = tables.find(t => t.number === order.tableNumber);
              
              return (
                <Card key={order.id} className="shadow-card-soft hover:shadow-hotel transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gradient-hotel rounded-lg p-3">
                          <Utensils className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Table {order.tableNumber}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{order.items.length} items</span>
                            <span>•</span>
                            <span>${order.totalAmount}</span>
                            <span>•</span>
                            <span>Order #{order.id.slice(-6)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Badge className={getOrderStatusColor(order.status)}>
                          {order.status.replace('-', ' ').toUpperCase()}
                        </Badge>

                        {order.status === 'ready' && (
                          <Button
                            onClick={() => handleMarkServed(order.id)}
                            className="bg-success hover:bg-success/80"
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Mark Served
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="p-2 bg-muted/50 rounded">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm">{item.menuItem.name}</span>
                            <Badge variant="secondary" className="text-xs">{item.quantity}x</Badge>
                          </div>
                          {item.specialInstructions && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.specialInstructions}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {myOrders.filter(order => order.status !== 'served' && order.status !== 'cancelled').length === 0 && (
              <div className="text-center py-12">
                <Utensils className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No Active Orders</h3>
                <p className="text-sm text-muted-foreground">
                  All your tables are up to date! New orders will appear here.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default WaiterDashboard;