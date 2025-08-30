import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle, XCircle } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  action: 'approve' | 'reject';
  staffName: string;
  leaveType: string;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  action,
  staffName,
  leaveType
}: ConfirmationModalProps) {
  const isApprove = action === 'approve';
  
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            {isApprove ? (
              <CheckCircle className="h-6 w-6 text-status-approved" />
            ) : (
              <XCircle className="h-6 w-6 text-status-rejected" />
            )}
            <AlertDialogTitle>
              {isApprove ? 'Approve' : 'Reject'} Leave Request
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            Are you sure you want to {action} {staffName}'s {leaveType} request?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={isApprove 
              ? "bg-gradient-success hover:opacity-90" 
              : "bg-gradient-danger hover:opacity-90"
            }
          >
            {isApprove ? 'Approve' : 'Reject'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}