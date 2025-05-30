import api from './api';

export async function getMyNotifications() {
  const { data } = await api.get('/notifications');
  return data;
}

export async function markNotificationAsRead(notificationId: string) {
  const { data } = await api.patch(`/notifications/${notificationId}/read`);
  return data;
}

export async function markAllNotificationsAsRead() {
  const { data } = await api.patch('/notifications/read-all');
  return data;
}
