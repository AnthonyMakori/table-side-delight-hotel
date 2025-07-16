import { useState } from "react";
import { Sidebar } from "@/components/Sidebar"; // ✅ Import Sidebar
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Edit,
  Trash2,
  Bed,
  Users,
  DollarSign,
  Calendar,
  Search,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AccommodationsAdmin() {
  const [showAddRoom, setShowAddRoom] = useState(false);

  const rooms = [
    {
      id: "R001",
      number: "101",
      type: "Deluxe Suite",
      capacity: 2,
      price: 299,
      status: "Available",
      amenities: ["Ocean View", "Balcony", "Mini Bar"],
    },
    {
      id: "R002",
      number: "205",
      type: "Standard Room",
      capacity: 2,
      price: 149,
      status: "Occupied",
      amenities: ["City View", "WiFi"],
    },
    {
      id: "R003",
      number: "304",
      type: "Premium Room",
      capacity: 3,
      price: 199,
      status: "Available",
      amenities: ["Garden View", "Jacuzzi"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-success/20 text-success";
      case "Occupied":
        return "bg-destructive/20 text-destructive";
      case "Maintenance":
        return "bg-warning/20 text-warning";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar - locked from scrolling */}
      <div className="w-64 flex-shrink-0 h-full overflow-hidden">
        <Sidebar />
      </div>

      {/* Main content area - scrollable */}
      <div className=" flex-1 overflow-y-auto p-6 space-y-6 bg-muted">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Accommodation Management</h1>
            <p className="text-muted-foreground">Manage rooms, pricing, and availability</p>
          </div>
          <Button onClick={() => setShowAddRoom(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Room
          </Button>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search rooms..." className="pl-10" />
                </div>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card key={room.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Bed className="h-5 w-5" />
                      Room {room.number}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{room.type}</p>
                  </div>
                  <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{room.capacity} guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>${room.price}/night</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Amenities:</p>
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Room Modal/Form */}
        {showAddRoom && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle>Add New Room</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="roomNumber">Room Number</Label>
                    <Input id="roomNumber" placeholder="101" />
                  </div>
                  <div>
                    <Label htmlFor="roomType">Room Type</Label>
                    <Input id="roomType" placeholder="Standard Room" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input id="capacity" type="number" placeholder="2" />
                  </div>
                  <div>
                    <Label htmlFor="price">Price per night</Label>
                    <Input id="price" type="number" placeholder="149" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="amenities">Amenities (comma separated)</Label>
                  <Input id="amenities" placeholder="WiFi, TV, Mini Bar" />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">Add Room</Button>
                  <Button variant="outline" onClick={() => setShowAddRoom(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
