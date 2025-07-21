import { useEffect, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  QrCode,
  Download,
  Printer,
  Edit,
  Trash2,
  Search,
  MapPin,
} from "lucide-react";

export default function QRCodes() {
  const [tables, setTables] = useState([]);
  const [showAddTable, setShowAddTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ number: "", location: "Main Dining" });

  const fetchTables = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/tables");
      const data = await res.json();
      setTables(data);
    } catch (err) {
      console.error("Failed to fetch tables:", err);
    }
  };

  const createTable = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        await fetchTables();
        setShowAddTable(false);
        setForm({ number: "", location: "Main Dining" });
      } else {
        console.error("Error creating table");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteTable = async (id: number) => {
    if (!confirm("Are you sure you want to delete this table?")) return;
    try {
      await fetch(`http://localhost:8000/api/tables/${id}`, {
        method: "DELETE",
      });
      fetchTables();
    } catch (err) {
      console.error("Failed to delete table:", err);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-600";
      case "Inactive":
        return "bg-gray-200 text-gray-600";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar />

      <div className="pl-72 flex-1 overflow-y-auto p-6 space-y-6 bg-muted">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Table QR Codes</h1>
            <p className="text-muted-foreground">
              Generate and manage QR codes for dining tables
            </p>
          </div>
          <Button
            onClick={() => setShowAddTable(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Table
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tables..." className="pl-10" />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Tables
                  </p>
                  <p className="text-2xl font-bold">{tables.length}</p>
                </div>
                <QrCode className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Tables
                  </p>
                  <p className="text-2xl font-bold">
                    {tables.filter((t: any) => t.status === "Active").length}
                  </p>
                </div>
                <Badge className="bg-success/20 text-success">Active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Today's Orders
                  </p>
                  <p className="text-2xl font-bold">
                    {tables.reduce(
                      (sum: number, table: any) => sum + table.today_orders,
                      0
                    )}
                  </p>
                </div>
                <div className="text-success text-sm">+12%</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tables.map((table: any) => (
            <Card key={table.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <QrCode className="h-5 w-5" />
                      Table {table.number}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {table.location}
                    </p>
                  </div>
                  <Badge className={getStatusColor(table.status)}>
                    {table.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Last Used</p>
                    <p className="font-medium">
                      {new Date(table.last_used).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Today's Orders</p>
                    <p className="font-medium">{table.today_orders}</p>
                  </div>
                </div>

                <div className="bg-secondary p-2 rounded text-xs font-mono text-muted-foreground truncate">
                  {table.qr_code}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Printer className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteTable(table.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Table Modal */}
        {showAddTable && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle>Add New Table</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="tableNumber">Table Number</Label>
                  <Input
                    id="tableNumber"
                    placeholder="15"
                    value={form.number}
                    onChange={(e) =>
                      setForm({ ...form, number: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    id="location"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                  >
                    <option>Main Dining</option>
                    <option>Terrace</option>
                    <option>Bar Area</option>
                    <option>Garden</option>
                    <option>Private Room</option>
                  </select>
                </div>

                <div>
                  <Label>QR Code URL (Auto-generated)</Label>
                  <div className="bg-muted p-2 rounded text-sm text-muted-foreground">
                    https://admiral-hotel.com/menu?table={form.number || "[number]"}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={createTable}
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Table & QR Code"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddTable(false)}
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
