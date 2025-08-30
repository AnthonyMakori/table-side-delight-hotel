import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Clock, CheckCircle, XCircle, AlertCircle, Building2 } from "lucide-react";
import { LeaveRequest } from "../../types/leave";
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
    color: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    icon: AlertCircle,
    label: "Pending",
  },
  approved: {
    color: "bg-green-600 text-white",
    icon: CheckCircle,
    label: "Approved",
  },
  rejected: {
    color: "bg-red-600 text-white",
    icon: XCircle,
    label: "Rejected",
  },
  "on-leave": {
    color: "bg-blue-600 text-white",
    icon: Clock,
    label: "On Leave",
  },
};

const typeLabels: Record<string, string> = {
  annual: "Annual Leave",
  sick: "Sick Leave",
  personal: "Personal Leave",
  maternity: "Maternity Leave",
  paternity: "Paternity Leave",
  casual: "Casual Leave",
};

export function LeaveRequestCard({
  request,
  onApprove,
  onReject,
  className,
}: LeaveRequestCardProps) {
  const config = statusConfig[request.status];
  const StatusIcon = config.icon;

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMM dd, yyyy");
    } catch {
      return dateString; // fallback
    }
  };

  return (
    <Card
      className={cn(
        "rounded-2xl border shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 bg-white",
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          {/* Staff Info */}
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={request.staffAvatar} alt={request.staffName} />
              <AvatarFallback className="bg-primary text-white text-sm">
                {request.staffName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-card-foreground text-lg leading-tight">
                {request.staffName}
              </h3>

              {/* Department */}
              {request.department && (
                <div className="flex items-center gap-1 mt-0.5">
                  <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-800 px-2 py-0.5 text-xs"
                  >
                    {request.department}
                  </Badge>
                </div>
              )}

              {/* Leave Type */}
              <p className="text-sm text-muted-foreground mt-1">
                {typeLabels[request.type] ?? "Leave"}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <Badge
            className={cn(
              "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm",
              config.color
            )}
          >
            <StatusIcon className="h-3.5 w-3.5" />
            {config.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Dates & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Dates:</span>
            <span className="font-medium">
              {formatDate(request.startDate)} – {formatDate(request.endDate)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Duration:</span>
            <span className="font-medium">{request.duration} days</span>
          </div>
        </div>

        {/* Reason */}
        {request.reason && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <span className="text-sm font-medium text-muted-foreground">
              Reason:
            </span>
            <p className="text-sm text-card-foreground mt-1 leading-snug">
              {request.reason}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        {request.status === "pending" && (onApprove || onReject) && (
          <div className="flex gap-2 pt-2">
            {onApprove && (
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 shadow"
                onClick={() => onApprove(request.id)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Approve
              </Button>
            )}
            {onReject && (
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 shadow"
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
