import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../src/components/ui/card";
import { Button } from "../../src/components/ui/button";
import { Sidebar } from "../../src/components/Sidebar";
import { Users, Calendar, Check, X } from "lucide-react";

export default function LeaveManagement() {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [leaveStats, setLeaveStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-success/20 text-success";
      case "Rejected": return "bg-error/20 text-error";
      case "Pending": return "bg-warning/20 text-warning";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/leaves")
      .then(res => res.json())
      .then(data => {
        setLeaves(data);
        const total = data.length;
        const pending = data.filter((l: any) => l.status === "Pending").length;
        const approved = data.filter((l: any) => l.status === "Approved").length;
        const rejected = data.filter((l: any) => l.status === "Rejected").length;
        setLeaveStats({ total, pending, approved, rejected });
      });

    fetch("http://localhost:8000/api/staff")
      .then(res => res.json())
      .then(setStaff);
  }, []);

  const handleLeaveAction = async (leaveId: number, action: "Approved" | "Rejected") => {
    try {
      const res = await fetch(`http://localhost:8000/api/leaves/${leaveId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action })
      });

      if (!res.ok) throw new Error("Failed to update leave");

      setLeaves(prev => prev.map(l => l.id === leaveId ? { ...l, status: action } : l));

      // Update stats
      const total = leaves.length;
      const pending = leaves.filter(l => l.status === "Pending").length - 1;
      const approved = leaves.filter(l => l.status === "Approved").length + (action === "Approved" ? 1 : 0);
      const rejected = leaves.filter(l => l.status === "Rejected").length + (action === "Rejected" ? 1 : 0);
      setLeaveStats({ total, pending, approved, rejected });

    } catch (err) {
      console.error(err);
      alert("Failed to update leave status");
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="fixed"><Sidebar /></div>

      <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto bg-white ml-64">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Leave Management</h1>
            <p className="text-muted-foreground">Manage staff leave requests and approvals</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Leave Requests</p>
                  <p className="text-2xl font-bold">{leaveStats.total}</p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground"/>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{leaveStats.pending}</p>
                </div>
                <Calendar className="h-8 w-8 text-warning"/>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold">{leaveStats.approved}</p>
                </div>
                <Check className="h-8 w-8 text-success"/>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                  <p className="text-2xl font-bold">{leaveStats.rejected}</p>
                </div>
                <X className="h-8 w-8 text-error"/>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leave Requests */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {leaves.map(leave => {
            const staffMember = staff.find(s => s.id === leave.staff_id);
            return (
              <Card key={leave.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-muted-foreground"/>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{staffMember?.name || "Unknown"}</CardTitle>
                        <p className="text-sm text-muted-foreground">{leave.type}</p>
                      </div>
                    </div>
                    <div>
                      <Button size="sm" className={`mr-1 ${leave.status === "Approved" ? "bg-success/20" : leave.status === "Rejected" ? "bg-error/20" : "bg-warning/20"}`}>{leave.status}</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>Start: {leave.start_date}</p>
                  <p>End: {leave.end_date}</p>
                  <p>Reason: {leave.reason}</p>
                </CardContent>
                {leave.status === "Pending" && (
                  <div className="flex gap-2 p-4">
                    <Button variant="outline" className="flex-1" onClick={() => handleLeaveAction(leave.id, "Approved")}>
                      <Check className="h-4 w-4 mr-1"/> Approve
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => handleLeaveAction(leave.id, "Rejected")}>
                      <X className="h-4 w-4 mr-1"/> Reject
                    </Button>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  );
}
