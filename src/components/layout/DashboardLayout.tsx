import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

import { 
  Hotel, 
  LogOut, 
  Bell, 
  Settings, 
  User,
  Calendar,
  Clock,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title, 
  subtitle, 
  actions 
}) => {
  const { currentStaff, logout } = useAuth();
  const navigate = useNavigate();

  if (!currentStaff) {
    return null;
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'receptionist':
        return 'bg-primary text-primary-foreground';
      case 'kitchen':
        return 'bg-warning text-warning-foreground';
      case 'waiter':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'receptionist':
        return <User className="h-3 w-3" />;
      case 'kitchen':
        return <Settings className="h-3 w-3" />;
      case 'waiter':
        return <Calendar className="h-3 w-3" />;
      default:
        return <User className="h-3 w-3" />;
    }
  };

    const handleLogout = () => {
    // Clear user session data (adjust as needed for your auth)
    localStorage.clear(); // or localStorage.removeItem('token')
    sessionStorage.clear();

    // Redirect to login page
    navigate("/auth/LoginForm");
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-card-soft sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-hotel rounded-lg p-2">
                <Hotel className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Grandeur Hotel</h1>
                <p className="text-xs text-muted-foreground">Staff Dashboard</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{new Date().toLocaleTimeString()}</span>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Staff Profile */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium">{currentStaff.name}</div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs  ${getRoleColor(currentStaff.role)}`}
                  >
                    {getRoleIcon(currentStaff.role)}
                    <span className="ml-1 capitalize">{currentStaff.role}</span>
                  </Badge>
                </div>
              </div>
              
              <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                <AvatarFallback className="bg-yellow-400 text-blue-600 font-semibold">
                  {currentStaff.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Logout */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <div className="bg-card border-b">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground animate-slide-in">
                {title}
              </h2>
              {subtitle && (
                <p className="text-muted-foreground mt-1 animate-fade-in">
                  {subtitle}
                </p>
              )}
            </div>
            {actions && (
              <div className="flex items-center space-x-2 animate-fade-in">
                {actions}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      {/* Status Bar */}
      <div className="bg-card border-t px-6 py-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>System Status: Online</span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft"></div>
              <span>Real-time sync active</span>
            </span>
          </div>
          <div>
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;