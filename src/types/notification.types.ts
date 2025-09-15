// API dan keladigan notification interfacelari
export interface NotificationItem {
    id: number;
    title: string;
    notification_type: string;
    created_time: string;
    is_read: boolean;
    time_since: string;
  }
  
  export interface NotificationStats {
    total_count: number;
    unread_count: number;
    read_count: number;
  }
  
  export interface NotificationResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: NotificationItem[];
    stats: NotificationStats;
  }
  
  // Notification filter uchun (agar kerak bo'lsa)
  export interface NotificationFilter {
    is_read?: boolean;
    notification_type?: string;
    date_from?: string;
    date_to?: string;
    page?: number;
    page_size?: number;
  }
  
  // Notification types
  export type NotificationType = 
    | "application_created"
    | "application_accepted" 
    | "application_rejected"
    | "application_under_review"
    | "application_resubmit_required"
    | "award_received"
    | "system_notification";