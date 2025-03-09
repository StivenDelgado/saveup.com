
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "@/components/Layout/AuthLayout";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      toast.success("Login successful!");
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Enter your credentials to access your account"
      backLink={{ label: "Don't have an account? Sign up", to: "/register" }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link 
              to="/recover-password" 
              className="text-xs text-muted-foreground hover:text-primary link-underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-11"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remember-me" 
            checked={rememberMe} 
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          />
          <Label htmlFor="remember-me" className="text-sm text-muted-foreground">
            Remember me
          </Label>
        </div>
        
        <Button 
          type="submit"
          className="w-full h-11 bg-moneywise-600 hover:bg-moneywise-700" 
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
