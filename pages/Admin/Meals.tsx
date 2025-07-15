import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  ChefHat
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Meals() {
  const [showAddItem, setShowAddItem] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const menuItems = [
    {
      id: "M001",
      name: "Grilled Salmon",
      category: "Lunch",
      description: "Fresh Atlantic salmon with herbs and lemon",
      price: 28.99,
      image: "/api/placeholder/200/150",
      available: true,
      prepTime: "15 min"
    },
    {
      id: "M002",
      name: "Caesar Salad",
      category: "Lunch", 
      description: "Crisp romaine lettuce with caesar dressing",
      price: 14.99,
      image: "/api/placeholder/200/150",
      available: true,
      prepTime: "5 min"
    },
    {
      id: "M003",
      name: "Breakfast Special",
      category: "Breakfast",
      description: "Eggs, bacon, toast, and fresh fruit",
      price: 12.99,
      image: "/api/placeholder/200/150", 
      available: true,
      prepTime: "10 min"
    },
    {
      id: "M004",
      name: "Ribeye Steak",
      category: "Dinner",
      description: "Premium cut with garlic mashed potatoes",
      price: 45.99,
      image: "/api/placeholder/200/150",
      available: false,
      prepTime: "25 min"
    },
  ];

  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Drinks", "Desserts"];

  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category.toLowerCase() === activeCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Breakfast": return "bg-warning/20 text-warning";
      case "Lunch": return "bg-primary/20 text-primary";
      case "Dinner": return "bg-accent/20 text-accent-foreground";
      case "Drinks": return "bg-secondary/50 text-secondary-foreground";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Meals Management</h1>
          <p className="text-muted-foreground">Manage menu items, categories, and pricing</p>
        </div>
        <Button onClick={() => setShowAddItem(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Menu Item
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search menu items..." className="pl-10" />
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category.toLowerCase()}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="h-48 bg-muted rounded-t-lg flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                  {!item.available && (
                    <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-medium">
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
                    <div className="text-right">
                      <p className="text-xl font-bold">${item.price}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Prep time: {item.prepTime}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Menu Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Add New Menu Item</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="itemName">Item Name</Label>
                <Input id="itemName" placeholder="Grilled Salmon" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select className="w-full p-2 border rounded-md" id="category">
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                    <option>Drinks</option>
                    <option>Desserts</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" step="0.01" placeholder="28.99" />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the dish..." rows={3} />
              </div>

              <div>
                <Label htmlFor="prepTime">Preparation Time</Label>
                <Input id="prepTime" placeholder="15 min" />
              </div>

              <div>
                <Label htmlFor="image">Image Upload</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                  <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload image</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Add Item</Button>
                <Button variant="outline" onClick={() => setShowAddItem(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}