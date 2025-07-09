import { useState } from "react";
import { Button } from "../../src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../src/components/ui/card";
import { Input } from "../../src/components/ui/input";
import { Label } from "../../src/components/ui/label";
import { 
  Menu as MenuIcon,
  LogIn 
} from "lucide-react";
import { toast } from "../../src/components/ui/use-toast";

const SignIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple demo login - in real app, this would authenticate with backend
    if (loginForm.email === "admin@grandhaven.com" && loginForm.password === "admin123") {
      setIsLoggedIn(true);
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard.",
      });
        // Redirect to admin dashboard or load admin content
        window.location.href = "/admin/dash"; 
    } else {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Try admin@grandhaven.com / admin123",
        variant: "destructive"
      });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md bg-card border-border">
          <CardHeader className="text-center">
            <CardTitle className="font-luxury text-3xl text-foreground">
              Grand Haven
            </CardTitle>
            <p className="text-muted-foreground">Admin & Staff Portal</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  placeholder="admin@grandhaven.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <Button type="submit" variant="luxury" className="w-full">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              
              <div className="text-center text-sm text-muted-foreground">
                Demo credentials:<br />
                Email: admin@grandhaven.com<br />
                Password: admin123
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
};
export default SignIn;

