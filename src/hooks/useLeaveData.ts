import { useState, useEffect } from 'react';
import { LeaveRequest, Staff, LeaveStats } from '../../src/types/leave';

// Mock data for demonstration
const mockStaff: Staff[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@company.com',
    department: 'Engineering',
    position: 'Senior Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c14c?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2', 
    name: 'Bob Smith',
    email: 'bob.smith@company.com',
    department: 'Marketing',
    position: 'Marketing Manager',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@company.com', 
    department: 'HR',
    position: 'HR Specialist',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    department: 'Finance',
    position: 'Financial Analyst'
  }
];

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    staffId: '1',
    staffName: 'Alice Johnson',
    staffAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c14c?w=150&h=150&fit=crop&crop=face',
    type: 'annual',
    startDate: '2024-01-15',
    endDate: '2024-01-19',
    duration: 5,
    reason: 'Family vacation to Hawaii',
    status: 'pending',
    submittedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '2',
    staffId: '2',
    staffName: 'Bob Smith',
    staffAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    type: 'sick',
    startDate: '2024-01-10',
    endDate: '2024-01-12',
    duration: 3,
    reason: 'Flu symptoms and recovery',
    status: 'approved',
    submittedAt: '2024-01-08T14:30:00Z',
    reviewedAt: '2024-01-09T09:15:00Z',
    reviewedBy: 'HR Manager'
  },
  {
    id: '3',
    staffId: '3',
    staffName: 'Carol Davis',
    staffAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    type: 'personal',
    startDate: '2024-01-20',
    endDate: '2024-01-20',
    duration: 1,
    reason: 'Medical appointment',
    status: 'rejected',
    submittedAt: '2024-01-05T16:45:00Z',
    reviewedAt: '2024-01-06T11:20:00Z',
    reviewedBy: 'Department Head'
  },
  {
    id: '4',
    staffId: '4', 
    staffName: 'David Wilson',
    type: 'annual',
    startDate: '2024-01-08',
    endDate: '2024-01-14',
    duration: 7,
    reason: 'Winter skiing trip',
    status: 'on-leave',
    submittedAt: '2023-12-20T13:00:00Z',
    reviewedAt: '2023-12-22T10:30:00Z',
    reviewedBy: 'HR Manager'
  }
];

export function useLeaveData() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate API call
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLeaves(mockLeaveRequests);
        setStaff(mockStaff);
        setError(null);
      } catch (err) {
        setError('Failed to load leave data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateLeaveStatus = (leaveId: string, status: 'approved' | 'rejected') => {
    setLeaves(prev => prev.map(leave => 
      leave.id === leaveId 
        ? { 
            ...leave, 
            status,
            reviewedAt: new Date().toISOString(),
            reviewedBy: 'Current User'
          }
        : leave
    ));
  };

  const calculateStats = (): LeaveStats => {
    return {
      totalRequests: leaves.length,
      pendingRequests: leaves.filter(l => l.status === 'pending').length,
      approvedRequests: leaves.filter(l => l.status === 'approved').length,
      rejectedRequests: leaves.filter(l => l.status === 'rejected').length,
      currentlyOnLeave: leaves.filter(l => l.status === 'on-leave').length
    };
  };

  return {
    leaves,
    staff,
    loading,
    error,
    updateLeaveStatus,
    stats: calculateStats()
  };
}