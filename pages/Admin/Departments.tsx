import { useState } from "react";
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample departments data
  const departments = [
    {
      id: 1,
      name: "Front Office",
      description: "Guest services and reception management",
      manager: "John Smith",
      staffCount: 8,
      location: "Main Lobby",
      email: "frontoffice@grandeurhotel.com",
      phone: "+1 (555) 123-4567",
      budget: "$45,000",
      established: "2020",
    },
    {
      id: 2,
      name: "Housekeeping",
      description: "Room cleaning and maintenance services",
      manager: "Sarah Johnson",
      staffCount: 15,
      location: "Service Floor",
      email: "housekeeping@grandeurhotel.com",
      phone: "+1 (555) 123-4568",
      budget: "$38,000",
      established: "2020",
    },
    {
      id: 3,
      name: "Food & Beverage",
      description: "Restaurant and catering operations",
      manager: "Mike Davis",
      staffCount: 20,
      location: "Restaurant Floor",
      email: "fnb@grandeurhotel.com",
      phone: "+1 (555) 123-4569",
      budget: "$75,000",
      established: "2020",
    },
    {
      id: 4,
      name: "Security",
      description: "Hotel security and safety management",
      manager: "Lisa Wilson",
      staffCount: 6,
      location: "Security Office",
      email: "security@grandeurhotel.com",
      phone: "+1 (555) 123-4570",
      budget: "$32,000",
      established: "2021",
    },
    {
      id: 5,
      name: "Maintenance",
      description: "Building and equipment maintenance",
      manager: "Tom Brown",
      staffCount: 5,
      location: "Basement",
      email: "maintenance@grandeurhotel.com",
      phone: "+1 (555) 123-4571",
      budget: "$28,000",
      established: "2020",
    },
  ];

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
        {/* Header */}
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
                <Input placeholder="Department Name" />
                <Input placeholder="Description" />
                <Input placeholder="Manager Name" />
                <Input placeholder="Location" />
                <Input placeholder="Email" />
                <Input placeholder="Phone" />
                <Input placeholder="Budget" />
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">Add Department</Button>
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
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Departments</p>
                  <p className="text-3xl font-bold">{departments.length}</p>
                </div>
                <Building2 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Staff</p>
                  <p className="text-3xl font-bold">{departments.reduce((sum, dept) => sum + dept.staffCount, 0)}</p>
                </div>
                <Users className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Average Staff</p>
                  <p className="text-3xl font-bold">{Math.round(departments.reduce((sum, dept) => sum + dept.staffCount, 0) / departments.length)}</p>
                </div>
                <Users className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Managers</p>
                  <p className="text-3xl font-bold">{departments.length}</p>
                </div>
                <Users className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
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
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
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
                    {department.staffCount} members
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