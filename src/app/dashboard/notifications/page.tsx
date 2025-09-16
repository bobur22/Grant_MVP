"use client"

import { useState, useEffect } from "react"
import { Bell, Mail, MailOpen } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/AuthContext"
import api from "@/lib/api"

interface NotificationItem {
  id: number;
  title: string;
  notification_type: string;
  created_time: string;
  is_read: boolean;
  time_since: string;
}

interface NotificationResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NotificationItem[];
  stats: {
    total_count: number;
    unread_count: number;
    read_count: number;
  };
}

const formatTimestamp = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }) + " " + date.toLocaleTimeString("uz-UZ", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function NotificationsPage() {
  const { user, decrementUnreadCount  } = useAuth();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [stats, setStats] = useState({
    total_count: 0,
    unread_count: 0,
    read_count: 0
  });
  const [loading, setLoading] = useState(true);

  // Notifications list olish
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get<NotificationResponse>('/notifications/list/');
      setNotifications(response.data.results);
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Notification ni o'qilgan deb belgilash
  const markAsRead = async (notificationId: number) => {
    try {
      await api.patch(`/notifications/${notificationId}/mark-as-read/`);
      
      // State ni yangilash
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, is_read: true }
            : notification
        )
      );
      
      // Stats ni yangilash
      setStats(prev => ({
        ...prev,
        unread_count: prev.unread_count - 1,
        read_count: prev.read_count + 1
      }));
      // AuthContext dagi count ni ham kamaytirish
      decrementUnreadCount();
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-blue-800/30 border-blue-600/30 backdrop-blur-sm p-6">
            <div className="text-center text-white">Yuklanmoqda...</div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#002B55] p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* User Profile Header */}
        <Card className="bg-gradient-to-r bg-[#1e3a8a] border-blue-600/30 backdrop-blur-sm">
          <div className="p-6 bg-[#1e40af] rounded-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Profile Image and Name */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
                  {user.profile_picture ? (
                    <img src={user.profile_picture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-xl font-semibold">
                      {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">F.I.SH.</h2>
                  <p className="text-blue-200">{user.first_name} {user.last_name}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 md:ml-8">
                <div>
                  <h3 className="text-white font-medium mb-1">Telefon raqam</h3>
                  <p className="text-blue-200">{user.phone_number}</p>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Pochta manzili</h3>
                  <p className="text-blue-200">{user.email || 'Kiritilmagan'}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Notifications Section */}
        <Card className="bg-blue-800/30 border-blue-600/30 backdrop-blur-sm">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-white" />
              <h1 className="text-2xl font-bold text-white">Bildirishnomalar</h1>
            </div>

            {/* Notification Counter */}
            <div className="flex items-center justify-between mb-4 p-3 bg-blue-700/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-blue-600 text-white">
                  Jami ({stats.total_count})
                </Badge>
                <Badge variant="secondary" className="bg-orange-600 text-white">
                  O'qilmagan ({stats.unread_count})
                </Badge>
                <Badge variant="secondary" className="bg-green-600 text-white">
                  O'qilgan ({stats.read_count})
                </Badge>
              </div>
              <span className="text-blue-200 text-sm">Sana</span>
            </div>

            {/* Notifications List */}
            {loading ? (
              <div className="text-center text-white py-8">Yuklanmoqda...</div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-center text-blue-200 py-8">
                    Bildirishnomalar mavjud emas
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-center justify-between p-4 rounded-lg transition-colors cursor-pointer group ${
                        !notification.is_read
                          ? "bg-blue-600/40 hover:bg-blue-600/50"
                          : "bg-blue-700/20 hover:bg-blue-700/30"
                      }`}
                      onClick={() => !notification.is_read && markAsRead(notification.id)}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {notification.is_read ? (
                          <MailOpen className="w-5 h-5 text-gray-400" />
                        ) : (
                          <Mail className="w-5 h-5 text-yellow-400" />
                        )}
                        <span className={`group-hover:text-blue-100 transition-colors ${
                          notification.is_read ? 'text-gray-300' : 'text-white'
                        }`}>
                          {notification.title}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-blue-300 text-sm whitespace-nowrap">
                          {formatTimestamp(notification.created_time)}
                        </span>
                        <span className="text-blue-400 text-xs">
                          {notification.time_since}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}