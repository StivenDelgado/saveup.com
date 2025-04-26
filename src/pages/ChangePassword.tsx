
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/Layout/AuthLayout";
import { toast } from "sonner";
import { AuthService } from "@/api/services/authService";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasChanged = sessionStorage.getItem('passwordChanged');
    if (hasChanged) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Las nuevas contraseñas no coinciden");
      return;
    }

    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);

    try {
      const id_user = parseInt(urlParams.get('id_user'));
      if (id_user) {
        await AuthService.changePassword(id_user, newPassword);
        toast.success("Contraseña cambiada con éxito");
        sessionStorage.setItem('passwordChanged', 'true');
        navigate("/login", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error al cambiar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Cambiar contraseña" 
      subtitle="Actualiza tu contraseña para proteger tu cuenta"
      backLink={{ label: "Volver al panel", to: "/dashboard" }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="new-password">Nueva contraseña</Label>
          <Input
            id="new-password"
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="h-11"
          />
        </div>
        
        <Button 
          type="submit"
          className="w-full h-11 bg-moneywise-600 hover:bg-moneywise-700" 
          disabled={loading}
        >
          {loading ? "Actualizando..." : "Actualizar contraseña"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ChangePassword;
