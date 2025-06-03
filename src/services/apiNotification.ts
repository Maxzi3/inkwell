import type { Notification } from '../ui/types';
import api from './api';

export async function getMyNotifications() {
  const { data } = await api.get('/notifications');
  return data.data;
}
export async function fetchUnreadCount(): Promise<number> {
  const res = await api.get<{ data: Notification[] }>("/notifications");
  const unread = res.data.data.filter((n) => !n.isRead);
  return unread.length;
}

export async function markNotificationAsRead(notificationId: string) {
  const { data } = await api.patch(`/notifications/${notificationId}/read`);
  return data;
}

export async function markAllNotificationsAsRead() {
  const { data } = await api.patch('/notifications/read-all');
  return data;
}
