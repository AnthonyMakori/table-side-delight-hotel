import React, { useState } from "react";
import axios from "axios";
import { Button } from "../../src/components/ui/button";
import { Input } from "../../src/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../src/components/ui/card";
import { useToast } from "../../src/hooks/use-toast";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://127.0.0.1:8000/api/forgot-password", { email });

      toast({
        title: "Reset Link Sent",
        description: "Check your email for a password reset link.",
      });
      setEmail("");
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Could not send reset email.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Enter your email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
