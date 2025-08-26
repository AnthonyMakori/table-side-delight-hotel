import { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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

interface Room {
  id: number;
  number: string;
  type: string;
  capacity: number;
  price: number;
  status: string;
  amenities: string[];
  image?: string; 
}

export default function AccommodationsAdmin() {
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [formData, setFormData] = useState({
    number: "",
    type: "",
    capacity: "",
    price: "",
    status: "Available",
    amenities: "",
    image: null as File | null, 
  });

  const api = axios.create({
    baseURL: "http://localhost:8000/api", 
    headers: {
      Authorization: `Bearer YOUR_ACCESS_TOKEN`, 
    },
  });

  const fetchRooms = async () => {
    try {
      const res = await api.get("/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700";
      case "Occupied":
        return "bg-red-100 text-red-700";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleAddRoom = async () => {
    try {
      const payload = new FormData();
      payload.append("number", formData.number);
      payload.append("type", formData.type);
      payload.append("capacity", formData.capacity);
      payload.append("price", formData.price);
      payload.append("status", formData.status);
      payload.append("amenities", formData.amenities);

      if (formData.image) {
        payload.append("image", formData.image);
      }

      await api.post("/rooms", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowAddRoom(false);
      setFormData({
        number: "",
        type: "",
        capacity: "",
        price: "",
        status: "Available",
        amenities: "",
        image: null,
      });
      fetchRooms();
    } catch (err) {
      console.error("Error adding room:", err);
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="w-64 flex-shrink-0 h-full overflow-hidden">
        <Sidebar />
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Accommodation Management</h1>
            <p className="text-muted-foreground">
              Manage rooms, pricing, and availability
            </p>
          </div>
          <Button
            onClick={() => setShowAddRoom(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Room
          </Button>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card key={room.id} className="hover:shadow-lg transition-shadow">
              {room.image && (
                <img src={room.image ?? "/default-room.jpg"} alt={room.type} />

              )}

              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Bed className="h-5 w-5" />
                      Room {room.number}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{room.type}</p>
                  </div>
                  <Badge className={getStatusColor(room.status)}>
                    {room.status}
                  </Badge>
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
                    <Input
                      id="roomNumber"
                      value={formData.number}
                      onChange={(e) =>
                        setFormData({ ...formData, number: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="roomType">Room Type</Label>
                    <Input
                      id="roomType"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) =>
                        setFormData({ ...formData, capacity: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price per night</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="amenities">Amenities (comma separated)</Label>
                  <Input
                    id="amenities"
                    value={formData.amenities}
                    onChange={(e) =>
                      setFormData({ ...formData, amenities: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="image">Room Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        image: e.target.files ? e.target.files[0] : null,
                      })
                    }
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" onClick={handleAddRoom}>
                    Add Room
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddRoom(false)}
                  >
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
