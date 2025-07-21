import { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar } from "@/components/Sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Edit,
  Trash2,
  ImageIcon,
  DollarSign,
  Clock,
  Search,
  Filter,
  ChefHat,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const API_BASE = "http://localhost:8000/api";

export default function Meals() {
  const [showAddItem, setShowAddItem] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    name: "",
    category: "Breakfast",
    description: "",
    price: "",
    prep_time: "",
    image: null as File | null,
  });

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${API_BASE}/menu-items`, {
        params: {
          category: activeCategory !== "all" ? activeCategory : undefined,
          search: searchTerm || undefined,
        },
      });
      setMenuItems(response.data);
    } catch (err) {
      console.error("Failed to fetch menu items", err);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [activeCategory, searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, image: e.target.files[0] });
    }
  };

  const handleAddItem = async () => {
    try {
      const { name, category, description, price, prep_time, image } = form;
      const response = await axios.post(`${API_BASE}/menu-items`, {
        name,
        category,
        description,
        price,
        prep_time,
        available: true,
      });

      const createdItem = response.data;

      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        await axios.post(`${API_BASE}/menu-items/${createdItem.id}/upload-image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setShowAddItem(false);
      setForm({
        name: "",
        category: "Breakfast",
        description: "",
        price: "",
        prep_time: "",
        image: null,
      });
      fetchMenuItems();
    } catch (err) {
      console.error("Failed to add menu item", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_BASE}/menu-items/${id}`);
      fetchMenuItems();
    } catch (err) {
      console.error("Failed to delete item", err);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Breakfast":
        return "bg-yellow-100 text-yellow-800";
      case "Lunch":
        return "bg-blue-100 text-blue-800";
      case "Dinner":
        return "bg-purple-100 text-purple-800";
      case "Drinks":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="h-screen overflow-y-hidden">
        <Sidebar />
      </div>

      <div className="pl-72 flex-1 overflow-y-auto p-6 space-y-6 bg-muted">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Meals Management</h1>
            <p className="text-muted-foreground">
              Manage menu items, categories, and pricing
            </p>
          </div>
          <Button onClick={() => setShowAddItem(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Menu Item
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search menu items..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList>
            {["All", "Breakfast", "Lunch", "Dinner", "Drinks", "Desserts"].map((cat) => (
              <TabsTrigger key={cat} value={cat.toLowerCase()}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="h-48 bg-muted rounded-t-lg flex items-center justify-center">
                      {item.image_path ? (
                        <img src={`http://localhost:8000${item.image_path}`} className="h-full w-full object-cover rounded-t-lg" />
                      ) : (
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                      )}
                    </div>
                    {!item.available && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Unavailable
                      </div>
                    )}
                  </div>

                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <ChefHat className="h-5 w-5" />
                          {item.name}
                        </CardTitle>
                        <Badge className={getCategoryColor(item.category)}>
                          {item.category}
                        </Badge>
                      </div>
                      <p className="text-xl font-bold">${item.price}</p>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Prep time: {item.prep_time}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Add Modal */}
        {showAddItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Add New Menu Item</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Label htmlFor="name">Item Name</Label>
                <Input id="name" value={form.name} onChange={handleInputChange} placeholder="Grilled Salmon" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full p-2 border rounded-md"
                      value={form.category}
                      onChange={handleInputChange}
                    >
                      <option>Breakfast</option>
                      <option>Lunch</option>
                      <option>Dinner</option>
                      <option>Drinks</option>
                      <option>Desserts</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input id="price" type="number" step="0.01" value={form.price} onChange={handleInputChange} />
                  </div>
                </div>

                <Label htmlFor="description">Description</Label>
                <Textarea id="description" rows={3} value={form.description} onChange={handleInputChange} />

                <Label htmlFor="prep_time">Preparation Time</Label>
                <Input id="prep_time" value={form.prep_time} onChange={handleInputChange} />

                <Label htmlFor="image">Upload Image</Label>
                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" onClick={handleAddItem}>Add Item</Button>
                  <Button variant="outline" onClick={() => setShowAddItem(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
