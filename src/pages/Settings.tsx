
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/Layout/AppLayout";
import { Laptop, Moon, Sun, Globe, BellRing } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const Settings = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
    language: "es",
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
    privacy: {
      shareData: false,
      analytics: true,
    },
  });

  const handleThemeChange = (value: string) => {
    setTheme(value as 'light' | 'dark' | 'system');
    toast({
      title: "Tema actualizado",
      description: `Has cambiado el tema a ${value === "dark" ? "oscuro" : value === "light" ? "claro" : "sistema"}`,
    });
  };

  const handleLanguageChange = (value: string) => {
    setSettings(prev => ({ ...prev, language: value }));
    toast({
      title: "Idioma actualizado",
      description: `Has cambiado el idioma a ${value === "es" ? "Español" : "English"}`,
    });
  };

  const handleNotificationChange = (type: "email" | "push" | "sms") => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      }
    }));
    toast({
      title: "Notificaciones actualizadas",
      description: `Has ${settings.notifications[type] ? "desactivado" : "activado"} las notificaciones por ${type === "email" ? "correo electrónico" : type === "push" ? "push" : "SMS"}`,
    });
  };

  const handlePrivacyChange = (type: "shareData" | "analytics") => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [type]: !prev.privacy[type],
      }
    }));
    toast({
      title: "Configuración de privacidad actualizada",
      description: `Has ${settings.privacy[type] ? "desactivado" : "activado"} ${type === "shareData" ? "compartir datos" : "análisis de uso"}`,
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Configuración</h1>
          <p className="text-muted-foreground">Administra tus preferencias de la aplicación</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Apariencia</CardTitle>
              <CardDescription>
                Personaliza la apariencia de la aplicación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="theme" className="text-base">Tema</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      className={`flex-1 ${theme === "light" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
                      onClick={() => handleThemeChange("light")}
                    >
                      <Sun className="mr-2 h-4 w-4" />
                      Claro
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`flex-1 ${theme === "dark" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
                      onClick={() => handleThemeChange("dark")}
                    >
                      <Moon className="mr-2 h-4 w-4" />
                      Oscuro
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`flex-1 ${theme === "system" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
                      onClick={() => handleThemeChange("system")}
                    >
                      <Laptop className="mr-2 h-4 w-4" />
                      Sistema
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
              <CardDescription>
                Configura cómo y cuándo quieres recibir notificaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BellRing className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">Recibe notificaciones por correo electrónico</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.notifications.email} 
                  onCheckedChange={() => handleNotificationChange("email")} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BellRing className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Push</p>
                    <p className="text-sm text-muted-foreground">Recibe notificaciones push en tu dispositivo</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.notifications.push} 
                  onCheckedChange={() => handleNotificationChange("push")} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BellRing className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">SMS</p>
                    <p className="text-sm text-muted-foreground">Recibe notificaciones por mensaje de texto</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.notifications.sms} 
                  onCheckedChange={() => handleNotificationChange("sms")} 
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Privacidad</CardTitle>
              <CardDescription>
                Administra la configuración de privacidad y datos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Compartir datos</p>
                  <p className="text-sm text-muted-foreground">Compartir datos para mejorar la experiencia</p>
                </div>
                <Switch 
                  checked={settings.privacy.shareData} 
                  onCheckedChange={() => handlePrivacyChange("shareData")} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Análisis de uso</p>
                  <p className="text-sm text-muted-foreground">Permitir análisis de uso para mejorar el servicio</p>
                </div>
                <Switch 
                  checked={settings.privacy.analytics} 
                  onCheckedChange={() => handlePrivacyChange("analytics")} 
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
