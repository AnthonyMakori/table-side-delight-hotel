import { useState } from "react";
import axios from "axios";
import { Button } from "../../src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../src/components/ui/card";
import { Input } from "../../src/components/ui/input";
import { Label } from "../../src/components/ui/label";
import { LogIn } from "lucide-react";
import { toast } from "../../src/components/ui/use-toast";

const SignIn = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", {
        email: loginForm.email,
        password: loginForm.password,
      });

      const { token, user } = res.data;

      // Save token locally (prefer HttpOnly cookies in production)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}`,
      });

      window.location.href = "/Admin/Dashboard";
    } catch (err) {
      const msg =
        err.response?.data?.message || "An error occurred. Try again later.";
      toast({
        title: "Login failed",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="text-center">
          <CardTitle className="font-luxury text-3xl text-foreground">
            Grandeur Hotel
          </CardTitle>
          <p className="text-muted-foreground">Admin Login</p>
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
                placeholder="admin@grandeur.com"
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

            <Button type="submit" variant="luxury" className="w-full" disabled={loading}>
              <LogIn className="h-4 w-4 mr-2" />
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
