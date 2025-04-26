
import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import NotificationCenter from "./NotificationCenter";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex overflow-hidden">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        
        <main className="flex-1 overflow-y-auto p-16 pb-16">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
      
      <NotificationCenter 
        open={notificationsOpen} 
        onClose={() => setNotificationsOpen(false)} 
      />
    </div>
  );
};

export default AppLayout;
