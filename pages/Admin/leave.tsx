import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { StatsCard } from '../../src/components/leave/StatsCard';
import { LeaveRequestCard } from '../../src/components/leave/LeaveRequestCard';
import { ConfirmationModal } from '../../src/components/leave/ConfirmationModal';
import { useToast } from '@/hooks/use-toast';
import { Sidebar } from '@/components/Sidebar';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Users, 
  Search,
  AlertTriangle 
} from 'lucide-react';
import { LeaveRequest, LeaveStatus, LeaveType } from '../../src/types/leave';

const typeLabels = {
  annual: "Annual Leave",
  sick: "Sick Leave", 
  personal: "Personal Leave",
  maternity: "Maternity Leave",
  paternity: "Paternity Leave"
};

export default function LeaveManagement() {
  const { toast } = useToast();

  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeaveStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<LeaveType | 'all'>('all');
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    action: 'approve' | 'reject';
    request: LeaveRequest | null;
  }>({
    isOpen: false,
    action: 'approve',
    request: null
  });

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://127.0.0.1:8000/api/leaves');
        
        const data = res.data.map((leave: any) => ({
          id: leave.id,
          staffId: leave.staff_id,
          staffName: leave.staff?.name || 'Unknown',
          department: leave.department || 'Unknown',
          type: (leave.type?.toLowerCase() || 'personal') as LeaveType,
          status: leave.status as LeaveStatus,
          startDate: leave.start_date,
          endDate: leave.end_date,
          reason: leave.reason
        }));
        
        setLeaves(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch leaves');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  const updateLeaveStatus = async (id: number, newStatus: LeaveStatus) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/leaves/${id}/status`, {
        status: newStatus
      });

      setLeaves((prev) =>
        prev.map((leave) =>
          leave.id === id ? { ...leave, status: newStatus } : leave
        )
      );
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update leave status",
        variant: "destructive"
      });
    }
  };

  const stats = useMemo(() => {
    return {
      totalRequests: leaves.length,
      pendingRequests: leaves.filter(l => l.status === 'pending').length,
      approvedRequests: leaves.filter(l => l.status === 'approved').length,
      rejectedRequests: leaves.filter(l => l.status === 'rejected').length,
      currentlyOnLeave: leaves.filter(l => l.status === 'on-leave').length,
    };
  }, [leaves]);

  const filteredLeaves = useMemo(() => {
    return leaves.filter(leave => {
      const matchesSearch = leave.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (typeLabels[leave.type]?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || leave.status === statusFilter;
      const matchesType = typeFilter === 'all' || leave.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [leaves, searchTerm, statusFilter, typeFilter]);

  const handleAction = (action: 'approve' | 'reject', request: LeaveRequest) => {
    setConfirmModal({
      isOpen: true,
      action,
      request
    });
  };

  const confirmAction = () => {
    if (confirmModal.request) {
      const action = confirmModal.action === 'approve' ? 'approved' : 'rejected';
      updateLeaveStatus(Number(confirmModal.request.id), action as LeaveStatus);
      toast({
        title: `Leave ${action}`,
        description: `${confirmModal.request.staffName}'s leave request has been ${action}.`,
        variant: action === 'approved' ? 'default' : 'destructive'
      });
    }
    
    setConfirmModal({ isOpen: false, action: 'approve', request: null });
  };

  if (error) {
    return (
      <div className="flex min-h-screen overflow-hidden">
        <div className="fixed"><Sidebar /></div>
        <div className="flex-1 p-6">
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div className="fixed"><Sidebar /></div>

      {/* Main content */}
      <div className="flex-1 flex flex-col gap-8 p-6 overflow-y-auto ml-64">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
          <p className="text-muted-foreground">
            Manage employee leave requests and track time-off statistics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))
          ) : (
            <>
              <StatsCard
                title="Total Requests"
                value={stats.totalRequests}
                icon={Calendar}
                gradient="bg-gradient-primary"
                trend={{ value: 12, isPositive: true }}
              />
              <StatsCard
                title="Pending"
                value={stats.pendingRequests}
                icon={Clock}
                gradient="bg-gradient-warning"
                trend={{ value: 5, isPositive: false }}
              />
              <StatsCard
                title="Approved"
                value={stats.approvedRequests}
                icon={CheckCircle}
                gradient="bg-gradient-success"
                trend={{ value: 8, isPositive: true }}
              />
              <StatsCard
                title="Rejected"
                value={stats.rejectedRequests}
                icon={XCircle}
                gradient="bg-gradient-danger"
                trend={{ value: 2, isPositive: false }}
              />
              <StatsCard
                title="On Leave"
                value={stats.currentlyOnLeave}
                icon={Users}
                gradient="bg-gradient-secondary"
                trend={{ value: 3, isPositive: true }}
              />
            </>
          )}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by staff name or leave type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as LeaveStatus | 'all')}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="on-leave">On Leave</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as LeaveType | 'all')}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="annual">Annual Leave</SelectItem>
              <SelectItem value="sick">Sick Leave</SelectItem>
              <SelectItem value="personal">Personal Leave</SelectItem>
              <SelectItem value="maternity">Maternity Leave</SelectItem>
              <SelectItem value="paternity">Paternity Leave</SelectItem>
            </SelectContent>
          </Select>

          <div className="text-sm text-muted-foreground flex items-center">
            Showing {filteredLeaves.length} of {leaves.length} requests
          </div>
        </div>

        {/* Leave Requests */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Leave Requests</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 gap-4">
            {filteredLeaves.map((request) => (
              <LeaveRequestCard
                key={request.id}
                request={request}
                onApprove={() => handleAction('approve', request)}
                onReject={() => handleAction('reject', request)}
              />
            ))}
          </div>
          ) : filteredLeaves.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No leave requests found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'Try adjusting your filters to see more results.'
                  : 'There are no leave requests to display.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
              {filteredLeaves.map((request) => (
                <LeaveRequestCard
                  key={request.id}
                  request={request}
                  onApprove={() => handleAction('approve', request)}
                  onReject={() => handleAction('reject', request)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={confirmModal.isOpen}
          onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
          onConfirm={confirmAction}
          action={confirmModal.action}
          staffName={confirmModal.request?.staffName || ''}
          leaveType={confirmModal.request ? typeLabels[confirmModal.request.type] : ''}
        />
      </div>
    </div>
  );
}
