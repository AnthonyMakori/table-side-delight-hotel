import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import deluxeRoomImage from "@/assets/deluxe-room.jpg";
import { Hotel, MapPin, Star, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const AccommodationSection = () => {
  const navigate = useNavigate();
  const rooms = [
    {
      id: 1,
      name: "Deluxe King Room",
      description: "Spacious room with city views, luxury amenities, and modern furnishings.",
      price: "$299",
      features: ["King Size Bed", "City View", "Free WiFi", "Mini Bar", "24/7 Room Service"],
      image: deluxeRoomImage,
      available: false
    },
    {
      id: 2,
      name: "Executive Suite",
      description: "Premium suite with separate living area, panoramic views, and exclusive services.",
      price: "$499",
      features: ["Separate Living Area", "Panoramic View", "Premium Amenities", "Executive Lounge Access"],
      image: deluxeRoomImage,
      available: false
    },
    {
      id: 3,
      name: "Presidential Suite",
      description: "Ultimate luxury with private terrace, personal butler, and exclusive dining.",
      price: "$899",
      features: ["Private Terrace", "Personal Butler", "Exclusive Dining", "Luxury Spa Access"],
      image: deluxeRoomImage,
      available: false
    }
  ];

  return (
    <section id="accommodation" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Luxury Accommodation
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Choose from our carefully designed rooms and suites, each offering unparalleled comfort and stunning views.
          </p>
          <div className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-4 py-2">
            <Hotel className="w-5 h-5" />
            <span className="text-sm font-medium">Premium Accommodations</span>
          </div>
        </div>

        {/* Room Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {rooms.map((room) => (
            <Card key={room.id} className="bg-white shadow-md border rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant={room.available ? "default" : "secondary"}>
                    {room.available ? "Available" : "Booked"}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-primary">{room.name}</CardTitle>
                  <span className="text-2xl font-bold text-gray-800">{room.price}</span>
                </div>
                <CardDescription className="text-base text-gray-600">{room.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-primary">Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {room.features.map((feature, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded-full"
                      >
                        <CheckCircle className="w-3 h-3 text-primary" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  className={`w-full mt-4 ${room.available
                    ? "bg-primary text-white hover:bg-blue-600"
                    : "bg-blue-600 text-black cursor-not-allowed"
                    }`}
                  disabled={!room.available}
                  onClick={() => {
                    if (room.available) navigate(`/accommodations/${room.id}`);
                  }}
                >
                  {room.available ? "Display" : "Display"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Hero Statement */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Your Perfect Stay <span className="text-blue-500">Awaits</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover exceptional accommodations with modern amenities, stunning views, and personalized service. From cozy rooms to luxury suites.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-warning text-white rounded-full hover:bg-primary/90"
              onClick={() => navigate('/accommodations')}
            >
              Explore Rooms
            </Button>
            <Button
              size="lg"
              className="text-lg px-8 py-4 border border-gray-300 text-gray-800 rounded-full  bg-gray-100 hover:bg-primary/90"
            >
              Contact Us
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-4" />,
              title: "Prime Locations",
              text: "Strategically located with easy access to city attractions and business districts."
            },
            {
              icon: <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />,
              title: "Exceptional Service",
              text: "24/7 concierge service and personalized attention to make your stay memorable."
            },
            {
              icon: <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />,
              title: "Instant Booking",
              text: "Quick and easy reservation system with instant confirmation and flexible cancellation."
            }
          ].map((feature, index) => (
            <Card
              key={index}
              className="bg-gray-50 border border-gray-200 text-gray-800 hover:bg-gray-100 transition-all duration-300 rounded-xl"
            >
              <CardContent className="p-6 text-center">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gray-50 border border-gray-200 max-w-2xl mx-auto rounded-2xl shadow-md">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Book Your Stay?
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                Browse our collection of carefully curated accommodations and find your perfect match.
              </p>
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90"
                onClick={() => navigate('/accommodations')}
              >
                View All Accommodations
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AccommodationSection;
