
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "@/components/Layout/AuthLayout";
import { useAuth } from "@/hooks/useAuth";
import { AuthService } from "@/api/services/authService";
import { toast } from "sonner";
// import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(JSON.parse(localStorage.getItem("rememberMe"))?.password || "");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(JSON.parse(localStorage.getItem("rememberMe"))?.rememberMe || false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Por favor complete todos los campos");
      return;
    }

    setLoading(true);
    
    try {
      const response = await AuthService.login({ email, password });
      console.log(response);
      
      if (rememberMe) {
        localStorage.setItem("rememberMe", JSON.stringify({ email, password, rememberMe }));
      }
      
      await login(email, password); // Context update
      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Bienvenido de nuevo j" 
      subtitle="Ingresa tus credenciales para acceder a tu cuenta"
      backLink={{ label: "¿No tienes una cuenta? Regístrate", to: "/register" }}
    >
      {email}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Contraseña</Label>
            <Link 
              to="/recover-password" 
              className="text-xs text-muted-foreground hover:text-primary link-underline"
            >
              ¿Olvidaste tu contraseña?
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
            Recordarme
          </Label>
        </div>
        
        <Button 
          type="submit"
          className="w-full h-11 bg-moneywise-600 hover:bg-moneywise-700" 
          disabled={loading}
        >
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
