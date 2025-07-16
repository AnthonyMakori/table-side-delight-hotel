import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useHotel } from '../../contexts/HotelContext';
import { 
  Bed, 
  Plus, 
  Calendar, 
  Users, 
  DollarSign, 
  Search,
  Filter,
  MoreHorizontal,
  Check,
  X,
  Clock,
  Key,
  Receipt,
  Settings,
} from 'lucide-react';
import BookingForm from '@/components/forms/BookingForm';
import { Room, Booking } from '../../types/hotel';

const ReceptionistDashboard: React.FC = () => {
  const { bookings, rooms, updateBooking, updateRoom } = useHotel();
  const [searchTerm, setSearchTerm] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const stats = {
    totalRooms: rooms.length,
    availableRooms: rooms.filter(r => r.status === 'available').length,
    occupiedRooms: rooms.filter(r => r.status === 'occupied').length,
    todayCheckIns: bookings.filter(b => {
      const today = new Date().toDateString();
      return new Date(b.checkInDate).toDateString() === today;
    }).length,
    todayCheckOuts: bookings.filter(b => {
      const today = new Date().toDateString();
      return new Date(b.checkOutDate).toDateString() === today;
    }).length,
    pendingPayments: bookings.filter(b => b.paymentStatus === 'pending').length,
  };

  const filteredBookings = bookings.filter(booking =>
    booking.guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.room.number.includes(searchTerm) ||
    booking.id.includes(searchTerm)
  );

  const handleCheckIn = (booking: Booking) => {
    updateBooking(booking.id, { status: 'checked-in' });
    updateRoom(booking.roomId, { status: 'occupied' });
  };

  const handleCheckOut = (booking: Booking) => {
    updateBooking(booking.id, { status: 'checked-out' });
    updateRoom(booking.roomId, { status: 'cleaning' });
  };

  const getRoomStatusColor = (status: Room['status']) => {
    switch (status) {
      case 'available':
        return 'bg-success text-success-foreground';
      case 'occupied':
        return 'bg-destructive text-destructive-foreground';
      case 'maintenance':
        return 'bg-warning text-warning-foreground';
      case 'cleaning':
        return 'bg-info text-info-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getBookingStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-info text-info-foreground';
      case 'checked-in':
        return 'bg-success text-success-foreground';
      case 'checked-out':
        return 'bg-secondary text-secondary-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getPaymentStatusColor = (status: Booking['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'refunded':
        return 'bg-info text-info-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <DashboardLayout
      title="Reception Dashboard"
      subtitle="Manage bookings, check-ins, and guest services"
      actions={
        <Button
          onClick={() => setShowBookingForm(true)}
          className="bg-gradient-hotel hover:shadow-hotel"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Booking
        </Button>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground shadow-hotel">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm">Total Rooms</p>
                <p className="text-2xl font-bold">{stats.totalRooms}</p>
              </div>
              <Bed className="h-8 w-8 text-primary-foreground/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-success to-emerald-600 text-success-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-success-foreground/80 text-sm">Available</p>
                <p className="text-2xl font-bold">{stats.availableRooms}</p>
              </div>
              <Key className="h-8 w-8 text-success-foreground/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-destructive to-red-600 text-destructive-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-destructive-foreground/80 text-sm">Occupied</p>
                <p className="text-2xl font-bold">{stats.occupiedRooms}</p>
              </div>
              <Users className="h-8 w-8 text-destructive-foreground/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-info to-blue-600 text-info-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-info-foreground/80 text-sm">Check-ins</p>
                <p className="text-2xl font-bold">{stats.todayCheckIns}</p>
              </div>
              <Calendar className="h-8 w-8 text-info-foreground/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-warning to-orange-600 text-warning-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-warning-foreground/80 text-sm">Check-outs</p>
                <p className="text-2xl font-bold">{stats.todayCheckOuts}</p>
              </div>
              <Clock className="h-8 w-8 text-warning-foreground/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-gold text-accent-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-accent-foreground/80 text-sm">Pending Pay</p>
                <p className="text-2xl font-bold">{stats.pendingPayments}</p>
              </div>
              <DollarSign className="h-8 w-8 text-accent-foreground/80" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bookings">Bookings Management</TabsTrigger>
          <TabsTrigger value="rooms">Room Status</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="shadow-card-soft hover:shadow-hotel transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-hotel rounded-lg p-3">
                        <Users className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{booking.guest.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Room {booking.room.number}</span>
                          <span>•</span>
                          <span>{booking.numberOfGuests} guests</span>
                          <span>•</span>
                          <span>Booking #{booking.id.slice(-6)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Check-in / Check-out</div>
                        <div className="font-medium">
                          {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Badge className={getBookingStatusColor(booking.status)}>
                          {booking.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                        <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                          {booking.paymentStatus.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-2">
                        {booking.status === 'confirmed' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCheckIn(booking)}
                            className="text-success hover:bg-success hover:text-success-foreground"
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Check In
                          </Button>
                        )}
                        
                        {booking.status === 'checked-in' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCheckOut(booking)}
                            className="text-info hover:bg-info hover:text-info-foreground"
                          >
                            <Key className="mr-1 h-4 w-4" />
                            Check Out
                          </Button>
                        )}

                        <Button size="sm" variant="outline">
                          <Receipt className="mr-1 h-4 w-4" />
                          Receipt
                        </Button>

                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {booking.notes && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Notes:</span> {booking.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rooms" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {rooms.map((room) => (
              <Card key={room.id} className="shadow-card-soft hover:shadow-hotel transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Room {room.number}</CardTitle>
                    <Badge className={getRoomStatusColor(room.status)}>
                      {room.status.toUpperCase()}
                    </Badge>
                  </div>
                  <CardDescription>
                    Floor {room.floor} • {room.type} • ${room.price}/night
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Amenities</p>
                      <div className="flex flex-wrap gap-1">
                        {room.amenities.map((amenity, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => updateRoom(room.id, { 
                          status: room.status === 'available' ? 'maintenance' : 'available' 
                        })}
                      >
                        <Settings className="mr-1 h-4 w-4" />
                        {room.status === 'available' ? 'Maintenance' : 'Available'}
                      </Button>
                      
                      {room.status === 'cleaning' && (
                        <Button
                          size="sm"
                          onClick={() => updateRoom(room.id, { status: 'available' })}
                          className="flex-1"
                        >
                          <Check className="mr-1 h-4 w-4" />
                          Ready
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {showBookingForm && (
        <BookingForm
          open={showBookingForm}
          onOpenChange={setShowBookingForm}
          booking={selectedBooking}
        />
      )}
    </DashboardLayout>
  );
};

export default ReceptionistDashboard;