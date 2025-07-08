import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import deluxeRoomImage from "@/assets/deluxe-room.jpg";

const AccommodationSection = () => {
  const rooms = [
    {
      id: 1,
      name: "Deluxe King Room",
      description: "Spacious room with city views, luxury amenities, and modern furnishings.",
      price: "$299",
      features: ["King Size Bed", "City View", "Free WiFi", "Mini Bar", "24/7 Room Service"],
      image: deluxeRoomImage,
      available: true
    },
    {
      id: 2,
      name: "Executive Suite",
      description: "Premium suite with separate living area, panoramic views, and exclusive services.",
      price: "$499",
      features: ["Separate Living Area", "Panoramic View", "Premium Amenities", "Executive Lounge Access"],
      image: deluxeRoomImage,
      available: true
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
    <section id="accommodation" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Luxury Accommodation
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our carefully designed rooms and suites, each offering 
            unparalleled comfort and stunning views.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden">
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
                  <span className="text-2xl font-bold text-accent">{room.price}</span>
                </div>
                <CardDescription className="text-base">
                  {room.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-primary">Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {room.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  disabled={!room.available}
                  variant={room.available ? "default" : "outline"}
                >
                  {room.available ? "Book Now" : "Fully Booked"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccommodationSection;