export type StaffRole = 'receptionist' | 'kitchen' | 'waiter';

export interface Staff {
  id: string;
  name: string;
  email: string;
  department?: string;
  role: StaffRole;
  avatar?: string;
  isActive: boolean;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationalId?: string;
  checkInDate: Date;
  checkOutDate: Date;
  totalAmount: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
}

export interface Room {
  id: string;
  number: string;
  type: 'single' | 'double' | 'suite' | 'deluxe';
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning';
  price: number;
  floor: number;
  amenities: string[];
}

export interface Booking {
  id: string;
  guestId: string;
  guest: Guest;
  roomId: string;
  room: Room;
  checkInDate: Date;
  checkOutDate: Date;
  numberOfGuests: number;
  totalAmount: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'appetizer' | 'main' | 'dessert' | 'beverage';
  price: number;
  description: string;
  allergens?: string[];
  isAvailable: boolean;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
  price: number;
}

export interface Order {
  id: string;
  tableNumber: string;
  items: OrderItem[];
  status: 'new' | 'preparing' | 'ready' | 'served' | 'cancelled';
  totalAmount: number;
  paymentStatus: 'pending' | 'paid';
  customerNotes?: string;
  kitchenNotes?: string;
  createdAt: Date;
  updatedAt: Date;
  estimatedTime?: number; // in minutes
}

export interface Table {
  id: string;
  number: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'cleaning';
  waiterId?: string;
  waiter?: Staff;
  currentOrderId?: string;
  currentOrder?: Order;
  section: string;
}

export interface Payment {
  id: string;
  type: 'accommodation' | 'dining';
  referenceId: string; // booking ID or order ID
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'cash' | 'card' | 'online';
  processedAt?: Date;
  processedBy?: string;
}

export interface AuditLog {
  id: string;
  staffId: string;
  staff: Staff;
  action: string;
  entityType: 'booking' | 'order' | 'table' | 'room' | 'payment';
  entityId: string;
  details: Record<string, any>;
  timestamp: Date;
}