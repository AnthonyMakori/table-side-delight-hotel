import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2,
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  Shield
} from "lucide-react";

export default function Staff() {
  const [showAddStaff, setShowAddStaff] = useState(false);

  const staff = [
    {
      id: "STF001",
      name: "Alice Johnson",
      role: "Front Desk Manager",
      department: "Reception",
      email: "alice.johnson@admiral-hotel.com",
      phone: "+1 (555) 123-4567",
      hireDate: "2022-03-15",
      status: "Active",
      permissions: ["Bookings", "Check-in/out", "Customer Service"],
      avatar: "/api/placeholder/100/100"
    },
    {
      id: "STF002",
      name: "Carlos Rodriguez",
      role: "Head Chef",
      department: "Kitchen",
      email: "carlos.rodriguez@admiral-hotel.com", 
      phone: "+1 (555) 234-5678",
      hireDate: "2021-08-20",
      status: "Active",
      permissions: ["Menu Management", "Kitchen Operations", "Staff Supervision"],
      avatar: "/api/placeholder/100/100"
    },
    {
      id: "STF003",
      name: "Emma Wilson",
      role: "Waitress",
      department: "Dining",
      email: "emma.wilson@admiral-hotel.com",
      phone: "+1 (555) 345-6789", 
      hireDate: "2023-01-10",
      status: "Active",
      permissions: ["Order Taking", "Customer Service"],
      avatar: "/api/placeholder/100/100"
    },
    {
      id: "STF004",
      name: "David Kim",
      role: "Maintenance Supervisor",
      department: "Maintenance",
      email: "david.kim@admiral-hotel.com",
      phone: "+1 (555) 456-7890",
      hireDate: "2020-11-05",
      status: "On Leave",
      permissions: ["Facility Maintenance", "Room Service"],
      avatar: "/api/placeholder/100/100"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success/20 text-success";
      case "On Leave": return "bg-warning/20 text-warning";
      case "Inactive": return "bg-muted/20 text-muted-foreground";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "Reception": return "bg-primary/20 text-primary";
      case "Kitchen": return "bg-accent/20 text-accent-foreground";
      case "Dining": return "bg-secondary/50 text-secondary-foreground";
      case "Maintenance": return "bg-muted/20 text-muted-foreground";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <p className="text-muted-foreground">Manage hotel staff and their permissions</p>
        </div>
        <Button onClick={() => setShowAddStaff(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Staff Member
        </Button>
      </div>

      {/* Staff Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Staff</p>
                <p className="text-2xl font-bold">{staff.length}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Staff</p>
                <p className="text-2xl font-bold">{staff.filter(s => s.status === "Active").length}</p>
              </div>
              <Badge className="bg-success/20 text-success">Active</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Departments</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <Shield className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Leave</p>
                <p className="text-2xl font-bold">{staff.filter(s => s.status === "On Leave").length}</p>
              </div>
              <Calendar className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search staff members..." className="pl-10" />
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter by Department
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Staff Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 flex-col items-end">
                  <Badge className={getStatusColor(member.status)}>
                    {member.status}
                  </Badge>
                  <Badge className={getDepartmentColor(member.department)}>
                    {member.department}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Contact Information */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Hired: {member.hireDate}</span>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <p className="text-sm font-medium mb-2">Permissions:</p>
                <div className="flex flex-wrap gap-1">
                  {member.permissions.map((permission) => (
                    <Badge key={permission} variant="secondary" className="text-xs">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Shield className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Staff Modal */}
      {showAddStaff && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Add New Staff Member</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Smith" />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john.smith@admiral-hotel.com" />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" placeholder="Front Desk Agent" />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <select className="w-full p-2 border rounded-md" id="department">
                    <option>Reception</option>
                    <option>Kitchen</option>
                    <option>Dining</option>
                    <option>Housekeeping</option>
                    <option>Maintenance</option>
                    <option>Management</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="hireDate">Hire Date</Label>
                <Input id="hireDate" type="date" />
              </div>

              <div>
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    "Bookings", "Check-in/out", "Customer Service",
                    "Menu Management", "Kitchen Operations", "Order Taking",
                    "Room Service", "Facility Maintenance"
                  ].map((permission) => (
                    <label key={permission} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      {permission}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Add Staff Member</Button>
                <Button variant="outline" onClick={() => setShowAddStaff(false)}>
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