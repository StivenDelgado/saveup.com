
import { useState, useEffect } from "react";
import { X, Bell, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "alert" | "info" | "success";
}

interface NotificationCenterProps {
  open: boolean;
  onClose: () => void;
}

const NotificationCenter = ({ open, onClose }: NotificationCenterProps) => {
  // Mock notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Savings Goal Reached!",
      message: "You've reached your savings goal for 'New Laptop'.",
      date: "10 min ago",
      read: false,
      type: "success",
    },
    {
      id: "2",
      title: "Monthly Budget Alert",
      message: "You're close to your spending limit for this month.",
      date: "2 hours ago",
      read: false,
      type: "alert",
    },
    {
      id: "3",
      title: "New Feature Available",
      message: "Try our new AI-powered savings recommendations.",
      date: "1 day ago",
      read: true,
      type: "info",
    },
  ]);

  // Close notification center when ESC key is pressed
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  // Prevent body scroll when notification center is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 w-80 max-w-full bg-background shadow-lg animate-slide-in overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-moneywise-500" />
            <h2 className="text-lg font-semibold">Notifications</h2>
            {unreadCount > 0 && (
              <span className="text-xs bg-moneywise-500 text-white px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <Tabs defaultValue="all" className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-2 border-b">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
            </TabsList>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground h-8"
              onClick={markAllAsRead}
            >
              <Check className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
          </div>

          <TabsContent value="all" className="flex-1 overflow-y-auto p-0">
            <div className="divide-y divide-border">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-muted/40 transition-colors ${
                      !notification.read ? "bg-moneywise-50/50" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`h-2 w-2 mt-1.5 rounded-full ${
                          !notification.read
                            ? "bg-moneywise-500"
                            : "bg-muted-foreground/20"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-medium">{notification.title}</h3>
                          <time className="text-xs text-muted-foreground">
                            {notification.date}
                          </time>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No notifications</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="unread" className="flex-1 overflow-y-auto p-0">
            <div className="divide-y divide-border">
              {notifications.filter((n) => !n.read).length > 0 ? (
                notifications
                  .filter((n) => !n.read)
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 bg-moneywise-50/50 hover:bg-muted/40 transition-colors"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-2 w-2 mt-1.5 rounded-full bg-moneywise-500" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-medium">{notification.title}</h3>
                            <time className="text-xs text-muted-foreground">
                              {notification.date}
                            </time>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No unread notifications</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default NotificationCenter;
