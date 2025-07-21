import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../../src/components/ui/card";
import { Button } from "../../src/components/ui/button";
import { Input } from "../../src/components/ui/input";
import { Sidebar } from "../../src/components/Sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../src/components/ui/dialog";
import {
  Building2,
  Users,
  Plus,
  Edit,
  Trash2,
  Search,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Form input states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [manager, setManager] = useState("");
  const [staffCount, setStaffCount] = useState(0);
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [established, setEstablished] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/departments");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleAddDepartment = async () => {
    try {
      const newDepartment = {
        name,
        description,
        manager,
        staff_count: staffCount,
        location,
        email,
        phone,
        budget,
        established,
      };

      const response = await axios.post("http://127.0.0.1:8000/api/departments", newDepartment);
      setDepartments([...departments, response.data]);
      setShowAddModal(false);

      // Clear inputs
      setName(""); setDescription(""); setManager(""); setStaffCount(0);
      setLocation(""); setEmail(""); setPhone(""); setBudget(""); setEstablished("");
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 h-full overflow-hidden">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Departments Management</h1>
            <p className="text-muted-foreground">Manage hotel departments and their details</p>
          </div>

          <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Department Name" value={name} onChange={e => setName(e.target.value)} />
                <Input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                <Input placeholder="Manager Name" value={manager} onChange={e => setManager(e.target.value)} />
                <Input placeholder="Staff Count" type="number" value={staffCount} onChange={e => setStaffCount(Number(e.target.value))} />
                <Input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
                <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <Input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
                <Input placeholder="Budget" value={budget} onChange={e => setBudget(e.target.value)} />
                <Input placeholder="Established Year" value={established} onChange={e => setEstablished(e.target.value)} />
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" onClick={handleAddDepartment}>
                    Add Department
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Departments</p>
                <p className="text-3xl font-bold">{departments.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-primary" />
            </div>
          </CardContent></Card>
          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Staff</p>
                <p className="text-3xl font-bold">{departments.reduce((sum, d) => sum + d.staff_count, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-success" />
            </div>
          </CardContent></Card>
          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Average Staff</p>
                <p className="text-3xl font-bold">
                  {departments.length > 0
                    ? Math.round(departments.reduce((sum, d) => sum + d.staff_count, 0) / departments.length)
                    : 0}
                </p>
              </div>
              <Users className="h-8 w-8 text-warning" />
            </div>
          </CardContent></Card>
          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active Managers</p>
                <p className="text-3xl font-bold">{departments.length}</p>
              </div>
              <Users className="h-8 w-8 text-accent" />
            </div>
          </CardContent></Card>
        </div>

        {/* Search */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search departments or managers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((department) => (
            <Card key={department.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{department.name}</CardTitle>
                    <p className="text-muted-foreground text-sm mt-1">{department.description}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={async () => {
                        await axios.delete(`http://localhost:8000/api/departments/${department.id}`);
                        fetchDepartments(); // Refresh
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Manager:</span>
                  <span>{department.manager}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Staff Count:</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                    {department.staff_count} members
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Location:</span>
                  <span>{department.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Email:</span>
                  <span className="text-primary">{department.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Phone:</span>
                  <span>{department.phone}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="font-semibold ml-1">{department.budget}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Since:</span>
                    <span className="font-semibold ml-1">{department.established}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
3