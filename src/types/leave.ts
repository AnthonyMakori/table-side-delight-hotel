export interface Staff {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  avatar?: string;
}

export interface LeaveRequest {
  id: string;
  staffId: string;
  staffName: string;
  staffAvatar?: string;
  type: 'annual' | 'sick' | 'personal' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  duration: number; 
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'on-leave';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface LeaveStats {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  currentlyOnLeave: number;
}

export type LeaveStatus = LeaveRequest['status'];
export type LeaveType = LeaveRequest['type'];