import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface BookingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking?: any | null;
}

const BookingForm: React.FC<BookingFormProps> = ({ open, onOpenChange, booking }) => {
  const { toast } = useToast();

  const [rooms, setRooms] = useState<any[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(true);

  const [formData, setFormData] = useState({
    guestName: booking?.guest?.name || "",
    guestEmail: booking?.guest?.email || "",
    guestPhone: booking?.guest?.phone || "",
    roomId: booking?.roomId || "",
    checkInDate: booking?.checkInDate ? new Date(booking.checkInDate) : null,
    checkOutDate: booking?.checkOutDate ? new Date(booking.checkOutDate) : null,
    numberOfGuests: booking?.numberOfGuests || 1,
    notes: booking?.notes || "",
  });

  const API_BASE = "http://127.0.0.1:8000/api";

  // ✅ Fetch available rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${API_BASE}/rooms`);
        const data = await res.json();
        const availableRooms = data.filter((r: any) => r.status === "available");
        setRooms(availableRooms);
      } catch (error) {
        toast({
          title: "Error fetching rooms",
          description: String(error),
          variant: "destructive",
        });
      } finally {
        setLoadingRooms(false);
      }
    };
    fetchRooms();
  }, []);

  // ✅ Handle Booking Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.checkInDate || !formData.checkOutDate || !formData.roomId) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const selectedRoom = rooms.find((r) => r.id === Number(formData.roomId));
    if (!selectedRoom) return;

    // Calculate total nights and amount
    const nights =
      (formData.checkOutDate.getTime() - formData.checkInDate.getTime()) /
      (1000 * 60 * 60 * 24);
    const totalAmount = selectedRoom.price * Math.ceil(nights);

    try {
      const payload = {
        guest_name: formData.guestName,
        guest_email: formData.guestEmail,
        guest_phone: formData.guestPhone,
        room_id: formData.roomId,
        check_in_date: formData.checkInDate,
        check_out_date: formData.checkOutDate,
        number_of_guests: formData.numberOfGuests,
        total_amount: totalAmount,
        notes: formData.notes,
      };

      let response;
      if (booking) {
        // Update existing booking
        response = await fetch(`${API_BASE}/bookings/${booking.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Create new booking via room book endpoint
        response = await fetch(`${API_BASE}/rooms/${formData.roomId}/book`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Something went wrong");
      }

      toast({
        title: booking ? "Booking Updated" : "Booking Created",
        description: booking
          ? "Booking has been successfully updated."
          : "New booking has been successfully created.",
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: String(error),
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{booking ? "Edit Booking" : "Create New Booking"}</DialogTitle>
          <DialogDescription>
            {booking
              ? "Update booking details below."
              : "Fill in the guest and booking information below."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Guest Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Guest Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guestName">Full Name *</Label>
                <Input
                  id="guestName"
                  value={formData.guestName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, guestName: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guestEmail">Email *</Label>
                <Input
                  id="guestEmail"
                  type="email"
                  value={formData.guestEmail}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, guestEmail: e.target.value }))
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guestPhone">Phone Number *</Label>
              <Input
                id="guestPhone"
                value={formData.guestPhone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, guestPhone: e.target.value }))
                }
                required
              />
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Booking Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Room *</Label>
                <Select
                  value={formData.roomId.toString()}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, roomId: Number(value) }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={loadingRooms ? "Loading..." : "Select a room"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room.id} value={room.id.toString()}>
                        Room {room.number} ({room.type}) - ${room.price}/night
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfGuests">Number of Guests *</Label>
                <Input
                  id="numberOfGuests"
                  type="number"
                  min="1"
                  max="6"
                  value={formData.numberOfGuests}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      numberOfGuests: parseInt(e.target.value),
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Check-in Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.checkInDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.checkInDate
                        ? format(formData.checkInDate, "PPP")
                        : "Pick check-in date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.checkInDate}
                      onSelect={(date) =>
                        setFormData((prev) => ({ ...prev, checkInDate: date }))
                      }
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Check-out Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.checkOutDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.checkOutDate
                        ? format(formData.checkOutDate, "PPP")
                        : "Pick check-out date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.checkOutDate}
                      onSelect={(date) =>
                        setFormData((prev) => ({ ...prev, checkOutDate: date }))
                      }
                      disabled={(date) =>
                        !formData.checkInDate || date <= formData.checkInDate
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Special Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
                placeholder="Any special requests or notes..."
                rows={3}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-hotel">
              {booking ? "Update Booking" : "Create Booking"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
