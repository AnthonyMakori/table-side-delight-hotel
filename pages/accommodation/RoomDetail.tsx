import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Square, Calendar, Wifi, Car, Coffee, Tv, Wind, Shield, Users } from 'lucide-react';
// import { mockRooms } from '../../src/data/rooms';
import { Button3 } from '../../src/components/ui/button3';
import { Badge } from '../../src/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Separator } from '../../src/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../../src/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../src/components/ui/dialog';
import { Input } from '../../src/components/ui/input';
import { Label } from '../../src/components/ui/label';
import { Textarea } from '../../src/components/ui/textarea';
import { Calendar as CalendarComponent } from '../../src/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../src/components/ui/popover';
import { cn } from '../../src/lib/utils';
import { format } from 'date-fns';
import axios from 'axios';
import { useEffect } from 'react';


const featureIcons: Record<string, any> = {
  WiFi: Wifi,
  "Air Conditioning": Wind,
  TV: Tv,
  "Smart TV": Tv,
  "Coffee Machine": Coffee,
  "Room Service": Shield,
  "Mini Bar": Coffee,
  "Work Desk": Users,
  "Private Bathroom": Shield,
  "Daily Housekeeping": Shield,
  "Premium Bedding": Shield,
  Kitchen: Coffee,
  "Living Room": Users,
  "Private Terrace": MapPin,
};

interface Room {
  id: number;
  name: string;
  number: string;
  type: string;
  status: string;
  condition: string;
  thumbnail: string;
  rating: number;
  reviews: {
    id: number;
    userName: string;
    verified: boolean;
    rating: number;
    comment: string;
    date: string;
  }[];
  description: string;
  size: {
    sqm: number;
    sqft: number;
  };
  location: {
    building: string;
    floor: number;
    room: number;
  };
  features: string[];
  price: {
    night: number;
    week: number;
    month: number;
  };
}

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/rooms/${id}`);
        setRoom(res.data);
      } catch (err) {
        console.error("Failed to fetch room:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-600 text-white";
      case "Taken":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const handleBookNow = () => {
    if (room?.status === "Available") {
      setShowBookingForm(true);
    }
  };

  const submitBooking = () => {
    console.log("Booking submitted:", bookingData);
    setShowBookingForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <p>Loading room details...</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-2">Room Not Found</h1>
          <Button3 onClick={() => navigate(-1)}>Back to Accommodations</Button3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-card">
      <div className="container mx-auto px-4 py-8">
        <Button3 variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Accommodations
        </Button3>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <img
                src={room.thumbnail}
                alt={room.name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className={getStatusColor(room.status)}>
                  {room.status}
                </Badge>
                <Badge className="bg-blue-500 text-white">
                  {room.condition}
                </Badge>
              </div>
            </div>

            {/* Room Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{room.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4 text-muted-foreground">
                  <span className="bg-red-100 px-3 py-1 rounded-full text-sm font-medium">
                    {room.type}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{room.rating}</span>
                    <span>({room.reviews.length} reviews)</span>
                  </div>
                </div>

                <p className="mb-4 text-muted-foreground">{room.description}</p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-center gap-3">
                    <Square className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Room Size</div>
                      <div className="text-sm text-muted-foreground">
                        {room.size.sqm}m² ({room.size.sqft}ft²)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-sm text-muted-foreground">
                        {room.location.building}, Floor {room.location.floor}, Room{" "}
                        {room.location.room}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Features */}
                <h3 className="font-semibold text-lg mb-4">Room Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {room.features.map((feature) => {
                    const Icon = featureIcons[feature] || Shield;
                    return (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Icon className="w-4 h-4 text-blue-500" />
                        <span>{feature}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Guest Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {room.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b last:border-none pb-4 last:pb-0"
                    >
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {review.userName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">
                              {review.userName}
                            </span>
                            {review.verified && (
                              <Badge className="text-xs bg-yellow-600 text-white rounded-full">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-1 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                            <span className="text-xs ml-2 text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle>Book This Room</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Price */}
                  <div className="bg-red-100 text-center p-4 rounded-lg">
                    <div className="text-3xl font-bold text-blue-700">
                      ${room.price.night}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      per night
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                      <div>
                        <div className="font-medium">${room.price.week}</div>
                        <div className="text-muted-foreground">per week</div>
                      </div>
                      <div>
                        <div className="font-medium">${room.price.month}</div>
                        <div className="text-muted-foreground">per month</div>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div
                    className={`p-3 rounded-lg text-center ${getStatusColor(
                      room.status
                    )}`}
                  >
                    {room.status === "Available"
                      ? "✓ Available Now"
                      : "✗ Currently Occupied"}
                  </div>

                  {/* Book Button */}
                  <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
                    <DialogTrigger asChild>
                      <Button3
                        className="w-full bg-green-600"
                        variant={room.status === "Available" ? "default" : "outline"}
                        disabled={room.status !== "Available"}
                        onClick={handleBookNow}
                      >
                        {room.status === "Available" ? "Book Now" : "Unavailable"}
                      </Button3>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Book {room.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Check-in</Label>
                            <Input
                              type="date"
                              value={bookingData.checkIn}
                              onChange={(e) =>
                                setBookingData({
                                  ...bookingData,
                                  checkIn: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label>Check-out</Label>
                            <Input
                              type="date"
                              value={bookingData.checkOut}
                              onChange={(e) =>
                                setBookingData({
                                  ...bookingData,
                                  checkOut: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Guests</Label>
                          <Input
                            type="number"
                            min="1"
                            value={bookingData.guests}
                            onChange={(e) =>
                              setBookingData({
                                ...bookingData,
                                guests: parseInt(e.target.value),
                              })
                            }
                          />
                        </div>

                        <div>
                          <Label>Full Name</Label>
                          <Input
                            value={bookingData.name}
                            onChange={(e) =>
                              setBookingData({ ...bookingData, name: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <Label>Email</Label>
                          <Input
                            type="email"
                            value={bookingData.email}
                            onChange={(e) =>
                              setBookingData({ ...bookingData, email: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <Label>Phone</Label>
                          <Input
                            value={bookingData.phone}
                            onChange={(e) =>
                              setBookingData({ ...bookingData, phone: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <Label>Special Requests</Label>
                          <Textarea
                            placeholder="Any special requests?"
                            value={bookingData.specialRequests}
                            onChange={(e) =>
                              setBookingData({
                                ...bookingData,
                                specialRequests: e.target.value,
                              })
                            }
                          />
                        </div>

                        <Button3 onClick={submitBooking} className="w-full">
                          Confirm Booking
                        </Button3>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button3 variant="outline" className="w-full">
                    Contact for Details
                  </Button3>

                  <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t border-border">
                    <div>✓ Free WiFi</div>
                    <div>✓ 24/7 service</div>
                    <div>✓ Daily housekeeping</div>
                    <div>✓ Free cancellation up to 24h</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;

