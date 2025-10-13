import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Bed,
  Plus,
  Calendar,
  Users,
  DollarSign,
  Search,
  Filter,
  Check,
  Clock,
  Key,
  Receipt,
  Settings,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layout/DashboardLayout";
import BookingForm from "@/components/forms/BookingForm";

interface Room {
  id: number;
  number: string;
  type: string;
  capacity: number;
  floor?: string;
  price: number;
  status: "available" | "occupied" | "maintenance" | "cleaning" | "Taken" | "Available";
  amenities?: string[];
}

interface Booking {
  id: number;
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  room_id: number;
  room?: Room;
  check_in: string;
  check_out: string;
  guests: number;
  status: "confirmed" | "checked-in" | "checked-out" | "cancelled";
  total_price: number;
  special_requests?: string;
  paymentStatus?: "paid" | "pending" | "refunded";
}

const ReceptionistDashboard: React.FC = () => {
  const BASE_URL = "http://127.0.0.1:8000/api";

  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // ✅ Fetch rooms and bookings
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsRes, bookingsRes] = await Promise.all([
          axios.get(`${BASE_URL}/rooms`),
          axios.get(`${BASE_URL}/bookings`),
        ]);

        setRooms(roomsRes.data);
        setBookings(bookingsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateRoom = async (id: number, data: Partial<Room>) => {
    try {
      await axios.put(`${BASE_URL}/rooms/${id}`, data);
      setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, ...data } : r)));
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  const updateBooking = async (id: number, data: Partial<Booking>) => {
    try {
      await axios.put(`${BASE_URL}/bookings/${id}`, data);
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  // ✅ Handle check-in and check-out
  const handleCheckIn = async (booking: Booking) => {
    await updateBooking(booking.id, { status: "checked-in" });
    await updateRoom(booking.room_id, { status: "occupied" });
  };

  const handleCheckOut = async (booking: Booking) => {
    await updateBooking(booking.id, { status: "checked-out" });
    await updateRoom(booking.room_id, { status: "cleaning" });
  };

  // ✅ Filter bookings (by guest or room number)
  const filteredBookings = bookings.filter((b) => {
    const guestName = b.guest_name?.toLowerCase() || "";
    const roomNumber = b.room?.number?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();
    return guestName.includes(search) || roomNumber.includes(search);
  });

  // ✅ Dashboard stats
  const stats = {
    totalRooms: rooms.length,
    availableRooms: rooms.filter(
      (r) => r.status.toLowerCase() === "available"
    ).length,
    occupiedRooms: rooms.filter(
      (r) => r.status.toLowerCase() === "occupied" || r.status.toLowerCase() === "taken"
    ).length,
    todayCheckIns: bookings.filter(
      (b) =>
        new Date(b.check_in).toDateString() === new Date().toDateString()
    ).length,
    todayCheckOuts: bookings.filter(
      (b) =>
        new Date(b.check_out).toDateString() === new Date().toDateString()
    ).length,
    pendingPayments: bookings.filter(
      (b) => b.paymentStatus === "pending"
    ).length,
  };

  // ✅ Badge color helpers
  const getRoomStatusColor = (status: Room["status"]) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-500 text-white";
      case "occupied":
      case "taken":
        return "bg-red-500 text-white";
      case "maintenance":
        return "bg-yellow-500 text-white";
      case "cleaning":
        return "bg-blue-400 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const getBookingStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-400 text-white";
      case "checked-in":
        return "bg-green-500 text-white";
      case "checked-out":
        return "bg-gray-500 text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const getPaymentStatusColor = (status?: Booking["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return "bg-green-600 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      case "refunded":
        return "bg-blue-400 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  if (loading)
    return <div className="p-8 text-center">Loading data...</div>;

  return (
    <DashboardLayout
      title="Reception Dashboard"
      subtitle="Manage bookings, check-ins, and guest services"
      actions={
        <Button
          onClick={() => setShowBookingForm(true)}
          className="bg-blue-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Booking
        </Button>
      }
    >
      {/* ========== Stats Cards ========== */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <Card className="bg-blue-700 text-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p>Total Rooms</p>
                <p className="text-2xl font-bold">{stats.totalRooms}</p>
              </div>
              <Bed className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p>Available</p>
                <p className="text-2xl font-bold">{stats.availableRooms}</p>
              </div>
              <Key className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p>Occupied</p>
                <p className="text-2xl font-bold">{stats.occupiedRooms}</p>
              </div>
              <Users className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-500 text-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p>Check-ins</p>
                <p className="text-2xl font-bold">{stats.todayCheckIns}</p>
              </div>
              <Calendar className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-600 text-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p>Check-outs</p>
                <p className="text-2xl font-bold">{stats.todayCheckOuts}</p>
              </div>
              <Clock className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-500 text-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p>Pending Payments</p>
                <p className="text-2xl font-bold">{stats.pendingPayments}</p>
              </div>
              <DollarSign className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ========== Tabs ========== */}
      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
        </TabsList>

        {/* ===== Bookings Tab ===== */}
        <TabsContent value="bookings" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
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

          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="shadow hover:shadow-lg transition">
              <CardContent className="p-6">
                <div className="flex justify-between items-center flex-wrap gap-3">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded">
                      <Users className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{booking.guest_name}</h3>
                      <p className="text-sm text-gray-500">
                        Room {booking.room?.number || booking.room_id} • {booking.guests} guests
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge className={getBookingStatusColor(booking.status)}>
                      {booking.status.toUpperCase()}
                    </Badge>
                    <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                      {(booking.paymentStatus || "N/A").toUpperCase()}
                    </Badge>
                  </div>

                  <div className="flex space-x-2">
                    {booking.status === "confirmed" && (
                      <Button size="sm" onClick={() => handleCheckIn(booking)}>
                        <Check className="mr-1 h-4 w-4" /> Check In
                      </Button>
                    )}
                    {booking.status === "checked-in" && (
                      <Button size="sm" onClick={() => handleCheckOut(booking)}>
                        <Key className="mr-1 h-4 w-4" /> Check Out
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Receipt className="mr-1 h-4 w-4" /> Receipt
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* ===== Rooms Tab ===== */}
        <TabsContent
          value="rooms"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {rooms.map((room) => (
            <Card key={room.id} className="shadow hover:shadow-lg transition">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Room {room.number}</CardTitle>
                  <Badge className={getRoomStatusColor(room.status)}>
                    {room.status.toUpperCase()}
                  </Badge>
                </div>
                <CardDescription>
                  {room.floor ? `Floor ${room.floor} • ` : ""}
                  {room.type} • ${room.price}/night
                </CardDescription>
              </CardHeader>
              <CardContent>
                {room.amenities && room.amenities.length > 0 && (
                  <div className="mb-2">
                    <p className="font-medium text-sm mb-1">Amenities:</p>
                    <div className="flex flex-wrap gap-1">
                      {room.amenities.map((a, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {a}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      updateRoom(room.id, {
                        status:
                          room.status === "available" ||
                          room.status === "Available"
                            ? "maintenance"
                            : "available",
                      })
                    }
                  >
                    <Settings className="mr-1 h-4 w-4" />
                    {room.status === "available" ||
                    room.status === "Available"
                      ? "Maintenance"
                      : "Available"}
                  </Button>
                  {room.status === "cleaning" && (
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() =>
                        updateRoom(room.id, { status: "available" })
                      }
                    >
                      <Check className="mr-1 h-4 w-4" /> Ready
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
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
