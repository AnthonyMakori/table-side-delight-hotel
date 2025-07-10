import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Square, Calendar, Wifi, Car, Coffee, Tv, Wind, Shield, Users } from 'lucide-react';
import { mockRooms } from '../../src/data/rooms';
import { Button } from '../../src/components/ui/button';
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

const featureIcons: Record<string, any> = {
  'WiFi': Wifi,
  'Air Conditioning': Wind,
  'TV': Tv,
  'Smart TV': Tv,
  'Coffee Machine': Coffee,
  'Room Service': Shield,
  'Mini Bar': Coffee,
  'Work Desk': Users,
  'Private Bathroom': Shield,
  'Daily Housekeeping': Shield,
  'Premium Bedding': Shield,
  'Kitchen': Coffee,
  'Living Room': Users,
  'Private Terrace': MapPin,
};

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  const room = mockRooms.find(r => r.id === id);

  if (!room) {
    return (
      <div className="min-h-screen bg-gradient-card flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Room not found</h1>
          <Button onClick={() => navigate('/accommodations')}>
            Back to Accommodations
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-available';
      case 'Taken':
        return 'bg-taken';
      default:
        return 'bg-muted';
    }
  };

  const handleBookNow = () => {
    if (room.status === 'Available') {
      setShowBookingForm(true);
    }
  };

  const submitBooking = () => {
    // Here you would typically send the booking data to your backend
    console.log('Booking submitted:', bookingData);
    setShowBookingForm(false);
    // Show success message or redirect
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/accommodations')}
          className="mb-6 animate-fade-in"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Accommodations
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="animate-fade-in">
              <div className="relative overflow-hidden rounded-lg shadow-elegant">
                <img
                  src={room.thumbnail}
                  alt={room.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant={room.status === 'Available' ? 'default' : 'secondary'}>
                    {room.status}
                  </Badge>
                  <Badge variant={room.condition === 'Newly renovated' ? 'default' : 'secondary'}>
                    {room.condition}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Room Info */}
            <Card className="animate-slide-up">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-foreground">{room.name}</CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                      <span className="bg-accent px-3 py-1 rounded-full text-sm font-medium">
                        {room.type}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{room.rating}</span>
                        <span>({room.reviews.length} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {room.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-center gap-3">
                    <Square className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Room Size</div>
                      <div className="text-sm text-muted-foreground">
                        {room.size.sqm}m² ({room.size.sqft}ft²)
                      </div>
                    </div>
                  </div>
                  {room.location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">Location</div>
                        <div className="text-sm text-muted-foreground">
                          {room.location.building}, Floor {room.location.floor}, Room {room.location.room}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Separator className="my-6" />

                {/* Features */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">Room Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {room.features.map((feature) => {
                      const IconComponent = featureIcons[feature] || Shield;
                      return (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <IconComponent className="w-4 h-4 text-primary" />
                          <span>{feature}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle>Guest Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {room.reviews.map((review) => (
                    <div key={review.id} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>
                            {review.userName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{review.userName}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-muted-foreground'
                                }`}
                              />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">
                              {review.date}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
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
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle className="text-xl">Book This Room</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Pricing */}
                  <div className="text-center p-4 bg-red-100 rounded-lg">
                    <div className="text-3xl font-bold text-blue-700">${room.price.night}</div>
                    <div className="text-sm text-muted-foreground">per night</div>
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

                  {/* Availability Status */}
                  <div className={`p-3 rounded-lg text-center text-white bg-green-600 p-1 ${getStatusColor(room.status)}`}>
                    <div className="font-medium">
                      {room.status === 'Available' ? '✓ Available Now' : '✗ Currently Occupied'}
                    </div>
                    {room.status === 'Available' && (
                      <div className="text-xs opacity-90 mt-1">
                        Ready for immediate booking
                      </div>
                    )}
                  </div>

                  {/* Booking Actions */}
                  <div className="space-y-3">
                    <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full bg-green-600 p-1"
                          variant={room.status === 'Available' ? 'default' : 'outline'}
                          disabled={room.status !== 'Available'}
                          onClick={handleBookNow}
                        >
                          {room.status === 'Available' ? 'Book Now' : 'Unavailable'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Book {room.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="checkIn">Check-in</Label>
                              <Input
                                id="checkIn"
                                type="date"
                                value={bookingData.checkIn}
                                onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="checkOut">Check-out</Label>
                              <Input
                                id="checkOut"
                                type="date"
                                value={bookingData.checkOut}
                                onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="guests">Number of Guests</Label>
                            <Input
                              id="guests"
                              type="number"
                              min="1"
                              max="4"
                              value={bookingData.guests}
                              onChange={(e) => setBookingData({ ...bookingData, guests: parseInt(e.target.value) })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={bookingData.name}
                              onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={bookingData.email}
                              onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              value={bookingData.phone}
                              onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="requests">Special Requests</Label>
                            <Textarea
                              id="requests"
                              placeholder="Any special requirements or requests..."
                              value={bookingData.specialRequests}
                              onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                            />
                          </div>
                          <Button onClick={submitBooking} className="w-full" variant="default">
                            Confirm Booking
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" className="w-full">
                      Contact for Details
                    </Button>
                  </div>

                  {/* Quick Info */}
                  <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t border-border">
                    <div>✓ Free WiFi included</div>
                    <div>✓ Daily housekeeping</div>
                    <div>✓ 24/7 front desk service</div>
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