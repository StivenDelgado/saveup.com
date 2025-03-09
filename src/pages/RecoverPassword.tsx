
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/Layout/AuthLayout";
import { toast } from "sonner";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate sending recovery email
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success("Recovery email sent!");
    }, 1500);
  };

  return (
    <AuthLayout 
      title="Recover Password" 
      subtitle="We'll send you a link to reset your password"
      backLink={{ label: "Back to login", to: "/login" }}
    >
      {!sent ? (
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
          
          <Button 
            type="submit"
            className="w-full h-11 bg-moneywise-600 hover:bg-moneywise-700" 
            disabled={loading}
          >
            {loading ? "Sending..." : "Send recovery email"}
          </Button>
        </form>
      ) : (
        <div className="space-y-4 text-center">
          <div className="bg-moneywise-100 text-moneywise-800 p-4 rounded-lg">
            <p>Recovery email sent to <strong>{email}</strong></p>
            <p className="text-sm mt-2">Please check your inbox and follow the instructions.</p>
          </div>
          
          <Button 
            variant="outline"
            className="w-full h-11" 
            onClick={() => navigate("/login")}
          >
            Return to login
          </Button>
        </div>
      )}
    </AuthLayout>
  );
};

export default RecoverPassword;
