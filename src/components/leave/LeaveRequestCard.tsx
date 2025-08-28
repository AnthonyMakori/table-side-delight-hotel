import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { LeaveRequest, LeaveStatus } from "../../types/leave";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";

interface LeaveRequestCardProps {
  request: LeaveRequest;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  className?: string;
}

const statusConfig = {
  pending: {
    color: "bg-status-pending text-black",
    icon: AlertCircle,
    label: "Pending"
  },
  approved: {
    color: "bg-status-approved text-white",
    icon: CheckCircle,
    label: "Approved"
  },
  rejected: {
    color: "bg-status-rejected text-white",
    icon: XCircle,
    label: "Rejected"
  },
  "on-leave": {
    color: "bg-status-on-leave text-white",
    icon: Clock,
    label: "On Leave"
  }
};

const typeLabels = {
  annual: "Annual Leave",
  sick: "Sick Leave",
  personal: "Personal Leave",
  maternity: "Maternity Leave",
  paternity: "Paternity Leave"
};

export function LeaveRequestCard({ 
  request, 
  onApprove, 
  onReject, 
  className 
}: LeaveRequestCardProps) {
  const config = statusConfig[request.status];
  const StatusIcon = config.icon;
  
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM dd, yyyy');
  };

  return (
    <Card className={cn(
      "transition-smooth hover:shadow-medium hover:-translate-y-1 hover:border-primary/20",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={request.staffAvatar} alt={request.staffName} />
              <AvatarFallback className="bg-gradient-primary text-white">
                {request.staffName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-card-foreground">{request.staffName}</h3>
              <p className="text-sm text-muted-foreground">{typeLabels[request.type]}</p>
            </div>
          </div>
          
          <Badge className={cn("flex items-center gap-1", config.color)}>
            <StatusIcon className="h-3 w-3" />
            {config.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Dates:</span>
            <span className="font-medium">
              {formatDate(request.startDate)} - {formatDate(request.endDate)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Duration:</span>
            <span className="font-medium">{request.duration} days</span>
          </div>
        </div>

        {request.reason && (
          <div>
            <span className="text-sm font-medium text-muted-foreground">Reason:</span>
            <p className="text-sm text-card-foreground mt-1">{request.reason}</p>
          </div>
        )}

        {request.status === 'pending' && (onApprove || onReject) && (
          <div className="flex gap-2 pt-2">
            {onApprove && (
              <Button 
                size="sm" 
                className="bg-gradient-success hover:opacity-90 transition-smooth"
                onClick={() => onApprove(request.id)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Approve
              </Button>
            )}
            {onReject && (
              <Button 
                size="sm" 
                variant="outline"
                className="border-status-rejected text-status-rejected hover:bg-status-rejected hover:text-white transition-smooth"
                onClick={() => onReject(request.id)}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}