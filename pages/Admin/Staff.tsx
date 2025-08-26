import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/Sidebar";
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
  const [staff, setStaff] = useState<any[]>([]);

  const [departments, setDepartments] = useState<any[]>([]);

  // form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);
  const [staffStats, setStaffStats] = useState({ total: 0, active: 0 });

  const allPermissions = [
    "Bookings", "Check-in/out", "Customer Service",
    "Menu Management", "Kitchen Operations", "Order Taking",
    "Room Service", "Facility Maintenance"
  ];

  // helpers
  const togglePermission = (perm: string) => {
    setPermissions(prev =>
      prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]
    );
  };

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

  // fetch departments and staff
 useEffect(() => {
  fetch("http://localhost:8000/api/departments")
    .then(r => r.json())
    .then(setDepartments);

  fetch("http://localhost:8000/api/staff")
    .then(r => r.json())
    .then(data => setStaff(data.map(sp => ({
      id: sp.user.id,
      name: sp.user.name,
      role: sp.user.role,
      department: sp.department.name,
      email: sp.user.email,
      phone: sp.user.phone,
      hireDate: sp.hire_date,
      status: sp.user.deleted_at ? "Inactive" : (sp.on_leave ? "On Leave" : "Active"),
      permissions: sp.permissions
    }))));

  fetch("http://localhost:8000/api/staff/stats")
    .then(res => res.json())
    .then(setStaffStats);
}, []);

  const handleAddStaff = async () => {
    const payload = {
  name: `${firstName} ${lastName}`,
  email,
  phone,
  role,
  password,
  department_id: parseInt(departmentId),
  hire_date: hireDate,
  permissions
};


    try {
      const res = await fetch("http://localhost:8000/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setStaff(prev => [...prev, {
        id: data.user.id,
        name: data.user.name,
        role: data.user.role,
        department: departments.find(d => d.id === data.profile.department_id)?.name || "",
        email: data.user.email,
        phone: data.user.phone,
        hireDate: data.profile.hire_date,
        status: "Active",
        permissions: data.profile.permissions
      }]);
      setShowAddStaff(false);

      // reset form
      setFirstName(""); setLastName(""); setEmail("");
      setPhone(""); setRole(""); setPassword("");
      setDepartmentId(""); setHireDate(""); setPermissions([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="fixed"><Sidebar /></div>

      <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto bg-white ml-64">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Staff Management</h1>
            <p className="text-muted-foreground">Manage hotel staff and their permissions</p>
          </div>
          <Button onClick={() => setShowAddStaff(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Staff Member
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-muted-foreground">Total Staff</p>
                <p className="text-2xl font-bold">{staffStats.total}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground"/>
            </div>
          </CardContent></Card>

          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-muted-foreground">Active Staff</p>
                <p className="text-2xl font-bold">{staffStats.active}</p>
              </div>
              <Badge className="bg-success/20 text-success">Active</Badge>
            </div>
          </CardContent></Card>

          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-muted-foreground">Departments</p>
                <p className="text-2xl font-bold">{departments.length}</p></div><Shield className="h-8 w-8 text-muted-foreground"/>
            </div>
          </CardContent></Card>

          <Card><CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-muted-foreground">On Leave</p>
                <p className="text-2xl font-bold">{staff.filter(s => s.status === "On Leave").length}</p></div><Calendar className="h-8 w-8 text-warning"/>
            </div>
          </CardContent></Card>
        </div>

        {/* Search/Filter */}
        <Card><CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/>
              <Input placeholder="Search staff members..." className="pl-10"/>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4"/> Filter by Department
            </Button>
          </div>
        </CardContent></Card>

        {/* Staff Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map(member => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-muted-foreground"/>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                    <Badge className={getDepartmentColor(member.department)}>{member.department}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground"/><span className="truncate">{member.email}</span></div>
                  <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground"/><span>{member.phone}</span></div>
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground"/><span>Hired: {member.hireDate}</span></div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Permissions:</p>
                  <div className="flex flex-wrap gap-1">
                    {member.permissions.map(perm => <Badge key={perm} variant="secondary" className="text-xs">{perm}</Badge>)}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1"><Edit className="h-4 w-4 mr-1"/> Edit</Button>
                  <Button variant="outline" size="sm"><Shield className="h-4 w-4"/></Button>
                  <Button variant="outline" size="sm"><Trash2 className="h-4 w-4"/></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Staff Modal */}
        {showAddStaff && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
           
            <Card className="w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
              <CardHeader><CardTitle>Add New Staff Member</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label htmlFor="firstName">First Name</Label><Input id="firstName" placeholder="John" value={firstName} onChange={e => setFirstName(e.target.value)} /></div>
                  <div><Label htmlFor="lastName">Last Name</Label><Input id="lastName" placeholder="Smith" value={lastName} onChange={e => setLastName(e.target.value)} /></div>
                </div>
                <div><Label htmlFor="email">Email Address</Label><Input id="email" type="email" placeholder="john.smith@..." value={email} onChange={e => setEmail(e.target.value)} /></div>
                <div><Label htmlFor="phone">Phone Number</Label><Input id="phone" type="tel" placeholder="+1 (555) ..." value={phone} onChange={e => setPhone(e.target.value)} /></div>
                <div><Label htmlFor="password">Password</Label><Input id="password" type="password" placeholder="..." value={password} onChange={e => setPassword(e.target.value)} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label htmlFor="role">Role</Label><Input id="role" placeholder="Front Desk Agent" value={role} onChange={e => setRole(e.target.value)} /></div>
                  <div><Label htmlFor="department">Department</Label>
                    <select id="department" className="w-full p-2 border rounded-md" value={departmentId} onChange={e => setDepartmentId(e.target.value)}>
                      <option value="">-- Select Department --</option>
                      {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                  </div>
                </div>
                <div><Label htmlFor="hireDate">Hire Date</Label><Input id="hireDate" type="date" value={hireDate} onChange={e => setHireDate(e.target.value)} /></div>
                <div><Label>Permissions</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {allPermissions.map(perm => (
                      <label key={perm} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={permissions.includes(perm)} onChange={() => togglePermission(perm)} />
                        {perm}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" onClick={handleAddStaff}>Add Staff Member</Button>
                  <Button variant="outline" onClick={() => setShowAddStaff(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
