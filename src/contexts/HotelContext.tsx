import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, Room, Order, Table, MenuItem, Payment, AuditLog } from '../types/hotel';
import { useAuth } from './AuthContext';

interface HotelContextType {
  // Bookings
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  
  // Rooms
  rooms: Room[];
  updateRoom: (id: string, updates: Partial<Room>) => void;
  
  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  
  // Tables
  tables: Table[];
  updateTable: (id: string, updates: Partial<Table>) => void;
  
  // Menu
  menuItems: MenuItem[];
  
  // Payments
  payments: Payment[];
  addPayment: (payment: Omit<Payment, 'id'>) => void;
  
  // Audit logs
  auditLogs: AuditLog[];
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (context === undefined) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};

// Mock data
const mockRooms: Room[] = [
  { id: 'room-101', number: '101', type: 'single', status: 'available', price: 120, floor: 1, amenities: ['WiFi', 'TV', 'AC'] },
  { id: 'room-102', number: '102', type: 'double', status: 'occupied', price: 180, floor: 1, amenities: ['WiFi', 'TV', 'AC', 'Minibar'] },
  { id: 'room-201', number: '201', type: 'suite', status: 'available', price: 350, floor: 2, amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Balcony'] },
  { id: 'room-301', number: '301', type: 'deluxe', status: 'maintenance', price: 280, floor: 3, amenities: ['WiFi', 'TV', 'AC', 'Minibar', 'Jacuzzi'] },
];

const mockMenuItems: MenuItem[] = [
  { id: 'menu-1', name: 'Caesar Salad', category: 'appetizer', price: 12, description: 'Fresh romaine with Caesar dressing', isAvailable: true },
  { id: 'menu-2', name: 'Grilled Salmon', category: 'main', price: 28, description: 'Atlantic salmon with herbs', allergens: ['fish'], isAvailable: true },
  { id: 'menu-3', name: 'Chocolate Cake', category: 'dessert', price: 8, description: 'Rich chocolate layer cake', isAvailable: true },
  { id: 'menu-4', name: 'House Wine', category: 'beverage', price: 15, description: 'Red or white wine selection', isAvailable: true },
];

const mockTables: Table[] = [
  { id: 'table-1', number: 'T1', capacity: 2, status: 'available', section: 'Main Dining' },
  { id: 'table-2', number: 'T2', capacity: 4, status: 'occupied', section: 'Main Dining' },
  { id: 'table-3', number: 'T3', capacity: 6, status: 'reserved', section: 'Terrace' },
  { id: 'table-4', number: 'T4', capacity: 2, status: 'cleaning', section: 'Main Dining' },
];

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentStaff } = useAuth();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tables, setTables] = useState<Table[]>(mockTables);
  const [menuItems] = useState<MenuItem[]>(mockMenuItems);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Real-time simulation effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new orders coming in
      if (Math.random() > 0.7) {
        const newOrder: Order = {
          id: `order-${Date.now()}`,
          tableNumber: `T${Math.floor(Math.random() * 10) + 1}`,
          items: [
            {
              id: `item-${Date.now()}`,
              menuItemId: mockMenuItems[Math.floor(Math.random() * mockMenuItems.length)].id,
              menuItem: mockMenuItems[Math.floor(Math.random() * mockMenuItems.length)],
              quantity: Math.floor(Math.random() * 3) + 1,
              price: 20,
            }
          ],
          status: 'new',
          totalAmount: 20,
          paymentStatus: 'pending',
          createdAt: new Date(),
          updatedAt: new Date(),
          estimatedTime: 15,
        };
        
        setOrders(prev => [newOrder, ...prev.slice(0, 19)]); // Keep last 20 orders
      }
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const addAuditLog = (action: string, entityType: string, entityId: string, details: Record<string, any>) => {
    if (!currentStaff) return;
    
    const log: AuditLog = {
      id: `audit-${Date.now()}`,
      staffId: currentStaff.id,
      staff: currentStaff,
      action,
      entityType: entityType as any,
      entityId,
      details,
      timestamp: new Date(),
    };
    
    setAuditLogs(prev => [log, ...prev.slice(0, 99)]); // Keep last 100 logs
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newBooking: Booking = {
      ...booking,
      id: `booking-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setBookings(prev => [newBooking, ...prev]);
    addAuditLog('create_booking', 'booking', newBooking.id, { guestName: booking.guest.name });
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, ...updates, updatedAt: new Date() } : booking
    ));
    addAuditLog('update_booking', 'booking', id, updates);
  };

  const updateRoom = (id: string, updates: Partial<Room>) => {
    setRooms(prev => prev.map(room => 
      room.id === id ? { ...room, ...updates } : room
    ));
    addAuditLog('update_room', 'room', id, updates);
  };

  const addOrder = (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newOrder: Order = {
      ...order,
      id: `order-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setOrders(prev => [newOrder, ...prev]);
    addAuditLog('create_order', 'order', newOrder.id, { tableNumber: order.tableNumber });
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, ...updates, updatedAt: new Date() } : order
    ));
    addAuditLog('update_order', 'order', id, updates);
  };

  const updateTable = (id: string, updates: Partial<Table>) => {
    setTables(prev => prev.map(table => 
      table.id === id ? { ...table, ...updates } : table
    ));
    addAuditLog('update_table', 'table', id, updates);
  };

  const addPayment = (payment: Omit<Payment, 'id'>) => {
    const newPayment: Payment = {
      ...payment,
      id: `payment-${Date.now()}`,
    };
    setPayments(prev => [newPayment, ...prev]);
    addAuditLog('create_payment', 'payment', newPayment.id, { amount: payment.amount });
  };

  return (
    <HotelContext.Provider value={{
      bookings,
      addBooking,
      updateBooking,
      rooms,
      updateRoom,
      orders,
      addOrder,
      updateOrder,
      tables,
      updateTable,
      menuItems,
      payments,
      addPayment,
      auditLogs,
    }}>
      {children}
    </HotelContext.Provider>
  );
};