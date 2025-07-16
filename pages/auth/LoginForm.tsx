import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../src/components/ui/button';
import { Input } from '../../src/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Badge } from '../../src/components/ui/badge';
import { useAuth } from '../../src/contexts/AuthContext';
import { Hotel, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useToast } from '../../src/hooks/use-toast';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, currentStaff } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await login(email, password);

    if (success && currentStaff) {
      toast({
        title: 'Welcome back!',
        description: 'Successfully logged in to the staff dashboard.',
      });

      // Redirect based on role
      switch (currentStaff.role) {
        case 'receptionist':
          navigate('/components/dashboards/ReceptionistDashboard');
          break;
        case 'kitchen':
          navigate('/components/dashboards/KitchenDashboard');
          break;
        case 'waiter':
          navigate('/components/dashboards/WaiterDashboard');
          break;
        default:
          toast({
            title: 'Unknown Role',
            description: 'No dashboard found for this role.',
            variant: 'destructive',
          });
      }
    } else {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const demoAccounts = [
    { role: 'Receptionist', email: 'sarah@grandhotel.com', name: 'Sarah Johnson' },
    { role: 'Kitchen Staff', email: 'marco@grandhotel.com', name: 'Marco Rodriguez' },
    { role: 'Waiter', email: 'emily@grandhotel.com', name: 'Emily Chen' },
  ];

  const fillDemo = (email: string) => {
    setEmail(email);
    setPassword('hotel123');
  };

  return (
    <div className="min-h-screen bg-gradient-hotel flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo & Header */}
        <div className="text-center text-primary-foreground">
          <div className="flex justify-center mb-4">
            <div className="bg-card rounded-full p-4 shadow-hotel">
              <Hotel className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Grand Hotel</h1>
          <p className="text-primary-foreground/80">Staff Dashboard</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-hotel animate-fade-in">
          <CardHeader>
            <CardTitle>Staff Login</CardTitle>
            <CardDescription>
              Access your role-specific dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-hotel hover:shadow-hotel transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="shadow-card-soft animate-fade-in">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Demo Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoAccounts.map((account, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                onClick={() => fillDemo(account.email)}
              >
                <div>
                  <div className="font-medium text-sm">{account.name}</div>
                  <div className="text-xs text-muted-foreground">{account.email}</div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {account.role}
                </Badge>
              </div>
            ))}
            <p className="text-xs text-muted-foreground text-center mt-3">
              Password for all demo accounts: <code className="bg-muted px-1 rounded">hotel123</code>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
