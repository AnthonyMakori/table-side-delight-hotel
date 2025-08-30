import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { 
  ChefHat, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Utensils,
  Timer,
  Search,
  PrinterIcon,
  Bell,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

type OrderStatus = "pending" | "new" | "preparing" | "ready" | "completed" | "cancelled";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

interface Cook {
  id: string;
  name: string;
}

interface Order {
  id: string;
  table_no: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  estimatedTime?: number;
  items: OrderItem[];
  customerNotes?: string;
  cook?: Cook[];
}

const KitchenDashboard: React.FC = () => {
  const { currentStaff } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [openLeaveModal, setOpenLeaveModal] = useState(false);
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // --- Fetch Orders from API ---
  const fetchOrders = async (): Promise<Order[]> => {
    const { data } = await axios.get('http://127.0.0.1:8000/api/orders');
    return data.map((o: any) => ({
      ...o,
      items: o.items || [],
      cook: o.cook || [],
      createdAt: new Date(o.created_at),
      updatedAt: new Date(o.updated_at),
    }));
  };

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const data = await fetchOrders();
        setOrders(data);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
    const interval = setInterval(loadOrders, 15000); 
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const data = await fetchOrders();
        setOrders(data);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
    const interval = setInterval(loadOrders, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleStartCooking = async (orderId: string) => {
    if (!currentStaff) return;
    const { data } = await axios.post(`http://127.0.0.1:8000/api/orders/${orderId}/assign`);
    setOrders(prev => prev.map(o => o.id === data.order.id ? data.order : o));
  };

  const handleMarkReady = async (orderId: string) => {
    const { data } = await axios.post(`http://127.0.0.1:8000/api/orders/${orderId}/status`, { status: 'ready' });
    setOrders(prev => prev.map(o => o.id === data.order.id ? data.order : o));
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    const { data } = await axios.post(`http://127.0.0.1:8000/api/orders/${orderId}/status`, { status: newStatus });
    setOrders(prev => prev.map(o => o.id === data.order.id ? data.order : o));
  };

  const handleLeaveSubmit = async () => {
    if (!currentStaff) return;

    setSubmitting(true);
    try {
      await axios.post("http://127.0.0.1:8000/api/leaves", {
        staff_id: currentStaff.id,
        type: leaveType,
        start_date: startDate,
        end_date: endDate,
        reason,
      });
      setOpenLeaveModal(false);
      setLeaveType("");
      setStartDate("");
      setEndDate("");
      setReason("");
      alert("Leave application submitted successfully!");
    } catch (error) {
      console.error("Error submitting leave:", error);
      alert("Failed to apply for leave.");
    } finally {
      setSubmitting(false);
    }
  };

  const stats = {
    newOrders: orders.filter(o => o.status === 'new' || o.status === 'pending').length,
    preparingOrders: orders.filter(o => o.status === 'preparing').length,
    readyOrders: orders.filter(o => o.status === 'ready').length,
    totalOrders: orders.length,
    avgPrepTime: orders.length
      ? `${Math.floor(orders.reduce((sum, o) => sum + (o.estimatedTime ?? 0), 0) / orders.length)} min`
      : 'N/A',
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.table_no?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedOrders = filteredOrders.sort((a, b) => {
    const statusPriority: Record<OrderStatus, number> = { 'pending': 4, 'new': 3, 'preparing': 2, 'ready': 1, 'completed': 0, 'cancelled': 0 };
    const aPriority = statusPriority[a.status] ?? 0;
    const bPriority = statusPriority[b.status] ?? 0;
    if (aPriority !== bPriority) return bPriority - aPriority;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  const getOrderStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'bg-muted text-muted-foreground';
      case 'new': return 'bg-destructive text-destructive-foreground animate-pulse-soft';
      case 'preparing': return 'bg-warning text-warning-foreground';
      case 'ready': return 'bg-success text-success-foreground';
      case 'completed': return 'bg-secondary text-secondary-foreground';
      case 'cancelled': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getOrderPriorityIcon = (order: Order) => {
    const minutes = Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 60000);
    if (minutes > 20) return <AlertCircle className="h-4 w-4 text-destructive" />;
    if (minutes > 10) return <Clock className="h-4 w-4 text-warning" />;
    return <Timer className="h-4 w-4 text-muted-foreground" />;
  };

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 min ago';
    return `${minutes} mins ago`;
  };

  // --- Status transitions ---
  const statusTransitions: Record<OrderStatus, OrderStatus[]> = {
    'pending': ['new', 'preparing'],
    'new': ['preparing', 'cancelled'],
    'preparing': ['ready', 'cancelled'],
    'ready': ['completed'],
    'completed': [],
    'cancelled': [],
  };

  return (
    <DashboardLayout
      title="Kitchen Dashboard"
      subtitle="Manage incoming orders and kitchen operations"
      actions={
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={fetchOrders}>
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
           <Dialog open={openLeaveModal} onOpenChange={setOpenLeaveModal}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                Apply Leave
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Apply for Leave</DialogTitle>
                <DialogDescription>
                  Fill in the details below to apply for leave. Your role and department are auto-filled.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div>
                  <Label>Role</Label>
                  <Input value={currentStaff?.role || ""} disabled />
                </div>
                <div>
                  <Label>Department</Label>
                  <Input value={currentStaff?.department || ""} disabled />
                </div>
                <div>
                  <Label>Leave Type</Label>
                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Select type</option>
                    <option value="sick">Sick Leave</option>
                    <option value="casual">Casual Leave</option>
                    <option value="annual">Annual Leave</option>
                  </select>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Label>Start Date</Label>
                    <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  </div>
                  <div className="flex-1">
                    <Label>End Date</Label>
                    <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label>Reason</Label>
                  <Textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Enter reason" />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenLeaveModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleLeaveSubmit} disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-destructive to-red-600 text-destructive-foreground shadow-hotel">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-destructive-foreground/80">New Orders</p>
              <p className="text-2xl font-bold">{stats.newOrders}</p>
            </div>
            <Bell className="h-8 w-8 text-destructive-foreground/80" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-warning to-orange-600 text-warning-foreground">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-warning-foreground/80">Preparing</p>
              <p className="text-2xl font-bold">{stats.preparingOrders}</p>
            </div>
            <ChefHat className="h-8 w-8 text-warning-foreground/80" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-success to-emerald-600 text-success-foreground">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-success-foreground/80">Ready</p>
              <p className="text-2xl font-bold">{stats.readyOrders}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-success-foreground/80" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-primary-foreground/80">Total Orders</p>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
            </div>
            <Utensils className="h-8 w-8 text-primary-foreground/80" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-gold text-accent-foreground">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-accent-foreground/80">Avg Time</p>
              <p className="text-2xl font-bold">{stats.avgPrepTime}</p>
            </div>
            <Timer className="h-8 w-8 text-accent-foreground/80" />
          </CardContent>
        </Card>
      </div>

      {/* Tabs & Orders */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="history">Order History</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {/* Search & Filter */}
          <div className="flex items-center justify-between mb-4">
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
            {sortedOrders.map(order => (
              <Card key={order.id} className={`shadow-card-soft hover:shadow-hotel transition-all duration-200 ${order.status === 'new' ? 'ring-2 ring-destructive/20' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">Table {order.table_no}</CardTitle>
                      {getOrderPriorityIcon(order)}
                    </div>
                    <Badge className={getOrderStatusColor(order.status)}>{order.status.toUpperCase()}</Badge>
                  </div>
                  <CardDescription className="flex justify-between text-xs">
                    <span>Order #{order.id.toString().slice(-6)}</span>
                    <span>{getTimeAgo(order.createdAt)}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        {item.specialInstructions && (
                          <p className="text-xs text-muted-foreground">Note: {item.specialInstructions}</p>
                        )}
                      </div>
                      <Badge variant="secondary" className="text-xs">{item.quantity}x</Badge>
                    </div>
                  ))}

                  {order.customerNotes && (
                    <div className="p-2 bg-info/10 border border-info/20 rounded">
                      <p className="text-xs font-medium text-info">Customer Notes:</p>
                      <p className="text-xs text-info">{order.customerNotes}</p>
                    </div>
                  )}

                  {order.estimatedTime && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Timer className="h-4 w-4" />
                      <span>Est. {order.estimatedTime} minutes</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {order.status === 'new' && !order.cook?.length && (
                      <Button size="sm" className="flex-1 bg-warning hover:bg-warning/80 text-warning-foreground" onClick={() => handleStartCooking(order.id)}>
                        <ChefHat className="mr-1 h-4 w-4" /> Start Cooking
                      </Button>
                    )}

                    {order.status === 'preparing' && order.cook?.[0]?.id === currentStaff?.id && (
                      <Button size="sm" className="flex-1 bg-success hover:bg-success/80 text-success-foreground" onClick={() => handleMarkReady(order.id)}>
                        <CheckCircle className="mr-1 h-4 w-4" /> Mark Ready
                      </Button>
                    )}

                    {order.status === 'ready' && (
                      <div className="w-full p-2 bg-success/10 border border-success/20 rounded text-center">
                        <p className="text-sm font-medium text-success">Ready for Service</p>
                      </div>
                    )}

                    {/* Status Change Buttons */}
                    {(statusTransitions[order.status] || []).map((nextStatus) => (
                      <Button 
                        key={nextStatus} 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleStatusChange(order.id, nextStatus)}
                      >
                        {nextStatus.toUpperCase()}
                      </Button>
                    ))}

                    <Button size="sm" variant="outline" onClick={() => console.log('Print order:', order.id)}>
                      <PrinterIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

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
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {orders.filter(o => o.status === 'completed' || o.status === 'cancelled').map(order => (
            <Card key={order.id} className="shadow-card-soft opacity-75">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">Table {order.table_no} - Order #{order.id.toString().slice(-6)}</p>
                  <p className="text-sm text-muted-foreground">{order.items.length} items • Completed {getTimeAgo(order.updatedAt)}</p>
                </div>
                <Badge variant={order.status === 'completed' ? 'default' : 'destructive'}>{order.status.toUpperCase()}</Badge>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default KitchenDashboard;
