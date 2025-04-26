
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Home, 
  MessageSquare, 
  Settings, 
  Target, 
  User, 
  Wallet, 
  X,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isMobile && open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobile, open]);
  
  useEffect(() => {
    if (isMobile && open) {
      setOpen(false);
    }
  }, [location.pathname, isMobile]);

  const navigation = [
    { name: "Panel", href: "/dashboard", icon: Home },
    { name: "Ahorro Inteligente", href: "/smart-savings", icon: Wallet },
    { name: "Metas de Ahorro", href: "/savings-goals", icon: Target },
    { name: "Asesor IA", href: "/chatbot", icon: MessageSquare },
    { name: "Analítica", href: "/analytics", icon: BarChart3 },
    // { name: "Perfil", href: "/profile", icon: User },
    { name: "Configuración", href: "/settings", icon: Settings },
  ];

  const sidebarClasses = isMobile
    ? `fixed inset-0 z-50 ${open ? "block" : "hidden"}`
    : "hidden md:flex h-screen w-64 flex-col";

  const sidebarContentClasses = isMobile
    ? "fixed inset-y-0 left-0 z-50 w-64 animate-slide-in bg-background border-r border-border/50 shadow-lg transform transition-transform duration-300 ease-in-out"
    : "flex h-full flex-col bg-background border-r border-border/50";

  return (
    <div className={sidebarClasses}>
      {isMobile && open && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}
      
      <div className={sidebarContentClasses}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-semibold text-moneywise-600">SaveUp</span>
          </Link>
          
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Cerrar menú</span>
            </Button>
          )}
        </div>
        
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive 
                        ? "bg-moneywise-100 text-moneywise-700"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="sticky bottom-0 border-t border-border/50 p-4 bg-background">
          <Button
            variant="outline"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link to="/logout">
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
